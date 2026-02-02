---
title: "Restart"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: fcbf089b6280006f2062a42863721db9c81f9ac5c838a49f6eac231c41a39ccb
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


In some cases, it may be necessary to restart one or both part of
ARender. Modifications on the configuration files will require a restart
for changes to apply. A restart can also be tried in case of unexpected
errors. ARender is a stateless service a restart is able to fix any
application freeze.

## Rendition server

You need to restart the ARenderService service. To do so type the
following command:

<Tabs>
<TabItem value="Windows" label="Windows">

```powershell
$> sc stop ARenderRenditionService
$> sc start ARenderRenditionService
```

</TabItem>
<TabItem value="Linux" label="Linux">

If **systemd** is the is the system initialisation component:

```bash
$> systemctl stop ARenderRenditionEngineService.service
$> systemctl start ARenderRenditionEngineService.service
```

If **initd** is the is the system initialisation component:

```bash
$> service ARenderRenditionEngineService stop
$> service ARenderRenditionEngineService start
```

</TabItem>
</Tabs>

## Presentation server

The restart of the web application is sufficient. Some application servers do not allow applications to be restarted separately, so it is necessary to fully restart the application server.
