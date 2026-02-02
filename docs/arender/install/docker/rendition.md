---
title: "Rendition stack"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 491215ae1ab0633eac748f5aae8841a41a00b17fe325625f50e536a461d3ace8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## By Environment Variables

All yaml properties can be overridden by environment variables by following the next rules:

- environment variables must be all capitaliaze
- capitalized character in yaml must be preceded by **"."**
- use **"_"** to associate an object
- use **"[n]"** to set a list element (with **n** as index)

<Tabs>
<TabItem value="Yaml properties" label="Yaml properties">

```yaml
  nurse:
    samplesDirectory: ../../samples/
    components:
      - functionality: TKC_MailConversion
        factoryName: "mailFactory"
        samplePath: "test.msg"
        docIdStr: "m41lS4mpl3"
```

</TabItem>
<TabItem value="Environment variables" label="Environment variables">

```yaml
    environment:
      - "DCV_NURSE_SAMPLES.DIRECTORY=../../samples/"
      - "DCV_NURSE_COMPONENTS[0]_FUNCTIONALITY=TKC_MailConversion"
      - "DCV_NURSE_COMPONENTS[0]_FACTORY.NAME=mailFactory"
      - "DCV_NURSE_COMPONENTS[0]_SAMPLE.PATH=test.msg"
      - "DCV_NURSE_COMPONENTS[0]_DOC.ID.STR=m41lS4mpl3"
```

</TabItem>

</Tabs>

## By volumes

Configuration files location:

- /arender/config/application.properties
- /arender/config/application-*.properties

- /arender/config/application.yaml
- /arender/config/application-*.yaml

:::note
**`{service-name}`**: container name without "arender" prefix
:::
