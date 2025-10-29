---
title: "Classes"
---

# Classes de composants

## Overview

Une classe de composants définit les caractéristiques communes d'un même ensemble logique de composants. Ces ensembles sont caractérisés par des [tags](../tags/overview.md) (ou métadonnées), une sécurité, des règles métiers ou techniques qui leur sont propres.   

Cette partie définit la notion de classe de composants utilisée pour caractériser les composants (documents, dossiers, tâches...) manipulés au sein de l'application.
Ainsi tout composant référence une classe de composants via son identifiant.

:::warning Identifiants
Lors de la définition des identifiants, il est préconisé d'utiliser uniquement : les caractères alphanumériques, "-" et "_" (les espaces ne sont pas préconisés).

Regex : `^[a-zA-Z0-9-_]$`

Cette préconnisation est une obligation pour toutes les versions supérieures à la 2.6 de FlowerDocs. 
:::

## Définition d'une classe

Une classe de composants permet de définir une typologie de composant : 

* **Tags** : métadonnées pouvant être associées à un composant
* **Sécurité** : sécurité par défaut via un identifiant d'ACL
* **Catégories de tags** : regroupement visuel des tags en blocs fonctionnels
* **Libellés internationalisés** : support multilingue de l'application
* **Caractère technique** : distinction métier/technique

*En fonction de la catégorie de la classe de composants, des spécificités peuvent être ajoutées.*

## Types de classes

### Classes de documents
Définissent les types de documents gérés dans FlowerDocs :
- **Factures** : métadonnées comptables, validation, archivage
- **Contrats** : gestion des échéances, parties prenantes
- **Rapports** : classification, diffusion, historique

### Classes de dossiers
Organisent la structure documentaire :
- **Projets** : documents liés à un projet
- **Clients** : dossiers par client ou affaire
- **Thématiques** : organisation par sujet

### Classes de tâches
Gèrent les workflows et processus :
- **Validation** : circuits d'approbation
- **Relecture** : processus de révision
- **Archivage** : tâches de fin de vie

## Configuration

### Définition via interface
Les classes peuvent être définies via l'interface d'administration :
1. **Création** : définir l'identifiant et le nom
2. **Tags** : associer les métadonnées nécessaires
3. **Sécurité** : définir les permissions par défaut
4. **Validation** : tester la configuration

### Configuration via API
```javascript
// Création d'une classe via API REST
POST /api/component-classes
<!-- Commentaire nettoyé -->,
    {"id": "date_emission", "type": "DATE", "required": true},
    {"id": "fournisseur", "type": "TEXT", "required": true}
  ],
  "defaultAcl": "ACL_COMPTABILITE"
}
```

## Héritage et hiérarchie

### Classes parentes
- **Définition générique** : classe de base avec tags communs
- **Spécialisation** : classes filles avec tags spécifiques
- **Héritage** : propagation des configurations

### Exemple de hiérarchie
```
Document
├── Document Comptable
│   ├── Facture Fournisseur
│   ├── Facture Client
│   └── Note de frais
├── Document Juridique
│   ├── Contrat
│   └── Accord
└── Document RH
    ├── CV
    └── Contrat de travail
```

## Bonnes pratiques

### Conception
- **Cohérence** : logique de nommage claire
- **Granularité** : équilibre entre générique et spécifique
- **Evolution** : prévoir les besoins futurs
- **Documentation** : décrire la finalité de chaque classe

### Maintenance
- **Versioning** : gérer les évolutions de schéma
- **Migration** : procédures de mise à jour
- **Audit** : traçabilité des modifications
- **Performance** : optimiser les requêtes par classe