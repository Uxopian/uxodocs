---
title: "Handling a virtual folder"
description: "Create, retrieve, modify, delete and search your virtual folders"
date: "2001-04-29T13:30:01+01:00"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



The `VirtualFolder` service exposes all the operations available around the `VirtualFolder` type components.

# Virtual folder recovery

The examples below show how to retrieve virtual folders from a list of identifiers.

<Tabs>
  <TabItem value="rest" label="REST">

```http
GET {{core}}/rest/virtualFolder/{ids} HTTP/1.1

-- URL parameters -- 
ids: list of virtual folder identifiers to be retrieved

-- Headers -- 
core: FlowerDocs Core host
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
    private VirtualFolderService vfService;

    public List<VirtualFolder> get() throws TechnicalException, FunctionalException

        List<Id> ids = Lists.newArrayList(new Id("123654"));
        return vfService.get(ids);

```

  </TabItem>
</Tabs>


# Virtual folder creation

The examples below show how to create a list of virtual folders. 

<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}}/rest/virtualFolder/ HTTP/1.1

-- Headers -- 
core: FlowerDocs Core host
token: {{token}}
Content-Type: application/json

-- Body (json) --
[

    "category": "VIRTUAL_FOLDER",
    "data": {
      "ACL": "acl-dossierclient",
      "classId": "DossierClient",
      "owner": "jna"
    },
    "name": "123654 - DOE Jules",
    "tags": [

        "name": "RefClient",
        "readOnly": false,
        "value": [
          "123654"
        ]
      },

        "name": "PrenomClient",
        "readOnly": false,
        "value": [
          "Jules"
        ]
      },

        "name": "NomClient",
        "readOnly": false,
        "value": [
          "DOE"
        ]

    ]

]
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
    private VirtualFolderService vfService;
    
    public List<VirtualFolder> create() throws FunctionalException, TechnicalException

        VirtualFolder vF = ComponentBuilder.component(Category.VIRTUAL_FOLDER).name("123654 - Doe Jules")
                .classId(new Id("DossierClient")).acl("acl-dossierclient").build();
        vF.getData().setOwner("jna");
        vF.setTags(new Tags());
        vF.getTags().getTags().add(TagBuilder.name("RefClient").value("123654").build());
        vF.getTags().getTags().add(TagBuilder.name("NomClient").value("DOE").build());
        vF.getTags().getTags().add(TagBuilder.name("DureeConge").value("Jules").build());
        return vfService.create(Arrays.asList(vF));

```

  </TabItem>
</Tabs>


# Virtual folder modification

This operation updates the data in a virtual folder: tags and data (class identifier, ACL, owner, etc.).

:::info
This service operates on a cancel and replace basis, so all tag values must be supplied by the service at the time of update. It is therefore advisable to retrieve the virtual folder, make the changes and call the update service.
:::


<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}}/rest/virtualFolder/{ids} HTTP/1.1

-- URL parameters -- 
ids: list of virtual folder identifiers to be updated

-- Headers --
core: FlowerDocs Core host
token: {{token}}
Content-Type: application/json

-- Body (json) --
[

    "category": "VIRTUAL_FOLDER",
    "data": {
      "ACL": "acl-dossierclient",
      "classId": "DossierClient",
      "owner": "jna"
    },
    "name": "123654 - DOE Marc",
    "tags": [

        "name": "RefClient",
        "readOnly": false,
        "value": [
          "123654"
        ]
      },

        "name": "PrenomClient",
        "readOnly": false,
        "value": [
          "Marc"
        ]
      },

        "name": "NomClient",
        "readOnly": false,
        "value": [
          "DOE"
        ]

    ]

]
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
	private VirtualFolderService vfService;
    
	public List<VirtualFolder> update(VirtualFolder vF) throws FunctionalException, TechnicalException

		//ComponentBuilder.component(Category.VIRTUAL_FOLDER).name("123654 - Doe Marc").classId(new Id("DossierClient")).build();
      vF.setName("123654 - Doe Marc");
      vF.getData().setACL(new Id("acl-dossierclient"));
      vF.getData().setClassId(new Id("DossierClient"));
      ComponentHelper.setTagValue(vF, "NomClient", "Marc");
      return vfService.update(Arrays.asList(vF));

```

  </TabItem>
</Tabs>


# Recherche de virtual folder

The search operations all work on the same model as described [here](/apis/core/examples/search.md).

# Virtual folder deletion

The examples below show how to delete a list of virtual folders from a list of identifiers.

<Tabs>
  <TabItem value="rest" label="REST">

```http
DELETE {{core}}/rest/virtualFolder/{ids} HTTP/1.1

-- URL parameters -- 
ids: list of virtual folder identifiers to be deleted

-- Headers --
core: FlowerDocs Core host
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
	private VirtualFolderService vfService;
	
	public void delete() throws FunctionalException, TechnicalException

        List<Id> ids = Lists.newArrayList(new Id("123654"));
        vfService.delete(ids);

```

  </TabItem>
</Tabs>
