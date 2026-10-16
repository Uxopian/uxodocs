---
title: Provision Fast2 from a script
sidebar_label: Provision Fast2 from a script
sidebar_position: 12
---

# Provision Fast2 from a script

A fresh Fast2 has no user. Through the UI, the first person to register becomes the super admin. In an automated deployment (CI pipeline, Kubernetes or OpenShift job) nobody opens the UI, so the same steps go through the REST API:

1. wait for the broker,
2. create the super admin,
3. get an access token,
4. push your maps from a folder.

Every call below was run against Fast2 2026.0.0. All paths are under the broker's `/api` base path.

:::warning[Create the super admin first]
Creating the super admin needs no authentication: that is how a fresh install gets its first account. Until it is done, anyone who can reach the broker can claim the account. Run step 2 as soon as the broker answers, before exposing it to users.
:::

## Prerequisites

- The broker URL, for example `http://localhost:1789`.
- `curl` and `jq` on the machine that runs the script.
- Your maps exported as XML files, one map per `<name>.map.xml` file. The file name becomes the map name.

## 1. Wait for the broker

`GET /api/users/super-admin-exists` is public. It answers `true` or `false` once the broker is up.

```bash
until curl -sf "$FAST2_URL/api/users/super-admin-exists" > /dev/null; do sleep 5; done
```

## 2. Create the super admin

`POST /api/users/register-super-admin`, public, works once.

| Field       | Required | Value                                                                                             |
| ----------- | :------: | ------------------------------------------------------------------------------------------------- |
| `email`     |   yes    | The login of the account                                                                          |
| `password`  |   yes    | 8 to 20 characters, with an uppercase letter, a lowercase letter, a digit and a special character |
| `role`      |   yes    | `SUPER_ADMIN`                                                                                     |
| `firstname` |          | Display name                                                                                      |
| `lastname`  |          | Display name                                                                                      |

```bash
curl -X POST "$FAST2_URL/api/users/register-super-admin" \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "admin@example.com",
  "password": "<password>",
  "firstname": "Fast2",
  "lastname": "Admin",
  "role": "SUPER_ADMIN"
}'
```

| Status | Meaning                                                                                                                       |
| -----: | ----------------------------------------------------------------------------------------------------------------------------- |
|    200 | Created. The response describes the account (no password).                                                                    |
|    400 | A required field is missing, the role is not `SUPER_ADMIN`, or the password does not meet the policy. The message says which. |
|    500 | A super admin already exists.                                                                                                 |

There is no configuration property to create this account: the request must carry everything. To keep the script safe to re-run, check `super-admin-exists` first and call this endpoint only when it answers `false`.

## 3. Get an access token

`POST /api/auth/login` with the email and password returns the tokens in its body.

```bash
TOKEN=$(curl -sf -X POST "$FAST2_URL/api/auth/login" \
  -H 'Content-Type: application/json' \
  -d '{"email": "admin@example.com", "password": "<password>"}' \
  | jq -r .accessToken)
```

| Response field | Use                                                                      |
| -------------- | ------------------------------------------------------------------------ |
| `accessToken`  | Send it on every call: `Authorization: Bearer <accessToken>`             |
| `refreshToken` | Exchange it for a new access token when the current one expires          |
| `tenantId`     | The tenant your calls act on (`default` on a single-tenant installation) |

To renew the access token, call `POST /api/auth/refresh-token` with the **refresh** token as the Bearer:

```bash
curl -sf -X POST "$FAST2_URL/api/auth/refresh-token" -H "Authorization: Bearer $REFRESH_TOKEN" | jq -r .accessToken
```

A call without a valid token is refused with `403`.

## 4. Push maps from a folder

Fast2 2026 does not import maps from a folder at startup. Push them with the API instead.

`POST /api/maps/upload/{mapName}` uploads one map, as a multipart `file` part of type `text/xml`. It answers `201` with the stored map.

```bash
curl -X POST "$FAST2_URL/api/maps/upload/invoices-import" \
  -H "Authorization: Bearer $TOKEN" \
  -F 'file=@maps/invoices-import.map.xml;type=text/xml'
```

`POST /api/maps/upload` takes several maps at once: repeat a `files` part and a `names` parameter per map, in the same order.

:::warning[Uploading never updates an existing map]
The map id inside the XML is ignored: every upload creates a new map. If the name is already taken, the map is stored under another name (`invoices-import_new1`, then `_new2`…) instead of being refused. Re-running an upload loop therefore creates duplicates.

Check the name first with `GET /api/maps/name-availability?mapName=<name>`, which answers `true` when the name is free. Names are case-sensitive.
:::

## All together

This script can run at every deployment. It creates the super admin only on a fresh install, then uploads each map whose name is not taken yet and skips the others.

```bash title="provision-fast2.sh"
#!/usr/bin/env bash
# Usage: FAST2_URL=http://localhost:1789 FAST2_ADMIN_EMAIL=... FAST2_ADMIN_PASSWORD=... ./provision-fast2.sh ./maps
set -euo pipefail

: "${FAST2_URL:?}" "${FAST2_ADMIN_EMAIL:?}" "${FAST2_ADMIN_PASSWORD:?}"
MAPS_DIR="${1:?usage: $0 <maps-folder>}"
API="$FAST2_URL/api"

until curl -sf "$API/users/super-admin-exists" > /dev/null; do sleep 5; done

if [ "$(curl -sf "$API/users/super-admin-exists")" = "false" ]; then
  curl -sf -X POST "$API/users/register-super-admin" -H "Content-Type: application/json" \
    -d "$(jq -n --arg email "$FAST2_ADMIN_EMAIL" --arg password "$FAST2_ADMIN_PASSWORD" \
          '{email: $email, password: $password, firstname: "Fast2", lastname: "Admin", role: "SUPER_ADMIN"}')" > /dev/null
  echo "Super admin $FAST2_ADMIN_EMAIL created"
fi

TOKEN=$(curl -sf -X POST "$API/auth/login" -H "Content-Type: application/json" \
  -d "$(jq -n --arg email "$FAST2_ADMIN_EMAIL" --arg password "$FAST2_ADMIN_PASSWORD" '{email: $email, password: $password}')" \
  | jq -r .accessToken)

for file in "$MAPS_DIR"/*.map.xml; do
  name=$(basename "$file" .map.xml)
  available=$(curl -sf -G "$API/maps/name-availability" --data-urlencode "mapName=$name" -H "Authorization: Bearer $TOKEN")
  if [ "$available" != "true" ]; then
    echo "Skipped $name: a map with this name already exists"
    continue
  fi
  curl -sf -X POST "$API/maps/upload/$name" -H "Authorization: Bearer $TOKEN" -F "file=@$file;type=text/xml" > /dev/null
  echo "Uploaded $name"
done
```

On a fresh install:

```text
Super admin admin@example.com created
Uploaded invoices-import
Uploaded perfmap
```

On the next run:

```text
Skipped invoices-import: a map with this name already exists
Skipped perfmap: a map with this name already exists
```

Pass the password through your deployment tool's secret store (a Kubernetes or OpenShift secret exposed as an environment variable), never in the script or the image.
