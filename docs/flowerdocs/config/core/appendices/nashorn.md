---
title: "Nashorn"
last_update:
  date: '2026-01-27T09:19:20.024Z'
  author: CI/CD Bot
description: "JavaScript engine included in FlowerDocs Core."
content_hash: 09b2e6e2750e3921c937f2907766b0b578b66513f2ee6ea18a9d2bad9ef9f552
---

# Principle

The [Nashorn](https://docs.oracle.com/javase/8/docs/technotes/guides/scripting/nashorn/index.html) engine is used to execute scripts within the JVM. JavaScript syntax and Java classes loaded into the JVM can be used to add specific logic to a process. 

# Access to Java classes

Nashorn allows [access to Java classes](https://docs.oracle.com/javase/8/docs/technotes/guides/scripting/nashorn/api.html) to instantiate objects or call their methods.

## Instantiate an object

In order to instantiate an object or call a static method of a Java class, the full class name must be specified or a reference to the class must be obtained. 

var document = new com.flower.docs.domain.document.Document();

var Document = com.flower.docs.domain.document.Document;
var document = new Document();

To facilitate the development of scripts using the objects provided by FlowerDocs, certain classes can be directly named without using their full name or a reference.

## Restrictions

For security reasons, a specific class loader is used to execute the scripts in the JVM. Access to certain classes is therefore restricted. This can be disabled using the `secured.classloader.enabled=false` property. If required, certain classes or packages can be defined as secured using the `secured.classloader.whitelist.additional` property.

