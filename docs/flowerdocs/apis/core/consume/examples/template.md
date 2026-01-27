---
title: Using templates
description: Enrich an HTML or MS Word template with tag values
sidebar_position: 16
date: "2018-04-02T12:20:01+01:59"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: c289acea0ac6ccbdff8b02d1a99efa56eeb19e0881249aa11a7d384bb30e4512
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# HTML template

The `HTML` service shows the following operation:

- `getProcessedTemplate`: to download an enriched template with tag values

## Model

The template used by the `getProcessedTemplate` call looks like this:

```json

    "string":"string"

```

This is a set of key/value pairs, the tag identifier and its value.

## Reply

The reply is a text composed of the HTML template, with the tag identifiers replaced by their values.

## Example

The examples below show how to obtain an HTML template by enriching it with tag values.

<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}}/rest/template/html/{id} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
id: template identifier

-- Headers --
token: {{token}}
Content-Type: application/json

-- Body (json) --

    "MailObject": "Termination of a contract",
    "RefClient":"123456",
    "CustomerName": “Doe",
    "CustomerName": "John"

```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
    private ITemplateEngine templateEngine;

    @Autowired
    private PageContextBuilder contextBuilder;

    public String getProcessedTemplate() throws FunctionalException, TechnicalException

        String modelId = "html-response";
        Map<String, Object> tagMap = createTagMap();
        HttpServletRequest request = new FakeHttpRequest();

        Context context = contextBuilder.build(request, ContextHelper.getScope().getValue());
        for (Entry<String, Object> variable : tagMap.entrySet())

            context.setVariable(variable.getKey(), variable.getValue());

        return templateEngine.process(modelId, context);

    private Map<String, Object> createTagMap()

        Map<String, Object> tagMap = new HashMap<>();
        tagMap.put("MailObject", "Termination of a contract");
        tagMap.put("RefClient", "123456");
        tagMap.put("CustomerName", “Doe");
        tagMap.put("FirstName", "John");
        return tagMap;

```

  </TabItem>
</Tabs>

# MS Word template

The `MSOffice` service shows the following operations:

- `downloadFromTags`: to download a template enriched with tag values
- `storeFromTags`: to create a temporary file in FLowerDocs from an enriched template

## Model

The model used by the `downloadFromTags` and `storeFromTags` calls looks like this:

```json
[

    "name": "string",
    "readOnly": true,
    "value": [
      "string"
    ]

]
```

Here is the description associated with the call data set:

- `name`: tag id
- `readOnly` :
- `value`: list of tag values

## Reply

The `downloadFromTags` call returns the file in docx format with the replaced tag values.
The `storeFromTags` call returns the identifier of the temporary file created in FlowerDocs. This identifier can then be used to create a document.

## Examples - Download

The examples below show how to download an MSWord template and enrich it with tag values.

<Tabs>
  <TabItem value="download-rest" label="Download - REST">

```http
POST {{core}}/rest/template/msoffice/{id} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core Host
id: MSOffice template identifier

-- Headers --
token: {{token}}
Content-Type: application/json

-- Body (json) --
[

    "name": "MailObject",
    "readOnly": true,
    "value": [
      "Termination of contract"
    ]
  },

    "name": "RefClient",
    "readOnly": true,
    "value": [
      "123456"
    ]
  },

    "name": "CustomerName",
    "readOnly": true,
    "value": [
      “Doe"
    ]

]
```

  </TabItem>
  <TabItem value="download-java" label="Download - Java">

```Java
@Autowired
    private MSOfficeTemplateService service;

    public ResponseEntity<byte[]> downloadFromTags() throws TechnicalException, FunctionalException

        String modelId = "accuse-reception";
        List<Tag> tags = createTags();

        InMemoryFile generated = service.generate(modelId, tags);
        String fileName = determineName(tags, generated);
        BodyBuilder builder = ResponseEntity.ok();
        builder.contentType(MediaType.APPLICATION_OCTET_STREAM);
        builder.contentLength(generated.getBytes().length);
        builder.header("Content-Disposition", "attachment; filename=\"" + fileName + "\"");

        return builder.body(generated.getBytes());

    private List<Tag> createTags()

        List<Tag> tags = new ArrayList<>();
        tags.add(TagBuilder.name(“ObjectCourrier”).value(“Termination contract").readonly(true).build());
        tags.add(TagBuilder.name("RefClient").value("123456").readonly(true).build());
        tags.add(TagBuilder.name("NomClient").value("Dupont").readonly(true).build());
        return tags;

    private String determineName(List<Tag> tags, InMemoryFile generated)

        Tag nameTag = tags.stream().filter(tag -> "filename".equals(tag.getName())).findFirst().orElse(null);
        String fileName = (nameTag != null && !nameTag.getValue().isEmpty()) ? nameTag.getValue().get(0)
                : generated.getName();
        return fileName;

```

  </TabItem>
</Tabs>

## Examples - Temporary file

The examples below show how to create a temporary MSWord template file, enriching it with tag values.

<Tabs>
  <TabItem value="create-rest" label="Create - REST">

```http
POST {{core}}/rest/template/msoffice/{id}/id HTTP/1.1

-- URL parameters --
core: FlowerDocs Core Host
id: MSOffice template identifier

-- Headers --
token: {{token}}
Content-Type: application/json

-- Body (json) --
[

    "name": "MailObject",
    "readOnly": true,
    "value": [
      "Termination of contract"
    ]
  },

    "name": "RefClient",
    "readOnly": true,
    "value": [
      "123456"
    ]
  },

    "name": "CustomerName",
    "readOnly": true,
    "value": [
      “Doe"
    ]

]
```

  </TabItem>
  <TabItem value="create-java" label="Create - Java">

```Java
@Autowired
    private MSOfficeTemplateService service;

	@Autowired
    private TempFileService tempFileService;

    public String storeFromTags() throws TechnicalException, FunctionalException

        String modelId = "accuse-reception";
        List<Tag> tags = createTags();

        InMemoryFile generated = service.generate(modelId, tags);
        String fileName = determineName(tags, generated);
        DocumentFile file = new DocumentFile();
        file.setName(fileName);
        file.setFormatCode(com.google.common.net.MediaType.OOXML_DOCUMENT.toString());
        InputStreamDataSource dataSource = new InputStreamDataSource(new ByteArrayInputStream(generated.getBytes()));
        file.setContent(new DataHandler(dataSource));

        return tempFileService.create(file).getId().getValue();

    private List<Tag> createTags()

        List<Tag> tags = new ArrayList<>();
        tags.add(TagBuilder.name(“ObjectCourrier”).value(“Termination contract").readonly(true).build());
        tags.add(TagBuilder.name("RefClient").value("123456").readonly(true).build());
        tags.add(TagBuilder.name("NomClient").value("Dupont").readonly(true).build());
        return tags;

    private String determineName(List<Tag> tags, InMemoryFile generated)

        Tag nameTag = tags.stream().filter(tag -> "filename".equals(tag.getName())).findFirst().orElse(null);
        String fileName = (nameTag != null && !nameTag.getValue().isEmpty()) ? nameTag.getValue().get(0)
                : generated.getName();
        return fileName;

```

  </TabItem>
</Tabs>
