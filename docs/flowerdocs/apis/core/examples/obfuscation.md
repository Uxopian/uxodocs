---
title: "Obfuscating content"
description: "Obfuscate sensitive data within documents"
date: "2018-04-02T12:20:01+02:00"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



The `ObfuscationService` service exposes a `create` operation. All parts of the document content corresponding to the search defined in the call will be automatically obfuscated. 

# Search for areas to obfuscate

The research model used in the call for proposals is as follows: 

```json

  "accentSensitive": true,
  "caseSensitive": true,
  "regex": true,
  "text": "string"

```

The `text` is the value or pattern you are looking for. The default value is a pattern. To find the exact value and not a pattern, the value `regex` must be set to `false`. 
<br/>
The `accentSensitive` and `caseSensitive` parameters indicate that the search should be accent-sensitive and case-sensitive respectively.

# Example

The examples below show how to obfuscate a value (in the example: "Demo") and a reason (here hides IBANs in the document).

<Tabs>
  <TabItem value="case-sensitive-value" label="Case sensitive value">

```http
POST {{core}}/rest/documents/{{documentId}}/obfuscations HTTP/1.1

--URL parameters
core: FlowerDocs Core host
documentId: identifier of the document to be obfuscated

--Headers
token: {{token}}
Content-Type: application/json

--Body (json)

  "accentSensitive": true,
  "caseSensitive": false,
  "regex": false,
  "text": "Demo"

```

  </TabItem>
  <TabItem value="reason" label="Reason">

```http
POST {{core}}/rest/documents/{{documentId}}/obfuscations HTTP/1.1

-- URL parameters
core: FlowerDocs Core host
documentId: identifier of the document to be obfuscated

--Headers
token: {{token}}
Content-Type: application/json

--Body (json)

  "accentSensitive": false,
  "caseSensitive": false,
  "regex": true,
  "text": "IBAN : (.{4}-){3}.{4}"

```

  </TabItem>
</Tabs>
