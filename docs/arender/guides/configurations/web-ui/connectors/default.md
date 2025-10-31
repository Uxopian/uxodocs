---
title: Connecteur par défaut
---

Ce connecteur est celui fourni par défaut et est utilisé par les
mécanismes standards au produit. Il répond au paramètres de l'URL
listés dans le tableau suivant :

| Paramètre | Description                                                                               |
| --------- | ----------------------------------------------------------------------------------------- |
| url       | Permet de fournir une URL basée sur les protocoles HTTP et FTP                            |
| uuid      | Utilisé pour fournir l'identifiant d'un document généré au préalable par ARender (Avancé) |
| bean      | Utilisé pour spécifié un connecteur (Avancé)                                              |

Voici quelques exemples:

- Ouverture d'un document stocké sur le web

  `http://\{ARENDER_SERVER\}/ARender/ARender.html?url=...`

- Ouverture d'un document via un connecteur spécifique en propageant un identifiant et un jeton de sécurité

  `http://\{SERVEUR_ARENDER\}/ARender.html?bean=monConnecteur&identifiant=123456&token=9GISU9SG4Z`


### Configurer la liste des URLs authorisées

L'URI définie dans le paramètre url est vérifiée afin d'autoriser la connexion à un ensemble d'URL de la liste blanche.

Du côté du rendu, en particulier dans le microservice Broker, deux propriétés sont disponibles pour ajouter une URL à la liste blanche basée sur le protocole HTTP et le protocole FTP.



```cfg
# Chemins des documents autorisés séparés par des virgules
authorized.paths=../../samples/,../samples/,../../tmp/,../tmp
# URL autorisées séparées par des virgules
authorized.urls=
```


Par défaut, aucune URL n'est autorisée.

Par exemple, pour permettre au site de démonstration ARender d'autoriser le document URL suivant https://demo.arender.io/docs/demo/ARender-doc-demo.pdf, nous devons définir la propriété comme ci-dessous :


```cfg
authorized.urls=https://demo.arender.io,demo.arender.io
```


Notez que nous avons ajouté 2 URL, une avec le protocole HTTP et une sans. Les deux sont corrects.
Mais dans le premier, nous autorisons explicitement l'URL HTTPS de la taille de la démo.

Avec la propriété ci-dessus, l'URL suivante ouvrira le document ARender-doc-demo.pdf dans la démo ARender :

https://www.demo.arender.io/?url=https://demo.arender.io/docs/demo/ARender-doc-demo.pdf

### Configurer l'authentification basique

Depuis la version 2023.1.0, une nouvelle propriété est disponible pour configurer les URLs qui ont besoin d'être authentifiées avec une authentification basique.
La propriété doit être placée dans le microservice Broker.


```cfg
# Set a list of key-value pairs of base64-secrets for domains
# The key and the value are separated by the character '@'
# The key-value couples are separated by the character ','
# Example : domain1@secret1,domain2@secret2,domain3@secret3
arender.url.basic.auth=
```

