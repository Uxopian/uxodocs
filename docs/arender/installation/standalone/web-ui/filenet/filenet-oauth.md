---
title: "Installation de ARender Spring Boot avec OAuth2"
description: Guide de déploiement pour IBM FileNet avec ARender Spring Boot et OAuth2
---

# Introduction

Avec la transition des déploiements traditionnels basés sur Websphere vers Spring Boot, l'application exploite désormais OAuth2
pour l'authentification. Auparavant, WebSphere gérait uniquement l'authentification des utilisateurs via JAAS, qui s'intégrait de manière transparente à l'API Java de FileNet.
L'effort de modernisation vise à améliorer la sécurité avec les fournisseurs d'identité OAuth2 modernes et à maintenir les mêmes capacités d'interaction avec FileNet Content Manager.

Le principal défi abordé ici est de garantir que les jetons OAuth2 peuvent être validés du côté FileNet lors de l'utilisation de l'API Java FileNet pour 
des opérations telles que la récupération de documents ou l’accès aux métadonnées.


## Configuration

Prérequis:
- OAuth2 Identity Provider
- ARender Web-UI Spring Boot (JAR / ZIP package)
- FileNet connector
- FileNet LoginModule
- Accès à l'Artifactory

### Classique (Sans Docker)

L'installation d'ARender est aussi simple que : 
2) Dézipper le dans un dossier
4) Copier le connecteur dans le dossier lib du dossier d'installation
5) Editer le fichier **arender-custom-server.properties** dans le dossier **configurations/** et ajouter le contenu les propriétés suivantes :


```cfg
# Activation de l'OAuth2
arender.server.oauth2.enabled=true
# Utilisation de la méthode OAuth2 pour le connecteur FileNet
arender.server.filenet.authentication.method=oauth2ObjectStoreProvider
arender.server.filenet.ce.url=http://localhost:9080/wsi/FNCEWS40MTOM/
```


6) Créer un fichier **application.yml** à la racine du dossier d'installation puis éditer le fichier comme ci-dessous.

Note: Ceci est un exemple avec Keycloak


```cfg
# Ici, nous changeons le port de l'application ARender puisque le serveur Keycloak tourne déjà sur le port 8080.
server:
  port: 8082

# Ici nous créeons des propriétés pour les informations de Keycloak
keycloak:
  base-url: http://localhost:8080/auth
  realm: myrealm
  realm-url: ${keycloak.base-url}/realms/${keycloak.realm}

# Ici nous utilisons les propriétés natives de Spring Boot pour paramètrer l'OAuth avec Keycloak
spring:
  security:
    oauth2:
      client:
        registration:
          arender:
            client-id: arender-client
            client-name: ARender
            client-secret: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
            provider: keycloak
            authorization-grant-type: authorization_code
            scope: openid
            redirect-uri: "{baseUrl}/login/oauth2/code/{registrationId}"
        provider:
          keycloak:
            authorization-uri: ${keycloak.realm-url}/protocol/openid-connect/auth
            jwk-set-uri: ${keycloak.realm-url}/protocol/openid-connect/certs
            token-uri: ${keycloak.realm-url}/protocol/openid-connect/token
            user-name-attribute: preferred_username
      resourceserver:
        jwt:
          issuer-uri: ${keycloak.realm-url}
```


Maintenant que nous avons configurer l'application ARender, nous pouvons maintenant :
- Démarrer le serveur Keycloak
- Démarrer l'application ARender

Sur Linux, lancer le script suivant :

```bash
./ARenderConsole.sh
```

Sur Windows, lancer le script ARenderConsole.bat.

Il y a également des scripts d'installation pour le mode service.

