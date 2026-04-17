---
title: Obfuscating content
description: Obfuscate sensitive data within documents
sidebar_position: 22
date: "2018-04-02T12:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 7b76513b3ec16783ee444f4ec3235e2ed221c584a561d6992116ac94f760fe60
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning
This feature is in beta.
:::

The `ObfuscationService` service exposes a `create` operation. All parts of the document content corresponding to the search defined in the call will be automatically obfuscated.

# Search for areas to obfuscate

The research model used in the call for proposals is as follows:

```json
{
  "accentSensitive": true,
  "caseSensitive": true,
  "regex": true,
  "text": "string"
}
```

The `text` is the value or pattern you are looking for. The default value is a pattern. To find the exact value and not a pattern, the value `regex` must be set to `false`.
<br/>
The `accentSensitive` and `caseSensitive` parameters indicate that the search should be accent-sensitive and case-sensitive respectively.

# Example

The examples below show how to obfuscate a value (in the example: "Demo") and a reason (here hides IBANs in the document).

<Tabs>
  <TabItem value="case_sensitive_value" label="Case sensitive value">

```bash
# <CORE_HOST>    FlowerDocs Core base URL
# <TOKEN>        authentication token
# <DOCUMENT_ID>  identifier of the document to be obfuscated

curl -X POST "<CORE_HOST>/rest/documents/<DOCUMENT_ID>/obfuscations" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
  "accentSensitive": true,
  "caseSensitive": false,
  "regex": false,
  "text": "Demo"
}'
```

  </TabItem>
  <TabItem value="reason" label="Reason">

```bash
# <CORE_HOST>    FlowerDocs Core base URL
# <TOKEN>        authentication token
# <DOCUMENT_ID>  identifier of the document to be obfuscated

curl -X POST "<CORE_HOST>/rest/documents/<DOCUMENT_ID>/obfuscations" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
  "accentSensitive": false,
  "caseSensitive": false,
  "regex": true,
  "text": "IBAN : (.{4}-){3}.{4}"
}'
```

  </TabItem>
</Tabs>