# Installation IBM WebSphere (Recommandé)

Déploiement d'ARender Web-UI sur IBM WebSphere Application Server pour FileNet.

## Prérequis
- IBM WebSphere 8.5.5+ ou 9.x
- IBM FileNet Content Manager
- IBM Content Navigator
- ARender Rendition Server

## Installation

### 1. Préparation WAR
```bash
# Télécharger ARender Web-UI WAR
wget https://releases.arender.fr/arender-webui-filenet-x.x.x.war
```

### 2. Déploiement WebSphere
1. Ouvrir la console WebSphere
2. Applications → New Application → New Enterprise Application
3. Sélectionner le fichier WAR ARender
4. Suivre l'assistant de déploiement
5. Configurer le context root : `/arender`

### 3. Configuration FileNet
```properties
# Configuration ARender-FileNet
filenet.connection.url=http://localhost:9080/wsi/FNCEWS40MTOM
filenet.object.store=ObjectStore
filenet.domain=P8Domain
```

### 4. Variables WebSphere
```properties
ARENDER_RENDITION_SERVER=http://localhost:8080
FILENET_CONNECTION_URL=${filenet.connection.url}
```

## Validation
- Redémarrer WebSphere
- Tester l'accès : `http://server:port/arender`
- Vérifier l'intégration ICN