---
title: "IBM FileNet"
last_update:
  date: '2026-02-02T12:36:16.359Z'
  author: CI/CD Bot
content_hash: fb6e43bb7620f4f8c7c74e4c789b9ac040e422f429b0d337def4bcecfc45b4c5
---

## ARender UI for IBM FileNet

ARender UI for FileNet images tag are prefixed with "-filenet" (e.g arender-ui:4.8.21-filenet) since ARender 4.3.0.

:::warning
As the application use Tomcat as web server it can only access filenet content engine by using WSI transport method.
Find more informations on [FileNet](../../connector/filenetp8.md).
:::

To run the container, execute:

```bash
$> docker run artifactory.arondor.cloud:5001/arender-ui:4.8.21-filenet \
-e ARENDERSRV_ARENDER_SERVER_FILENET_AUTHENTICATION_METHOD="LoginPasswordObjectStoreProvider"\
-e ARENDERSRV_ARENDER_SERVER_FILENET_CE_URL="http://<filenet-url>:<filent-port>/wsi/FNCEWS40MTOM/"\
-e ARENDERSRV_ARENDER_SERVER_FILENET_CE_LOGIN=<account-name>\
-e ARENDERSRV_ARENDER_SERVER_FILENET_CE_PASSWORD=<account-password>
```
