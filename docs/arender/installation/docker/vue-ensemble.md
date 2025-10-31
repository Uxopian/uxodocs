# Docker - Vue d'ensemble

ARender propose des images Docker officielles pour un déploiement containerisé simplifié.

## Avantages Docker
- **Déploiement rapide** : Images préconfigurées
- **Isolation** : Containers indépendants  
- **Portabilité** : Même environnement partout
- **Scalabilité** : Orchestration facilitée
- **Maintenance** : Mises à jour simplifiées

## Images disponibles

### ARender Rendition Server
```bash
docker pull arender/rendition-server:latest
```

### ARender Web-UI
```bash  
docker pull arender/webui:latest
```

### Images spécialisées
- `arender/webui-alfresco` : Pour Alfresco
- `arender/webui-filenet` : Pour IBM FileNet  
- `arender/all-in-one` : Solution complète

## Architecture Docker
```
[nginx] → [webui containers] → [rendition containers]
             ↓
        [postgresql]
```

## Orchestration
- Docker Compose (développement)
- Docker Swarm (production simple)  
- Kubernetes (production avancée)

Consultez les guides spécifiques pour votre cas d'usage.