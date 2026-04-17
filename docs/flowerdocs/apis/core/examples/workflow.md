---
title: Handling workflows
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
description: Create, retrieve, modify, delete your workflows
sidebar_position: 35
date: "2018-04-03T12:20:01+01:57"
content_hash: 17bd04765e6f4633553ce330e77ceaa9f292b801b3fff6daa2059bfccd147e1f
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `WorkflowService` service exhibits all available operations around `Workflows`.


# Retrieving workflows

## Retrieving all workflows

The examples below show how to retrieve all workflows present on the scope.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
curl -X GET "<CORE_HOST>/rest/workflow" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private WorkflowService wkfService;

public List<Workflow> getAllWorkflow() throws FunctionalException, TechnicalException
{
    return wkfService.getAll();
}
```

  </TabItem>
</Tabs>

## Retrieving a defined list of workflows

The examples below show how to retrieve a list of workflows from their identifiers.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
# <IDS>: list of workflow identifiers, separated by commas
curl -X GET "<CORE_HOST>/rest/workflow/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private WorkflowService wkfService;

public List<Workflow> getWorkflow() throws FunctionalException, TechnicalException
{
    List<Id> workflowIds = Lists.newArrayList(new Id("processId"));
    workflowIds.add(new Id("processId"));
    return wkfService.get(workflowIds);
}
```

  </TabItem>
</Tabs>

# Creating workflows

The examples below show how to create a workflow.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
curl -X POST "<CORE_HOST>/rest/workflow" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
    {
        "startTaskClass": "GEC_Step0_Creation",
        "taskClasses": [
            "GEC_Step1_Distribution",
            "GEC_Step2_ATraiter",
            "GEC_Step0_Creation"
        ],
        "id": "GECTest"
    }
]'
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private WorkflowService wkfService;

public void createWorkflow() throws FunctionalException, TechnicalException
{
    List<Id> taskClasses = new ArrayList<>();
    taskClasses.add(new Id("GEC_Step0_Creation"));
    taskClasses.add(new Id("GEC_Step1_Distribution"));
    taskClasses.add(new Id("GEC_Step2_ATraiter"));

    Workflow wkf = new Workflow();
    wkf.setId(new Id("GecTest"));
    wkf.setStartTaskClass(new Id("GEC_Step0_Creation"));
    wkf.setTaskClasses(taskClasses);

    List<Workflow> workflowList = new ArrayList<>();
    workflowList.add(wkf);

    wkfService.create(workflowList);
}
```

  </TabItem>
</Tabs>

# Updating workflows

The examples below show how to update a workflow.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
# <IDS>: list of workflow identifiers to update, separated by commas
curl -X POST "<CORE_HOST>/rest/workflow/<IDS>" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
    {
        "id": "GECTest",
        "startTaskClass": "GEC_Step0_Creation",
        "taskClasses": [
            "GEC_Step1_Distribution",
            "GEC_Step2_ATraiter",
            "GEC_Step3_CourrierTraite",
            "GEC_Step0_Creation"
        ]
    }
]'
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private WorkflowService wkfService;

public List<Workflow> updateWorkflow(Workflow wkf) throws FunctionalException, TechnicalException
{
    wkf.getTaskClasses().add(new Id("GEC_Step3_CourrierTraite"));
    List<Workflow> workflowList = new ArrayList<>();
    workflowList.add(wkf);

    return wkfService.update(workflowList);
}
```

  </TabItem>
</Tabs>

:::warning
When using the REST service, unset fields will be cleared: you must send the entire workflow, not just the fields to modify.
:::

# Deleting workflows

The examples below show how to delete a list of workflows.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>: FlowerDocs Core base URL
# <TOKEN>: authentication token
# <IDS>: list of workflow identifiers to delete, separated by commas
curl -X DELETE "<CORE_HOST>/rest/workflow/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
private WorkflowService wkfService;

public void deleteWorkflow() throws FunctionalException, TechnicalException
{
    List<Id> workflowIds = Lists.newArrayList(new Id("workflowId"));
    wkfService.delete(workflowIds);
}
```

  </TabItem>
</Tabs>

:::warning
Deletion does not perform any checks: you must verify that there are no active instances before deleting a workflow.
:::