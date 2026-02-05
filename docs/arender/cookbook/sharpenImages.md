---
title: "Obtain sharper images"
sidebar_position: 20
last_update:
  date: '2026-02-02T12:23:28.934Z'
  author: CI/CD Bot
content_hash: 38d515059f0071dc0e4c9938c761e1f9da67364246685ead5ead4e28c5ca2347
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


By default, internet browsers smooth out the displayed pictures to make
webpages more comfortable to browse.

If you wish to find by a look alike effect of Adobe Reader, which does
not smoothen the pictures, it is now possible in ARender to deactivate
this smoothening.

The parameter to modify is the following:

*visualization.images.sharpen* and set it to *true* in ARender profiles.

<Tabs>
<TabItem value="0 md" label="0 md">
![image](/img/arender/blurry.png)
</TabItem>
<TabItem value="1 md" label="1 md">
![image](/img/arender/unblurry.png)
</TabItem>
<TabItem value="2 md" label="2 md">
![image](/img/arender/adobePixel.png)
</TabItem>
</Tabs>

We see with this small text comparison that the rendering is becoming
very look alike of Adobe Reader look and feel for text. If your user
base is used to this software, you might wanna turn this paramter on.
