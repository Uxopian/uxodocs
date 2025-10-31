# M-Files - Ancienne installation

Installation d'ARender pour les versions M-Files antérieures (2018.x).

## Prérequis
- M-Files Server 2018.x
- M-Files Web Access configuré
- ARender Rendition Server
- IIS ou serveur web

## Installation

### 1. Composants requis
- ARender Web-UI pour M-Files
- Module d'intégration M-Files
- Configuration IIS

### 2. Configuration M-Files
```xml
<!-- Configuration web.config -->
<appSettings>
    <add key="ARender.Server" value="http://localhost:8082" />
    <add key="ARender.Enabled" value="true" />
</appSettings>
```

### 3. Scripts d'intégration
Installation des scripts JavaScript dans M-Files Web Access pour rediriger vers ARender.

### 4. Activation
1. Redémarrer M-Files Web Service
2. Tester la visualisation
3. Vérifier les logs

## Limitations
- Fonctionnalités limitées comparé à la nouvelle architecture
- Performance moindre
- Maintenance plus complexe

**Recommandation** : Migrer vers la nouvelle architecture si possible.