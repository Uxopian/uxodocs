---
title: SOAP
sidebar_position: 3
last_update:
  date: '2026-01-29T08:51:52.623Z'
  author: CI/CD Bot
content_hash: c016f4edb1dfa26ab1ba39df50c52cf307120ba092c665017da59698cf4c5c1e
---

[WSDL](https://www.w3schools.com/xml/xml_wsdl.asp) defines the service contract for web services **SOAP** available at FlowerDocs Core.

They are displayed by each FlowerDocs Core under the path `/services` and published online [here](https://demo.flowerdocs.com/core/services).

# Authentification 

SOAP requests need to be authenticated to be accepted by FlowerDocs Core. To achieve this, it is necessary to provide a user token in the form of a SOAP envelope header.

# Token generation

The token to be supplied can be generated using the `AuthenticationWSService` service, which exposes the [login] operation(/javadocs/ws/com/flower/docs/ws/api/authentication/AuthenticationWSService.html#login) : 

`POST` */core/services/authentication*

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:aut="http://flower.com/docs/ws/api/authentication">
   <soapenv:Header/>
   <soapenv:Body>
      <aut:loginRequest>
         <aut:scope>{{scope}}</aut:scope>
         <aut:user>{{user}}</aut:user>
         <aut:password>{{password}}</aut:password>
      </aut:loginRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

# Provide token

To authenticate a client, the token must be supplied with each request.
It must be provided as a SOAP header under the namespace `flower`: 
```xml
<soapenv:Header>	
    <flower:token>{{token}}</flower:token>
<soapenv:Header>

```

The namespace `flower` can be defined by adding the prefix definition `xmlns:flower="flower"` as an attribute of the node `soapenv:Envelope`.