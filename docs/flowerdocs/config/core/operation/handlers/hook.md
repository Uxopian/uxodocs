---
title: Hook
description: 'Adapt, enhance, control...'
date: '2010-12-28T13:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: bc74e7ce503c4021a5e3e32327c937c6cc08463b3aeca852a1073b5f487ba977
---


# Principle

An `OperationHook` is an operation manager exposed as a REST service. An `OperationHook` makes it possible to react to operations carried out on components from a remote WEB service.

Depending on the category of component involved in the operation, a POST request is sent to the following endpoints: 

* `/{{scope}}/documents/`
* `/{{scope}}/folder/`
* `/{{scope}}/virtual_folders/`
* `/{{scope}}/tasks/`

It can be developed in any language that can be used to expose WEB services. 

The body of requests sent to these endpoints contains an object describing the execution context of the operation, and therefore differs depending on the operation.


# Configuring an OperationHook

An `OperationHook` can be configured in the same way as a conventional `OperationHandler`.  Its name corresponds to the URL used to access the endpoints listed above.
From the configured URL, it should be possible to send a POST to `{{hook URL}}/{{scope}}/documents/`.

# Security

It is recommended to secure the `OperationHook` deployed. To do this, FlowerDocs allows you to configure a character string supplied during REST calls in an `Authorization` HTTP header.

Typically, BASIC authentication can be used to secure an `OperationHook`. For FlowerDocs to provide the authentication defined, the subscription must be updated with the authorisation string to be provided.

This character string can be generated online using [blitter](https://www.blitter.se/utils/basic-authentication-header-generator/)._


# Error management

By default, when running an ``OperationHook``, **FlowerDocs Core** logs errors returned by the REST service by parsing the body of the HTTP response. 

To return context-sensitive exceptions, it is necessary to provide the `code` and `message` headers on the HTTP response.

With Spring, an `ExceptionHandler` can be easily defined to handle all FlowerDocs exceptions and return them correctly to **FlowerDocs Core**:

```java
@ExceptionHandler(CodeBasedException.class)
public ResponseEntity<Object> handleCustomException(CodeBasedException ex, WebRequest request)

    HttpHeaders headers = new HttpHeaders();
    headers.add("code", ex.getCode());
    headers.add("message", ex.getMessage());
    return new ResponseEntity<Object>(headers, HttpStatus.INTERNAL_SERVER_ERROR);

```

<br/>

In the case of synchronous ``OperationHooks``, personalized error messages can be sent back to the end user. 
To do this, use the error code ``F00039``: 

```java
throw ExceptionBuilder.createFunctionalException(F00039, "Custom error message"); 
```
