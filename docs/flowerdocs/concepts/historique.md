---
title: "Historique"
---

# Historique

## Principe 

L'historique d'un composant est composé d'un ensemble de faits. Chaque fait historise une action effectuée par un utilisateur sur un composant et conserve les informations suivantes : 

| Nom | Automatique | Description |
|-----|-------------|-------------|
| `id` | oui | Identifiant unique |
| `creationDate` | oui | Date d'exécution |
| `user` | oui | Identifiant de l'utilisateur ayant exécuté l'opération |
| `requestId` | oui | Identifiant de la requête à l'origine de l'action |
| `technical` | oui | Détermine si le fait est technique ou métier |
| `action` | non | Action effectuée |
| `objectId` | non | Identifiant de l'objet concerné |
| `objectType` | non | Type de l'objet concerné |

## Les faits techniques

Les faits techniques sont générés automatiquement par FlowerDocs Core lors de l'exécution d'une opération historisée. Pour chaque catégorie de composants, l'enregistrement de faits pour une action donnée peut être activé ou désactivé.

### Documents

| Action | Par défaut | Description |
|--------|------------|-------------|
| `create` | oui | Création |
| `read` | non | Accès |
| `get_content` | non | Accès à un contenu |
| `update` | oui | Mise à jour |
| `add_content` | non | Ajout de contenu |
| `delete_content` | non | Suppression de contenu |
| `revert` | oui | Restauration d'une version |
| `delete` | oui | Suppression physique |

### Tâches

| Action | Par défaut | Description |
|--------|------------|-------------|
| `create` | oui | Création |
| `read` | non | Accès |
| `update` | oui | Mise à jour |
| `assign` | oui | Assignation |
| `add_content` | oui | Ajout de pièce(s) jointe(s) |
| `delete_content` | oui | Suppression de pièce(s) jointe(s) |
| `answer` | oui | Application d'une réponse |
| `delete` | oui | Suppression physique |

### Dossiers

| Action | Par défaut | Description |
|--------|------------|-------------|
| `create` | oui | Création |
| `read` | non | Accès |
| `update` | oui | Mise à jour |
| `add_content` | oui | Ajout de composant(s) |
| `delete_content` | oui | Suppression de composant(s) |
| `delete` | oui | Suppression physique |

## Configuration de l'historique

L'historisation peut être configurée au niveau :
- **Global** : pour tous les composants d'un type donné
- **Individuel** : pour des composants spécifiques
- **Utilisateur** : selon le profil utilisateur

### Activation/Désactivation

```properties
# Configuration dans core.properties
flower.facts.documents.create.enabled=true
flower.facts.documents.read.enabled=false
flower.facts.tasks.assign.enabled=true
```

### Rétention des données

La durée de conservation des faits peut être configurée :
```properties
# Durée en jours
flower.facts.retention.days=365
# Purge automatique
flower.facts.cleanup.enabled=true
```

## Exploitation de l'historique

### Consultation

L'historique est accessible :
- **Interface web** : onglet historique de chaque composant
- **API REST** : endpoints dédiés aux faits
- **Rapports** : exports et statistiques

### Analyse

L'historique permet :
- **Audit** : traçabilité des actions
- **Statistiques** : analyse d'usage
- **Debug** : investigation d'incidents
- **Conformité** : respect des réglementations