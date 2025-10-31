# Docker - Partie de rendition

Déploiement du serveur de rendition ARender avec Docker.

## Image Docker
```bash
docker pull arender/rendition-server:4.x.x
```

## Configuration Docker Compose
```yaml
version: '3.8'
services:
  arender-rendition:
    image: arender/rendition-server:4.x.x
    ports:
      - "8080:8080"
    environment:
      - JAVA_OPTS=-Xms4g -Xmx8g
      - ARENDER_TEMP_DIR=/tmp/arender
    volumes:
      - ./config:/config
      - arender-temp:/tmp/arender
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  arender-temp:
```

## Variables d'environnement
- `JAVA_OPTS` : Options JVM
- `ARENDER_TEMP_DIR` : Répertoire temporaire
- `ARENDER_MAX_FILE_SIZE` : Taille max fichier

## Démarrage
```bash
docker-compose up -d
```

## Monitoring
```bash
docker logs arender-rendition -f
```