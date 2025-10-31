---
title: Connecteur FileNet
---

## ARender pour IBM FileNet

ARender dispose d'un connecteur pré-configuré pour les GED IBM FileNet P8 (4.x) et IBM FileNet Content Manager (5.x).

| Paramètre       | Description                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| id              | Identifiant unique d'une "version" d'un document                                                                                                      |
| vsId            | Identifiant d'une VersionSeries permettant de récupérer la dernière "version" d'un document                                                           |
| objectStoreName | Nom de l'ObjectStore dans lequel est stocké le document                                                                                             |
| objectType      | Type du document à visualiser : document, folder, contentContainerXML, mixedObjects (facultatif dans le cas d'un document)                          |
| contentElement  | Optionnel, index de l'element de contenu à visualiser  (objet ContentElement). Les valeurs possibles sont comprises entre 1 et le nombre d'éléments |

Voici quelques exemples :

- Ouverture d'un document simple stocké dans FileNet P8 :

    `http://\\{arender_serveur\\}/ARender.html?id=\\{345A81-KT7SK95747S-5IS8-8SK0\\}&objectStoreName=OS1`

- Ouverture de deux documents simultanément avec la syntaxe mixedObjects :

    `http://\\{arender_serveur\\}/ARender.html?ids=doc:\\{345A81-KT7SK95747S-5IS8-8SK0\\},doc:\\{F64A9342-6114-4A5C-A5E1-589A2FFB159F\\}&objectStoreName=OS1&objectType=mixedObjects`

- Ouverture de deux documents et d'un folder simultanément :

    `http://\\{arender_serveur\\}/ARender.html?objectStoreName=OS1&ids=doc:\\{3DBE573A-1AC9-4B08-8CB1-8F9495619954\\},doc:\\{F64A9342-6114-4A5C-A5E1-589A2FFB159F\\},folder:\\{55714817-BDAC-4C8A-9EFB-963E4620A4E4\\}&objectType=mixedObjects`

- Ouverture d'un element de contenu précis :

  `http://\\{arender_serveur\\}/ARender.html?id=\\{345A81-KT7SK95747S-5IS8-8SK0\\}&objectStoreName=OS1&contentElement=2`


La syntaxe mixedObjects est la suivante :
**ids=[ [ "doc" | "folder" ] ":" [ Id du document ou Folder ] [ ","] ]+**

## Configuration de l'accès aux documents

Selon le mode d'authentification choisi, deux types de fournisseur
peuvent être utilisés pour fournir un accès aux documents.

### Partage de la session FileNet

Dans la même JVM (ou à minima partage de contexte JAAS) en utilisant le
protocole IIOP :

| Paramètre             | Description                                       |
| --------------------- | ------------------------------------------------- |
| content_engine_server | URI du Content Engine utilisant le protocole IIOP |


```cfg
arender.server.filenet.authentication.method=jaasObjectStoreProvider
arender.server.filenet.ce.url=iiop://\{content_engine_server\}:2809/FileNet/Engine
```


### Compte de "service"

L'utilisation d'un compte de "service" dans ARender pour la connexion à FileNet Content Platform Engine, requiert les modifications ci-dessous.

#### Désactivation des contraintes de sécurité

Commenter les security-constraint et security-role configurés.


```XML
<?xml "version"="1.0" encoding="UTF-8"?>
<web-fragment xmlns:xsi="http:www.w3.org2001XMLSchema-instance" xmlns="http:java.sun.comxmlnsjavaee" xmlns:web="http:java.sun.comxmlnsjavaeeweb-app_2_5.xsd" xsi:schemaLocation="http:java.sun.comxmlnsjavaee http:java.sun.comxmlnsjavaeeweb-fragment_3_0.xsd" id="WebAppFragment_ID" "version"="3.0">
    <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->action<!-- Commentaire nettoyé -->Define the container secured resource<!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->All Authenticated<!-- Commentaire nettoyé -->
        **
            <!-- Commentaire nettoyé -->
            <!-- Commentaire nettoyé -->
        **
    <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
```

#### Modifier le contexte utilisateur

Modifier le bean d'id urlFilter (par défaut configuré avec la classe JAASUserFilter) par celui ci-dessous :


```XML
**
    
**
```

#### Configurer la connexion HTTP

| Parameter             | Description                                              |
| --------------------- | -------------------------------------------------------- |
| content_engine_server | URI de Content Engine basé sur FileNet WS (MTOM ou DIME) |
| p8_identifiant        | Pseudo du compte technique                               |
| p8_password           | Mot de passe du compte technique                         |


```cfg
arender.server.filenet.authentication.method=loginPasswordObjectStoreProvider
arender.server.filenet.ce.url=http://\{content_engine_server\}/wsi/FNCEWS40MTOM/
arender.server.filenet.ce.login=\{p8_identifiant\}
arender.server.filenet.ce.password=\{p8_password\}
```


## Gestion du format de stockage des annotations

### Stockage des annotations au format XML FileNet

Configuration par défaut, aucune configuration à faire.

### Stockage des annotations au format XFDF

Ajouter simplement la ligne suivante dans le fichier suivant :


```cfg
arender.server.default.annotation.accessor=xfdfAnnotationAccessor
```


## Gestion des métadonnées à récupérer

``` xml
**
**
```

### Récupérer des métadonnées système

Par défaut, aucune métadonnée système n'est récupérée. Pour forcer la
récupération d'une ou plusieurs, il faut ajouter/éditer la propriété
*includedSystemProperties*.


```xml

    <!-- Commentaire nettoyé -->DateCreated<!-- Commentaire nettoyé -->DateLastModified<!-- Commentaire nettoyé -->Creator<!-- Commentaire nettoyé -->LastModifier<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->FactureRef<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
Le connecteur ICN est basé sur la syntaxe
mixedObjects cité ci-dessus.

1) Se connecter au Content Navigator.

2) Aller dans la vue "Administration" et cliquer sur "Plug-ins".
<!-- Commentaire nettoyé -->

3) Cliquer sur "Nouveau Plug-in".
<!-- Commentaire nettoyé -->

4) Entrer le chemin et nom du JAR et cliquer sur "Charger".(Example : _C:\sources\arender-web-ui\arondor-arender-navigator-plugin-2.2.1.jar_)
<!-- Commentaire nettoyé -->

5) Dans le champ ARender context root entrer l'adresse (host + port +
context root) de ARender. Cf. exemple ci-dessous :
<!-- Commentaire nettoyé -->
Si vous souhaitez que le plugin ICN détecte l'hôte de la machine avant
de l'envoyer au poste client, utilisez le mot clé `--arender.hostname--`
dans la configuration. Cela remplacera la balise automatiquement.

6) La liste des propriétés définies dans la classe ARenderPlugin est
automatiquement chargée dans l'interface, cliquer sur "Sauvegarder".

7) Cliquer sur "Éditer" et vérifier que le plug-in a été correctement
installé.
<!-- Commentaire nettoyé -->

8) Mapping du nouveau viewer. Aller dans l'onglet "Mappes d'afficheur".
<!-- Commentaire nettoyé -->

9) La mappe par défaut s'appelle "Mappe de l'afficheur par défaut" et n'est
pas modifiable, cliquer dessus et cliquer sur "Copier".
<!-- Commentaire nettoyé -->

10) Cliquer sur "Nouveau mappage" et sélectionner le nouveau viewer qui
apparaît dans la liste des afficheurs disponibles.
<!-- Commentaire nettoyé -->

11) Vous pouvez alors choisir dans la liste des types mimes supportés.
<!-- Commentaire nettoyé -->

12) Pour utiliser cette mappe d'afficheur, il suffit de l'associer à un
bureau (dans l'onglet général de définition du bureau, Mappe
d'afficheur).
<!-- Commentaire nettoyé -->

## Fonctionnalités avancées

### Découpage de document avec fusion des métadonnées avancées

#### Description et configuration de la fonctionnalité

Voici en premier lieu un descriptif de la fonctionnalité. Pour chaque document source (FileNet) utilisé dans la composition du Document Builder :  

  - Si tous les documents partagent une même métadonnée, avec une même valeur
    - La métadonnée et sa valeur sont propagées
  - Si la métadonnée est commune aux documents, mais les valeurs sont différentes 
    - La métadonnée est propagée, mais la valeur est remise à zéro : 
        - Les champs type String recevront une chaine vide
        - Les champs type Entiers/Double recevront 0
        - Les champs type Date sont remis à la date de l'opération de Document Builder
        - Les champs type Boolean sont à false
        - Les champs à cardinalité Liste seront quand à eux peuplés d'une liste d'une seule valeur du type correspondant (liste vide non supportée par l'Engine)
  - Si la métadonnée est unique à un seul document
    - Par défaut non propagée, elle pourra être propagée si la configuration l'autorise, par son SymbolicName
    
Pour propager une métadonnée unique à un document, voici la propriété où les différents SymbolicNames à autoriser sera à indiquer (séparés par des virgules)

```cfg
arender.server.filenet.document.builder.update.first.document.properties.advanced.updater.propagation.symbolic.names
```

#### Comment activer la fusion avancée des métadonnées

A la création de nouveau documents, pour activer cette fonctionnalité, il faudra modifier la propriété suivante : 

```cfg
arender.server.filenet.document.builder.update.first.document.properties.copy.bean.name
```

Les deux valeurs possibles sont _legacyFileNetPropertiesCopy_ pour ne pas activer la fusion des métadonnées avancées, 
ou _advancedFileNetPropertiesMerger_ pour l'activer.
Enfin, pour activer le comportement de fusion avancée de métadonnée lors d'une mise à jour du contenu d'un document 
(et non uniquement à la création), il suffit d'ajouter le bean suivant à la configuration: 

<!-- Commentaire nettoyé -->
```xml

    **
        
    **
``` 

Ainsi le bean de mise à jour de document suivra aussi le même comportement que le bean de création de documents 
(par défaut, ce bean ne possède pas de propertyUpdater, afin de garder son comportement historique). 

### Interdire la sauvegarde de documents en fonction des IDs d'objectStore

Afin de pouvoir interdire la création de nouveaux documents à partir de certains objectStore FileNet, 
il est possible de bloquer la fonctionnalité directement dans le code connecteur. 

Pour ce faire, modifiez la propriété serveur Web-UI nommée :

```cfg
arender.server.filenet.document.builder.unauthorized.object.store.ids=
```

Et insérez, séparés par des virgules, la liste des IDs FileNet des objectStores qui n'autoriseront pas la sauvegarde 
de nouveaux documents via le Document Builder.

Par défaut, cette liste est livrée vide pour garder le comportement historique.

### Désactiver la fonctionnalité de découpage pour les documents checkout et archivés
Il est possible d'interdire la création de nouveaux documents à partir de document checkout ou archivé via l'activation
de la propriété serveur ci-dessous :

```cfg
arender.server.filenet.document.builder.disabled.for.checkout.and.archived.documents=true
```


## Configuration de l'affichage des filigranes

Vous avez la possibilité de configurer l'affichage des filigranes selon le groupe utilisateur et/ou la classe filenet du document ouvert.

Pour l'activation du paramétrage par groupe et/ou par classe de document, il vous faudra rajouter cette propriété : 


```cfg
arender.server.watermark.display.provider=fileNetDisplayWatermarkProvider
```


Pour afficher le filigrane pour les utilisateurs appartenant à certains groupes :


```cfg
#Valeurs séparées par des virgules qui indique quelle groupe Filenet doit avoir un filigrane définis dans arender.watermark.bean.name
arender.server.watermark.filenet.group.with=
```


Pour ne pas afficher le filigrane pour les utilisateurs appartenant à certains groupes :


```cfg
#Valeurs séparées par des virgules qui indique quelle groupe Filenet ne doit pas avoir un filigrane définis dans arender.watermark.bean.name
arender.server.watermark.filenet.group.without=
```


Les deux propriétés ne peuvent être utilisés en même temps.

Pour afficher selon la classe FileNet du document (Depuis 4.1.0 jusqu'à 4.2.x):


```cfg
#Valeurs séparées par des virgules qui indique quelle classe de document Filenet doit avoir un filigrane définis dans arender.watermark.bean.name
arender.server.watermark.filenet.document.class.with=
```


Pour afficher selon la classe FileNet du document (Depuis 4.3.0):

```cfg
#Valeurs séparées par des virgules qui indiquent quelles classes de document Filenet doit avoir un filigrane définis dans arender.watermark.bean.name
arender.server.watermark.filenet.document.class=
```


### Configuration avancé des filigranes

Pour définir un filigrane dépendant de la classe de document FileNet et/ou du groupe d'utilisateur, vous devez définir des usages de filigranes pour chaque filigrane voulu. Par défaut :


```xml

**
    
    
    
            
**

```xml
<!-- Commentaire nettoyé -->
```
**
```xml
  <constructor-arg value="""">
```
**

```xml
<!-- Commentaire nettoyé -->
```
**
```xml
  <constructor-arg value="""">
```
**

```xml
<!-- Commentaire nettoyé -->
```
**
```xml
  <constructor-arg value="""">
```
**
```


#### Exemples

Vous pouvez créer un simple usage de filigrane :

```cfg
**
        
**
```


Vous pouvez créer un usage de filigrane en filtrant par groupe LDAP :

```xml
**
    
        
**

```xml
<!-- Commentaire nettoyé -->
```
**
```xml
  <constructor-arg value="myGroup">
```
**
```


Vous pouvez créer un usage de filigrane pour tous les utilisateurs sauf ceux définies ici :

```xml
**
    
        
**

```xml
<!-- Commentaire nettoyé -->
```
**
```xml
  <constructor-arg value="myGroup">
```
**
```


Vous pouvez créer un usage de filigrane qui dépend des classes de document de FileNet :

```xml
**
       
     
**

```xml
<!-- Commentaire nettoyé -->
```
**
```xml
  <constructor-arg value="""">
```
**
```


Bien entendu, vous pouvez mixer les configurations pour définir des usages de filigrane avancés :

```xml
**
       
     
        
**

```xml
<!-- Commentaire nettoyé -->
```
**
```xml
  <constructor-arg value="""">
```
**

```xml
<!-- Commentaire nettoyé -->
```
**
```xml
  <constructor-arg value="myLDAPGroup">
```
**
```



La ligne suivante est obligatoire :

```xml

```


#### Ajout des définitions d'usage de filigrane

Vous devez ajouter toutes les définitions d'usage de filigrane dans le provider de filigrane :


```xml

```xml
<!-- Commentaire nettoyé -->
```

**
    
```xml
      <!-- Commentaire nettoyé -->
```
```xml
        <ref bean="newWatermarkDefinition">
      <!-- Commentaire nettoyé -->
```
**
```


### Créer un PDF/A en tant que nouvelle "version" ou nouveau document via le document builder

Depuis la "version" 4.2.0 d'ARender, deux nouveaux comportements de mise à jour de contenu ont été ajouté pour
créer ou mettre à jour un document en PDFA.

Les comportements déjà existants sont :
- UPDATE_NO_DOCUMENT
- UPDATE_FIRST_DOCUMENT
- CREATE_NEW_FIRST_DOCUMENT
- UPDATE_ALL_DOCUMENT

Les deux nouveaux sont : 
- UPDATE_FIRST_DOCUMENT_PDFA
- CREATE_NEW_FIRST_DOCUMENT_PDFA

Les deux nouveaux comportements sont similaires à UPDATE_FIRST_DOCUMENT et CREATE_NEW_FIRST_DOCUMENT sauf que le format cible
des fichiers sera PDFA.

**En tant que prérequis, il est évidemment nécessaire de disposer du module de rendition PDFA.**

#### Exemple

Depuis le fichier de configuration **alterdocumentcontent-configuration.xml**, vous pouvez copier les 
beans **saveActionUpdateFirst** et **saveActionCreateFirst** vers le fichier **arender-custom-integration.xml**
et modifier la propriété **contentUpdateBehavior** comme cela:


```xml
**
	
	
		**
```xml
	<!-- Commentaire nettoyé -->
```
		&lt;ref&gt;
```xml
	<!-- Commentaire nettoyé -->
```
	
		**
			
			
			
			
```xml
				<!-- Commentaire nettoyé -->UPDATE_FIRST_DOCUMENT_PDFA<!-- Commentaire nettoyé -->
```
		**
```xml
	<!-- Commentaire nettoyé -->
```
	
		**
```xml
	<!-- Commentaire nettoyé -->
```
		&lt;ref&gt;
```xml
	<!-- Commentaire nettoyé -->
```
	
		**
			
			
			
			
```xml
				<!-- Commentaire nettoyé -->CREATE_NEW_FIRST_DOCUMENT_PDFA<!-- Commentaire nettoyé -->
```
		**
	
**
```



## Mise à jour des métadonnées

La servlet *updateDocumentMetadataServlet* est dédié à la mise à jour des métadonnées de document Filenet en utilisant un appel POST.

Voici un exemple de l'appel POST, où *\{documentId\}* est à remplacer par le "documentId" du document ciblé :


```cfg
```text
http://\\{HOST_ARENDER\\}/arendergwt/updateDocumentMetadataServlet?uuid=\\{documentId\\}
```
```


Ensuite, le corps de la requête va accepter une structure JSON définissant chaque nom de métadonnée à modifier et la valeur associée. Les *propertyKey* correspondent aux propriétés *symbolicName* et *displayName* de Filenet. La *propertyValue* est la valeur que va prendre la métadonnée.


```cfg
\\{"propertyKey1" : "propertyValue1",
  "propertyKey2" : "propertyValue2"\\}
```


## Configurer un titre par défaut de document 

La propriété suivante permet d'ajouter un titre par défaut au document qui n'en possède pas.


```cfg
arender.server.default.filenet.document.name ="defaut name"
```


