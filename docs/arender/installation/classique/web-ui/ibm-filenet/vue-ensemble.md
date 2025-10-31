# IBM FileNet - Vue d'ensemble

ARender s'intègre avec IBM FileNet Content Manager via IBM Content Navigator (ICN).

## Composants IBM FileNet
- **Content Engine (CE)** : Stockage des documents
- **Process Engine (PE)** : Workflow et BPM  
- **Content Navigator (ICN)** : Interface web
- **Application Engine (AE)** : Applications métier

## Integration ARender
ARender remplace le visualiseur par défaut d'ICN pour offrir :
- Visualisation haute fidélité
- Annotations collaboratives  
- Support 250+ formats
- Performance optimisée

## Modes de déploiement
- **WebSphere** (recommandé)
- **Apache Tomcat**
- **Spring Boot avec OAuth2**
- **Intégration ICN**

## Architecture
```
[ICN] → [ARender Web-UI] → [ARender Rendition]
  ↓
[FileNet CE] → [Documents]
```

Consultez les guides spécifiques pour votre environnement.