---
title: Release notes
description: Release notes
---

:::info
✅ Les évolutions, 🔴 corrections d'anomalies et 📋 tâches incluses dans cette version sont listées dans cette section.
:::


# Changements importants de la 2.6.0
## Montées de versions

Afin de profiter des correctifs de sécurité, des nouvelles fonctionnalités et de versions supportées par leurs éditeurs, les montées de versions suivantes ont été effectuées : 
✅ ARender 4.8.5

✅ Redis 6.2.7

✅ Spring Boot 2.5.14

✅ FontAwesome 6.1.1

✅ JDK11

## Migration de Elasticsearch 5.2 vers OpenSearch 

✅ Support d'OpenSearch 1.3.4 

✅ Support d'OpenSearch Dashboards pour l'affichage des rapports
<br /><br />
✅ Afin de faciliter et automatiser la montée de version suite au support d'OpenSearch au profit d'Elasticsearch, un job de migration est intégré au CLM. 

## Configuration

✅ La propriété `autoAssign` est maintenant portée par la classe de tâche et plus par la configuration de l'activité de l'interface graphique. 

## Interface graphique 

✅ Dans notre volonté de mise en conformité avec le RGAA, les contrastes ont été réhaussés et les couleurs de FlowerDocs variabilisées afin de permettre la personnalisation de FlowerDocs en toute simplicité.

## Sécurisation applicative

✅ FlowerDocs Core expose un ensemble de services pouvant être consommés via différents clients. La cohérence d'évaluation des permissions de l'utilisateur courant a été amélioré quel que soit le client utilisé.

## Documentation

Dans une volonté de faciliter le support et les intégrations sur la version 2.5.4 de FlowerDocs, la documentation de cette version reste disponible  jusqu'à la sortie de la prochaine version majeure. 

# Fonctionnalités clés 
## Traitement en série 

✅ Un traitement plus performant des composants : le traitement des composants en série. Au cours d'une session de traitement d'une liste de composants l'utilisateur passe au composant suivant sans revenir sur la place ayant initiée la session.

{/* Comment: WEBEditor / MailEditor */}
## WEBEditor / MailEditor

✅ WEBEditor : Création et édition de contenu depuis FlowerDocs. 

✅ MailEditor : Envoi de mail depuis FlowerDocs. **Dépréciation de l'usage du plugin Plume**.

<br />

Les deux plugins s’ouvrent dans un OffMenu pour permettre à l’utilisateur de mettre en pause l’édition de contenu et de le reprendre au moment opportun. Il permet également de chercher la ou les pièces jointes adéquates dans FlowerDocs.

<br />

*Plus d'informations bientôt dans la .*
{/* End comment */}

## Nouveau mode d'affichage de contenu 

✅ Cette nouvelle version intègre un tout nouveau mode d'affichage de contenu : le OffMenu. 

<br/>

Ses objectifs : permettre la consultation d'informations en parallèle et répondre à de nombreux cas d'usage à forte navigation. Comment ? Grâce à un mode d'affichage de contenu dans un panneau latéral repliable et conservable au cours de la navigation. 

## Recherche plein texte

✅ Refonte de la fonctionnalité de recherche plein texte 

✅ Extraction de contenu des documents textuels et OCRisation des images avec un OperationHandler  

## FlowerDocs Companion

📋 Refonte du plugin Office désormais nommé FlowerDocs Companion. Support de Microsoft Excel, Microsoft PowerPoint et édition de contenu font parties de ses nouvelles fonctionnalités. 

# Changelog 

## GUI 
### Versioning  

✅ La gestion de promotion des versions d'un document est maintenant possible par les utilisateurs en fonction de la stratégie définie sur la classe de document. .

🔴 Absence de génération d'identifiant de version lors de la création d'un document dans le cas où le moteur génère déjà cet identifiant. 

### ARender

✅ Afin de faciliter la saisie des utilisateurs et réduire les erreurs de saisie, FlowerDocs intègre la fonctionnalité de Lasso d'ARender. Ainsi, la sélection de valeurs dans le contenu du document visualisé permet de remplir les tags du composant ouvert.

✅ Désactivation des appels à la page mère d'ARender par configuration

🔴 L'ouverture de fichier externe dans ARender ne doit pas être possible.

🔴 La sélection d'une pièce jointe de tâche affiche son contenu dans ARender. Dans un cas particulier, ceci n'avait pas lieu.

### Expérience utilisateur 

✅ Refonte des icônes des actions d'assignation

🔴 Les vignettes ont toutes la même taille. Leur titre est tronqué suite au manque d'espace et est lisible au survol.

🔴 Les icônes des enveloppes dans les tableaux de résultats de recherche ont les couleurs souhaitées.

🔴 Les critères de recherche sont affichés une seule fois lors de l'ouverture d'un recherche depuis un Dashlet.

🔴 Un message d'erreur du chargement de contenu est affiché à l'utilisateur lorsque celui-ci échoue

🔴 Le menu est chargé correctement dans le cas où des onglets sont non résolus.

### Favoris 

✅ Le menu des favoris, déjà présent dans les versions antérieures, a évolué pour permettre une consultation de tous les favoris organisés selon leur catégorie. Leur gestion en est aussi améliorée avec la possibilité d'en supprimer directement depuis le menu sans nécessiter la réouverture du composant.

🔴 Le chargement des favoris est terminé en cas d'erreur à la récupération de ceux-ci.

🔴 Le fil d'Ariane est correctement mis à jour lors de l'ouverture d'un favori.

## Intégration 
### API JS 

✅ L'API JS de FlowerDocs permet de construire des formulaires d'indexation de composants


🔴 La valeur d'un tag ayant des suggestions ajoutées en intégration est modifiable via l'API JS

<br />

✅ Plusieurs plugins d'attachement de pièces jointes de tâches sont désormais disponibles : 

* ✅ l'ajout d'un composant déjà présent en GED basé sur une recherche
* ✅ la création/édition d'un composant via le WEBEditor
* ✅ l'édition d'un document à partir d'un modèle via FlowerDocs Companion
* ✅ Un plugin de visualisation des métadonnées des pièces jointes dans un OffMenu

### Opérations

✅ Le service des `Features` est accessible depuis les `OperationHandlers`


### Workflow 

✅ Les processus Camunda peuvent réagir à la création d'un utilisateur

✅ Une tâche de purge périodique de l'historique de connexion est disponible dans Camunda 

🔴 Le scope est toujours fourni aux tâches de type Script dans Camunda

✅ Lancement d'un processus possible depuis l'administration des processus

## Sécurité 

###  GUI

✅ Support des ACL proxys pour l'évaluation des permissions lors de l'affichage des actions du menu contextuel  

✅ L'affichage d'un panneau de chargement empêche toutes actions utilisateur durant la suppression d'un composant 

🔴 Il n'est plus possible de détacher un composant ouvert en lecture seule d'un dossier

🔴 Désactivation des actions de sauvegarde et de réponse des tâches jusqu'à l'obtention d'une tâche valide

🔴 La mise à jour du titre d'un composant sans classe valide ne modifie plus la validité du composant.  

🔴 La validité d'une popup de création de composant prend en compte son titre. 

🔴 La déconnexion est effectuée sur tous les onglets

### Connexions 

✅ Enregistrement des connexions par OAuth2 dans l'historique de connexion 

🔴 La désactivation de l'évaluation du paramètre `nonce` n'est plus possible.

## Performance 

✅ Le contenu temporaire d'un document en création est déplacé si possible afin d'éviter de multiples étapes d'écriture 

🔴 Une seule requête est envoyée à l'ouverture d'une popup de recherche. 

🔴 Les polices utilisées dans FlowerDocs sont maintenant toutes incluses dans le produit sans être chargées par des sites externes

## Exploitation

✅ Support du service AWS ElastiCache en lieu et place de Redis.

✅ Le endpoint de `health` est exposée sans authentification requise pour les applications portant l'annotation `@FlowerDocsClient` 

✅ Pour une lecture facilitée et une analyse simplifiée, les logs client sont déobfusqués.

✅ Clarification des erreurs des classes de composants

# Correctifs

## 2.6.0.1 _26/10/2022_

### Évolution
✅ Montée de version ARender 4.8.7

✅ Création de `réponse avec motif` avec tags depuis la JSAPI FlowerDocs

✅ Ajout de la classe `java.lang.Runnable` à la liste des classes chargées et utilisables par les Drools, scripts etc.

### Anomalie

🔴 Le statut d'un composant est conservée lors de la création  

🔴 Paramétrage du client TCP de Redis

🔴 Restauration des délégations pour toute action sur les tâches

🔴 L'action de lasso est accessible uniquement pour les champs éditables

🔴 Le cadenas indique que le composant est réservé par un autre utilisateur

🔴 Les titres des composants sont editables en fonction du context `IdBasedContext`

🔴 Restauration de l'auto assignation avec Alfresco

🔴 Gestion des erreurs OpenSearch 

🔴 Traduction du libellé d'auto assignation

🔴 Les tags des tâches sont toujours affichés avant les pièces jointes

🔴 Restauration de la résolution des plugins d'IHM

🔴 Restauration de la route Plume jusqu'à la fin de son support

🔴 Le CLM utilise les même configuration Jasypt que \{\{% core %\}\}

🔴 Application de réponses à une tâche sans erreur

🔴 Restauration de l'affichage de la description de l'application

🔴 La tâche en édition prend en compte les modifications effectuées par un `OperationHandler` à l'assignation

🔴 Les actions effectuées lors de l’application d’une réponse via un `OperationHandler` ne sont pas soumises aux droits de l’utilisateur

### Tâche

📋 Restauration de la création de tâche empreinte de workflow

📋 Le libellé de l'action de plein écran du `MailEditor` est positionné à droite pour éviter d'être tronqué

## 2.6.0.2 _21/11/2022_

### Évolution

✅ La notion de `lecture seule` des tags et pièces jointes est uniquement vérifiée par l'IHM 

✅ La liste de classes pouvant être créées pour les pièces jointes autorisant toutes les classes peut désormais être filtrée

### Anomalie

🔴 La réservation d'un composant est supprimée lors de la déconnexion de l'utilisateur

🔴 Le mapping des index est migré lors de la migration ElasticSearch vers OpenSearch 

🔴 Restauration de la visualisation du contenu de tous les niveaux d’arborescences d’un dossier virtuel dans ARender

🔴 L'action de Lasso n'est plus affichée sur les champs affichés en `lecture seule` grâce à l'API JS
  
🔴 Restauration du mode MultiDAO bloquant le démarrage de FlowerDocs Core

## 2.6.0.3 _21/12/2022_

### Évolution

✅ Le job de réindexation du CLM `reindex` dispose d'une option permettant la réindexation des rapports Kibana ou non `--reindexation.reportings.enabled=true` (par défaut désactivé)

✅ Ajout de logs d'erreur sur l'authentification OpenId Connect facilitant l'analyse

### Anomalie

🔴 L'action de Lasso est affichée après le changement de classe d'un composant

🔴 L'action de Lasso est affichée une seule fois sur les dossiers virtuels

🔴 Le job de réindexation du CLM `reindex` pour passer d'Elasticsearch à OpenSearch gère la transformation du mapping des données

🔴  L'action de Lasso n'est plus affichée sur les tags en lecture seule à la création d'un composant

