---
title: "Backup & Restore"
sidebar_position: 1
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 031eba3f9b986c1ba4d5b9cfee9dedc7f6d010958c910a337bcc66e6996b29f7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Rendition server

Backing up a rendition server is just the simple copie of the
installation folder. This can be done while the server running as well
as when it's shutdown.

To save space the *tmp* folder can be overlooked. The *tmp* folder is
storing open documents when the server is running.

Restoring a rendition server is done in two steps:

- Installation restoration: Copy the backed-up folder.
- service restoration: Copying the file doesn't change the service
  created on the operating system.

To restore, execute the following scripts (it will remove the existing service and install the new one):

<Tabs>
<TabItem value="Windows" label="Windows">

```powershell
$> .\removeService.bat
$> .\installAsService.bat
```

</TabItem>
<TabItem value="Linux" label="Linux">

```bash
$> ./removeService.sh
$> ./installAsService.sh
```

</TabItem>
</Tabs>

## Presentation server

To back-up a presentation server you need:

- The deployed web application (WAR or EAR)
- Application server's configuration (if not default)
- Various elements (configuration files, librairies...) remote (if any)

Restoring a presentation server require the web application to be
deployed, configuration files and remote elements.
