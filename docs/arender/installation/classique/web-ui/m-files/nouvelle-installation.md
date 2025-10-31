# M-Files - Nouvelle installation (Recommandée)

Installation moderne d'ARender pour M-Files 20.x+ avec architecture optimisée.

## Prérequis
- M-Files Server 20.x+
- M-Files Web Access 2.0+
- ARender Rendition Server
- ARender Web-UI moderne

## Architecture moderne
```
[M-Files Web] → [ARender Extension] → [ARender Web-UI] → [Rendition Server]
```

## Installation

### 1. Extension M-Files
```bash
# Installation via M-Files Admin
1. Télécharger ARender-MFiles-Extension.zip
2. Ouvrir M-Files Admin
3. Applications → Install Application
4. Sélectionner le package ARender
```

### 2. Configuration
```json
{
  "arender": {
    "server": "http://localhost:8082",  
    "enabled": true,
    "defaultViewer": true,
    "annotations": {
      "enabled": true,
      "realtime": true
    }
  }
}
```

### 3. Activation par Vault
1. Ouvrir M-Files Admin
2. Sélectionner le Vault
3. Applications → ARender → Enable
4. Configurer les paramètres

## Avantages
- Intégration native M-Files
- Performance optimisée
- Configuration simplifiée
- Support cloud M-Files
- Annotations temps réel

## Test
1. Ouvrir M-Files Web
2. Sélectionner un document  
3. Vérifier le lancement d'ARender
4. Tester les annotations

Cette architecture est recommandée pour tous les nouveaux déploiements.