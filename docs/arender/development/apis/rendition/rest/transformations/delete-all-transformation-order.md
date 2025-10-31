---
title: Supprimer tous les ordres de transformation (DELETE)
---

Cette API permet de supprimer tous les ordres de transformation précédemment demandés.
L'appel à cette API devra ête authentifié. Les identifiants sont disponibles dans le fichier de configuration _application.yaml_ du document-service-broker.

```yaml

run-mode :
  username : username
  password : password
```

## Description technique de l'API

Point de terminaison :
```bash
DELETE /transformations
```

## Exemples

### Supprimer tous les ordres de transformations de manière authentifiée

L'appel ci-dessous génère une demande de suppression de tous les ordres de transformation.
Il est authentifié via l'utilisation de la méthode simple du "Basic Authentication",
en considérant le nom d'utilisateur : _user_ et le mot de passe _password_.

```bash
curl -X 'DELETE' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*' \
  -H 'Authorization: Basic dXNlcjpwYXNzd29yZA=='
```
