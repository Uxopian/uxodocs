---
title: Test
---

## Liste des tests fonctionnels pour le serveur de rendition

ARender possède un outil de tests. Pour lancer cet utilitaire, il faut
utiliser la commande suivante en mode administrateur :

```bash
$> java -jar arondor-arender-rendition-tester-{"NUMÉRO"-VERSION}.jar
```

| Colonne | Description                                                                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| d       | Définition du serveur de rendition à utiliser.                                                                                                               |
| w       | Largeur des images à générer. Le paramètre renseigné peut être soit la "largeur" soit un intervalle de "largeur" avec le nombre à incrémenter. (Par défaut: 595) |
| t       | Nombre de documents à traiter en parallèle: permet de simuler plusieurs utilisateurs                                                                         |
| l       | Force l'envoie du fichier au serveur de rendition. Ce paramètre doit être utilisé pour une utilisation distante du tester                                    |
| c       | Désactivation de la conversion en images des pages                                                                                                           |
| p       | Pages générées. Le paramétrage est identique à celui de la "largeur" des images. La page est soit renseignée directement soit via un intervalle                |
| n       | Désactivation de la récupération du contenu textuel des pages                                                                                                |
| z       | Temps d’attente avant de convertir les pages (après le parsing)                                                                                              |
| o       | Dossier de sortie où sont stockées les images. S’il n’est renseigné aucun dossier les images sont stockées en cache                                          |
| f       | Chemin d’un fichier texte contenant une liste de documents de tests                                                                                          |
| v       | Définit un rapport de test dans le fichier indiqué au format CSV                                                                                             |
| r       | Définit un rapport de test dans le fichier indiqué au format XML                                                                                             |
| k       | Dossier de sortie où sont stockés les documents renditionnés                                                                                                 |
| h       | Menu d'aide                                                                                                                                                  |

- Test basique : Ce test se base sur le document par défaut du serveur
  de rendition. Pour lancer le test, il suffit d’utiliser une console,
  naviguer jusqu’à l’emplacement du JAR et taper la commande suivante
  en mode administrateur :

  ```bash
  #adapter le port 8761 suivant votre configuration
```text
  $> java -jar arondor-arender-rendition-tester-{"NUMÉRO"-VERSION}.jar -d "http://serveur-de-rendition:8761/" -w "(100,1100,100)" -t 4 -v report_ARender.csv
```
  ```

- Test à partir des fichiers d'exemple : Afin de tester le serveur de
  rendition avec des documents métier :
  - créer un fichier fichiers.txt dans le dossier tester
  - ajouter un chemin absolu de fichier par ligne

Pour lancer le test, il suffit d’utiliser une console, naviguer jusqu’à
l’emplacement du JAR et taper la commande suivante en mode
administrateur :

```bash
#adapter le port 8761 suivant votre configuration
$> java -jar arondor-arender-rendition-tester-{"NUMÉRO"-VERSION}.jar -d "http://serveur-de-rendition:8761/" -w "(100,1100,100)" -t 4 -l -f ./fichiers.txt -v rapport_ARender.csv
```

## Analyse du rapport

| Colonne       | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| Name          | Nom de la statistique                                        |
| Total         | Durée total d'exécution (ms)                                 |
| Calls         | Nombre total d'appels                                        |
| Minimum       | Temps minimum d'une exécution (ms)                           |
| Maximum       | Temps maximum d'une exécution (ms)                           |
| TheoricalRate | Taux théorique d'opérations par seconde et par thread client |
| EffectiveRate | Taux effectif d'opération par seconde                        |

## Statistiques

- `[Image_IM]()""_0` : renditions de pages de "largeur"
  "" (px)
- Image : rendition de l'ensemble des pages
- Image_PageContents : extraction du contenu textuel d'une page
- Fetch_DocumentPageLayout : extraction de la structure du document
  (type mime, nombre de pages, dimensions des pages) et conversion si
  nécessaire

## Exemple de rapport (4 threads)

| name                     | total | calls | minimum | maximum | average      | theoreticalRate  | effectiveRate |
| ------------------------ | ----- | ----- | ------- | ------- | ------------ | ---------------- | ------------- |
| Open                     | 10    | 1     | 10      | 10      | 10.0         | 100.0            | 0.25967282    |
| Fetch_DocumentPageLayout | 170   | 1     | 170     | 170     | **170**      | 5.882353         | 0.25974026    |
| Image_IM_100_0           | 771   | 19    | 17      | 83      | 40.57895     | 24.64332         | 4.9337835     |
| Image_IM_200_0           | 317   | 19    | 11      | 31      | 16.68421     | 59.9369159.93691 | 4.9325027     |
| Image_IM_300_0           | 427   | 19    | 14      | 50      | 22.473684    | 44.496487        | 4.935065      |
| Image_IM_500_0           | 831   | 19    | 29      | 95      | 43.736843    | 22.86402         | 4.9337835     |
| Image_IM_400_0           | 648   | 19    | 26      | 53      | 34.105263    | 29.320988        | 4.9337835     |
| Image_IM_600_0           | 1070  | 19    | 35      | 87      | 56.31579     | 17.75701         | 4.9337835     |
| Image_IM_700_0           | 1409  | 19    | 40      | 150     | 74.1579      | 13.484741        | 4.9325027     |
| Image_IM_800_0           | 1411  | 19    | 48      | 148     | 74.26316     | 13.465628        | 4.9325027     |
| Image_IM_900_0           | 1808  | 19    | 59      | 211     | 95.1579      | 10.508849        | 4.935065      |
| Image_IM_1000_0          | 1973  | 19    | 74      | 149     | **103.8421** | 9.630005         | 4.9337835     |
| Image_IM_1100_0          | 2222  | 19    | 86      | 176     | 116.947365   | 8.550855         | 4.9337835     |
| Image                    | 12875 | 209   | 11      | 211     | 61.60287     | 16.23301         | **54.271618** |
| Image_PageContents       | 561   | 209   | 1       | 42      | 2.6842105    | 372.549          | 54.271618     |

Ce rapport montre que :

- il a fallu, en moyenne, 104 millisecondes pour générer des pages de
  1000 pixels de "largeur"
- le serveur de rendition a été capable de générer 54 renditions de
  pages par seconde
- l'analyse du PDF de test a pris 170 millisecondes
