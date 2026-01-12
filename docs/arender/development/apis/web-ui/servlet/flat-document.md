---
title: Remove document tree
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: f9c1c1f33c478963406c9262d63d338de6857a2c7e850b84007812fd0ca8776b
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
