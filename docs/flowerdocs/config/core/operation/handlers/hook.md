---
title: Hook
sidebar_position: 6
description: "Adapt, enhance, control..."
date: "2010-12-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 1b3b9e208235a9c12961f1bb87a7242cfde4e6de18ef62d6a3767157f11c0f36
---

# Principle

An `OperationHook` is an operation manager exposed as a REST service. An `OperationHook` makes it possible to react to operations carried out on components from a remote WEB service.

Depending on the category of component involved in the operation, a POST request is sent to the following endpoints:

- `/{{scope}}/documents/`
- `/{{scope}}/folder/`
- `/{{scope}}/virtual_folders/`
- `/{{scope}}/tasks/`

It can be developed in any language that can be used to expose WEB services.

The body of requests sent to these endpoints contains an object describing the execution context of the operation, and therefore differs depending on the operation.

# Configuring an OperationHook

An `OperationHook` can be configured in the same way as a conventional `OperationHandler`. Its name corresponds to the URL used to access the endpoints listed above.
From the configured URL, it should be possible to send a POST to `{{hook URL}}/{{scope}}/documents/`.

# Security

Two authentication modes are available to secure an `OperationHook`. They are configured directly in the operation subscription.

## Authorization mode

FlowerDocs sends a static character string in the `Authorization` HTTP header with each POST request to the hook. The hook is responsible for validating this header.

Typically, BASIC authentication can be used. The authorization string can be generated online using [blitter](https://www.blitter.se/utils/basic-authentication-header-generator/), then set in the `Authorization` tag of the subscription.

```
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

## InjectToken mode

When `InjectToken` is set to `true` in the subscription, FlowerDocs dynamically generates a JWT token representing the **current user** who triggered the operation, and sends it in the `token` HTTP header:

```
token: <JWT>
```

The token contains the user's identity (ID, profiles, groups, scope), which allows the hook to make FlowerDocs API calls on behalf of that user.

This mode is typically used together with the FlowerDocs Spring Boot starter, which handles token validation automatically:

```java
@SpringBootApplication
@FlowerDocsClient(security = SecurityMode.USER)
public class MyHookApplication { ... }
```

:::note
If both `InjectToken` and `Authorization` are configured on the same subscription, `InjectToken` takes precedence. If neither is configured, no authentication header is sent.
:::

# Error management

By default, when running an `OperationHook`, **FlowerDocs Core** logs errors returned by the REST service by parsing the body of the HTTP response.

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

In the case of synchronous `OperationHooks`, personalized error messages can be sent back to the end user.
To do this, use the error code `F00039`:

```java
throw ExceptionBuilder.createFunctionalException(F00039, "Custom error message");
```
