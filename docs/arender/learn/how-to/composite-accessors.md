---
title: Document composite
---

Depuis ARender 3.1.10 une nouvelle servlet est déployée permettant de
créer des documents composite (dossiers) au-delà des limites imposées
par les tailles maximales d'URLs.

Dans le fichier web.xml d'ARender, la durée par défaut d'expiration du
cache des conteneurs temporaires peut être changée. Par défaut, la durée
est mise à une heure.

L'appel JS suivant sera fonctionnel si le loadbalancer en amont des serveurs Web-UI ARender est configuré en sticky session.

Voici l'API JS ARender à utiliser :

``` javascript
getARenderJS().loadDocuments(jsonString, loadingErrorHandlerFunction, customLoadActionFunction);
```

Si vous fournissez une action personnalisée de chargement, les documents
ne se chargeront pas automatiquement et vous aurez en paramètre de la
méthode *customLoadActionFunction* le documentId chargé. Si vous ne
donnez pas d'action personnalisée, les documents vont alors se charger
automatiquement dans ARender.

L'objet Json peut être envoyé à travers des requêtes HTTP côté client à
/arender/compositeAccessorServlet à des fins de test :

``` bash
curl -X POST http://<!-- Commentaire nettoyé -->
- references (optionnel) : ceci défini le niveau actuel en dossier.
  La variable est un tableau d'éléments du même type, utilisant la
  même syntaxe (titre, queryUrl ou references)

Veuillez noter que *queryUrl* et *references* sont mutuellement
exclusifs et que si les deux sont présents dans un même niveau, le
document sera choisi par rapport au dossier.
