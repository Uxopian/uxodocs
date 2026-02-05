---
title: "Requirements"
sidebar_position: 1
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: bc25431ab21936227a31354d860e7f732936f2eddd09e7081d8de130396473a3
---

## Port configuration

The presentation server uses only the port configured by the application server in which
it is deployed. We therefore recommend you to consult the documentation of your application
server used.

## Recommendations

The presentation server does not have any prerequisites of
application system, it depends mainly on the software used
like the application server, java ...

We therefore recommend to direct you to the publishers of these software but also to follow the
site of [OWASP](https://www.owasp.org/) which publishes regularly recommendations on the security
of the application servers.

## Minimal hardware

| Category                         | Minimum | Advised                                                                                  |
| -------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| Number of presentation server(s) | 1       | Approximately the number of rendition server divided by two (example 4 rendition servers, therefore 2 presentation servers) |
| RAM                              | 1GB     | 2GB                                                                                     |
| CPU type                         | 64Bits  | 64Bits                                                                                   |

## Application server

Compatible applications servers (Java Servlet API 3.0 & Java 8 minimum required by ARender 4):

| Application server  | Validated version |
| ------------------- | ----------------- |
| IBM WebSphere       | 9.0.5             |
| Apache Tomcat       | 8.0               |
| Jetty               | 8.1.21            |
| Wildfly             | 10.1.0.Final      |

Java Servlet API 3.1.0 and up are recommended (not required yet) in order to profit from the
increased performance gains and the use of Websockets.
