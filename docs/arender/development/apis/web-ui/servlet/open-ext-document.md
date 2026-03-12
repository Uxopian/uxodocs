---
title: Prepare the opening of an external document
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: 7b87cc4e57e2092e8881b8f41d22494591d5a8cec7dc8d91765d23aff3eb771e
---

A new servlet is deployed to generate an encrypted UUID.
This UUID represents the URL parameters interpreted by the connector.
Depending on this configuration the UUID will be base64 or encrypted.

```properties
# document id bean names, values are documentIdGenerator (base64) and encryptedDocumentIdGenerator (encrypted)
arender.documentid.generator.beanName=documentIdGenerator
```

## Request

This functionality is accessible via the servlet: **openExternalDocument**

Usable in GET

### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/openExternalDocument?url=docURL'
```

## Servlet Response

From the URL sent as a parameter, an encrypted UUID will be generated.
