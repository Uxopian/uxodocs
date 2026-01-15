---
title: Backup &amp; Restore
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 4e324178c4c294f7dae27b0e82e2877fd627046f9e58b5f383d86eeef977523b
---

## Rendition server

Backing up a rendition server is just the simple copy of the
installation folder. This can be done while the server running as well
as when it's shutdown.

To save space the _tmp_ folder can be overlooked. The _tmp_ folder is
storing open documents when the server is running.

Restoring a rendition server is done in two steps:

- Installation restoration: Copy the backed-up folder.
- service restoration: Copying the file doesn't change the service
  created on the operating system.

To restore, execute the following scripts (it will remove the existing service and install the new one):

```powershell
$> .\removeService.bat
$> .\installAsService.bat
```

```bash
$> ./removeService.sh
$> ./installAsService.sh
```

## Presentation server

To back-up a presentation server you need:

- The deployed web application (WAR or EAR)
- Application server's configuration (if not default)
- Various elements (configuration files, libraries...) remote (if any)

Restoring a presentation server require the web application to be
deployed, configuration files and remote elements.
