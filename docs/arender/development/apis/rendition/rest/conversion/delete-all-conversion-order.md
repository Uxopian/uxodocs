---
title: DELETE all conversion orders
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: a0d9e4ecaca08fe665c4633f4d6d541a37552ec83e83e9b3a7eb184f4663f0d6
---

This API allows you to delete all conversion orders previously requested.
The call to this API must be authenticated. The credentials are available in the _application.yaml_ configuration file of the document-service-broker.

```yaml
run-mode:
    username: username
    password: password
```

## API technical description

Endpoint:

```bash
DELETE /conversions
```

## Examples

### Delete all conversion orders in an authenticated way

The call below generates a request to delete all conversion orders.
It is authenticated using the simple "Basic Authentication" method,
considering the username: _user_ and the password _password_.

```bash
curl -X 'DELETE' \
  'http://localhost:8761/conversions' \
  -H 'accept: */*' \
  -H 'Authorization: Basic dXNlcjpwYXNzd29yZA=='
```
