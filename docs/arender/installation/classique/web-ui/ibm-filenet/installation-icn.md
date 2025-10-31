# Installation dans ICN

Configuration d'ARender comme visualiseur dans IBM Content Navigator.

## Configuration ICN

### 1. Plugin ARender ICN
1. Ouvrir l'administration ICN
2. Aller dans Plug-ins
3. Charger le plugin ARender : `ARenderICNPlugin.jar`
4. Configurer les paramètres

### 2. Configuration Desktop
```javascript
// Configuration du bureau ICN
{
  "arender": {
    "enabled": true,
    "server": "http://localhost:8082",
    "defaultViewer": true
  }
}
```

### 3. Paramètres visualiseur
- Remplacer le visualiseur par défaut
- Configurer les types MIME supportés  
- Activer les annotations (optionnel)

### 4. Test d'intégration
1. Ouvrir ICN
2. Sélectionner un document
3. Cliquer sur "Afficher"
4. Vérifier qu'ARender se lance

## Types de documents supportés
ARender remplace automatiquement le visualiseur pour tous les formats supportés (250+).

La configuration est transparente pour les utilisateurs ICN.