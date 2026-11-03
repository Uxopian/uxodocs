---
title: Search the recovery bin
sidebar_position: 4
description: List the components held in the recovery bin
date: "2026-10-20"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The recovery bin search lists the components held in the [recovery bin](/docs/flowerdocs/concepts/recovery-bin): those deleted by a user and not yet purged. Use it rather than the generic [search](/docs/flowerdocs/apis/core/examples/search) when the recovery bin is what you want.

## Endpoint

```
POST /rest/{category}/recoverybin/search
```

`{category}` is one of:

| Category        | Components       |
| --------------- | ---------------- |
| `documents`     | Documents        |
| `folders`       | Folders          |
| `tasks`         | Tasks            |
| `virtualFolder` | Virtual folders  |

The endpoint requires one of the `ADMIN`, `SYSTEM_ADMIN` or `RECOVERYBIN_MANAGER` roles.

## Request body

The request body is a search request, exactly as for the [generic search](/docs/flowerdocs/apis/core/examples/search): select clause, filter clauses, order clauses, `start` and `max`.

The server decides what belongs in the bin, so the request carries filtering, sorting and paging only:

- The server adds a `status` `EQUALS_TO` `DELETED` criterion and combines it with the filter clauses of the request through an AND clause.
- A status criterion sent in the request is narrowed by this restriction, never widened: sending no status criterion, sending another status, or wrapping the criteria in an OR clause all return components of the bin only.
- The caller's own ACLs do not hide the components of the bin: a recovery bin manager sees every entry they are responsible for administering.

The response has the same shape as the response of the generic search.

## Examples

The examples below list the documents of class `Invoice` held in the recovery bin, most recently updated first.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

curl -X POST "<CORE_HOST>/rest/documents/recoverybin/search" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "selectClause": {
        "fields": ["name", "classid", "creationDate", "lastUpdateDate"]
    },
    "filterClauses": [
        {
            "criteria": [
                {
                    "name": "classid",
                    "operator": "EQUALS_TO",
                    "type": "STRING",
                    "values": ["Invoice"]
                }
            ]
        }
    ],
    "orderClauses": [
        {
            "name": "lastUpdateDate",
            "type": "TIMESTAMP",
            "ascending": false
        }
    ],
    "start": 0,
    "max": 20
}'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService documentService;

public void searchRecoveryBin() throws FunctionalException, TechnicalException
{
	Criterion criterion = CriterionBuilder.field(CLASSID).operator(EQUALS_TO).value("Invoice").build();
	FilterClause filter = FilterClauseBuilder.init().criterion(criterion).build();
	OrderClause order = new OrderClause("lastUpdateDate", TIMESTAMP, false);
	SearchRequest request = SearchRequestBuilder.init()
		.display(Arrays.asList("name", "classid", "creationDate", "lastUpdateDate"))
		.filter(filter)
		.order(order)
		.max(20)
		.build();

	SearchResponse response = documentService.searchRecoveryBin(request);
}
```

  </TabItem>
</Tabs>

The other categories use the same request body, only the endpoint changes:

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

# List the 50 first tasks held in the recovery bin
curl -X POST "<CORE_HOST>/rest/tasks/recoverybin/search" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "start": 0,
    "max": 50
}'
```

## Refusal

A caller holding none of the `ADMIN`, `SYSTEM_ADMIN` or `RECOVERYBIN_MANAGER` roles gets an HTTP `403` response with the error `F00328`:

```json
{
  "code": "F00328",
  "message": "F00328: Not allowed to perform this operation, one of the following roles is required: ADMIN, RECOVERYBIN_MANAGER"
}
```

`SYSTEM_ADMIN` holds every right of `ADMIN` here, which is why the message does not name it.

## Restore and purge

The recovery bin has no restore or purge endpoint of its own: both are done on the ordinary category endpoints, and both require `RECOVERYBIN_MANAGER` (or `ADMIN` or `SYSTEM_ADMIN`) once the component is in the bin.

- **Restore**: update the component with a status other than `DELETED`, for example `POST /rest/documents/{ids}`.
- **Purge**: delete the component, for example `DELETE /rest/documents/{ids}`. This cannot be undone.

See [Recovery bin](/docs/flowerdocs/concepts/recovery-bin) for the details.
