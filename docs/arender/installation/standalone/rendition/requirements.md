---
title: Prérequis
---

## Système d'exploitation

| Catégorie | Pré-requis                                                                                                                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Windows   | Windows Server 2016 ou supérieur                                                                                                                                                                             |
| Linux     | Linux Noyau 2.6 ou supérieur, glibc 2.14 ou supérieur. Distributions Linux correspondant à nos pré-requis logiciels : RedHat (7 ou 8), CentOS (7), Debian (8), Ubuntu (14.04+), Amazon Linux AMI (2016.09+)  |

## Configuration matérielle

| Catégorie   | Minimum | Conseillé                                                                                        |
| ----------- | ------- | ------------------------------------------------------------------------------------------------ |
| Nb Serveur  | 1       | 2 (Haute disponibilité)                                                                          |
| RAM         | 8Go     | 16Go                                                                                             |
| CPU (vCPU)  | 4       | 8                                                                                                |
| Type de CPU | 64Bits  | 64Bits                                                                                           |
| Stockage    | 20Go    | Le maximum entre 20Go et une capacité permettant de stocker une journée de documents temporaires |

## Configuration des ports

Les différents ports des micro-services doivent être libre. Ces ports sont :

| Service              | Protocoles  | Port d'écoute par défaut  |
| :------------------- | :---------: | :-----------------------: |
| Service broker       | HTTP/HTTPS  |                     8761  |
| Text handler         |    HTTP     |                     8899  |
| Renderer             |    HTTP     |                     9091  |
| Converter            |    HTTP     |                    19999  |

## Configuration logicielle

| Logiciel                     | Pré-requis                                                                   |
| ---------------------------- | ---------------------------------------------------------------------------- |
| Java Runtime                 | JRE 1.8 64 bits Minimum, OpenJDK 11 conseillé. JRE IBM J9 est non supportée. |

Le serveur de rendition vérifie désormais que la JVM est 64 bits et va s'arrêter sinon.
Cette erreur pourra se lire dans les logs ou la console selon le mode de démarrage de la rendition.

## Droits d'accès

### Installation

L'utilisateur doit avoir les droits suivants :
* Création de dossier
* Création de service

### Exécution

L'utilisateur doit avoir les droits suivants :
* Lecture et exécution sur tous les fichiers du dossier de la Rendition,
* Lecture et exécution sur tous les logiciels additionnels.

## Spécificités pour Amazon Web Services (AWS)

Assurez-vous que le rôle attribué à l'instance EC2 dispose des permissions pour décrire l'instance si celle-ci doit être
identifiée par un tag.