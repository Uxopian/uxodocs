# Docker - IBM FileNet

Intégration ARender avec IBM FileNet via Docker.

## Configuration Docker Compose
```yaml
version: '3.8'
services:
  arender-filenet:
    image: arender/webui-filenet:4.x.x
    ports:
      - "8082:8082"
    environment:
      - FILENET_URL=http://filenet-server:9080/wsi/FNCEWS40MTOM
      - FILENET_DOMAIN=P8Domain
      - FILENET_OBJECT_STORE=ObjectStore
      - ARENDER_RENDITION_SERVER=http://arender-rendition:8080
    depends_on:
      - arender-rendition

  arender-rendition:
    image: arender/rendition-server:4.x.x
    ports:
      - "8081:8080"
```

## Variables FileNet
- `FILENET_URL` : URL des Web Services FileNet
- `FILENET_DOMAIN` : Domaine P8
- `FILENET_OBJECT_STORE` : Object Store cible
- `FILENET_USERNAME` : Utilisateur de service
- `FILENET_PASSWORD` : Mot de passe

## Intégration ICN
L'image inclut les composants pour l'intégration avec IBM Content Navigator.

## Sécurité
Configuration SSL/TLS automatique pour les communications sécurisées avec FileNet.