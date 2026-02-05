---
title: "Migrate from v3"
sidebar_position: 2
last_update:
  date: '2026-02-05T15:05:05.898Z'
  author: CI/CD Bot
content_hash: 0777537b06234c029d85a40258a84794aec97b377349ba50a009a1df569b9800
---

## Migrating from ARender 3 to ARender 4

ARender 3 and 4 APIs are close, but migrating from ARender can induce
some minor differences.

If you have read the quick start guide so far, you may have an idea of
what changed. Here you will find a list of those main changes.

### The rendition server changes its name

The old Jar packaging and wrapper of the rendition server is no longer
existing.

Somewhat complex to integrate into other partners/clients automatic
builds the jar IzPack format is no longer used. Instead, a simple zip
archive is now the new format.

This implies new changes though:

- no configuration at installation time possible
- third party softwares are for now not bundled with the zip archive
- much simpler "installation" process: unzip the file \!
- much simpler "removal" process: delete the folder \!

### ARender renews its libraries

Spring Boot 1.5, Netflix Eureka for discovery, Micro-service
architecture, the API level and functionalities offered have been both
raised for ARender 4.

On the Java WebApplication side, we upgraded to the latest GWT release
which includes some much needed tweaks.

Those two upgrades imply a requirement of Java 8 (minimum) both for the
rendition server and the WebApplication Server.

### ARender browser support

ARender 4 focuses itself and bringing new features to the world of
document preview/annotation and to do so, we had to cut out browsers
that would no longer work with some of those new features.

This is why ARender 4 now supports the recent version of Chrome and
Firefox (as their are auto-update browsers) and Internet Explore 11.
Edge does not yet qualifies as a supported browser because of some
issues the browser itself has, aside of ARender.

### Custom client code and ARender 4

As said earlier, the backend of rendition has changed in ARender 4, but
its own internal communication API as well.

The RMI protocol is now gone, and the XML is deprecated in favor of the
new JSON API. Faster, clearer and easier to use the new API is the only
way to access the rendition server.

ARender 4 proposes a set of HTTP end points that are the same as ARender
3, and a new set of reworked end points, more normalized and suited for
an external use.

This API change implies your code has to either:

- Implement the DocumentAccessorHasContentSize interface
- Be able to be serialized in JSON

For the first option, which is the easiest and recommended, your custom
code will remain in the WebApplication Server and you only need to
include your code to the war deployment lib folder. Content will be
streamed to the rendition server seamlessly using our own API, objects
and calls.

If you wish to go for a JSON serialization of your DocumentAccessor
(overall less data transfers), it will reach the rendition server and
needs to be recognized by it. We introduced in ARender 4.0.1 a folder
named *client_libs* where you can drop your custom code. Once opened
and deserialized by our server, the document will be fetched and the
custom code logic will not be propagated into the rendition micro
services.

### ARender 4 rendition boot phase

Something that has changed a lot since ARender 3 is the new boot phase
of ARender 4. As we now rely on discovery of services, it takes longer
to fully start a rendition server than before, with the guarantee that
the sanity of each service is assured during the execution phase of
ARender.

To compensate that, an end point is exposed at
`http://{rendition_host}:8761/heatlh/records` to show you live your
rendition booting status, and its current health status.

This end point is as well propagated to the front end server at
`http://{arender_ui_host}:{arender_ui_port}/``{arender_context}``/arendergwt/health/records`.

It will show you a summary of all servers, and contain a link to the
swagger documentation for them.

### ARender 4 rendition customization

We recommend you to look at the new cookbooks to know the new
configuration possiblities of ARender 4.

As ARender 4 relies heavily on Spring boot now, you can open each micro
service jar to find out in the folder "BOOT-INF\classes\" all
possible configuration properties.

You can then override any properties by placing aside of the micro
service a file named "application.properties" or "application.yaml"
regarding the syntax of configuration you are the most familiar with.
This includes the default host to listen to, ARender supported mime
types, etc...
It is advisable not to access the file "application.yaml",
there is an external file "application-security.yml" for each module
where you can add the changes.
