---
title: Remove document tree
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 743b8b5f8b2b2eac35d4327c8d3ddedc852c5a370764d236edabf257eda257a7
---

A new servlet is deployed to remove the document tree.
A Json file is returned and lists each page of child documents without ranking them.

Example :

```json
[
    "b64_bG9jYWxlPWZyJnJhbmRvbVVVSUQ9MTFjYmE0YzQtMzUzNy00OWI4LTg2MGEtZjdiNjU4NzU3MjJj/1/1/1/1|0|612.0",
    "b64_bG9jYWxlPWZyJnJhbmRvbVVVSUQ9MTFjYmE0YzQtMzUzNy00OWI4LTg2MGEtZjdiNjU4NzU3MjJj/1/1/1/2|0|612.0",
    "b64_bG9jYWxlPWZyJnJhbmRvbVVVSUQ9MTFjYmE0YzQtMzUzNy00OWI4LTg2MGEtZjdiNjU4NzU3MjJj/1/2|0|612.0",
    "b64_bG9jYWxlPWZyJnJhbmRvbVVVSUQ9MTFjYmE0YzQtMzUzNy00OWI4LTg2MGEtZjdiNjU4NzU3MjJj/1/3|0|841.0",
    "b64_bG9jYWxlPWZyJnJhbmRvbVVVSUQ9MTFjYmE0YzQtMzUzNy00OWI4LTg2MGEtZjdiNjU4NzU3MjJj/1/3|1|595.0"
]
```

## Request

This functionality is accessible via the servlet: **flatDocumentLayout**

Usable in GET

### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/flatDocumentLayout?uuid=docuuid'
```

## Servlet Response

A Json file is returned with the child documents of the initial document without their tree structure.
