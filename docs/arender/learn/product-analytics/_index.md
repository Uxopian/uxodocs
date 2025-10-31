---
title: Product Analytics
---

## Qu'est-ce que le Product Analytics dans ARender ?

Depuis la version 2023.5.0, ARender inclut une fonctionnalité d'analyse produit alimentée par Mixpanel, permettant à 
l'équipe Uxopian de mieux comprendre comment ARender est utilisé dans des situations réelles. Cette fonctionnalité est 
activée par défaut et peut être facilement désactivée en configurant un simple paramètre en suivant le guide de configuration
d'ARender.

### Pourquoi l'analyse produit ?

L'objectif principal de l'analyse produit dans ARender est d'aider l'équipe Uxopian à :

* Obtenir des informations précieuses sur l'utilisation des fonctionnalités.
* Identifier les fonctionnalités les plus et les moins utilisées.
* Prioriser les améliorations et les nouveaux développements dans la feuille de route du produit.

Cela garantit qu'ARender évolue en fonction des besoins réels des utilisateurs, offrant finalement une meilleure 
expérience pour tous.

### Confidentialité et conformité

La fonctionnalité d'analyse produit est conforme au **RGPD** et respecte la vie privée des utilisateurs :

* Toutes les données sont stockées en Europe, garantissant la conformité aux règlements sur la protection des données.
* Aucun contenu de document, annotation ou métadonnée n'est transmis.
* Les données collectées se limitent uniquement à des métriques d'utilisation des fonctionnalités.

Avec cette configuration, les utilisateurs peuvent être assurés que leurs informations sensibles restent privées et 
sécurisées.

### Quelles données sont collectées ?

Voici les métriques spécifiques suivies par la fonctionnalité d'analyse produit :

#### Utilisation des documents

* **Ouverture de documents** : Suivi de l'ouverture d'un document. Cela inclut des informations sur le type MIME et sur 
  le nombre de documents ouverts.

#### Annotations

* **CRUD des annotations** : Suivi du nombre d'annotations créées, mises à jour et supprimées, ainsi que de leurs types.

* **Mode annotation répétée** : Suivi de l'utilisation de toute fonctionnalité d'annotation répétée.

#### Navigation et Interaction

* **Lasso** : Suivi de l'utilisation de la fonctionnalité lasso.

* **Recherche de texte** : Suivi de l'utilisation de la fonctionnalité de recherche de texte.

* **Rotation de page** : Suivi de l'utilisation de la fonctionnalité de rotation.

* **Zoom sur le document** : Suivi de l'utilisation de la fonctionnalité de zoom.

* **Mode plein écran** : Suivi de l'utilisation du mode plein écran.

#### Manipulation de Documents

* **Constructeur de document** : Suivi de l'utilisation de la fonctionnalité DocumentBuilder.

* **Comparaison de document** : Suivi de l'utilisation de la fonctionnalité de comparaison.

#### Exportation et Production

* **Impression en PDF** : Suivi de l'utilisation de la fonctionnalité d'impression.

* **Téléchargement de documents** : Suivi de l'utilisation de la fonctionnalité de téléchargement.

* **Filtrage d'images** : Suivi de l'utilisation de la fonctionnalité de filtre d'image.

### Collecte de Données Sûre et Ciblée

Les données d'analyse collectées servent uniquement à améliorer l'expérience utilisateur. Ces données sont examinées par
l'équipe Uxopian pour :

* Comprendre comment les fonctionnalités sont utilisées.

* Identifier les points de friction ou les fonctionnalités sous-utilisées.

* Prioriser les mises à jour et améliorations futures.

Cette fonctionnalité est conçue en tenant compte de la sécurité et de la confidentialité des utilisateurs, garantissant 
qu'aucune donnée sensible des documents n’est jamais exposée.
En utilisant l'Analyse Produit, ARender devient un outil plus intelligent et ciblé, mieux adapté à ses utilisateurs.

### Notes de Configuration

Pour le bon fonctionnement de l'Analyse Produit, assurez-vous que l’URL https://api-js.mixpanel.com/ est autorisée sur
la machine des utilisateurs.

Pour désactiver l'Analyse Produit, définissez la propriété **arender.data.analytics.enabled** à false dans les
paramètres de configuration. (Plus d'informations 
```xml
[ici](<!-- Commentaire nettoyé -->)).
```
