---
title: Fonctionnalités Alfresco Content Services
---

## Utilisation des rôles et permissions Alfresco dans ARender

### Introduction

Alfresco comporte un système d'autorisation : un utilisateur a un rôle qui détermine ce qu'il peut et ne peut pas faire sur un site particulier. Chaque rôle possède un ensemble d'autorisations par défaut.
Les sections suivantes décrivent ces autorisations :

- Les **gestionnaires** ont tous les droits sur tout le contenu du site - ce qu'ils ont créé eux-mêmes et ce que les autres membres du site ont créé.
- Les **collaborateurs** ont tous les droits sur le contenu du site qu'ils possèdent, ils ont le droit de modifier mais pas de supprimer le contenu créé par d'autres membres du site.
- Les **contributeurs** ont tous les droits sur le contenu du site qu'ils possèdent, ils ne peuvent pas modifier ou supprimer le contenu créé par d'autres membres du site.
- Les **consommateurs** ont des droits en lecture seule sur un site : ils ne peuvent pas créer leur propre contenu.

## Les rôles utilisateur pour ARender

ARender peut désactiver certaines fonctionnalités en fonction du rôle Alfresco de l'utilisateur connecté.

- Les **gestionnaires** et les **collaborateurs** ont toutes les fonctionnalités d'ARender.
- Les **contributeurs** peuvent uniquement modifier et supprimer leurs propres annotations. Ils ne peuvent pas non plus supprimer le contenu de rédaction.
- Les **consommateurs** ne peuvent pas créer, modifier ou supprimer des annotations, utiliser le document builder, créer un bookmark ou utiliser la fonctionnalité de rédaction.

Pour activer l'utilisation des rôles Alfresco, utilisez la propriété suivante :

```cfg
arender.server.alfresco.use.roles=true
```

### Customisation des rôles Alfresco

Les droits pour chaque rôle peuvent être changés, pour cela des fichiers de configuration doivent être modifiés :

#### configurations/arender-custom-server.properties

Ce fichier contient divers droits ARender sous forme de propriétés et sont associés aux rôles Alfresco, par défaut :


```cfg
arender.server.alfresco.role.create.annotation=SiteManager,SiteCollaborator,SiteContributor
arender.server.alfresco.role.modify.annotation=SiteManager,SiteCollaborator
arender.server.alfresco.role.modify.own.annotation=SiteContributor
arender.server.alfresco.role.create.redaction=SiteManager,SiteCollaborator,SiteContributor
arender.server.alfresco.role.delete.redaction=SiteManager,SiteCollaborator
```


| Propriétés                                            | Droit                                             |
| ----------------------------------------------------- | ------------------------------------------------- |
| arender.server.alfresco.role.create.annotation        | Permet la création d'annotations                  |
| arender.server.alfresco.role.modify.annotation        | Permet la modification d'annotations              |
| arender.server.alfresco.role.modify.own.annotation    | Permet la modification de ses propres annotations |
| arender.server.alfresco.role.delete.redaction         | Permet la suppression de contenu redact           |
| arender.server.alfresco.role.create.redaction         | Permet la création de contenu redact              |

Ces propriétés peuvent être modifiées pour, par exemple, pour restreindre la création d'annotations aux Managers et Contributeurs :


```cfg
arender.server.alfresco.role.create.annotation=SiteManager,SiteContributor
```


Pour paramétrer l'utilisation du document builder et des bookmarks, un autre fichier doit être configuré : **role-*roles*.properties**

Pour exemple, la création de bookmarks, pour le rôle manager, peut être permise en ajoutant dans le fichier **role-sitemanager.properties** la ligne suivante :


```cfg
bookmarkexplorer.add.bookmark.enabled=true
```


### Utilisation des rôles via les permissions pour ARender

Dans Alfresco, des rôles spécifiques peuvent être attribués pour chaque utilisateur ou groupe pour des fichiers ou dossiers individuels depuis la gestion de permissions.

Il est possible de retrouver la liste des permissions liées à un node depuis l'API alfresco : */alfresco/s/slingshot/doclib/permissions/workspace/SpacesStore/node*

Pour activer l'utilisation des permissions :
```cfg
arender.server.alfresco.use.permissions=true
```

Quand un document est ouvert, toutes les permissions associées à l'utilisateur courant sont récupérées :

- Les permissions directement associées à l'utilisateur.
- Les permissions associées aux groupes dont l'utilisateur appartient.
- Les permissions héritées du dossier parent.
- Le rôle associé à l'utilisateur du site.

Pour choisir le rôle à appliquer selon les permissions récupérées, une configuration hiérarchique existe :
```cfg
arender.server.alfresco.role.hierarchy=SiteManager,SiteCollaborator,SiteContributor,SiteConsumer
```

Les rôles y sont écrits de la plus grande priorité à la plus petite.

Le rôle appliqué sera le rôle le plus élevé dans la liste correspondant aux rôles des permissions retrouvées.

Si aucun des rôles retrouvés ne correspond à un rôle de la liste **arender.server.alfresco.role.hierarchy**, alors le rôle le moins élevé de la liste est appliqué.
Si la liste **arender.server.alfresco.role.hierarchy** est vide, une liste par défaut est alors prise en compte et a pour valeur : 
```cfg
SiteManager,SiteCollaborator,SiteContributor,SiteConsumer
```
## Annotation 

#### Désactivation de la migration des annotations

Ajouter la propriété ci-après si les deux conditions suivantes sont respectées :
* Aucune annotation ARender n'est présente dans Alfresco,
* ou, les annotations ARender présentes dans Alfresco n'ont été créées **qu'avec des versions d'ARender postérieur à la version 4.0.9**


```cfg
arender.server.alfresco.annotation.migrate.to.new.child.api=false
```


## Document Builder

### Transférer les annotations via le document builder

Lors de la création ou de la mise à jour d'un nouveau document dans le document builder, les annotations présentes sur le document en cours peuvent être transférées sur le nouveau document.
Pour cela, la propriété **arender.server.alfresco.document.builder.transfer.annotations** doit être activée :


```cfg
arender.server.alfresco.document.builder.transfer.annotations=true
```


### Mise à jour de tous les documents après un découpage de documents

En utilisant fonctionnalité de découpage/fusion de document, la mise à jour de tous les documents est permise avec la propriété :


```cfg
documentbuilder.button.updateAll.enabled=true
```


Plusieurs versions du document original seront ainsi créées correspondant aux découpages effectués. Le transfert d'annotation est possible avec cette fonctionnalité.

### Nombre de renommages de document sauvegardés

Quand un utilisateur sauvegarde un nouveau document via le Document Builder ARender, le titre du document peut déjà exister dans Alfresco. Dans ce cas, ARender va renommer le titre du document avec un nombre. Exemple : *titreDocument(1).pdf*.

Le nombre de renommages est de 5 par défaut. Pour modifier cette valeur ajouter la propriété ci-dessous :


```cfg
arender.server.alfresco.document.builder.number.try.rename.document=5
```


## Afficher l'activité de la visualisation de document

Par défaut, l'événement de la visualisation d'un document dans Alfresco est affiché dans le tableau *My activities*.

Pour avoir cet événement avec ARender, une propriété doit être activée :


```cfg
arender.preview.activity.feed.enabled=true
```


## Afficher des métadonnées Alfresco dans la vignette

Pour activer l'affichage de métadonnées dans la vignette du document, la propriété *arender.server.alfresco.show.metadatas* doit être activée.


```cfg
arender.server.alfresco.show.metadatas=true
```


Pour spécifier quelle métadonnée sera affichée dans la vignette, leurs noms devront être renseigner dans la propriété *arender.server.alfresco.included.metadatas*

Ils devront correspondre au nom de propriétés situées dans le champ *properties* lors de l'appel à l'URL de récupération de métadonnées Alfresco  *http://127.0.0.1:8080/alfresco/service/api/metadata?nodeRef=XXX&shortQNames*

Plusieurs propriétés peuvent être affichées séparés par une virgule, ainsi, pour afficher la date de création d'un document et son type de version, la propriété doit être :


```cfg
arender.server.alfresco.included.metadatas=cm:created,cm:version_type
```


Le formatage de l'affichage des dates de création et de modification peut-être changé avec la propriété *date.format*, par défaut : 


```cfg 
date.format=dd-MM-yyyy HHss
```

