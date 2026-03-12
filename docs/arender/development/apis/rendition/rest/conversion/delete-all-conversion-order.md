---
title: DELETE all conversion orders
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: 29fb7ba5279f113bc8e63eb57381822a2008053e657474d14141cd1729df9f8a
---

This API allows you to delete all conversion orders previously requested.
The call to this API must be authenticated. The credentials are available in the _application.yaml_ configuration file of the document-service-broker.

```yml
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
