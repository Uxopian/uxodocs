---
title: Validation token
---

Une nouvelle servlet est déployée permettant de configurer la validation d'un token.

## Requête 

Cette fonctionnalité est accessible via la servlet : **tokenValidatorServlet**

La requête est utilisable uniquement en POST


La validation d'un token est configurable si ce dernier est envoyé comme cookie ou attribut de requête POST à l'URL /arendergwt/validateToken.

Le token doit avoir comme nom "token".

La classe Java de validation personnalisée devra implémenter l'interface TokenValidator. Elle devra être déclarée dans la configuration ARender au travers de la propriété **arender.server.json.load.token.validator**.
Elle devra implémenter la méthode **validate** qui permet de vérifier si le token passer en paramètre de l'URL est valide ou non. 
Le validateur par défaut est le **NoopTokenValidator**. Il permet de vérifier si le token n'est pas null.