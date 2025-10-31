---
title: Importer les dépendances d'ARender
---


Cette fonctionnalité est utilisable depuis la version 4.4.0


## Introduction

Le BOM d'ARender est tout simplement un fichier POM contenant certaines des dépendances
d'ARender définit dans un dependencyManagement. Il permet entre autre à un projet utilisant
des libraires d'ARender d'être toujours assuré d'utiliser les même versions des libraires
tierces qu'ARender. L'avantage est que le BOM est importable ce qui laisse toujours la
possibilité à un projet d'avoir un autre POM parent.

## Les BOM ARender

Il y a en tout 3 BOM disponible, celui du web-ui, de la rendition et le root qui est le pom
parent de ces deux derniers et qui contient donc les librairies communes au web-ui et à la
rendition.

```cfg
<!-- Commentaire nettoyé -->com.arondor.arender<!-- Commentaire nettoyé -->arender-bom-root<!-- Commentaire nettoyé -->${arender.version}<!-- Commentaire nettoyé -->

<!-- Commentaire nettoyé -->com.arondor.arender<!-- Commentaire nettoyé -->arender-bom-web-ui<!-- Commentaire nettoyé -->{arender.version}<!-- Commentaire nettoyé -->

<!-- Commentaire nettoyé -->com.arondor.arender<!-- Commentaire nettoyé -->arender-bom-rendition<!-- Commentaire nettoyé -->{arender.version}<!-- Commentaire nettoyé -->
```

### Exemple

```cfg

  <!-- Commentaire nettoyé -->
  <!-- Commentaire nettoyé -->com.arondor.test<!-- Commentaire nettoyé -->my-parent-pom<!-- Commentaire nettoyé -->0.0.1-SNAPSHOT<!-- Commentaire nettoyé -->

  <!-- Commentaire nettoyé -->
  <!-- Commentaire nettoyé -->

  <!-- Commentaire nettoyé -->
      <!-- Commentaire nettoyé -->com.arondor.arender<!-- Commentaire nettoyé -->arender-bom-web-ui<!-- Commentaire nettoyé -->${arender.version}<!-- Commentaire nettoyé -->pom<!-- Commentaire nettoyé -->import<!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->

  <!-- Commentaire nettoyé -->
      <!-- Commentaire nettoyé -->
      <!-- Commentaire nettoyé -->
      <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
      <!-- Commentaire nettoyé -->
      <!-- Commentaire nettoyé -->
      <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->


```

Nous pouvons voir ici l'import du BOM dans le dependencyManagement ainsi que l'utilisation
de certaines dépendances qui n'ont pas version définit. En effet, maven saura automatiquement
utiliser la version définit dans le BOM.