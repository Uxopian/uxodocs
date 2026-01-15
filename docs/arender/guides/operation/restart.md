---
title: Restart
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 8a9c6da376d41c7d184393b248cb527db0a8387073f2c1413de1783f973b9933
---

In some cases, it may be necessary to restart one or both part of
ARender. Modifications on the configuration files will require a restart

```javascript
for changes to apply. A restart can also be tried in case of unexpected
errors. ARender is a stateless service a restart is able to fix any
application freeze.
```

## Rendition server

You need to restart the ARenderService service. To do so type the
following command:

```powershell
$> sc stop ARenderRenditionService
$> sc start ARenderRenditionService
```

If **systemd** is the system initialization component:

```bash
$> systemctl stop ARenderRenditionEngineService.service
$> systemctl start ARenderRenditionEngineService.service
```

If **initd** is the system initialization component:

```bash
$> service ARenderRenditionEngineService stop
$> service ARenderRenditionEngineService start
```

## Presentation server

The restart of the web application is sufficient. Some application servers do not allow applications to be restarted separately, so it is necessary to fully restart the application server.
