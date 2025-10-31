# Installation ARender dans ACA

Guide d'installation de l'extension ARender pour Alfresco Content App.

## Prérequis
- ACA 4.x installé
- Node.js et npm
- ARender Web-UI configuré

## Installation de l'extension

### 1. Installation via npm
```bash
npm install @arender/aca-extension
```

### 2. Configuration app.config.json
```json
{
  "plugins": {
    "arender": true
  },
  "arender": {
    "server": "http://localhost:8082"
  }
}
```

### 3. Build et déploiement
```bash
npm run build
```

## Configuration
L'extension s'intègre automatiquement dans l'interface ACA pour remplacer le visualiseur par défaut.

## Test
1. Ouvrir ACA
2. Sélectionner un document
3. Vérifier que ARender se lance pour la visualisation