---
title: Filigranes
---

Ce guide va vous aider à configurer ARender pour afficher un filigrane sur toutes les pages du document, à la visualisation et au téléchargement.

## Utilisation du filigrane par défaut

Un filigrane par défaut est pré-configuré dans ARender. Son contenu textuel est le suivant : *Viewed by $USERNAME$ at $TIMESTAMP$*
$USERNAME$ sera remplacé par le nom de l'utilisateur courant
$TIMESTAMP$ sera remplacé par la date et l'heure d'ouverture du document

### Configuration

Pour configurer l'affichage du filigrane il faut ajouter les propriétés ci-dessous dans la configuration serveur de ARender (*configurations/arender-custom-server.properties*) :

```xml
<!-- Commentaire nettoyé -->
```

```cfg
# Configuration de l'activation de l'ajout d'un filigrane à la visualisation
# et au téléchargement via fichier de propriété
arender.server.watermark.display.provider=activableDisplayWatermarkProvider
# Activation du filigrane à la visualisation et au téléchargement
arender.watermark.activate.on.startup=true
# Activez le traitement du rendu des annotations si vous devez utiliser la biffure ou le filigrane. Peut avoir un impact sur les performances si les annotations mettent du temps à être récupérées.
arender.server.process.annotations.rendition=true
```


### Activation

Pour activer la configuration précédente redémarrer simplement l'application WEB ARender Web-UI.

## Pour aller plus loin

### Créer votre propre filigrane

Vous pouvez créer le filigrane de votre choix en configurant son style et son contenu textuel avec des variables comme la date du jour et le nom de l'utilisateur.
Ci-dessous le filigrane par défaut de ARender :


```xml
**
    
    
        <value type="com.arondor.viewer.annotation.common.AnnotationType">Stamp<!-- Commentaire nettoyé -->
    
    
        **
            
            
            
            
            
            
            
        **
    <!-- Commentaire nettoyé -->
    
**
```


#### Créer votre filigrane

Pour créer votre filigrane :

- Copier le contenu ci-dessus dans votre configuration spécifique ARender (*arender-custom-server-integration.xml*)
- Modifier l'ID du bean
- Définir le style et le contenu textuel en modifiant les propriétés sous *AnnotationStyle*

#### Pour configurer l'utilisation de votre filigrane  

Ajouter la propriété ci-dessous dans la configuration serveur de ARender (*configurations/arender-custom-server.properties*).
Sa valeur doit être la valeur de l'ID du bean que vous venez de créer.


```cfg
# Configuration du bean du filigrane à utiliser à la visualisation et au téléchargement de document
arender.watermark.bean.name=ChangeWithYouBeanId
```


### Activer votre filigrane

Pour activer la configuration précédente redémarrer simplement l'application WEB ARender Web-UI.
