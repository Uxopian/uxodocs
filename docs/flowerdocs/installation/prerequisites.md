---
title: "Prérequis"
---

# Prérequis

:::info
Cette section décrit les prérequis des applications FlowerDocs GUI, FlowerDocs Core et ARender HMI
:::

:::warning
Attention à harmoniser la configuration date/heure sur les différents serveurs composant l'architecture cible en utilisant le même timezone (serveurs FlowerDocs mais aussi tous les composants tiers). Les écarts peuvent poser des problèmes lorsque FlowerDocs vérifie la validité d'un jeton (SSO, Web Services ...).
:::

:::warning
FlowerDocs doit être utilisé uniquement en HTTPS.
:::

## Système d'exploitation

### Linux

L'installation d'une plateforme FlowerDocs nécessite des serveurs Linux. FlowerDocs est supporté et qualifié sur le système Amazon Linux 2023. 

*Tout autre système Linux est réputé fonctionnel s'il permet d'installer la version de Java requise.*

## Composants applicatifs

L'installation de Java Runtime 11 est nécessaire au démarrage de l'installation de la plateforme.

:::warning
Cette documentation ne couvre pas l'installation du serveur de rendition ARender. Il doit donc être installé au préalable et être accessible via le protocole HTTP ou HTTPS depuis FlowerDocs GUI, FlowerDocs Core et ARender HMI
:::

### OpenSearch et Redis

Il est nécessaire d'installer OpenSearch et Redis qui sont des pré-requis au bon fonctionnement de FlowerDocs.
Les versions d'OpenSearch et Redis correspondant aux versions FlowerDocs sont indiquées au début des releases notes.

## Dimensionnement

L'architecture est dépendante de la charge estimée mais il est recommandé d'avoir au minimum :

| Composant | vCPU | RAM | Note |
|-----------|------|-----|------|
| **FlowerDocs** | 2 | 4 Go | Les applications FlowerDocs GUI, FlowerDocs Core et ARender HMI doivent être installées sur des serveurs distincts. |
| **ARender Rendition Server** | 4 | 8 Go | Le dimensionnement d'un serveur de rendition est fortement lié à la typologie et aux nombres de documents visualisés. |

## Recommandations réseau

### Bande passante

La bande passante nécessaire dépend du nombre d'utilisateurs simultanés et du type d'utilisation :
- **Consultation simple** : 1 Mbps par utilisateur
- **Visualisation intensive** : 5 Mbps par utilisateur
- **Upload/Download de gros volumes** : adapter selon les besoins

### Latence

Pour une expérience utilisateur optimale :
- **Latence recommandée** : < 50ms entre les composants
- **Latence maximale acceptable** : < 200ms

## Stockage

### Espace disque

Le dimensionnement de l'espace de stockage dépend :
- Du volume de documents à stocker
- De la politique de rétention
- Des besoins de sauvegarde

**Recommandations minimales** :
- **Système** : 50 Go
- **Logs** : 10 Go (avec rotation)
- **Documents** : selon les besoins métier