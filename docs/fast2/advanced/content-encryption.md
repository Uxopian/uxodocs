---
title: Content encryption
last_update:
  date: '2026-09-01T13:21:25.549Z'
  author: CI/CD Bot
sidebar_position: 7
draft: false
tags:
    - security
    - configuration
content_hash: 554b9525a7f29f65256fcfeadfe11804c3c51a4a5e004c25cd2316ce8034db02
---

# Content encryption

:::tip
Fast2 can encrypt the **document contents it stores while a campaign is running**. Encryption is enabled on the worker and armed per map by registering a key on the broker.
:::

Available since **2025.7.0**. Since **2025.8.3** it is **disabled by default**.

## What is — and is not — encrypted

Fast2 encrypts the content bytes it writes to its own working storage (the punnet contents, whether they end up broker-side or worker-side). Contents are encrypted as they are written by a step and decrypted as they are read by the next one.

:::warning
This is **encryption of Fast2's own working storage**, not end-to-end encryption to the destination system. Contents are decrypted before injection, so the document delivered to the target ECM is in clear text. Earlier release notes described the feature as "end-to-end encryption of temporary files" — read that as _end-to-end across the Fast2 flow_, and size your security review accordingly.
:::

Not covered: metadata and dataset values (only content bytes are ciphered), the map definition itself, and anything a task writes outside the punnet content API.

## Step 1 — Enable encryption on the worker(s)

```ini title="./config/application.properties" hl_lines="2"
# Encrypt punnet contents handled by this worker
worker.activate.content-encryption=true
```

- Default is `false`.
- Identical for the **embedded worker and remote/standalone workers**.
- Enable it on **every worker that may process the map**. A worker left at `false` will not decrypt contents another worker encrypted, and will hand ciphertext to its tasks.
- Restart the worker for the change to take effect.

## Step 2 — Register an encryption key for the map

There is **no UI screen** for key management yet — it is done through the broker REST API. The key is stored broker-side and attached to one `mapId`.

```bash
curl -X PUT "http://<broker-host>:1789/broker/maps/<mapId>/encryption-key" \
   -H "Authorization: Bearer <jwt-token>" \
   -H "Content-Type: application/json" \
   -d '{
         "algorithm": "AES/GCM/NoPadding",
         "encodedKey": ""
      }'
```

:::note
The path is relative to the **broker context path** (`broker.url`, `/broker` by default) — not to the server root. The `Authorization` header is only required when authentication is enabled on the instance; the token is the JWT obtained from `/auth/login`.
:::

| Field        | Required | Description                                                                      |
| ------------ | -------- | -------------------------------------------------------------------------------- |
| `algorithm`  | yes      | `AES/GCM/NoPadding` or `AES/CBC/PKCS5Padding`.                                   |
| `encodedKey` | no       | Base64-encoded AES key. **Leave empty** to let Fast2 generate a new 256-bit key. |

Behaviour:

- When `encodedKey` is empty or absent, Fast2 generates a fresh **256-bit** key for the algorithm family and stores it.
- When you supply your own key, **keep a secure backup** — it is required to read the data back.
- The map must already exist, otherwise the call returns `404`.
- Calling the endpoint again **replaces** the stored key. Contents written with the previous key become unreadable.
- The endpoint appears in the Swagger documentation as **"Save encryption key"** (`PUT /maps/{mapId}/encryption-key`).

:::warning
The algorithm string is only validated when a worker actually ciphers a content, not when the key is saved. A typo is accepted by the API and surfaces later as an `Unsupported algorithm` failure at campaign runtime. Copy the two values above exactly.
:::

Each algorithm ships a random IV per content, prepended to the ciphertext (`[IV][ciphertext]`, 12 bytes for GCM, 16 for CBC). GCM additionally carries a 128-bit authentication tag, so a corrupted or tampered content fails loudly on read rather than yielding garbage — prefer `AES/GCM/NoPadding` unless you have a reason not to.

## Step 3 — Run your campaign

Launch a campaign on that map as usual. There is **no key prompt on the campaign launch screen** — this is expected. With the worker property enabled and a key registered on the map, contents are ciphered and deciphered transparently. The key is fetched once per campaign and cached by the worker.

## Custom modules

A custom module needs **no encryption code at all**, provided it goes through the punnet content API. Fast2 wraps the step's `PunnetContentFactory` in an encrypting decorator, so `createContent(...)`, `getContentAsStream(...)`, `getContentAsFile(...)` and `getContentAsRandomAccessInterface(...)` all cipher and decipher for you.

This holds for a step that declares its **own** `PunnetContentFactory`: your factory becomes the base and is still wrapped by the decorator.

:::danger
Two ways a custom module can break encryption:

- **`getContentAsUrl(...)` is not decrypted.** It returns the storage URL and hands back raw bytes. A module that reads content through that URL gets ciphertext. Use `getContentAsStream(...)` instead when encryption may be on.
- **Bypassing the manager.** A module that resolves paths and opens files itself, rather than asking its `manager` for the content, sees the encrypted bytes on disk.
  :::

## Current limitations

- No UI for key management — API only.
- Encryption is **per map**: a map with no registered key is processed in clear text even when the worker flag is on.
- The worker flag must be **consistent across all workers** serving the map.
- Exactly two supported algorithms, listed above.
- No key rotation or re-encryption facility: replacing a map's key does not re-cipher content already written.
