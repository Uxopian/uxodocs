---
title: Backup &amp; Restore
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: a6e729105e8ee8a230bd565d15889e3110ef0cc65616e3cc5ba82d16aaa6d691
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
