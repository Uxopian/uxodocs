---
title: Background job management
description: Monitor and manage background processing jobs
sidebar_position: 23
date: "2018-04-02T12:20:01+01:59"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The job management service allows monitoring and managing background processing jobs (waiting, processing, errors).

# List waiting jobs

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X GET "<CORE_HOST>/rest/jobs/waiting" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

## Count waiting jobs

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X GET "<CORE_HOST>/rest/jobs/waiting/count" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# List processing jobs

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X GET "<CORE_HOST>/rest/jobs/processing" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

## Count processing jobs

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X GET "<CORE_HOST>/rest/jobs/processing/count" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# List error jobs

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X GET "<CORE_HOST>/rest/jobs/errors" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

## Count error jobs

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X GET "<CORE_HOST>/rest/jobs/errors/count" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# Retry a job

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <ID>         job identifier
curl -X POST "<CORE_HOST>/rest/jobs/retry/<ID>" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# Clear error queue

:::warning
This operation permanently removes all jobs in the error queue. This action cannot be undone.
:::

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X DELETE "<CORE_HOST>/rest/jobs/errors" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>