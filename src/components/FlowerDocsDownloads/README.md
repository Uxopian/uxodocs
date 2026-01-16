# Exemple d'utilisation du composant FlowerDocsDownloads

## Dans vos release notes FlowerDocs

Pour ajouter le tableau de téléchargements à la fin de vos release notes, ajoutez simplement ceci :

```mdx
---
title: FlowerDocs 2025.3.0 Release notes
description: FlowerDocs 2025.3.0 Release notes
---

import FlowerDocsDownloads from '@site/src/components/FlowerDocsDownloads';

<!-- Votre contenu de release notes ici -->

# Overview

...

# Bug fixes

...

<!-- À la fin du document, ajoutez le composant -->

<FlowerDocsDownloads version="2025.3.0" />
```

## Paramètres du composant

### `version` (obligatoire)
La version de FlowerDocs pour laquelle générer les liens de téléchargement.
Exemple : `"2025.3.0"`, `"2025.2.0"`, `"2.8"`, etc.

### `arenderVersion` (optionnel)
La version spécifique d'ARender à utiliser. Par défaut : `"2023.15.0"`
Exemple : `<FlowerDocsDownloads version="2025.3.0" arenderVersion="2023.16.0" />`

## Exemples

### Utilisation basique
```jsx
<FlowerDocsDownloads version="2025.3.0" />
```

### Avec version ARender personnalisée
```jsx
<FlowerDocsDownloads version="2025.3.0" arenderVersion="2023.16.0" />
```

## Composants téléchargeables

Le composant génère automatiquement les liens pour :

1. **FlowerDocs GUI** - Interface graphique (JAR)
2. **FlowerDocs Core** - Coeur de l'application (JAR)
3. **FlowerDocs CLM** - Ligne de commandes (JAR)
4. **FlowerDocs default template** - Template par défaut (ZIP)
5. **Connecteur ARender FlowerDocs** - Connecteur ARender (JAR)
6. **ARender HMI** - Interface graphique de la visionneuse (JAR)
7. **ARender Rendition Server** - Moteur de rendition (ZIP)
8. **Solution GEC** - Gestion Electronique de Courriers (ZIP)
9. **Solution eProcess** - Automatisation de processus métier (ZIP)

Chaque élément inclut :
- Un lien vers le fichier SHA256
- Un lien vers le fichier JAR ou ZIP
- Une description du composant

## Migration depuis l'ancien HTML

### Avant (HTML)
```html
<div class="col-12 download-item">
    <div class="col-sm-8">
        <h6>FlowerDocs GUI</h6>
        Interface graphique
    </div>
    <div class="col-sm-4">
        <ul class="pager">
            <li class="next"><a href="...2025.3.0/...sha256">Sha256</a></li>
            <li class="next"><a href="...2025.3.0/...jar">JAR</a></li>
        </ul>
    </div>
</div>
```

### Après (React)
```jsx
<FlowerDocsDownloads version="2025.3.0" />
```

## Avantages

✅ **Réutilisable** - Un seul composant pour toutes les release notes
✅ **Maintenable** - Modification centralisée du design et des URLs
✅ **Type-safe** - TypeScript pour éviter les erreurs
✅ **Responsive** - S'adapte automatiquement aux mobiles
✅ **Dark mode** - Support automatique du mode sombre
✅ **Accessible** - Liens avec attributs appropriés
