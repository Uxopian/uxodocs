---
sidebar_label: API
sidebar_position: 6
last_update:
  date: '2026-01-23T15:35:56.881Z'
  author: CI/CD Bot
content_hash: 0a2e44891f0c20efd7c8e2da3f1e56655277584163524c56d33fe26f4e4f8e74
---

# API documentation

Welcome to the **Fast2 API documentation**.  
This section provides a complete reference for interacting programmatically with Fast2 using its RESTful web services.

The API allows you to:

- Trigger and monitor migrations
- Manage configurations, workers, and migration jobs
- Query results and punnets data
- And many more...

All endpoints are documented with:

- Path and query parameters
- Request and response schemas
- Example calls in **cURL**

Before using the API, make sure you have:

- A valid authentication token (see [Authentication](#authentication))
- Network access to the Fast2 server

**Base URL:** `http://localhost:1789`

**Note**: The interactive Swagger UI for Fast2 is available at:  
[http://localhost:1789/swagger-ui/index.html](http://localhost:1789/swagger-ui/index.html)

## Authentication

- **Bearer JWT** via `Authorization: Bearer <token>` (Bearer Token)

> All examples include cURL requests. Replace placeholders with real values.

## Tags

- **Catalog API** — Endpoint to retrieve catalog tasks
- **Job API** — Endpoint for managing jobs
- **Worker API** — API for managing workers
- **User API** — Endpoint for managing users
- **Shared Objects API** — Endpoint for managing shared objects
- **Email API** — Endpoint for managing emails
- **Map API** — Endpoint for managing maps
- **Queue API** — Endpoint for managing queues
- **Punnet API** — Endpoint to retrieve punnets
- **Broker API** — Endpoint for broker-worker communication
- **Campaign API** — Endpoint for managing campaigns
- **Authentication API** — Endpoint for managing authentications

---

## Authentication API

Endpoint for managing authentications

### changePassword

`POST /api/auth/change-password`

**Request Body**

Content-Type: `application/json`

| Field                     | Type   | Required | Description |
| ------------------------- | ------ | :------: | ----------- |
| `currentPassword`         | string |    no    |             |
| `newPassword`             | string |    no    |             |
| `newPasswordConfirmation` | string |    no    |             |

Body format:

```json
{
  "currentPassword": "string",
  "newPassword": "string",
  "newPasswordConfirmation": "string"
}
```

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | _/_          | object | OK          |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/auth/change-password' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "currentPassword": "string",
  "newPassword": "string",
  "newPasswordConfirmation": "string"
}'
```

### isAuthenticated

`GET /api/auth/is-authenticated`

**Responses**

| Status | Content-Type | Schema  | Description |
| -----: | ------------ | ------- | ----------- |
|    200 | _/_          | boolean | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/auth/is-authenticated' \
  -H 'Authorization: Bearer <token>' \
```

### getLockTimeDuration

`GET /api/auth/lock-time-duration`

**Responses**

| Status | Content-Type | Schema         | Description |
| -----: | ------------ | -------------- | ----------- |
|    200 | _/_          | integer(int32) | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/auth/lock-time-duration' \
  -H 'Authorization: Bearer <token>' \
```

### authenticate

`POST /api/auth/login`

**Request Body**

Content-Type: `application/json`

| Field      | Type   | Required | Description |
| ---------- | ------ | :------: | ----------- |
| `email`    | string |    no    |             |
| `password` | string |    no    |             |

Body format:

```json
{
  "email": "string",
  "password": "string"
}
```

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | _/_          | object | OK          |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/auth/login' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "string",
  "password": "string"
}'
```

### getMaxFailedAttempts

`GET /api/auth/max-failed-attempts`

**Responses**

| Status | Content-Type | Schema         | Description |
| -----: | ------------ | -------------- | ----------- |
|    200 | _/_          | integer(int32) | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/auth/max-failed-attempts' \
  -H 'Authorization: Bearer <token>' \
```

### getPublicKey

`GET /api/auth/public-key`

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | _/_          | string | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/auth/public-key' \
  -H 'Authorization: Bearer <token>' \
```

### refreshToken

`POST /api/auth/refresh-token`

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | _/_          | object | OK          |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/auth/refresh-token' \
  -H 'Authorization: Bearer <token>' \
```

### getRemainingAttempts

`GET /api/auth/remaining-attempts`

**Parameters**

| Name    | In    | Required | Type   | Description |
| ------- | ----- | :------: | ------ | ----------- |
| `email` | query |   yes    | string |             |

**Responses**

| Status | Content-Type | Schema         | Description |
| -----: | ------------ | -------------- | ----------- |
|    200 | _/_          | integer(int32) | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/auth/remaining-attempts' \
  -H 'Authorization: Bearer <token>' \
```

### getRemainingLockTime

`GET /api/auth/remaining-lock-time`

**Parameters**

| Name    | In    | Required | Type   | Description |
| ------- | ----- | :------: | ------ | ----------- |
| `email` | query |   yes    | string |             |

**Responses**

| Status | Content-Type | Schema         | Description |
| -----: | ------------ | -------------- | ----------- |
|    200 | _/_          | integer(int64) | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/auth/remaining-lock-time' \
  -H 'Authorization: Bearer <token>' \
```

### resetPassword

`POST /api/auth/reset-password`

**Request Body**

Content-Type: `application/json`

| Field                     | Type   | Required | Description |
| ------------------------- | ------ | :------: | ----------- |
| `targetUser`              | string |    no    |             |
| `newPassword`             | string |    no    |             |
| `newPasswordConfirmation` | string |    no    |             |

Body format:

```json
{
  "targetUser": "string",
  "newPassword": "string",
  "newPasswordConfirmation": "string"
}
```

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | _/_          | object | OK          |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/auth/reset-password' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "targetUser": "string",
  "newPassword": "string",
  "newPasswordConfirmation": "string"
}'
```

---

## Broker API

Endpoint for broker-worker communication

### Delete any content set in broker files directory

`DELETE /api/broker/contents`

**Parameters**

| Name   | In    | Required | Type   | Description |
| ------ | ----- | :------: | ------ | ----------- |
| `path` | query |   yes    | string |             |

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | —            | —      | OK          |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/broker/contents' \
  -H 'Authorization: Bearer <token>' \
```

### Download any content set in broker files directory

`GET /api/broker/contents`

**Parameters**

| Name   | In    | Required | Type   | Description |
| ------ | ----- | :------: | ------ | ----------- |
| `path` | query |   yes    | string |             |

**Responses**

| Status | Content-Type     | Schema         | Description |
| -----: | ---------------- | -------------- | ----------- |
|    200 | application/json | string(binary) | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/broker/contents' \
  -H 'Authorization: Bearer <token>' \
```

### Download logs produced by the broker

`GET /api/broker/download-broker-logs`

**Responses**

| Status | Content-Type     | Schema              | Description |
| -----: | ---------------- | ------------------- | ----------- |
|    200 | application/json | array[string(byte)] | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/broker/download-broker-logs' \
  -H 'Authorization: Bearer <token>' \
```

---

## Campaign API

Endpoint for managing campaigns

### Delete campaigns by names

`DELETE /api/campaigns/delete-by-names`

Deletes campaigns that match the list of specified campaign names and map version. Returns a multi-status response indicating the success or failure of deleting each campaign

**Parameters**

| Name                | In    | Required | Type          | Description                               |
| ------------------- | ----- | :------: | ------------- | ----------------------------------------- |
| `campaigns`         | query |   yes    | array[object] | Campaign names to retrieve                |
| `mapVersionSerieId` | query |    no    | string        | Map version series id to filter campaigns |

**Responses**

| Status | Content-Type     | Schema | Description                       |
| -----: | ---------------- | ------ | --------------------------------- |
|    207 | application/json | object | Server failed to delete campaigns |
|    200 | application/json | object | Successfully deleted campaigns    |
|    400 | —                | —      | Invalid request parameters        |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/campaigns/delete-by-names' \
  -H 'Authorization: Bearer <token>' \
```

### Delete campaigns by pattern

`DELETE /api/campaigns/delete-by-pattern`

Deletes campaigns that match the specified name pattern and map version. If no name pattern is provided, all campaigns will be selected. Returns a multi-status response indicating the success or failure of deleting each campaign

**Parameters**

| Name                | In    | Required | Type   | Description                               |
| ------------------- | ----- | :------: | ------ | ----------------------------------------- |
| `namePattern`       | query |    no    | string | Pattern to filter campaign names          |
| `mapVersionSerieId` | query |    no    | string | Map version series id to filter campaigns |

**Responses**

| Status | Content-Type     | Schema | Description                       |
| -----: | ---------------- | ------ | --------------------------------- |
|    207 | application/json | object | Server failed to delete campaigns |
|    200 | application/json | object | Successfully deleted campaigns    |
|    400 | —                | —      | Invalid request parameters        |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/campaigns/delete-by-pattern' \
  -H 'Authorization: Bearer <token>' \
```

### Download campaign exceptions

`GET /api/campaigns/download-exceptions`

Downloads all exceptions thrown during a specific campaign

**Parameters**

| Name        | In    | Required | Type          | Description |
| ----------- | ----- | :------: | ------------- | ----------- |
| `campaigns` | query |   yes    | array[string] |             |
| `mapIds`    | query |   yes    | array[string] |             |

**Responses**

| Status | Content-Type | Schema | Description                          |
| -----: | ------------ | ------ | ------------------------------------ |
|    200 | —            | —      | Successfully downloaded exceptions   |
|    500 | —            | —      | Server failed to download exceptions |
|    400 | —            | —      | Invalid request parameters           |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/campaigns/download-exceptions' \
  -H 'Authorization: Bearer <token>' \
```

### Get campaigns dto information by names

`GET /api/campaigns/dto/search-by-names`

Retrieves campaigns that match the list of specified campaign names, map version and map id

**Parameters**

| Name                | In    | Required | Type          | Description                               |
| ------------------- | ----- | :------: | ------------- | ----------------------------------------- |
| `campaigns`         | query |   yes    | array[object] | Campaign names to retrieve                |
| `mapVersionSerieId` | query |    no    | string        | Map version series id to filter campaigns |
| `mapId`             | query |    no    | string        | Map id to filter campaigns                |
| `paginateParams`    | query |   yes    | object        | Pagination parameters                     |

**Responses**

| Status | Content-Type     | Schema | Description                      |
| -----: | ---------------- | ------ | -------------------------------- |
|    500 | —                | —      | Failed to retrieve campaigns     |
|    200 | application/json | object | Successfully retrieved campaigns |
|    400 | —                | —      | Invalid request parameters       |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/campaigns/dto/search-by-names' \
  -H 'Authorization: Bearer <token>' \
```

### Get campaigns dto information by pattern

`GET /api/campaigns/dto/search-by-pattern`

Retrieves a list of campaigns dto that match the specified name pattern, map version and map id. If no name pattern is provided, all campaigns will be selected

**Parameters**

| Name                | In    | Required | Type   | Description                               |
| ------------------- | ----- | :------: | ------ | ----------------------------------------- |
| `namePattern`       | query |    no    | string | Pattern to filter campaign names          |
| `mapVersionSerieId` | query |    no    | string | Map version series id to filter campaigns |
| `mapId`             | query |    no    | string | Map id to filter campaigns                |
| `status`            | query |    no    | string | Campaign status to filter campaigns       |
| `paginateParams`    | query |   yes    | object | Pagination parameters                     |

**Responses**

| Status | Content-Type     | Schema | Description                         |
| -----: | ---------------- | ------ | ----------------------------------- |
|    500 | —                | —      | Server failed to retrieve campaigns |
|    200 | application/json | object | Successfully retrieved campaigns    |
|    400 | —                | —      | Invalid request parameters          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/campaigns/dto/search-by-pattern' \
  -H 'Authorization: Bearer <token>' \
```

### Get campaign dto information

`GET /api/campaigns/dto/{campaign}`

Retrieves a campaign dto from its name

**Parameters**

| Name       | In   | Required | Type   | Description               |
| ---------- | ---- | :------: | ------ | ------------------------- |
| `campaign` | path |   yes    | object | Campaign name to retrieve |

**Responses**

| Status | Content-Type     | Schema | Description                        |
| -----: | ---------------- | ------ | ---------------------------------- |
|    200 | application/json | object | Successfully retrieved campaign    |
|    400 | —                | —      | Invalid request parameters         |
|    404 | —                | —      | Campaign not found                 |
|    500 | —                | —      | Server failed to retrieve campaign |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/campaigns/dto/<campaign>' \
  -H 'Authorization: Bearer <token>' \
```

### Get campaigns information by name

`GET /api/campaigns/search-by-names`

Retrieves campaigns that match the list of specified campaign names, map version and map id

**Parameters**

| Name                | In    | Required | Type          | Description                               |
| ------------------- | ----- | :------: | ------------- | ----------------------------------------- |
| `campaigns`         | query |   yes    | array[object] | Campaign names to stop                    |
| `mapVersionSerieId` | query |    no    | string        | Map version series id to filter campaigns |
| `mapId`             | query |    no    | string        | Map id to filter campaigns                |
| `paginateParams`    | query |   yes    | object        | Pagination parameters                     |

**Responses**

| Status | Content-Type     | Schema | Description                         |
| -----: | ---------------- | ------ | ----------------------------------- |
|    200 | application/json | object | Successfully retrieved campaigns    |
|    500 | —                | —      | Server failed to retrieve campaigns |
|    400 | —                | —      | Invalid request parameters          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/campaigns/search-by-names' \
  -H 'Authorization: Bearer <token>' \
```

### Get campaigns information by pattern

`GET /api/campaigns/search-by-pattern`

Retrieves campaigns that match the specified name pattern, map version and map id. If no name pattern is provided, all campaigns will be selected

**Parameters**

| Name                | In    | Required | Type   | Description                               |
| ------------------- | ----- | :------: | ------ | ----------------------------------------- |
| `namePattern`       | query |    no    | string | Pattern to filter campaign names          |
| `mapVersionSerieId` | query |    no    | string | Map version series id to filter campaigns |
| `mapId`             | query |    no    | string | Map id to filter campaigns                |
| `paginateParams`    | query |   yes    | object | Pagination parameters                     |

**Responses**

| Status | Content-Type     | Schema | Description                         |
| -----: | ---------------- | ------ | ----------------------------------- |
|    200 | application/json | object | Successfully retrieved campaigns    |
|    500 | —                | —      | Server failed to retrieve campaigns |
|    400 | —                | —      | Invalid request parameters          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/campaigns/search-by-pattern' \
  -H 'Authorization: Bearer <token>' \
```

### Stop campaigns by names

`POST /api/campaigns/stop-by-names`

Stops campaigns that match the specified list of campaign names and map version. Returns a multi-status response indicating the success or failure of stopping each campaign

**Parameters**

| Name                | In    | Required | Type          | Description                               |
| ------------------- | ----- | :------: | ------------- | ----------------------------------------- |
| `campaigns`         | query |   yes    | array[object] | Campaign names to stop                    |
| `mapVersionSerieId` | query |    no    | string        | Map version series id to filter campaigns |

**Responses**

| Status | Content-Type     | Schema | Description                    |
| -----: | ---------------- | ------ | ------------------------------ |
|    207 | application/json | object | Server failed to stop campaign |
|    200 | application/json | object | Successfully stopped campaign  |
|    400 | —                | —      | Invalid request parameters     |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/campaigns/stop-by-names' \
  -H 'Authorization: Bearer <token>' \
```

### Stop campaigns by pattern

`POST /api/campaigns/stop-by-pattern`

Stops campaigns that match the specified name pattern and map version. If no name pattern is provided, all campaigns will be selected. Returns a multi-status response indicating the success or failure of stopping each campaign

**Parameters**

| Name                | In    | Required | Type   | Description                               |
| ------------------- | ----- | :------: | ------ | ----------------------------------------- |
| `namePattern`       | query |    no    | string | Pattern to filter campaign names          |
| `mapVersionSerieId` | query |    no    | string | Map version series id to filter campaigns |

**Responses**

| Status | Content-Type     | Schema | Description                    |
| -----: | ---------------- | ------ | ------------------------------ |
|    207 | application/json | object | Server failed to stop campaign |
|    200 | application/json | object | Successfully stopped campaign  |
|    400 | —                | —      | Invalid request parameters     |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/campaigns/stop-by-pattern' \
  -H 'Authorization: Bearer <token>' \
```

### Delete a campaign

`DELETE /api/campaigns/{campaign}`

Deletes a campaign from its name

**Parameters**

| Name       | In   | Required | Type   | Description             |
| ---------- | ---- | :------: | ------ | ----------------------- |
| `campaign` | path |   yes    | object | Campaign name to delete |

**Responses**

| Status | Content-Type | Schema | Description                          |
| -----: | ------------ | ------ | ------------------------------------ |
|    200 | —            | —      | Successfully deleted campaign        |
|    400 | —            | —      | Invalid request parameters           |
|    404 | —            | —      | Campaign not found                   |
|    500 | —            | —      | Server failed to delete the campaign |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/campaigns/<campaign>' \
  -H 'Authorization: Bearer <token>' \
```

### deleteCampaignParameter

`DELETE /api/campaigns/{campaign}/parameter/{campaignParameter}`

**Parameters**

| Name                | In   | Required | Type   | Description            |
| ------------------- | ---- | :------: | ------ | ---------------------- |
| `campaign`          | path |   yes    | object | Campaign name          |
| `campaignParameter` | path |   yes    | string | Campaign parameter key |

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | —            | —      | OK          |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/campaigns/<campaign>/parameter/<campaignParameter>' \
  -H 'Authorization: Bearer <token>' \
```

### deleteAllCampaignParameters

`DELETE /api/campaigns/{campaign}/parameters`

**Parameters**

| Name       | In   | Required | Type   | Description   |
| ---------- | ---- | :------: | ------ | ------------- |
| `campaign` | path |   yes    | object | Campaign name |

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | —            | —      | OK          |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/campaigns/<campaign>/parameters' \
  -H 'Authorization: Bearer <token>' \
```

### getCampaignParameters

`GET /api/campaigns/{campaign}/parameters`

**Parameters**

| Name       | In   | Required | Type   | Description   |
| ---------- | ---- | :------: | ------ | ------------- |
| `campaign` | path |   yes    | object | Campaign name |

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/campaigns/<campaign>/parameters' \
  -H 'Authorization: Bearer <token>' \
```

### createCampaignParameters

`POST /api/campaigns/{campaign}/parameters`

**Parameters**

| Name       | In    | Required | Type   | Description   |
| ---------- | ----- | :------: | ------ | ------------- |
| `mapId`    | query |   yes    | object | Map Id        |
| `campaign` | path  |   yes    | object | Campaign name |

**Request Body**

Content-Type: `application/json`

| Field   | Type    | Required | Description |
| ------- | ------- | :------: | ----------- |
| `empty` | boolean |    no    |             |

Body format:

```json
{
  "empty": true
}
```

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | —            | —      | OK          |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/campaigns/<campaign>/parameters' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "empty": true
}'
```

### Resume a campaign

`POST /api/campaigns/{campaign}/resume`

Resumes a campaign from its name. Only stopped campaigns can be resumed

**Parameters**

| Name       | In   | Required | Type   | Description   |
| ---------- | ---- | :------: | ------ | ------------- |
| `campaign` | path |   yes    | object | Campaign name |

**Responses**

| Status | Content-Type     | Schema | Description                      |
| -----: | ---------------- | ------ | -------------------------------- |
|    400 | —                | —      | Campaign not stopped             |
|    404 | —                | —      | Campaign not found               |
|    500 | —                | —      | Server failed to resume campaign |
|    200 | application/json | object | Successfully resumed campaign    |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/campaigns/<campaign>/resume' \
  -H 'Authorization: Bearer <token>' \
```

### Retry punnets

`POST /api/campaigns/{campaign}/retry-punnets`

Retry punnets in any step for a specific campaign. You can filter the punnets to retry by status and metadata values

**Parameters**

| Name       | In    | Required | Type          | Description                             |
| ---------- | ----- | :------: | ------------- | --------------------------------------- |
| `campaign` | path  |   yes    | object        | Campaign name of the punnets to retry   |
| `mapId`    | query |   yes    | object        | Map id related to the campaign          |
| `stepId`   | query |   yes    | object        | Step id containing the punnets to retry |
| `status`   | query |    no    | array[string] | Status to filter punnets to retry       |

**Responses**

| Status | Content-Type | Schema | Description                    |
| -----: | ------------ | ------ | ------------------------------ |
|    500 | —            | —      | Server failed to retry punnets |
|    400 | —            | —      | Invalid request parameters     |
|    200 | —            | —      | Successfully retried campaign  |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/campaigns/<campaign>/retry-punnets' \
  -H 'Authorization: Bearer <token>' \
```

### Start a campaign

`POST /api/campaigns/{campaign}/start`

Starts a campaign from its name and a map id. Can be a new campaign or a rerun

**Parameters**

| Name          | In    | Required | Type    | Description   |
| ------------- | ----- | :------: | ------- | ------------- |
| `campaign`    | path  |   yes    | object  | Campaign name |
| `mapId`       | query |   yes    | object  | Map Id        |
| `newCampaign` | query |    no    | boolean | New campaign  |

**Responses**

| Status | Content-Type     | Schema | Description                     |
| -----: | ---------------- | ------ | ------------------------------- |
|    400 | —                | —      | Invalid request parameters      |
|    404 | —                | —      | Map not found                   |
|    200 | application/json | object | Successfully started campaign   |
|    500 | —                | —      | Server failed to start campaign |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/campaigns/<campaign>/start' \
  -H 'Authorization: Bearer <token>' \
```

### Get campaign stats

`GET /api/campaigns/{campaign}/stats`

Retrieves stats of specified campaign

**Parameters**

| Name       | In   | Required | Type   | Description               |
| ---------- | ---- | :------: | ------ | ------------------------- |
| `campaign` | path |   yes    | object | Campaign name to retrieve |

**Responses**

| Status | Content-Type     | Schema | Description                              |
| -----: | ---------------- | ------ | ---------------------------------------- |
|    500 | —                | —      | Server failed to retrieve campaign stats |
|    200 | application/json | object | Successfully retrieved campaign stats    |
|    400 | —                | —      | Invalid request parameters               |
|    404 | —                | —      | Campaign or stats not found              |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/campaigns/<campaign>/stats' \
  -H 'Authorization: Bearer <token>' \
```

### Get campaign status

`GET /api/campaigns/{campaign}/status`

Retrieves status of specified campaign

**Parameters**

| Name       | In   | Required | Type   | Description               |
| ---------- | ---- | :------: | ------ | ------------------------- |
| `campaign` | path |   yes    | object | Campaign name to retrieve |

**Responses**

| Status | Content-Type     | Schema | Description                               |
| -----: | ---------------- | ------ | ----------------------------------------- |
|    404 | —                | —      | Campaign or status not found              |
|    200 | application/json | string | Successfully retrieved campaign status    |
|    400 | —                | —      | Invalid request parameters                |
|    500 | —                | —      | Server failed to retrieve campaign status |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/campaigns/<campaign>/status' \
  -H 'Authorization: Bearer <token>' \
```

### Download step result

`GET /api/campaigns/{campaign}/step/{stepId}/download-result`

Downloads step result for a specific campaign. You can filter the punnets to download by status and metadata values

**Parameters**

| Name       | In    | Required | Type          | Description                          |
| ---------- | ----- | :------: | ------------- | ------------------------------------ |
| `campaign` | path  |   yes    | object        | Campaign name of the step            |
| `mapId`    | query |   yes    | object        | Map id related to the campaign       |
| `stepId`   | path  |   yes    | object        | Step id to download result           |
| `status`   | query |    no    | array[string] | Status to filter punnets to download |

**Responses**

| Status | Content-Type | Schema | Description                           |
| -----: | ------------ | ------ | ------------------------------------- |
|    200 | —            | —      | Successfully downloaded step result   |
|    500 | —            | —      | Server failed to download step result |
|    400 | —            | —      | Invalid request parameters            |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/campaigns/<campaign>/step/<stepId>/download-result' \
  -H 'Authorization: Bearer <token>' \
```

### Pause a step

`POST /api/campaigns/{campaign}/step/{stepId}/pause`

Pause a step by providing the campaign name, map ID, and step ID. These parameters define the exact context of the task to pause.

**Parameters**

| Name       | In    | Required | Type   | Description                                     |
| ---------- | ----- | :------: | ------ | ----------------------------------------------- |
| `campaign` | path  |   yes    | object | The campaign name to identify the task context  |
| `mapId`    | query |   yes    | object | The map Id related to the campaign              |
| `stepId`   | path  |   yes    | object | The step Id defining the specific task to pause |

**Responses**

| Status | Content-Type     | Schema | Description                |
| -----: | ---------------- | ------ | -------------------------- |
|    204 | application/json | object | Successfully paused step   |
|    400 | —                | —      | Invalid request parameters |
|    404 | —                | —      | Campaign not found         |
|    500 | —                | —      | Failed to pause step       |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/campaigns/<campaign>/step/<stepId>/pause' \
  -H 'Authorization: Bearer <token>' \
```

### Resume a step

`POST /api/campaigns/{campaign}/step/{stepId}/resume`

Resume a step by providing the campaign name, map ID, and step ID. These parameters define the exact context of the task to resume.

**Parameters**

| Name       | In    | Required | Type   | Description                                      |
| ---------- | ----- | :------: | ------ | ------------------------------------------------ |
| `campaign` | path  |   yes    | object | The campaign name to identify the task context   |
| `mapId`    | query |   yes    | object | The map Id related to the campaign               |
| `stepId`   | path  |   yes    | object | The step Id defining the specific task to resume |

**Responses**

| Status | Content-Type     | Schema | Description                |
| -----: | ---------------- | ------ | -------------------------- |
|    500 | —                | —      | Failed to resume step      |
|    400 | —                | —      | Invalid request parameters |
|    404 | —                | —      | Campaign not found         |
|    204 | application/json | object | Successfully resumed step  |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/campaigns/<campaign>/step/<stepId>/resume' \
  -H 'Authorization: Bearer <token>' \
```

### Stop a campaign

`POST /api/campaigns/{campaign}/stop`

Stop a campaign from its name

**Parameters**

| Name       | In   | Required | Type   | Description   |
| ---------- | ---- | :------: | ------ | ------------- |
| `campaign` | path |   yes    | object | Campaign name |

**Responses**

| Status | Content-Type     | Schema | Description                   |
| -----: | ---------------- | ------ | ----------------------------- |
|    200 | application/json | object | Successfully stopped campaign |
|    400 | —                | —      | Campaign not started          |
|    500 | —                | —      | Failed to resume campaign     |
|    404 | —                | —      | Campaign not found            |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/campaigns/<campaign>/stop' \
  -H 'Authorization: Bearer <token>' \
```

---

## Catalog API

Endpoint to retrieve catalog tasks

### getCatalog

`GET /api/catalog`

**Parameters**

| Name         | In    | Required | Type          | Description |
| ------------ | ----- | :------: | ------------- | ----------- |
| `name`       | query |    no    | string        |             |
| `classNames` | query |    no    | array[string] |             |
| `allTask`    | query |    no    | boolean       |             |

**Responses**

| Status | Content-Type     | Schema        | Description |
| -----: | ---------------- | ------------- | ----------- |
|    200 | application/json | array[object] | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/catalog' \
  -H 'Authorization: Bearer <token>' \
```

### getCatalogDto

`GET /api/catalog/dto`

**Parameters**

| Name         | In    | Required | Type          | Description |
| ------------ | ----- | :------: | ------------- | ----------- |
| `name`       | query |    no    | string        |             |
| `classNames` | query |    no    | array[string] |             |
| `allTask`    | query |    no    | boolean       |             |

**Responses**

| Status | Content-Type     | Schema        | Description |
| -----: | ---------------- | ------------- | ----------- |
|    200 | application/json | array[object] | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/catalog/dto' \
  -H 'Authorization: Bearer <token>' \
```

---

## Email API

Endpoint for managing emails

### createEmail

`POST /api/emails`

**Request Body**

Content-Type: `application/json`

| Field     | Type    | Required | Description |
| --------- | ------- | :------: | ----------- |
| `email`   | string  |    no    |             |
| `active`  | boolean |    no    |             |
| `emailId` | object  |    no    |             |

Body format:

```json
{
  "email": "string",
  "active": true,
  "emailId": {}
}
```

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/emails' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "string",
  "active": true,
  "emailId": {}
}'
```

### updateEmail

`PUT /api/emails`

**Request Body**

Content-Type: `application/json`

| Field     | Type    | Required | Description |
| --------- | ------- | :------: | ----------- |
| `email`   | string  |    no    |             |
| `active`  | boolean |    no    |             |
| `emailId` | object  |    no    |             |

Body format:

```json
{
  "email": "string",
  "active": true,
  "emailId": {}
}
```

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X PUT 'http://localhost:1789/api/emails' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "string",
  "active": true,
  "emailId": {}
}'
```

### deleteEmails_byNames

`DELETE /api/emails/delete-by-names`

**Parameters**

| Name     | In    | Required | Type          | Description |
| -------- | ----- | :------: | ------------- | ----------- |
| `emails` | query |   yes    | array[string] |             |

**Request Body**

Content-Type: `application/json`

| Field       | Type           | Required | Description |
| ----------- | -------------- | :------: | ----------- |
| `from`      | integer(int32) |    no    |             |
| `size`      | integer(int32) |    no    |             |
| `orderBy`   | string         |    no    |             |
| `ascending` | boolean        |    no    |             |

Body format:

```json
{
  "from": 0,
  "size": 0,
  "orderBy": "string",
  "ascending": true
}
```

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/emails/delete-by-names' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "from": 0,
  "size": 0,
  "orderBy": "string",
  "ascending": true
}'
```

### deleteEmails_byPattern

`DELETE /api/emails/delete-by-pattern`

**Parameters**

| Name          | In    | Required | Type   | Description |
| ------------- | ----- | :------: | ------ | ----------- |
| `namePattern` | query |    no    | string |             |

**Request Body**

Content-Type: `application/json`

| Field       | Type           | Required | Description |
| ----------- | -------------- | :------: | ----------- |
| `from`      | integer(int32) |    no    |             |
| `size`      | integer(int32) |    no    |             |
| `orderBy`   | string         |    no    |             |
| `ascending` | boolean        |    no    |             |

Body format:

```json
{
  "from": 0,
  "size": 0,
  "orderBy": "string",
  "ascending": true
}
```

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/emails/delete-by-pattern' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "from": 0,
  "size": 0,
  "orderBy": "string",
  "ascending": true
}'
```

### getEmailsByNames

`GET /api/emails/search-by-names`

**Parameters**

| Name             | In    | Required | Type          | Description |
| ---------------- | ----- | :------: | ------------- | ----------- |
| `emails`         | query |   yes    | array[string] |             |
| `paginateParams` | query |   yes    | object        |             |

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/emails/search-by-names' \
  -H 'Authorization: Bearer <token>' \
```

### getEmails

`GET /api/emails/search-by-pattern`

**Parameters**

| Name             | In    | Required | Type   | Description |
| ---------------- | ----- | :------: | ------ | ----------- |
| `namePattern`    | query |    no    | string |             |
| `paginateParams` | query |   yes    | object |             |

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/emails/search-by-pattern' \
  -H 'Authorization: Bearer <token>' \
```

### deleteEmail

`DELETE /api/emails/{email}`

**Parameters**

| Name    | In   | Required | Type   | Description |
| ------- | ---- | :------: | ------ | ----------- |
| `email` | path |   yes    | string |             |

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | —            | —      | OK          |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/emails/<email>' \
  -H 'Authorization: Bearer <token>' \
```

### getEmail

`GET /api/emails/{email}`

**Parameters**

| Name    | In   | Required | Type   | Description |
| ------- | ---- | :------: | ------ | ----------- |
| `email` | path |   yes    | string |             |

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/emails/<email>' \
  -H 'Authorization: Bearer <token>' \
```

---

## Job API

Endpoint for managing jobs

### Create a job

`POST /api/jobs`

Creates a new job for a map with its cron expression

**Request Body**

Content-Type: `application/json`

| Field                 | Type           | Required | Description |
| --------------------- | -------------- | :------: | ----------- |
| `jobId`               | object         |    no    |             |
| `jobName`             | string         |    no    |             |
| `campaign`            | object         |    no    |             |
| `taskFlowMapRef`      | object         |    no    |             |
| `maxNumberExecutions` | integer(int32) |    no    |             |
| `action`              | string         |    no    |             |
| `active`              | boolean        |    no    |             |
| `cronExpression`      | string         |    no    |             |

Body format:

```json
{
  "jobId": {},
  "jobName": "string",
  "campaign": {
    "name": "string",
    "index": "string",
    "prefix": "string",
    "suffix": 0
  },
  "taskFlowMapRef": {},
  "maxNumberExecutions": 0,
  "action": "STOP",
  "active": true,
  "cronExpression": "string"
}
```

**Responses**

| Status | Content-Type     | Schema | Description                 |
| -----: | ---------------- | ------ | --------------------------- |
|    200 | application/json | object | Successfully created job    |
|    400 | —                | —      | Invalid request parameters  |
|    409 | —                | —      | Job name already taken      |
|    500 | —                | —      | Server failed to create job |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/jobs' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "jobId": {},
  "jobName": "string",
  "campaign": {
    "name": "string",
    "index": "string",
    "prefix": "string",
    "suffix": 0
  },
  "taskFlowMapRef": {},
  "maxNumberExecutions": 0,
  "action": "STOP",
  "active": true,
  "cronExpression": "string"
}'
```

### Update a job

`PUT /api/jobs`

Updates a job. The job must have a name and an Id are required

**Request Body**

Content-Type: `application/json`

| Field                 | Type           | Required | Description |
| --------------------- | -------------- | :------: | ----------- |
| `jobId`               | object         |    no    |             |
| `jobName`             | string         |    no    |             |
| `campaign`            | object         |    no    |             |
| `taskFlowMapRef`      | object         |    no    |             |
| `maxNumberExecutions` | integer(int32) |    no    |             |
| `action`              | string         |    no    |             |
| `active`              | boolean        |    no    |             |
| `cronExpression`      | string         |    no    |             |

Body format:

```json
{
  "jobId": {},
  "jobName": "string",
  "campaign": {
    "name": "string",
    "index": "string",
    "prefix": "string",
    "suffix": 0
  },
  "taskFlowMapRef": {},
  "maxNumberExecutions": 0,
  "action": "STOP",
  "active": true,
  "cronExpression": "string"
}
```

**Responses**

| Status | Content-Type     | Schema | Description                 |
| -----: | ---------------- | ------ | --------------------------- |
|    500 | —                | —      | Server failed to update job |
|    404 | —                | —      | Provided job not found      |
|    400 | —                | —      | Invalid request parameters  |
|    409 | —                | —      | Job name already taken      |
|    200 | application/json | object | Successfully updated job    |

**cURL example**

```bash
curl -X PUT 'http://localhost:1789/api/jobs' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "jobId": {},
  "jobName": "string",
  "campaign": {
    "name": "string",
    "index": "string",
    "prefix": "string",
    "suffix": 0
  },
  "taskFlowMapRef": {},
  "maxNumberExecutions": 0,
  "action": "STOP",
  "active": true,
  "cronExpression": "string"
}'
```

### Delete jobs by name

`DELETE /api/jobs/delete-by-name`

Deletes jobs that match the list of specified job names. Returns a multi-status response indicating the success or failure of deleting each job

**Parameters**

| Name       | In    | Required | Type          | Description         |
| ---------- | ----- | :------: | ------------- | ------------------- |
| `jobNames` | query |   yes    | array[string] | Job names to delete |

**Responses**

| Status | Content-Type     | Schema | Description                       |
| -----: | ---------------- | ------ | --------------------------------- |
|    200 | application/json | object | Successfully deleted jobs         |
|    400 | —                | —      | Invalid request parameters        |
|    207 | application/json | object | Server failed to delete campaigns |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/jobs/delete-by-name' \
  -H 'Authorization: Bearer <token>' \
```

### Delete jobs by pattern

`DELETE /api/jobs/delete-by-pattern`

Deletes jobs that match the specified name pattern. If no name pattern is provided, all jobs will be selected. Returns a multi-status response indicating the success or failure of deleting each job

**Parameters**

| Name          | In    | Required | Type   | Description                 |
| ------------- | ----- | :------: | ------ | --------------------------- |
| `namePattern` | query |    no    | string | Pattern to filter job names |

**Responses**

| Status | Content-Type     | Schema | Description                       |
| -----: | ---------------- | ------ | --------------------------------- |
|    200 | application/json | object | Successfully deleted jobs         |
|    400 | —                | —      | Invalid request parameters        |
|    207 | application/json | object | Server failed to delete campaigns |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/jobs/delete-by-pattern' \
  -H 'Authorization: Bearer <token>' \
```

### Get jobs by name

`GET /api/jobs/search-by-names`

Retrieves jobs that match the list of specified job names

**Parameters**

| Name             | In    | Required | Type          | Description           |
| ---------------- | ----- | :------: | ------------- | --------------------- |
| `jobNames`       | query |   yes    | array[string] | Job names to retrieve |
| `paginateParams` | query |   yes    | object        | Pagination parameters |

**Responses**

| Status | Content-Type     | Schema | Description                    |
| -----: | ---------------- | ------ | ------------------------------ |
|    400 | —                | —      | Invalid request parameters     |
|    500 | —                | —      | Server failed to retrieve jobs |
|    200 | application/json | object | Successfully retrieved jobs    |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/jobs/search-by-names' \
  -H 'Authorization: Bearer <token>' \
```

### Get jobs by pattern

`GET /api/jobs/search-by-pattern`

Retrieves jobs that match the specified name pattern. If no name pattern is provided, all jobs will be selected

**Parameters**

| Name             | In    | Required | Type   | Description                 |
| ---------------- | ----- | :------: | ------ | --------------------------- |
| `namePattern`    | query |    no    | string | Pattern to filter job names |
| `paginateParams` | query |   yes    | object | Pagination parameters       |

**Responses**

| Status | Content-Type     | Schema | Description                    |
| -----: | ---------------- | ------ | ------------------------------ |
|    400 | —                | —      | Invalid request parameters     |
|    500 | —                | —      | Server failed to retrieve jobs |
|    200 | application/json | object | Successfully retrieved jobs    |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/jobs/search-by-pattern' \
  -H 'Authorization: Bearer <token>' \
```

### isCronValidFromString

`GET /api/jobs/validateCron`

**Parameters**

| Name             | In    | Required | Type   | Description |
| ---------------- | ----- | :------: | ------ | ----------- |
| `cronExpression` | query |   yes    | string |             |

**Responses**

| Status | Content-Type     | Schema  | Description |
| -----: | ---------------- | ------- | ----------- |
|    200 | application/json | boolean | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/jobs/validateCron' \
  -H 'Authorization: Bearer <token>' \
```

### Delete a job

`DELETE /api/jobs/{jobName}`

Deletes a job from its name

**Parameters**

| Name      | In   | Required | Type   | Description         |
| --------- | ---- | :------: | ------ | ------------------- |
| `jobName` | path |   yes    | string | The name of the job |

**Responses**

| Status | Content-Type | Schema | Description                 |
| -----: | ------------ | ------ | --------------------------- |
|    400 | —            | —      | Invalid request parameters  |
|    404 | —            | —      | Job not found               |
|    200 | —            | —      | Successfully deleted job    |
|    500 | —            | —      | Server failed to delete job |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/jobs/<jobName>' \
  -H 'Authorization: Bearer <token>' \
```

### Get job from name

`GET /api/jobs/{jobName}`

Retrieves a job from its name

**Parameters**

| Name      | In   | Required | Type   | Description         |
| --------- | ---- | :------: | ------ | ------------------- |
| `jobName` | path |   yes    | string | The name of the job |

**Responses**

| Status | Content-Type     | Schema | Description                   |
| -----: | ---------------- | ------ | ----------------------------- |
|    500 | —                | —      | Server failed to retrieve job |
|    400 | —                | —      | Invalid request parameters    |
|    404 | —                | —      | Job not found                 |
|    200 | application/json | object | Successfully retrieved job    |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/jobs/<jobName>' \
  -H 'Authorization: Bearer <token>' \
```

---

## Map API

Endpoint for managing maps

### Create a map

`POST /api/maps`

Creates a new map with an id and a unique name

**Request Body**

Content-Type: `application/json`

**Responses**

| Status | Content-Type     | Schema | Description                 |
| -----: | ---------------- | ------ | --------------------------- |
|    409 | —                | —      | Map name already taken      |
|    500 | —                | —      | Server failed to create map |
|    400 | —                | —      | Invalid request parameters  |
|    200 | application/json | string | Successfully created map    |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/maps' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '"string"'
```

### Save a map

`PUT /api/maps`

Saves a whole map including step configurations

**Request Body**

Content-Type: `application/json`

**Responses**

| Status | Content-Type     | Schema | Description                                                                                       |
| -----: | ---------------- | ------ | ------------------------------------------------------------------------------------------------- |
|    500 | —                | —      | Server failed to save map                                                                         |
|    200 | application/json | string | Successfully saved maps                                                                           |
|    409 | —                | —      | New map name already taken                                                                        |
|    400 | —                | —      | Invalid request parameters                                                                        |
|    404 | —                | —      | Map not found from provided mapId or map versions weren't matching between provided and found map |

**cURL example**

```bash
curl -X PUT 'http://localhost:1789/api/maps' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '"string"'
```

### Delete maps by Ids

`DELETE /api/maps/delete-by-ids`

Deletes maps that match the list of specified map Ids

**Parameters**

| Name     | In    | Required | Type          | Description                   |
| -------- | ----- | :------: | ------------- | ----------------------------- |
| `mapIds` | query |   yes    | array[object] | Map ids of the maps to delete |

**Responses**

| Status | Content-Type     | Schema | Description                  |
| -----: | ---------------- | ------ | ---------------------------- |
|    200 | application/json | object | Successfully deleted maps    |
|    500 | —                | —      | Server failed to delete maps |
|    400 | —                | —      | Invalid request parameters   |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/maps/delete-by-ids' \
  -H 'Authorization: Bearer <token>' \
```

### Delete maps by pattern

`DELETE /api/maps/delete-by-pattern`

Deletes maps that match the specified name pattern. If no name pattern is provided, all maps will be selected

**Parameters**

| Name          | In    | Required | Type   | Description                 |
| ------------- | ----- | :------: | ------ | --------------------------- |
| `namePattern` | query |    no    | string | Pattern to filter map names |

**Responses**

| Status | Content-Type     | Schema | Description                  |
| -----: | ---------------- | ------ | ---------------------------- |
|    200 | application/json | object | Successfully deleted maps    |
|    500 | —                | —      | Server failed to delete maps |
|    400 | —                | —      | Invalid request parameters   |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/maps/delete-by-pattern' \
  -H 'Authorization: Bearer <token>' \
```

### Delete maps by version

`DELETE /api/maps/delete-by-version`

Deletes maps summary that match the specified map version Ids

**Parameters**

| Name                | In    | Required | Type   | Description                               |
| ------------------- | ----- | :------: | ------ | ----------------------------------------- |
| `mapVersionSerieId` | query |   yes    | object | The mapVersionSerieId attached to the map |

**Request Body**

Content-Type: `application/json`

| Field       | Type           | Required | Description |
| ----------- | -------------- | :------: | ----------- |
| `from`      | integer(int32) |    no    |             |
| `size`      | integer(int32) |    no    |             |
| `orderBy`   | string         |    no    |             |
| `ascending` | boolean        |    no    |             |

Body format:

```json
{
  "from": 0,
  "size": 0,
  "orderBy": "string",
  "ascending": true
}
```

**Responses**

| Status | Content-Type     | Schema | Description                  |
| -----: | ---------------- | ------ | ---------------------------- |
|    200 | application/json | object | Successfully deleted maps    |
|    500 | —                | —      | Server failed to delete maps |
|    400 | —                | —      | Invalid request parameters   |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/maps/delete-by-version' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "from": 0,
  "size": 0,
  "orderBy": "string",
  "ascending": true
}'
```

### downloadMaps

`POST /api/maps/download`

Downloads multiple maps at once as a ZIP archive.

**Request Body**

Content-Type: `application/json`

| Field    | Type          | Required | Description              |
| -------- | ------------- | :------: | ------------------------ |
| `mapIds` | array[string] |   yes    | List of map IDs to download |

Body format:

```json
["mapId1", "mapId2"]
```

**Responses**

| Status | Content-Type     | Schema | Description                        |
| -----: | ---------------- | ------ | ---------------------------------- |
|    200 | application/zip  | binary | ZIP archive containing map files   |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/maps/download' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '["mapId1", "mapId2"]'
```

---

### Download map

`GET /api/maps/download/{mapId}`

Downloads map file from provided map id

**Parameters**

| Name    | In   | Required | Type   | Description                       |
| ------- | ---- | :------: | ------ | --------------------------------- |
| `mapId` | path |   yes    | object | The map Id of the map to download |

**Responses**

| Status | Content-Type     | Schema | Description                    |
| -----: | ---------------- | ------ | ------------------------------ |
|    500 | —                | —      | Server failed to download maps |
|    200 | application/json | object | Successfully downloaded maps   |
|    400 | —                | —      | Invalid request parameters     |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/maps/download/<mapId>' \
  -H 'Authorization: Bearer <token>' \
```

### Assert map name availability

`GET /api/maps/name-availability`

Checks that provided map name is available

**Parameters**

| Name      | In    | Required | Type   | Description                        |
| --------- | ----- | :------: | ------ | ---------------------------------- |
| `mapName` | query |   yes    | string | The map name to check availability |

**Responses**

| Status | Content-Type     | Schema  | Description                                |
| -----: | ---------------- | ------- | ------------------------------------------ |
|    200 | application/json | boolean | Successfully checked map name availability |
|    500 | —                | —       | Server failed to check map name            |
|    400 | —                | —       | Invalid request parameters                 |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/maps/name-availability' \
  -H 'Authorization: Bearer <token>' \
```

### Get maps by Ids

`GET /api/maps/search-by-ids`

Retrieves maps that match the list of specified map Ids

**Parameters**

| Name             | In    | Required | Type          | Description                     |
| ---------------- | ----- | :------: | ------------- | ------------------------------- |
| `mapIds`         | query |   yes    | array[object] | Map ids of the maps to retrieve |
| `paginateParams` | query |   yes    | object        | Pagination parameters           |

**Responses**

| Status | Content-Type     | Schema | Description                    |
| -----: | ---------------- | ------ | ------------------------------ |
|    400 | —                | —      | Invalid request parameters     |
|    200 | application/json | string | Successfully retrieved maps    |
|    500 | —                | —      | Server failed to retrieve maps |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/maps/search-by-ids' \
  -H 'Authorization: Bearer <token>' \
```

### Get maps by pattern

`GET /api/maps/search-by-pattern`

Retrieves maps that match the specified name pattern. If no name pattern is provided, all maps will be selected

**Parameters**

| Name             | In    | Required | Type   | Description                 |
| ---------------- | ----- | :------: | ------ | --------------------------- |
| `namePattern`    | query |    no    | string | Pattern to filter map names |
| `paginateParams` | query |   yes    | object | Pagination parameters       |

**Responses**

| Status | Content-Type     | Schema | Description                    |
| -----: | ---------------- | ------ | ------------------------------ |
|    200 | application/json | string | Successfully retrieved maps    |
|    400 | —                | —      | Invalid request parameters     |
|    500 | —                | —      | Server failed to retrieve maps |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/maps/search-by-pattern' \
  -H 'Authorization: Bearer <token>' \
```

### Get maps by version Id

`GET /api/maps/search-by-version`

Retrieves maps summary that match the list of specified map Ids

**Parameters**

| Name                | In    | Required | Type   | Description                               |
| ------------------- | ----- | :------: | ------ | ----------------------------------------- |
| `mapVersionSerieId` | query |   yes    | object | The mapVersionSerieId attached to the map |
| `paginateParams`    | query |   yes    | object | Pagination parameters                     |

**Responses**

| Status | Content-Type     | Schema | Description                          |
| -----: | ---------------- | ------ | ------------------------------------ |
|    400 | —                | —      | Invalid request parameters           |
|    200 | application/json | string | Successfully retrieved maps          |
|    404 | —                | —      | Provided mapVersionSerieId not found |
|    500 | —                | —      | Server failed to retrieve maps       |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/maps/search-by-version' \
  -H 'Authorization: Bearer <token>' \
```

### Get maps summaries by Id

`GET /api/maps/summary/search-by-ids`

Retrieves maps summaries that match the list of specified map Ids

**Parameters**

| Name             | In    | Required | Type          | Description                     |
| ---------------- | ----- | :------: | ------------- | ------------------------------- |
| `mapIds`         | query |   yes    | array[object] | Map ids of the maps to retrieve |
| `paginateParams` | query |   yes    | object        | Pagination parameters           |

**Responses**

| Status | Content-Type     | Schema | Description                    |
| -----: | ---------------- | ------ | ------------------------------ |
|    200 | application/json | object | Successfully retrieved maps    |
|    400 | —                | —      | Invalid request parameters     |
|    500 | —                | —      | Server failed to retrieve maps |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/maps/summary/search-by-ids' \
  -H 'Authorization: Bearer <token>' \
```

### Get maps summaries by pattern

`GET /api/maps/summary/search-by-pattern`

Retrieves maps summaries that match the specified name pattern. If no name pattern is provided, all maps will be selected

**Parameters**

| Name             | In    | Required | Type   | Description                 |
| ---------------- | ----- | :------: | ------ | --------------------------- |
| `namePattern`    | query |    no    | string | Pattern to filter map names |
| `paginateParams` | query |   yes    | object | Pagination parameters       |

**Responses**

| Status | Content-Type     | Schema | Description                    |
| -----: | ---------------- | ------ | ------------------------------ |
|    200 | application/json | object | Successfully retrieved maps    |
|    400 | —                | —      | Invalid request parameters     |
|    500 | —                | —      | Server failed to retrieve maps |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/maps/summary/search-by-pattern' \
  -H 'Authorization: Bearer <token>' \
```

### Upload a map

`POST /api/maps/upload/{mapName}`

Created a new map from file and associates it with the given map name

**Parameters**

| Name      | In   | Required | Type   | Description                |
| --------- | ---- | :------: | ------ | -------------------------- |
| `mapName` | path |   yes    | string | The map name to associates |

**Request Body**

Content-Type: `multipart/form-data`

| Field  | Type           | Required | Description             |
| ------ | -------------- | :------: | ----------------------- |
| `file` | string(binary) |   yes    | The file to be uploaded |

Body format:

```json
{
  "file": "string"
}
```

**Responses**

| Status | Content-Type     | Schema | Description                  |
| -----: | ---------------- | ------ | ---------------------------- |
|    409 | —                | —      | Map name already taken       |
|    400 | —                | —      | Invalid request parameters   |
|    200 | application/json | string | Successfully uploaded map    |
|    500 | —                | —      | Server failed to upload maps |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/maps/upload/<mapName>' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: multipart/form-data' \
  -d '{
  "file": "string"
}'
```

### Delete a map from its Id

`DELETE /api/maps/{mapId}`

Deletes one map from provided map Id

**Parameters**

| Name    | In   | Required | Type   | Description                          |
| ------- | ---- | :------: | ------ | ------------------------------------ |
| `mapId` | path |   yes    | object | Map Id attached to the map to delete |

**Responses**

| Status | Content-Type | Schema | Description                  |
| -----: | ------------ | ------ | ---------------------------- |
|    500 | —            | —      | Server failed to delete maps |
|    400 | —            | —      | Invalid request parameters   |
|    404 | —            | —      | Map not found                |
|    200 | —            | —      | Successfully deleted maps    |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/maps/<mapId>' \
  -H 'Authorization: Bearer <token>' \
```

### Get a map from its id

`GET /api/maps/{mapId}`

Retrieves one map from its map Id

**Parameters**

| Name    | In   | Required | Type   | Description                    |
| ------- | ---- | :------: | ------ | ------------------------------ |
| `mapId` | path |   yes    | object | The map Id attached to the map |

**Responses**

| Status | Content-Type     | Schema | Description                       |
| -----: | ---------------- | ------ | --------------------------------- |
|    404 | —                | —      | Map not found from provided mapId |
|    400 | —                | —      | Invalid request parameters        |
|    500 | —                | —      | Server failed to retrieve map     |
|    200 | application/json | string | Successfully retrieved map        |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/maps/<mapId>' \
  -H 'Authorization: Bearer <token>' \
```

---

## Punnet API

Endpoint to retrieve punnets

### Get index mapping campaign

`GET /api/punnets/mapping`

Retrieves all field mappings (structure of documents) for the OpenSearch index related to the specified campaign

**Parameters**

| Name       | In    | Required | Type   | Description   |
| ---------- | ----- | :------: | ------ | ------------- |
| `campaign` | query |   yes    | object | Campaign name |

**Responses**

| Status | Content-Type     | Schema | Description                           |
| -----: | ---------------- | ------ | ------------------------------------- |
|    500 | —                | —      | Server failed to retrieve mapping     |
|    200 | application/json | object | Successfully retrieved fields mapping |
|    400 | —                | —      | Invalid request parameters            |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/punnets/mapping' \
  -H 'Authorization: Bearer <token>' \
```

### Get all punnet contexts

`GET /api/punnets/punnet-contexts`

Retrieves all punnet contexts from a campaign and a stepId. You can filter results by punnet metadata

**Parameters**

| Name             | In    | Required | Type   | Description                           |
| ---------------- | ----- | :------: | ------ | ------------------------------------- |
| `campaign`       | query |   yes    | object | Campaign name                         |
| `stepId`         | query |   yes    | object | The step Id that processed the punnet |
| `paginateParams` | query |   yes    | object | Pagination parameters                 |

**Responses**

| Status | Content-Type     | Schema | Description                               |
| -----: | ---------------- | ------ | ----------------------------------------- |
|    500 | —                | —      | Server failed to retrieve punnet contexts |
|    200 | application/json | object | Successfully retrieve punnet contexts     |
|    400 | —                | —      | Invalid request parameters                |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/punnets/punnet-contexts' \
  -H 'Authorization: Bearer <token>' \
```

### Get values of a metadata

`GET /api/punnets/values`

Retrieves all values of a given metadata

**Parameters**

| Name       | In    | Required | Type   | Description                           |
| ---------- | ----- | :------: | ------ | ------------------------------------- |
| `campaign` | query |   yes    | object | Campaign name                         |
| `mapId`    | query |   yes    | object | Map Id reference                      |
| `stepId`   | query |   yes    | object | The step Id that processed the punnet |
| `field`    | query |   yes    | string | The metadata key to retrieve values   |

**Responses**

| Status | Content-Type     | Schema | Description                      |
| -----: | ---------------- | ------ | -------------------------------- |
|    500 | —                | —      | Server failed to retrieve values |
|    400 | —                | —      | Invalid request parameters       |
|    200 | application/json | object | Successfully retrieved values    |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/punnets/values' \
  -H 'Authorization: Bearer <token>' \
```

### Get punnet context from its id

`GET /api/punnets/{punnetContextId}`

Retrieves PunnetContext information from its PunnetContextId

**Parameters**

| Name              | In   | Required | Type   | Description               |
| ----------------- | ---- | :------: | ------ | ------------------------- |
| `punnetContextId` | path |   yes    | object | PunnetContextId reference |

**Responses**

| Status | Content-Type    | Schema | Description                              |
| -----: | --------------- | ------ | ---------------------------------------- |
|    404 | —               | —      | PunnetContextId did not exist            |
|    200 | application/xml | object | Successfully retrieve punnet             |
|    400 | —               | —      | Invalid request parameters               |
|    500 | —               | —      | Server failed to transform punnet as xml |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/punnets/<punnetContextId>' \
  -H 'Authorization: Bearer <token>' \
```

### Get punnet exception

`GET /api/punnets/{punnetContextId}/exception`

Retrieves exception of any punnet from its PunnetContextId

**Parameters**

| Name              | In   | Required | Type   | Description               |
| ----------------- | ---- | :------: | ------ | ------------------------- |
| `punnetContextId` | path |   yes    | object | PunnetContextId reference |

**Responses**

| Status | Content-Type     | Schema | Description                         |
| -----: | ---------------- | ------ | ----------------------------------- |
|    404 | —                | —      | PunnetContextId not found           |
|    200 | application/json | object | Successfully retrieved exception    |
|    400 | —                | —      | Invalid request parameters          |
|    500 | —                | —      | Server failed to retrieve exception |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/punnets/<punnetContextId>/exception' \
  -H 'Authorization: Bearer <token>' \
```

### Get next punnets

`GET /api/punnets/{punnetContextId}/history/next`

Retrieves next PunnetContext information from a PunnetContextId. Finding several punnets comes from a duplication of punnets in the map. Can be empty if punnet context does not have any next punnet context

**Parameters**

| Name              | In   | Required | Type   | Description               |
| ----------------- | ---- | :------: | ------ | ------------------------- |
| `punnetContextId` | path |   yes    | object | PunnetContextId reference |

**Responses**

| Status | Content-Type     | Schema | Description                               |
| -----: | ---------------- | ------ | ----------------------------------------- |
|    500 | —                | —      | Server failed to retrieve punnet contexts |
|    200 | application/json | object | Successfully retrieved punnet contexts    |
|    400 | —                | —      | Invalid request parameters                |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/punnets/<punnetContextId>/history/next' \
  -H 'Authorization: Bearer <token>' \
```

### Get previous punnet

`GET /api/punnets/{punnetContextId}/history/previous`

Retrieves previous PunnetContext information from a PunnetContextId. Unlike the next route, it is only possible to find a single punnet context. Can be null if punnet context does not have any previous punnet context

**Parameters**

| Name              | In   | Required | Type   | Description               |
| ----------------- | ---- | :------: | ------ | ------------------------- |
| `punnetContextId` | path |   yes    | object | PunnetContextId reference |

**Responses**

| Status | Content-Type     | Schema | Description                                  |
| -----: | ---------------- | ------ | -------------------------------------------- |
|    200 | application/json | object | Successfully retrieved the punnet context    |
|    400 | —                | —      | Invalid request parameters                   |
|    500 | —                | —      | Server failed to retrieve the punnet context |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/punnets/<punnetContextId>/history/previous' \
  -H 'Authorization: Bearer <token>' \
```

### Get punnet logs

`GET /api/punnets/{punnetContextId}/logs`

Retrieves logs of any punnet from its PunnetContextId

**Parameters**

| Name              | In   | Required | Type   | Description               |
| ----------------- | ---- | :------: | ------ | ------------------------- |
| `punnetContextId` | path |   yes    | object | PunnetContextId reference |

**Responses**

| Status | Content-Type     | Schema | Description                    |
| -----: | ---------------- | ------ | ------------------------------ |
|    500 | —                | —      | Server failed to retrieve logs |
|    400 | —                | —      | Invalid request parameters     |
|    200 | application/json | object | Successfully retrieved logs    |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/punnets/<punnetContextId>/logs' \
  -H 'Authorization: Bearer <token>' \
```

### Get punnet as xml

`GET /api/punnets/{punnetContextId}/xml`

Retrieves a punnet from its PunnetContextId and prints it as an XML file

**Parameters**

| Name              | In   | Required | Type   | Description               |
| ----------------- | ---- | :------: | ------ | ------------------------- |
| `punnetContextId` | path |   yes    | object | PunnetContextId reference |

**Responses**

| Status | Content-Type    | Schema | Description                              |
| -----: | --------------- | ------ | ---------------------------------------- |
|    404 | —               | —      | PunnetContextId not found                |
|    400 | —               | —      | Invalid request parameters               |
|    200 | application/xml | object | Successfully retrieve punnet             |
|    500 | —               | —      | Server failed to transform punnet as xml |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/punnets/<punnetContextId>/xml' \
  -H 'Authorization: Bearer <token>' \
```

---

## Queue API

Endpoint for managing queues

### getQueues

`GET /api/queues`

**Parameters**

| Name             | In    | Required | Type   | Description |
| ---------------- | ----- | :------: | ------ | ----------- |
| `paginateParams` | query |   yes    | object |             |

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/queues' \
  -H 'Authorization: Bearer <token>' \
```

### createQueue

`POST /api/queues`

**Request Body**

Content-Type: `application/json`

| Field                   | Type           | Required | Description |
| ----------------------- | -------------- | :------: | ----------- |
| `queueId`               | object         |    no    |             |
| `numberOfSourceThreads` | integer(int32) |    no    |             |
| `numberOfTaskThreads`   | integer(int32) |    no    |             |

Body format:

```json
{
  "queueId": {},
  "numberOfSourceThreads": 0,
  "numberOfTaskThreads": 0
}
```

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/queues' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "queueId": {},
  "numberOfSourceThreads": 0,
  "numberOfTaskThreads": 0
}'
```

### updateQueue

`PUT /api/queues`

**Request Body**

Content-Type: `application/json`

| Field                   | Type           | Required | Description |
| ----------------------- | -------------- | :------: | ----------- |
| `queueId`               | object         |    no    |             |
| `numberOfSourceThreads` | integer(int32) |    no    |             |
| `numberOfTaskThreads`   | integer(int32) |    no    |             |

Body format:

```json
{
  "queueId": {},
  "numberOfSourceThreads": 0,
  "numberOfTaskThreads": 0
}
```

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X PUT 'http://localhost:1789/api/queues' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "queueId": {},
  "numberOfSourceThreads": 0,
  "numberOfTaskThreads": 0
}'
```

### deleteQueues_byIds

`DELETE /api/queues/delete-by-ids`

**Parameters**

| Name       | In    | Required | Type          | Description |
| ---------- | ----- | :------: | ------------- | ----------- |
| `queueIds` | query |   yes    | array[object] |             |

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/queues/delete-by-ids' \
  -H 'Authorization: Bearer <token>' \
```

### deleteQueues_byPattern

`DELETE /api/queues/delete-by-pattern`

**Parameters**

| Name          | In    | Required | Type   | Description |
| ------------- | ----- | :------: | ------ | ----------- |
| `namePattern` | query |    no    | string |             |

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/queues/delete-by-pattern' \
  -H 'Authorization: Bearer <token>' \
```

### deleteQueue

`DELETE /api/queues/{queueId}`

**Parameters**

| Name      | In   | Required | Type   | Description |
| --------- | ---- | :------: | ------ | ----------- |
| `queueId` | path |   yes    | object |             |

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | —            | —      | OK          |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/queues/<queueId>' \
  -H 'Authorization: Bearer <token>' \
```

### getQueue

`GET /api/queues/{queueId}`

**Parameters**

| Name      | In   | Required | Type   | Description |
| --------- | ---- | :------: | ------ | ----------- |
| `queueId` | path |   yes    | object |             |

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/queues/<queueId>' \
  -H 'Authorization: Bearer <token>' \
```

---

## Shared Objects API

Endpoint for managing shared objects

### Delete shared objects by names

`DELETE /api/shared-objects/delete-by-names`

Deletes shared objects that match the list of specified shared objects names. Returns a multi-status response indicating the success or failure of deleting each shared objects

**Parameters**

| Name                | In    | Required | Type          | Description                   |
| ------------------- | ----- | :------: | ------------- | ----------------------------- |
| `sharedObjectNames` | query |   yes    | array[string] | Shared object names to delete |

**Request Body**

Content-Type: `application/json`

| Field       | Type           | Required | Description |
| ----------- | -------------- | :------: | ----------- |
| `from`      | integer(int32) |    no    |             |
| `size`      | integer(int32) |    no    |             |
| `orderBy`   | string         |    no    |             |
| `ascending` | boolean        |    no    |             |

Body format:

```json
{
  "from": 0,
  "size": 0,
  "orderBy": "string",
  "ascending": true
}
```

**Responses**

| Status | Content-Type     | Schema | Description                            |
| -----: | ---------------- | ------ | -------------------------------------- |
|    400 | —                | —      | Invalid request parameters             |
|    207 | application/json | object | Server failed to delete shared objects |
|    200 | application/json | object | Successfully deleted shared objects    |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/shared-objects/delete-by-names' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "from": 0,
  "size": 0,
  "orderBy": "string",
  "ascending": true
}'
```

### Delete shared objects by pattern

`DELETE /api/shared-objects/delete-by-pattern`

Deletes shared objects that match the specified name pattern. If no name pattern is provided, all shared objects will be selected. Returns a multi-status response indicating the success or failure of deleting each shared object

**Parameters**

| Name          | In    | Required | Type   | Description                      |
| ------------- | ----- | :------: | ------ | -------------------------------- |
| `namePattern` | query |    no    | string | Pattern to filter shared objects |

**Request Body**

Content-Type: `application/json`

| Field       | Type           | Required | Description |
| ----------- | -------------- | :------: | ----------- |
| `from`      | integer(int32) |    no    |             |
| `size`      | integer(int32) |    no    |             |
| `orderBy`   | string         |    no    |             |
| `ascending` | boolean        |    no    |             |

Body format:

```json
{
  "from": 0,
  "size": 0,
  "orderBy": "string",
  "ascending": true
}
```

**Responses**

| Status | Content-Type     | Schema | Description                            |
| -----: | ---------------- | ------ | -------------------------------------- |
|    207 | application/json | object | Server failed to delete shared objects |
|    200 | application/json | object | Successfully deleted shared objects    |
|    400 | —                | —      | Invalid request parameters             |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/shared-objects/delete-by-pattern' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "from": 0,
  "size": 0,
  "orderBy": "string",
  "ascending": true
}'
```

### Get shared objects by names

`GET /api/shared-objects/search-by-names`

Retrieves shared objects that match the list of specified shared object names

**Parameters**

| Name                | In    | Required | Type          | Description                                                 |
| ------------------- | ----- | :------: | ------------- | ----------------------------------------------------------- |
| `sharedObjectNames` | query |   yes    | array[string] | Shared object names to retrieve                             |
| `mapId`             | query |    no    | object        | Identifier of the map from which to retrieve shared objects |
| `paginateParams`    | query |   yes    | object        | Pagination parameters                                       |

**Responses**

| Status | Content-Type     | Schema | Description                             |
| -----: | ---------------- | ------ | --------------------------------------- |
|    500 | —                | —      | Server failed to retrieve shared object |
|    400 | —                | —      | Invalid request parameters              |
|    200 | application/json | object | Successfully retrieved shared object    |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/shared-objects/search-by-names' \
  -H 'Authorization: Bearer <token>' \
```

### Get shared objects by pattern

`GET /api/shared-objects/search-by-pattern`

Retrieves shared objects that match the specified name pattern. If no name pattern is provided, all shared objects will be selected

**Parameters**

| Name             | In    | Required | Type   | Description                                                 |
| ---------------- | ----- | :------: | ------ | ----------------------------------------------------------- |
| `namePattern`    | query |    no    | string | Pattern to filter shared objects                            |
| `mapId`          | query |    no    | object | Identifier of the map from which to retrieve shared objects |
| `paginateParams` | query |   yes    | object | Pagination parameters                                       |

**Responses**

| Status | Content-Type     | Schema | Description                           |
| -----: | ---------------- | ------ | ------------------------------------- |
|    400 | —                | —      | Invalid request parameters            |
|    500 | —                | —      | Server failed to update shared object |
|    200 | application/json | object | Successfully retrieved shared object  |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/shared-objects/search-by-pattern' \
  -H 'Authorization: Bearer <token>' \
```

### Delete a shared object

`DELETE /api/shared-objects/{sharedObjectName}`

Deletes a shared object from its name

**Parameters**

| Name               | In   | Required | Type   | Description        |
| ------------------ | ---- | :------: | ------ | ------------------ |
| `sharedObjectName` | path |   yes    | string | Shared object name |

**Responses**

| Status | Content-Type | Schema | Description                               |
| -----: | ------------ | ------ | ----------------------------------------- |
|    400 | —            | —      | Invalid request parameters                |
|    500 | —            | —      | Server failed to delete the shared object |
|    200 | —            | —      | Successfully deleted the shared object    |
|    404 | —            | —      | Shared object not found                   |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/shared-objects/<sharedObjectName>' \
  -H 'Authorization: Bearer <token>' \
```

### Get specific shared object

`GET /api/shared-objects/{sharedObjectName}`

Retrieve one shared object configuration from its name

**Parameters**

| Name               | In   | Required | Type   | Description        |
| ------------------ | ---- | :------: | ------ | ------------------ |
| `sharedObjectName` | path |   yes    | string | Shared object name |

**Responses**

| Status | Content-Type     | Schema | Description                             |
| -----: | ---------------- | ------ | --------------------------------------- |
|    200 | application/json | object | Successfully retrieved shared object    |
|    500 | —                | —      | Server failed to retrieve shared object |
|    400 | —                | —      | Invalid request parameters              |
|    404 | —                | —      | Shared object not found                 |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/shared-objects/<sharedObjectName>' \
  -H 'Authorization: Bearer <token>' \
```

### Create a shared object

`POST /api/shared-objects/{sharedObjectName}`

Creates a shared object from its object configuration and a provided name

**Parameters**

| Name               | In   | Required | Type   | Description        |
| ------------------ | ---- | :------: | ------ | ------------------ |
| `sharedObjectName` | path |   yes    | string | Shared object name |

**Request Body**

Content-Type: `application/json`

| Field                    | Type          | Required | Description |
| ------------------------ | ------------- | :------: | ----------- |
| `fields`                 | object        |    no    |             |
| `className`              | string        |    no    |             |
| `scope`                  | string        |    no    |             |
| `fullyConfigured`        | boolean       |    no    |             |
| `singleton`              | boolean       |    no    |             |
| `objectName`             | string        |    no    |             |
| `objectConfigurationId`  | string        |    no    |             |
| `constructorArguments`   | array[object] |    no    |             |
| `fieldConfigurationType` | string        |    no    |             |

Body format:

```json
{
  "fields": {},
  "className": "string",
  "scope": "MAP",
  "fullyConfigured": true,
  "singleton": true,
  "objectName": "string",
  "objectConfigurationId": "string",
  "constructorArguments": [
    {
      "fieldConfigurationType": "Primitive"
    }
  ],
  "fieldConfigurationType": "Primitive"
}
```

**Responses**

| Status | Content-Type     | Schema | Description                           |
| -----: | ---------------- | ------ | ------------------------------------- |
|    500 | —                | —      | Server failed to create shared object |
|    400 | —                | —      | Invalid request parameters            |
|    201 | application/json | object | Successfully created shared object    |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/shared-objects/<sharedObjectName>' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "fields": {},
  "className": "string",
  "scope": "MAP",
  "fullyConfigured": true,
  "singleton": true,
  "objectName": "string",
  "objectConfigurationId": "string",
  "constructorArguments": [
    {
      "fieldConfigurationType": "Primitive"
    }
  ],
  "fieldConfigurationType": "Primitive"
}'
```

### Update a shared object

`PUT /api/shared-objects/{sharedObjectName}`

Updates the configuration or the name of a shared object

**Parameters**

| Name               | In   | Required | Type   | Description        |
| ------------------ | ---- | :------: | ------ | ------------------ |
| `sharedObjectName` | path |   yes    | string | Shared object name |

**Request Body**

Content-Type: `application/json`

| Field                    | Type          | Required | Description |
| ------------------------ | ------------- | :------: | ----------- |
| `fields`                 | object        |    no    |             |
| `className`              | string        |    no    |             |
| `scope`                  | string        |    no    |             |
| `fullyConfigured`        | boolean       |    no    |             |
| `singleton`              | boolean       |    no    |             |
| `objectName`             | string        |    no    |             |
| `objectConfigurationId`  | string        |    no    |             |
| `constructorArguments`   | array[object] |    no    |             |
| `fieldConfigurationType` | string        |    no    |             |

Body format:

```json
{
  "fields": {},
  "className": "string",
  "scope": "MAP",
  "fullyConfigured": true,
  "singleton": true,
  "objectName": "string",
  "objectConfigurationId": "string",
  "constructorArguments": [
    {
      "fieldConfigurationType": "Primitive"
    }
  ],
  "fieldConfigurationType": "Primitive"
}
```

**Responses**

| Status | Content-Type     | Schema | Description                           |
| -----: | ---------------- | ------ | ------------------------------------- |
|    200 | application/json | object | Successfully updated shared object    |
|    400 | —                | —      | Invalid request parameters            |
|    500 | —                | —      | Server failed to update shared object |

**cURL example**

```bash
curl -X PUT 'http://localhost:1789/api/shared-objects/<sharedObjectName>' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "fields": {},
  "className": "string",
  "scope": "MAP",
  "fullyConfigured": true,
  "singleton": true,
  "objectName": "string",
  "objectConfigurationId": "string",
  "constructorArguments": [
    {
      "fieldConfigurationType": "Primitive"
    }
  ],
  "fieldConfigurationType": "Primitive"
}'
```

---

## User API

Endpoint for managing users

### Delete all users

`DELETE /api/users`

Deletes all users

**Parameters**

| Name            | In     | Required | Type   | Description |
| --------------- | ------ | :------: | ------ | ----------- |
| `Authorization` | header |   yes    | string |             |

**Request Body**

Content-Type: `application/json`

**Responses**

| Status | Content-Type | Schema | Description               |
| -----: | ------------ | ------ | ------------------------- |
|    200 | —            | —      | Successfully created user |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/users' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '[
  "string"
]'
```

### Get number of users per role

`GET /api/users/count-by-role`

Retrieves the number of users for each role

**Responses**

| Status | Content-Type | Schema | Description                        |
| -----: | ------------ | ------ | ---------------------------------- |
|    200 | —            | —      | Successfully found number of users |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/users/count-by-role' \
  -H 'Authorization: Bearer <token>' \
```

### Check if user exists

`GET /api/users/does-user-exist/{userEmail}`

Checks if a user with the given email exists

**Parameters**

| Name        | In   | Required | Type   | Description |
| ----------- | ---- | :------: | ------ | ----------- |
| `userEmail` | path |   yes    | string |             |

**Responses**

| Status | Content-Type | Schema  | Description |
| -----: | ------------ | ------- | ----------- |
|    200 | _/_          | boolean | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/users/does-user-exist/<userEmail>' \
  -H 'Authorization: Bearer <token>' \
```

### Update current user

`PATCH /api/users/me`

Updates information of the currently authenticated user

**Request Body**

Content-Type: `application/json`

| Field       | Type   | Required | Description |
| ----------- | ------ | :------: | ----------- |
| `firstname` | string |    no    |             |
| `lastname`  | string |    no    |             |
| `role`      | string |    no    |             |

Body format:

```json
{
  "firstname": "string",
  "lastname": "string",
  "role": "USER"
}
```

**Responses**

| Status | Content-Type | Schema | Description               |
| -----: | ------------ | ------ | ------------------------- |
|    200 | —            | —      | Successfully updated user |

**cURL example**

```bash
curl -X PATCH 'http://localhost:1789/api/users/me' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "firstname": "string",
  "lastname": "string",
  "role": "USER"
}'
```

### Create a user or an admin

`POST /api/users/register`

Creates a user from its password, firstname, lastname and email. You cannot create super admin with this endpoint

**Request Body**

Content-Type: `application/json`

| Field       | Type   | Required | Description |
| ----------- | ------ | :------: | ----------- |
| `password`  | string |    no    |             |
| `firstname` | string |    no    |             |
| `lastname`  | string |    no    |             |
| `email`     | string |    no    |             |
| `role`      | string |    no    |             |

Body format:

```json
{
  "password": "string",
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "role": "USER"
}
```

**Responses**

| Status | Content-Type | Schema | Description                                                       |
| -----: | ------------ | ------ | ----------------------------------------------------------------- |
|    200 | —            | —      | Successfully created user                                         |
|    403 | —            | —      | User creation is restricted to a single user in the configuration |
|    500 | —            | —      | Server failed to create user                                      |
|    409 | —            | —      | An account with this email already exists                         |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/users/register' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "password": "string",
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "role": "USER"
}'
```

### Create a super admin

`POST /api/users/register-super-admin`

Creates a user from its password, firstname, lastname and email

**Request Body**

Content-Type: `application/json`

| Field       | Type   | Required | Description |
| ----------- | ------ | :------: | ----------- |
| `password`  | string |    no    |             |
| `firstname` | string |    no    |             |
| `lastname`  | string |    no    |             |
| `email`     | string |    no    |             |
| `role`      | string |    no    |             |

Body format:

```json
{
  "password": "string",
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "role": "USER"
}
```

**Responses**

| Status | Content-Type | Schema | Description                                                       |
| -----: | ------------ | ------ | ----------------------------------------------------------------- |
|    200 | —            | —      | Successfully created user                                         |
|    403 | —            | —      | User creation is restricted to a single user in the configuration |
|    500 | —            | —      | Server failed to create user                                      |
|    409 | —            | —      | An account with this email already exists                         |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/users/register-super-admin' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "password": "string",
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "role": "USER"
}'
```

### Register a worker

`POST /api/users/register-worker`

Creates a worker as member to allow broker communication

**Parameters**

| Name               | In     | Required | Type   | Description |
| ------------------ | ------ | :------: | ------ | ----------- |
| `X-Register-Token` | header |   yes    | string |             |

**Request Body**

Content-Type: `application/json`

| Field       | Type   | Required | Description |
| ----------- | ------ | :------: | ----------- |
| `password`  | string |    no    |             |
| `firstname` | string |    no    |             |
| `lastname`  | string |    no    |             |
| `email`     | string |    no    |             |
| `role`      | string |    no    |             |

Body format:

```json
{
  "password": "string",
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "role": "USER"
}
```

**Responses**

| Status | Content-Type | Schema | Description                                                       |
| -----: | ------------ | ------ | ----------------------------------------------------------------- |
|    200 | —            | —      | Successfully created user                                         |
|    403 | —            | —      | User creation is restricted to a single user in the configuration |
|    500 | —            | —      | Server failed to create user                                      |
|    409 | —            | —      | An account with this email already exists                         |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/users/register-worker' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "password": "string",
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "role": "USER"
}'
```

### getUsersByPattern

`GET /api/users/search-by-pattern`

**Parameters**

| Name             | In    | Required | Type   | Description |
| ---------------- | ----- | :------: | ------ | ----------- |
| `namePattern`    | query |    no    | string |             |
| `paginateParams` | query |   yes    | object |             |

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | _/_          | object | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/users/search-by-pattern' \
  -H 'Authorization: Bearer <token>' \
```

### Check admin existence

`GET /api/users/super-admin-exists`

Checks if super admin is registered

**Responses**

| Status | Content-Type | Schema | Description              |
| -----: | ------------ | ------ | ------------------------ |
|    200 | —            | —      | Successfully found admin |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/users/super-admin-exists' \
  -H 'Authorization: Bearer <token>' \
```

### Delete a user

`DELETE /api/users/{userEmail}`

Deletes a user from its email

**Parameters**

| Name        | In   | Required | Type   | Description |
| ----------- | ---- | :------: | ------ | ----------- |
| `userEmail` | path |   yes    | string |             |

**Responses**

| Status | Content-Type | Schema | Description               |
| -----: | ------------ | ------ | ------------------------- |
|    200 | —            | —      | Successfully deleted user |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/users/<userEmail>' \
  -H 'Authorization: Bearer <token>' \
```

### Get a user

`GET /api/users/{userEmail}`

Retrieves user information from its email

**Parameters**

| Name        | In   | Required | Type   | Description |
| ----------- | ---- | :------: | ------ | ----------- |
| `userEmail` | path |   yes    | string |             |

**Responses**

| Status | Content-Type | Schema | Description                 |
| -----: | ------------ | ------ | --------------------------- |
|    200 | —            | —      | Successfully retrieved user |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/users/<userEmail>' \
  -H 'Authorization: Bearer <token>' \
```

### Update another user

`PATCH /api/users/{userEmail}`

Admin updates any user's information

**Parameters**

| Name        | In   | Required | Type   | Description |
| ----------- | ---- | :------: | ------ | ----------- |
| `userEmail` | path |   yes    | string |             |

**Request Body**

Content-Type: `application/json`

| Field       | Type   | Required | Description |
| ----------- | ------ | :------: | ----------- |
| `firstname` | string |    no    |             |
| `lastname`  | string |    no    |             |
| `role`      | string |    no    |             |

Body format:

```json
{
  "firstname": "string",
  "lastname": "string",
  "role": "USER"
}
```

**Responses**

| Status | Content-Type | Schema | Description               |
| -----: | ------------ | ------ | ------------------------- |
|    200 | —            | —      | Successfully updated user |

**cURL example**

```bash
curl -X PATCH 'http://localhost:1789/api/users/<userEmail>' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "firstname": "string",
  "lastname": "string",
  "role": "USER"
}'
```

---

## Worker API

API for managing workers

### deleteWorkers

`DELETE /api/workers`

**Parameters**

| Name        | In    | Required | Type          | Description |
| ----------- | ----- | :------: | ------------- | ----------- |
| `workerIds` | query |    no    | array[object] |             |

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/workers' \
  -H 'Authorization: Bearer <token>' \
```

### getWorkers

`GET /api/workers`

**Parameters**

| Name             | In    | Required | Type          | Description |
| ---------------- | ----- | :------: | ------------- | ----------- |
| `workerIds`      | query |    no    | array[object] |             |
| `paginateParams` | query |   yes    | object        |             |

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/workers' \
  -H 'Authorization: Bearer <token>' \
```

### spawnWorker

`POST /api/workers`

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | —            | —      | OK          |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/workers' \
  -H 'Authorization: Bearer <token>' \
```

### getLibraries

`GET /api/workers/libraries`

**Parameters**

| Name             | In    | Required | Type   | Description |
| ---------------- | ----- | :------: | ------ | ----------- |
| `paginateParams` | query |   yes    | object |             |

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/workers/libraries' \
  -H 'Authorization: Bearer <token>' \
```

### getLibraryVersions

`GET /api/workers/library-versions/{libraryName}`

**Parameters**

| Name          | In   | Required | Type   | Description |
| ------------- | ---- | :------: | ------ | ----------- |
| `libraryName` | path |   yes    | string |             |

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/workers/library-versions/<libraryName>' \
  -H 'Authorization: Bearer <token>' \
```

### generateWorkerToken

`POST /api/workers/generate-token`

Generates a JWT authentication token for an external worker. **Requires administrator privileges.**

**Parameters**

| Name       | In    | Required | Type   | Description                               |
| ---------- | ----- | :------: | ------ | ----------------------------------------- |
| `workerId` | query |   yes    | string | Unique identifier to assign to the worker |

**Responses**

| Status | Content-Type | Schema | Description                    |
| -----: | ------------ | ------ | ------------------------------ |
|    200 | text/plain   | string | JWT token for the worker       |
|    403 | —            | —      | Forbidden — administrator only |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/workers/generate-token?workerId=my-worker' \
  -H 'Authorization: Bearer <token>'
```

---

### restartWorkers

`POST /api/workers/restart`

**Parameters**

| Name        | In    | Required | Type          | Description |
| ----------- | ----- | :------: | ------------- | ----------- |
| `workerIds` | query |    no    | array[object] |             |

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/workers/restart' \
  -H 'Authorization: Bearer <token>' \
```

### restartWorkerById

`POST /api/workers/restart/{workerId}`

**Parameters**

| Name       | In   | Required | Type   | Description |
| ---------- | ---- | :------: | ------ | ----------- |
| `workerId` | path |   yes    | object |             |

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | —            | —      | OK          |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/workers/restart/<workerId>' \
  -H 'Authorization: Bearer <token>' \
```

### uploadLibrary

`POST /api/workers/upload-library`

**Request Body**

Content-Type: `multipart/form-data`

| Field  | Type           | Required | Description |
| ------ | -------------- | :------: | ----------- |
| `file` | string(binary) |   yes    |             |

Body format:

```json
{
  "file": "string"
}
```

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | —            | —      | OK          |

**cURL example**

```bash
curl -X POST 'http://localhost:1789/api/workers/upload-library' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: multipart/form-data' \
  -d '{
  "file": "string"
}'
```

### deleteWorkerById

`DELETE /api/workers/{workerId}`

**Parameters**

| Name       | In   | Required | Type   | Description |
| ---------- | ---- | :------: | ------ | ----------- |
| `workerId` | path |   yes    | object |             |

**Responses**

| Status | Content-Type | Schema | Description |
| -----: | ------------ | ------ | ----------- |
|    200 | —            | —      | OK          |

**cURL example**

```bash
curl -X DELETE 'http://localhost:1789/api/workers/<workerId>' \
  -H 'Authorization: Bearer <token>' \
```

### getWorkerById

`GET /api/workers/{workerId}`

**Parameters**

| Name       | In   | Required | Type   | Description |
| ---------- | ---- | :------: | ------ | ----------- |
| `workerId` | path |   yes    | object |             |

**Responses**

| Status | Content-Type     | Schema | Description |
| -----: | ---------------- | ------ | ----------- |
|    200 | application/json | object | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/workers/<workerId>' \
  -H 'Authorization: Bearer <token>' \
```

### getWorkerLogs

`GET /api/workers/{workerId}/logs`

**Parameters**

| Name       | In    | Required | Type           | Description |
| ---------- | ----- | :------: | -------------- | ----------- |
| `workerId` | path  |   yes    | object         |             |
| `results`  | query |    no    | integer(int32) |             |

**Responses**

| Status | Content-Type     | Schema        | Description |
| -----: | ---------------- | ------------- | ----------- |
|    200 | application/json | array[object] | OK          |

**cURL example**

```bash
curl -X GET 'http://localhost:1789/api/workers/<workerId>/logs' \
  -H 'Authorization: Bearer <token>' \
```