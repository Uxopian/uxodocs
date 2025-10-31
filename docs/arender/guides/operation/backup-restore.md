---
title: Sauvegarde & Restauration
---

## Serveur de rendition

La sauvegarde d'un serveur de rendition consiste en la copie du
répertoire d'installation. Celle-ci peut aussi bien être effectuée à
chaud qu'à froid.

Le dossier *tmp* contenu à la racine du répertoire d'installation peut
être omis afin de limiter l'espace disque des sauvegardes. En effet, il
contient seulement les documents ouverts et mis en cache lors de
l'exécution.

La restauration d'une sauvegarde d'un serveur de rendition se déroule en
deux étapes :

- Restauration de l'installation : Il s'agit d'une simple copie du
  répertoire sauvegardé.
- Restauration du service : La copie du répertoire d'installation ne
  permet pas de conserver le service créé au niveau du système
  d'exploitation.

Pour le restaurer, il suffit d'exécuter les scripts suivants (suppression du service installé et installation du nouveau) :


```powershell
$> .\removeService.bat
$> .\installAsService.bat
```


```bash
$> ./removeService.sh
$> ./installAsService.sh
```


## Serveur de présentation

La sauvegarde d'un serveur de présentation consiste en la sauvegarde de :

- L'application WEB déployée (WAR ou EAR)
- La configuration du serveur d'application (si spécifique)
- Les éléments (fichiers de configuration, librairies...) externalisés
  (s'il y en a)

La restauration d'un serveur de présentation nécessite alors le
déploiement de l'application WEB déployée, de la configuration ainsi
que des éléments externalisés.
