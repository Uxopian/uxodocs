---
title: Release notes
description: Release notes
---

import FlowerDocsDownloads from '@site/src/components/FlowerDocsDownloads';

# Evolutions

## Administration

- Administration des réponses de tâches ayant un motif ().
- Accès facilité à l'administration Kibana depuis l'administration des rapports FlowerDocs ().

## ARender

- Montée de version ARender : 4.0.8-10922-10986 ().
- Les actions disponibles pour les annotations correspondent uniquement aux actions possibles par l'utilisateur ()
- La réponse à une annotation n'est possible que si l'utilisateur a le droit de créer des annotations ().
- L'erreur lors de la mise à jour d'une annotation non autorisée ne bloque pas les futures mise à jour d'annotation ().

## Exploitation

- **Montée de version :**
    - ARender : 4.0.4-2 à 4.0.8-10922-10986 ().
    - ImageMagick : 6 à 7 et + (). [Prérequis ARender Rendition](https://arender.io/doc/actuelle4/documentation/install/rendition/prerequis.html#configuration-logicielle-requise)
- Les logs ARender sont écrits dans un fichier dédié ().
- Les logs dans un fichier ou dans la console sont désactivables ().

## Sécurité

- Support des sous domaines LDAP ().
- Sécurisation de la redirection après authentification ().

## GUI

- Export des résultats de recherches de façon asynchrone pour de meilleures performances ().

## Ergonomie

- Amélioration de l'affichage des tableaux de résultats de recherches
- Un message plus explicite est affiché lorsqu'un utilisateur essaie de télécharger un dossier sans contenu ().

# Corrections

- Initialisation des classes de tâches en tant qu'administrateur avec le connecteur FileNet ().
- La sélection du dossier parent d'un document permet de sélectionner uniquement un dossier parent ().
- Dans un tableau de résultat, l'identifiant d'une valeur de condition sans label internationalisé est affiché à la place d'une valeur vide ().
- Les recherches sauvegardées dans une version 2.3 permettent d'afficher les mêmes colonnes dans cette version ().
- Le scroll dans l'administration des configurations est fonctionnel ().

# Correctifs

## 2.4.4.1 _04/05/2020_

- Lors du renommage d'une recherche sauvegardée, le nombre d'éléments par page n'est plus affiché ().
- La détection de type mime lors du téléchargement du contenu d'un document n'est plus sensible à la casse ().
- Correction d'un conflit de version pour les librairies de _logging_ pour la webapp ARender ().
- L'application \{\{% core %\}\} démarre correctement avec la configuration du cache en mémoire ().

## 2.4.4.2 _13/05/2020_

- Les annotations d'obfuscation peuvent être supprimées ().
- La suppression de toutes les annotations d'un document ne garde plus une entrée vide en cache ().

## 2.4.4.3 _13/05/2020_

- **Montée de version :** ARender : 4.0.8-10922-10986 à 4.0.8-10922-10986-11110-10793-1 ().

## 2.4.4.4 _19/05/2020_

- Le _parsing_ d'annotations ayant du contenu `RichText` malformé ne bloque plus l'affichage des annotations ().
- L'annotation d'obfuscation de zone est désactivée ().
- **Montée de version :** ARender : 4.0.8-10922-10986-11110-10793-1 à 4.0.8-11145 (, ).

## 2.4.4.5 _25/05/2020_

- **Montée de version :** ARender : 4.0.8-11145 à 4.0.8-11145-2 ().

<FlowerDocsDownloads version="2.4.4" />
