---
title: Configuration JNDI pour ARender Web-UI
---


La configuration JNDI n'est pour l'instant compatible qu'avec le déploiement de ARender pour FileNet dans WebSphere.


## Prérequis

- version >= ARender 3.1.9

## Intérêt du JNDI dans ARender Web-UI

La configuration du JNDI permet de ne plus avoir à modifier le binaire
ARender Web-UI à chaque livraison.

Depuis la version 3.1.9 d'ARender, la configuration serveur a été
externalisée dans un fichier de propriété : arender-server.properties
(situé dans le dossier WEB-INF/classes de ARender Web-UI). Ce qui a permis
de mettre en place la technologie JNDI dans ARender pour définir la
configuration directement depuis le serveur d'application. Ci-dessous
vous trouverez un détail par serveur d'application.

## Configuration JNDI pour Apache Tomcat

- Créer un fichier de propriété (exemple :
  *customer-**.properties*, avec
  ** le type d'intégration; vanilla, alfresco,
  filenet) et enregistrer le dans le dossier de votre choix (Exemple :
  *C:\Dev\apache-tomcat-8.5.13\customConfiguration*).
- Y ajouter la configuration spécifique voulue en s'inpirant des
  propriétés définies dans arender-server.properties (situé dans le
  dossier WEB-INF/classes de ARender Web-UI) :
  
  ```cfg
  arender.server.rendition.hosts=http://localhost:8761/
  ```

- Ouvrir le fichier de configuration Apache Tomcat **context.xml**
  (situé dans le dossier *conf*)
- Y ajouter la variable d'environnement **propertiesFileLocation**
  ayant pour valeur le chemin menant vers le fichier de propriété
  *customer-**.properties* créé ci-dessus. Exemple
  :

```xml
<!-- Commentaire nettoyé -->
```

``` xml
<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
  <!-- Commentaire nettoyé -->propertiesFileLocation<!-- Commentaire nettoyé -->java.lang.String<!-- Commentaire nettoyé -->
  -->
  ```


- Écraser le contexte JNDI par défaut


  ```XML
  <!-- Commentaire nettoyé -->
  <!-- Commentaire nettoyé -->ARenderConfiguration">-->
  
  <!-- Commentaire nettoyé -->
  <!-- Commentaire nettoyé -->ARenderConfiguration">
  ```


- Créer un fichier de propriété (exemple :
  *customer-**.properties*) et enregistrer le dans
  le dossier de votre choix (Exemple :
  *C:\Dev\customConfiguration*).
  - Y ajouter la configuration spécifique voulue en s'inspirant des
    propriétés définies dans arender-server.properties (situé dans le
    dossier WEB-INF/classes d’ARender Web-UI) :

    <!-- Commentaire nettoyé -->

  ```cfg
      arender.server.rendition.hosts=http://rendition-server:8761/`
  ```
  

- Ouvrir le fichier de configuration Wildfly **standalone.xml** (situé
  dans le dossier *configuration*)
  - Y ajouter le binding **propertiesFileLocation** ayant pour valeur le
    chemin menant vers le dossier contenant le fichier de propriété
    *customer-**.properties* créé ci-dessus. Exemple
    :

  
  <!-- Commentaire nettoyé -->
  
  ``` xml
  **
      **
          <simple name="java:globalpropertiesFileLocation" value="C:DevcustomConfiguration" type="java.lang.String">
      **
      <!-- Commentaire nettoyé -->
  
  ```cfg
  arender.server.rendition.hosts=http://localhost:8761/
  ```
  
- Ouvrir la console Websphere et se rendre dans : Environnement ->
  Attribution des noms -> Liaisons de l'espace de nom :

<!-- Commentaire nettoyé -->

- Cliquer sur nouveau puis sélectionner chaine et cliquer sur suivant :

<!-- Commentaire nettoyé -->

- Remplir les champs comme suit puis cliquer sur suivant

  Identificateur de liaison : **propertiesFileLocation**

  Nom de l'espace de nom relatif pour rechercher un préfixe de nom
  'cell/node/**nodename**/servers/**serverName** (en remplaçant les noms de
  noeud et nom de serveur) :

  > cell/node/**nodename**/servers/**serverName**/propertiesFileLocation`

  Valeur de la chaîne : le chemin menant vers le dossier contenant le
  fichier de propriété *customer-**.properties* créé
  ci-dessus

<!-- Commentaire nettoyé -->

- Enfin cliquer sur Terminer

<!-- Commentaire nettoyé -->

- Redémarrer le serveur d'application.
