# Installation Spring Boot avec OAuth2

Déploiement moderne d'ARender avec authentification OAuth2 pour IBM FileNet.

## Architecture
```
[Client] → [OAuth2 Provider] → [ARender Spring Boot] → [FileNet]
```

## Configuration OAuth2

### application.yml
```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          filenet:
            client-id: arender-client
            client-secret: your-secret
            authorization-grant-type: authorization_code
            redirect-uri: http://localhost:8082/login/oauth2/code/filenet
        provider:
          filenet:
            authorization-uri: https://auth-server/oauth2/authorize
            token-uri: https://auth-server/oauth2/token

arender:
  filenet:
    connection-url: http://localhost:9080/wsi/FNCEWS40MTOM
    domain: P8Domain
    object-store: ObjectStore
```

## Sécurité
- Authentification via OAuth2/OIDC
- Tokens JWT sécurisés
- Intégration SSO native

## Déploiement
```bash
java -jar arender-webui-filenet-springboot.jar
```

L'application démarre sur le port 8082 avec sécurité OAuth2 activée.