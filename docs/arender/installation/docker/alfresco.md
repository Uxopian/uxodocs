# Docker - Alfresco

Intégration ARender avec Alfresco via Docker.

## Architecture
```yaml
version: '3.8'
services:
  alfresco:
    image: alfresco/alfresco-content-repository:23.x
    ports:
      - "8080:8080"
    
  arender-alfresco:
    image: arender/webui-alfresco:4.x.x
    ports:
      - "8082:8082"
    environment:
      - ALFRESCO_URL=http://alfresco:8080
      - ARENDER_RENDITION_SERVER=http://arender-rendition:8080
    depends_on:
      - alfresco
      - arender-rendition

  arender-rendition:
    image: arender/rendition-server:4.x.x
    ports:
      - "8081:8080"
```

## Configuration Alfresco
Le connecteur ARender s'intègre automatiquement avec :
- Alfresco Share
- Alfresco Content App (ACA)
- API REST Alfresco

## Variables spécifiques
- `ALFRESCO_URL` : URL du repository Alfresco
- `ALFRESCO_USER` : Utilisateur de service
- `ALFRESCO_PASSWORD` : Mot de passe

## Démarrage
```bash
docker-compose -f docker-compose-alfresco.yml up -d
```