---
title: Prepare the opening of an external document
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 38f70ebce95205943d7f6452ebf2b311d446466a9369fb6ec66707a779c1f769
---

A new servlet is deployed to generate an encrypted UUID.
This UUID represents the URL parameters interpreted by the connector.
Depending on this configuration the UUID will be base64 or encrypted.

```cfg
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
