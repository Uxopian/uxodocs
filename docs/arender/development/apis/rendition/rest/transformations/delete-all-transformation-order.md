---
title: DELETE all transformation orders
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 9ad7679d46228274e62e9983c092e713d19cb9304ea39e7c9b1614b01b4769dc
---







This API allows you to delete all transformation orders previously requested.
The call to this API must be authenticated. The credentials are available in the _application.yaml_ configuration file of the document-service-broker.

```yaml

run-mode :
  username : username
  password : password
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
