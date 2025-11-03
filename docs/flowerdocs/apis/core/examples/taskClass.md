---
title: "Handling task classes"
description: "Create, get, modify and delete your task classes"
date: "2001-04-29T13:30:01+01:02"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



The `TaskClassService` service exposes all operations available around `TaskClass` type components.

# Retrieving task classes

## Retrieve all task classes

The examples below show how to retrieve all task classes.

<Tabs>
  <TabItem value="rest" label="REST">

```http
GET {{core}}/rest/taskclass HTTP/1.1

-- URL parameters -- 
core: FlowerDocs Core host

-- Headers -- 
token: {{token}}
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
    private TaskClassService taskClassService;

    public List<TaskClass> getAll() throws FunctionalException, TechnicalException

        return taskClassService.getAll();

```

  </TabItem>
</Tabs>


## Retrieve a defined list of task classes

The examples below show how to retrieve a list of task classes from their identifiers.

<Tabs>
  <TabItem value="rest" label="REST">

```http
GET {{core}}/rest/taskclass/{ids} HTTP/1.1

-- URL parameters -- 
core: FlowerDocs Core host
ids: list of task class identifiers

-- Headers -- 
token: {{token}}
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
    private TaskClassService taskClassService;

    public List<TaskClass> getTaskClasses() throws FunctionalException, TechnicalException

        List<Id> taskClassesIds = Lists.newArrayList(new Id("taskClassId"));
        taskClassesIds.add(new Id("taskClass2Id"));
        return taskClassService.get(taskClassesIds);

```

  </TabItem>
</Tabs>


# Creating task classes

The examples below show how to create a task class. 

<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}}/rest/taskclass HTTP/1.1

-- URL parameters -- 
core: FlowerDocs Core host

-- Headers -- 
token: {{token}}
Content-Type: application/json

-- Body (json) --
[

    "answers": [

        "displayNames": [

            "language": "FR",
            "value": "Traiter"

        ],
        "id": "Treat"

    ],
    "autoAssign": true,
    "category": "TASK",
    "data": {
      "ACL": "acl-treatment",
      "creationDate": "2024-03-07 13:59:54.854 +0100",
      "lastUpdateDate": "2024-03-07 13:59:54.854 +0100",
      "owner": "fadmin"
    },
    "displayNames": [

        "language": "FR",
        "value": "Traitement du courrier"

    ],
    "icon": "fa fa-clone",
    "id": "GEC_traitement",
    "tagReferences": [

        "descriptions": [

            "language": "FR",
            "value": "Référence du client"

        ],
        "mandatory": true,
        "multivalued": false,
        "order": 0,
        "readonly": false,
        "tagName": "NumReference",
        "technical": false

    ],
    "technical": true,
    "workflow": "GEC"

]
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
    private TaskClassService taskClassService;
    
	public void createTaskClasses() throws FunctionalException, TechnicalException

        List<I18NLabel> answerLabels = new ArrayList<>();
        I18NLabel answerlabelFR = new I18NLabel("Traiter", "FR");
        answerLabels.add(answerlabelFR);

        List<I18NLabel> classLabels = new ArrayList<>();
        I18NLabel classlabelFR = new I18NLabel("Traitement du courrier", "FR");
        classLabels.add(classlabelFR);

        Answer treatAnswer = new Answer();
        treatAnswer.setId(new Id("Treat"));
        treatAnswer.setDisplayNames(answerLabels);
        List<Answer> answers = new ArrayList<>();
        answers.add(treatAnswer);

        TagReference tag = new TagReference();
        tag.setTagName("NumReference");
        tag.setMandatory(true);
        List<TagReference> tags = new ArrayList<>();
        tags.add(tag);

        TaskClass taskClass = new TaskClass();
        taskClass.setId(new Id("GEC_Traitement"));
        taskClass.setAnswers(answers);
        taskClass.setTagReferences(tags);
        taskClass.setData(new Data());
        taskClass.getData().setACL(new Id("acl-treatment"));
        taskClass.setIcon("fa fa-clone");
        taskClass.setAutoAssign(true);
        taskClass.setWorkflow(new Id("GEC"));
        taskClass.setDisplayNames(classLabels);

        List<TaskClass> taskClasses = new ArrayList<>();
        taskClasses.add(taskClass);

        taskClassService.create(taskClasses);

```

  </TabItem>
</Tabs>


# Modifying task classes

The examples below show how to modify a task class.

<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}}/rest/taskclass/{ids} HTTP/1.1

-- URL Parameters -- 
core: FlowerDocs Core host
ids : comma-separated list of task class identifiers to be updated

-- Headers --
token: {{token}}
Content-Type: application/json

-- Body (json) --
[

    "answers": [

        "displayNames": [

            "language": "FR",
            "value": "Traiter"

        ],
        "id": "Treat"
      },

        "displayNames": [

            "language": "FR",
            "value": "Refuser"

        ],
        "id": "Refuse"

    ],
    "autoAssign": false,
    "category": "TASK",
    "data": {
      "ACL": "acl-treatment",
      "creationDate": "2024-03-07 13:59:54.854 +0100",
      "lastUpdateDate": "2024-03-07 13:59:54.854 +0100",
      "owner": "fadmin"
    },
    "displayNames": [

        "language": "FR",
        "value": "Traitement du courrier"

    ],
    "icon": "fa fa-envelope",
    "id": "GEC_traitement",
    "tagReferences": [

        "descriptions": [

            "language": "FR",
            "value": "Référence du client"

        ],
        "mandatory": true,
        "multivalued": false,
        "order": 0,
        "readonly": false,
        "tagName": "NumReference",
        "technical": false

    ],
    "technical": true,
    "workflow": "GEC"

]
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
    private TaskClassService taskClassService;
    
	public List<TaskClass> updatetaskClass(TaskClass taskClass) throws FunctionalException, TechnicalException

        List<I18NLabel> answerLabels = new ArrayList<>();
        I18NLabel answerlabelFR = new I18NLabel("Refuser", "FR");
        answerLabels.add(answerlabelFR);

        Answer refuseAnswer = new Answer();
        refuseAnswer.setId(new Id("Refuse"));
        refuseAnswer.setDisplayNames(answerLabels);

        taskClass.setIcon("fa fa-envelope");
        taskClass.getAnswers().add(refuseAnswer);
        taskClass.setAutoAssign(false);

        List<TaskClass> taskClasses = new ArrayList<>();
        taskClasses.add(taskClass);

        return taskClassService.update(taskClasses);

```

  </TabItem>
</Tabs>



If you use the REST service, any information that has not been filled in will be emptied: you need to send the entire task class, not just the information to be modified. 


# Deleting task classes

The examples below show how to delete a list of task classes.

<Tabs>
  <TabItem value="rest" label="REST">

```http
DELETE {{core}}/rest/taskclass/{ids} HTTP/1.1

-- URL Parameters -- 
core: FlowerDocs Core host
ids : comma-separated list of task class identifiers to be deleted

-- Headers --
token: {{token}}
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
	private TaskClassService taskClassService;
	
    public void deleteTaskClasses() throws FunctionalException, TechnicalException

        List<Id> taskClassesIds = Lists.newArrayList(new Id("taskClassId"));
        taskClassService.delete(taskClassesIds);

```

  </TabItem>
</Tabs>



Before deleting a task class, it's important to make sure you've deleted all instances of this class, as well as all references to it in workflow objects.
