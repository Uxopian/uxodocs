# Configuration Web-UI

Configuration du serveur Web-UI ARender pour l'interface utilisateur et l'intégration GED.

## Configuration de base

### Fichier application.yml
```yaml
# ARender Web-UI Configuration
server:
  port: 8082
  
arender:
  webui:
    rendition-server: http://localhost:8080
    
  # GED Configuration
  ged:
    type: alfresco  # alfresco, filenet, mfiles
    
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/arender
    username: arender
    password: password
```

## Configuration par connecteur

Consultez les guides spécifiques :
- [Alfresco](./alfresco/)
- [IBM FileNet](./ibm-filenet/)  
- [M-Files](./m-files/)

## Authentification

### Configuration SSO
```yaml
arender:
  security:
    authentication: saml
    saml:
      idp-url: https://your-idp.com/sso
```

## Prochaines étapes

Une fois configuré, testez l'interface et intégrez avec votre GED.