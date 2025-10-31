---
title: Installation dans ICN
---

Nous continuons ici l'installation mais dans le module ICN de FileNet.

## Prérequis

Pour l'utilisation du SSO entre ICN et ARender, il faut savoir que le SSO inter-domaine n'est pas supporté. Par exemple z.AAAcompany.com et w.BBBcompany.com, où les domaines DNS sont différents.
Plus d'information ci-après : https://www.ibm.com/docs/fr/was-nd/8.5.5?topic=authentication-single-sign-using-ltpa-cookies


## Récupérer l'archive du serveur de présentation

En utilisant l'identifiant et mot de passe préalablement fournis,
vous pouvez récupérer le plugin navigator

## ARender et IBM Content Navigator (ou encore IBM Content Manager)

### Partage de clef LTPA

Afin de permettre l’utilisation de la session utilisateur (ICN) au sein d’ARender Web-UI, il faut mettre en place la configuration LTPA, comme suit :

- Export de la clef LTPA du CPE

Dans la console d’administration WebSphere du **CPE**, rendez-vous sur la page **Sécurité** > **Sécurité Globale**, dans la partie **Authentification**, cliquer sur **LTPA**

```xml
<!-- Commentaire nettoyé -->
```

Renseigner un mot de passe, un chemin d’export, puis cliquer sur « Exporter les clés »

```xml
<!-- Commentaire nettoyé -->
```

- Import de la clef LTPA du CPE dans la JVM ARender

Copier le fichier de clés sur le serveur où sera déployé ARender Web-UI

Puis, importer les clés dans le profil hébergeant ARender Web-UI depuis la console d’administration WebSphere, comme ci-desous :

- Dans la console d’administration WebSphere, rendez-vous sur la page **Sécurité** > **Sécurité Globale**, dans la partie **Authentification**, cliquer sur **LTPA**
- Renseigner le même mot de passe que précédemment
- Renseigner le chemin du fichier contenant les clés
- Cliquer sur « Importer les clés »
- Sauvegarder les modifications

### Invalidation de session lors d'un changement d'utilisateur

Depuis ICN version 3.0.6, si vous changez d'utilisateur sur la même session alors vous allez avoir un message d'erreur à l'ouverture d'un document par le nouvel utilisateur qui va ressembler à cela :



Error 500: com.ibm.websphere.servlet.session.UnauthorizedSessionRequestException: SESN0008E: A user authenticated as user389/CN=userB,CN=Users,DC=ircem,DC=dev has attempted to access a session owned by user389/CN=userA,CN=Users,DC=ircem,DC=dev


La session de l'utilisateur userA n'a pas été invalidée à sa déconnexion, ce qui va entrainer l'erreur à l'ouverture d'un document par l'utilisateur userB. Il y a une propriété à rajouter dans une console WebSphere qui va permettre d'invalider une session sur laquelle une requête non autorisée est faite. Cette invalidation de session va permettre la récupération du bon nom d'utilisateur par ARender.

#### Ajout de la propriété

- Aller sur votre console websphere puis dans le menu aller dans *servers -> server types -> websphere application servers*.
- Sélectionner le serveur sur lequel vous voulez faire la modification. Dans notre exemple, on choisit *serverICN*

```xml
<!-- Commentaire nettoyé -->
```

- Dans *Container settings* aller dans *Session management*.

```xml
<!-- Commentaire nettoyé -->
```

- Dans *Additional properties*, cliquer sur *custom properties*.

```xml
<!-- Commentaire nettoyé -->
```

- Cliquer sur *New...* pour rajouter une propriété.

```xml
<!-- Commentaire nettoyé -->
```

- Ajouter la propriété *InvalidateOnUnauthorizedSessionRequestException* avec la valeur *true* afin qu'elle soit appliquée.

```xml
<!-- Commentaire nettoyé -->
```

- Il faut ensuite cliquer sur *Ok* puis *save*. Relancer vos services Filenet pour prendre en compte cette propriété.

### Intégration du plugin arender pour FileNet

Un plugin spécifique a été développé pour permettre l’intégration d’ARender avec ICN. Nota : le connecteur ICN est basé sur la syntaxe mixedObjects cité ci-dessus.

Se connecter au Content Navigator.

Aller dans la vue « Administration » et cliquer sur « Plug-ins ».

```xml
<!-- Commentaire nettoyé -->
```

Cliquer sur « Nouveau Plug-in ».

```xml
<!-- Commentaire nettoyé -->
```

Entrer le chemin et nom du JAR et cliquer sur « Charger ».

```xml
<!-- Commentaire nettoyé -->
```

Dans le champ **ARender context root** entrer l’adresse (host + port + context root) de ARender. Cf. exemple ci-dessous :

```xml
<!-- Commentaire nettoyé -->
```

Remplissez le champ **Unauthorized Desktops for document builder (id1,id2...)** avec des valeurs d'ID de bureau séparées par des virgules.
Dans la capture d'écran ci-dessous, nous avons mis sur liste noire le bureau FakeDesktop afin que la fonction de création de documents ne soit pas activée.

```xml
<!-- Commentaire nettoyé -->
```

Remplissez le champ **Watermark applied on download** avec une paire clé-valeur séparée par des virgules contenant respectivement l'ID du bureau et le nom du bean du filigrane. Le nom du bean du filigrane doit être configuré dans ARender. Il existe des noms de bean de filigrane par défaut déjà prédéfinis dans le fichier annotationtemplate-catalog.xml, downloadWatermark et printWatermark.

Ci-dessous un exemple de filigrane à appliquer au téléchargement en fonction du bureau. Nous avons configuré le bureau OS1 pour utiliser le downloadWatermark et le bureau CustomWatermark pour utiliser également le downloadWatermark.

```bash
OS1=downloadWatermark,CustomDesktop=downloadWatermark
```

```xml
<!-- Commentaire nettoyé -->
```

Remplissez le champ **Watermark applied on print** avec une paire clé-valeur séparée par des virgules contenant respectivement l'ID du bureau et le nom du bean du filigrane. Le nom du bean du filigrane doit être configuré dans ARender. Il existe des noms de bean de filigrane par défaut déjà prédéfinis dans le fichier annotationtemplate-catalog.xml, downloadWatermark et printWatermark.

Ci-dessous un exemple de filigrane à appliquer au téléchargement en fonction du bureau. Nous avons configuré le bureau OS1 pour utiliser printWatermark et le bureau CustomWatermark pour utiliser également printWatermark.

```bash
OS1=printWatermark,CustomDesktop=printWatermark
```

```xml
<!-- Commentaire nettoyé -->
```


Pour utiliser cette mappe d’afficheur, il suffit de l’associer à un bureau (dans l’onglet général de définition du bureau, Mappe d’afficheur).

```xml
<!-- Commentaire nettoyé -->
```

Et enfin, cliquer sur « Sauvegarder ».

```xml
<!-- Commentaire nettoyé -->
```

Vous pouvez maintenant redémarrer vos serveurs d'application et tenter d'ouvrir un fichier dans FileNet.

```xml
<!-- Commentaire nettoyé -->
```

```xml
<!-- Commentaire nettoyé -->
```

## Utiliser les fonctionnalités avancées d'ARender directement depuis ICN

Les utilisateurs finaux peuvent utiliser les fonctionnalités de comparaison et de fusion/découpage de document(s) directement depuis l'interface d'ICN.

### Créer un menu ICN dédié pour afficher les fonctionnalités avancées ARender

* Dans ICN, ouvrir le menu **Administration**
* Sélectionner **Menus**
* Rechercher le menu nommé **Menu contextuel de document par défaut**

```xml
<!-- Commentaire nettoyé -->
```

* Faire un clic droit sur ce menu et sélectionner **Copier**
* Définir le nom et la description de ce menu
* Dans la partie gauche nommée *Disponible* sélectionner les actions **Comparer les documents** et/ou **Fusionner les documents** et ajouter les dans la partie droite nommée *sélectionné*

```xml
<!-- Commentaire nettoyé -->
```


### Ajouter le menu créé dans le bureau ICN

* Dans ICN, ouvrir le menu **Administration**
* Sélectionner **Bureaux**
* Sélectionner le bureau à mettre à jour
* Sélectionner l'onglet **Menus**
* Rechercher le menu nommé **Menu contextuel de document**
* Dans sa liste déroulante sélectionner le menu créé plus haut

```xml
<!-- Commentaire nettoyé -->
```

### Utiliser la fonctionnalité de comparaison de document

Pour comparer des documents, sélectionner **deux documents** puis cliquer sur **Comparer les documents** depuis le menu Actions de ICN ou depuis le clic droit.

```xml
<!-- Commentaire nettoyé -->
```

### Utiliser la fonctionnalité de découpage/fusion de document

Pour découper ou fusionner des documents, sélectionner au moins un document puis cliquer sur **Fusionner les documents** depuis le menu Actions de ICN ou depuis le clic droit.

```xml
<!-- Commentaire nettoyé -->
```
