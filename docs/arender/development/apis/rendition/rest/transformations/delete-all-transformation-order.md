---
title: DELETE all transformation orders
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: e62e25c5ce3952b631c2fc0ad5451b4c4d3256329e0e75470940f12ef7314f31
---

This API allows you to delete all transformation orders previously requested.
The call to this API must be authenticated. The credentials are available in the _application.yaml_ configuration file of the document-service-broker.

```yaml
run-mode:
  username: username
  password: password
```

## API technical description

Endpoint :

```bash
DELETE /transformations
```

## Examples

### Delete all transformation orders in an authenticated way

The call below generates a request to delete all transformation orders.
It is authenticated using the simple "Basic Authentication" method,
considering the username: _user_ and the password _password_.

```bash
curl -X 'DELETE' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*' \
  -H 'Authorization: Basic dXNlcjpwYXNzd29yZA=='
```
