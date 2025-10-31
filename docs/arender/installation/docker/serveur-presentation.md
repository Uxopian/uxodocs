# Docker - Serveur de présentation

Déploiement du serveur Web-UI ARender avec Docker.

## Image Docker
```bash
docker pull arender/webui:4.x.x
```

## Configuration Docker Compose
```yaml
version: '3.8'
services:
  arender-webui:
    image: arender/webui:4.x.x
    ports:
      - "8082:8082"
    environment:
      - ARENDER_RENDITION_SERVER=http://arender-rendition:8080
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/arender
    depends_on:
      - arender-rendition
      - postgres
    restart: unless-stopped

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=arender
      - POSTGRES_USER=arender
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

## Configuration avancée
```yaml
arender-webui:
  environment:
    - SPRING_PROFILES_ACTIVE=docker
    - ARENDER_SECURITY_ENABLED=true
    - ARENDER_CORS_ORIGINS=*
```

## Load Balancing
```yaml
nginx:
  image: nginx:alpine
  ports:
    - "80:80"
  volumes:
    - ./nginx.conf:/etc/nginx/nginx.conf
```