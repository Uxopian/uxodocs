---
title: Supprimer tous les ordres de conversion (DELETE)
---

Cette API permet de supprimer tous les ordres de conversion précédemment demandés.
L'appel à cette API devra être authentifié. Les identifiants sont disponibles dans le fichier de configuration _application.yaml_ du document-service-broker.

```yaml

run-mode :
  username : username
  password : password
```

## Description technique de l'API

Point de terminaison :
```bash
DELETE /conversions
```

## Exemples

### Supprimer tous les ordres de conversion de manière authentifié

L'appel ci-dessous génère une demande de suppression de tous les ordres de conversion.
Il est authentifié via l'utilisation de la méthode simple du "Basic Authentication",
en considérant le nom d'utilisateur : _user_ et le mot de passe _password_.

```bash
curl -X 'DELETE' \
  'http://localhost:8761/conversions' \
  -H 'accept: */*' \
  -H 'Authorization: Basic dXNlcjpwYXNzd29yZA=='
```
