---
title: Feature flags
description: Retrieve feature flags configuration
sidebar_position: 28
date: "2018-04-02T12:20:01+01:59"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The feature flags service allows retrieving the status of available features in the platform.

# Get all features

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X GET "<CORE_HOST>/rest/features" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# Get a specific feature

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <NAME>       feature name
curl -X GET "<CORE_HOST>/rest/features/<NAME>" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# Get internal features

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X GET "<CORE_HOST>/rest/features/internal" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# Get custom features

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X GET "<CORE_HOST>/rest/features/custom" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>