---
title: Sauvegarde des documents découpés
---

## Configuration de la politique de sauvegarde des documents découpés

### Prérequis

Ci-après sera décrit la configuration de l'interface avec ajout de
propriétés par profil.

Ainsi, avant de continuer assurez-vous d'avoir lu le chapitre : [Guide de
```xml
configuration de la WEB-UI](<!-- Commentaire nettoyé -->).
```

Par ailleurs, pour créer de nouveaux documents avec ARender il faut que
la fonctionnalité de découpage/fusion de document soit activée :

```cfg
documentbuilder.enabled=true
```

### Tutoriel valable pour les versions strictement inférieures à la version 3.1.4

Il est possible de définir différents comportements sur la sauvegarde
d'un document découpé avec ARender.

Pour cela il faut modifier le fichier de profil en s'appuyant sur les
propriétés suivantes :

```cfg
documentbuilder.save.behavior=UPDATE_NO_DOCUMENT
```

Rôle : Attribution du comportement à adopter lors du clic sur la disquette de
sauvegarde du document.

Valeurs possibles :

CREATE_NEW_FIRST_DOCUMENT : Création d'un nouveau document dans la
GED.

UPDATE_FIRST_DOCUMENT : Création d'une nouvelle version du document
dans la GED.

UPDATE_NO_DOCUMENT : Aucune action côté GED.

```cfg
documentbuilder.save.download=true
```

Rôle : Activation/désactivation du téléchargement du document découpé sur le
poste client.

Valeurs possibles : true/false.

### Tutoriel valable pour les versions 3.1.4 et supérieures

Il est possible d'afficher différents bouton dont le comportement sur la
sauvegarde d'un document découpé avec ARender est spécifique.

Pour cela, il faut modifier le fichier de profil en s'appuyant sur les
propriétés suivantes :

```cfg
documentbuilder.button.legacySave.enabled=true
```

Rôle : reprise de comportement des versions précédentes (cf. ci-dessus : [Tutoriel valable pour les versions strictement inférieures à la version 3.1.4](#Tutoriel valable pour les versions strictement inférieures à la version 3.1.4))

Valeurs possibles : true/false.

```cfg
documentbuilder.button.download.enabled=true
```

Rôle : Activation/désactivation du bouton de téléchargement du document
découpé sur le poste client.

Valeurs possibles : true/false.

```cfg
documentbuilder.button.createFirst.enabled=true
```

Rôle : Activation/désactivation du bouton de création d'un nouveau document en
GED correspondant au document découpé.

Valeurs possibles : true/false.

```cfg
documentbuilder.button.updateFirst.enabled=true
```

Rôle : Activation/désactivation du bouton de création d'une nouvelle version du document en GED correspondant au document découpé.

Valeurs possibles : true/false.
