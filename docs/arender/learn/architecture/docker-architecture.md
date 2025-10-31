---
title: Architecture Docker
---

```xml
<!-- Commentaire nettoyé -->
```

* **N1: ECM UI**: a la responsabilité de laisser l'utilisateur choisir quel document il veut ouvrir dans ARender,
* **N2: Browser**: va créer la "frame" d'ARender en utilisant l'URL fourni par N1,
* **N3: ARender WEB-UI**: est un serveur d'application qui contient le connecteur et qui est lancé dans un conteneur docker,
* **N4: ECM Backend**: contient une API avec laquelle le connecteur ARender va interagir pour aller chercher les documents 
(et si besoin les annotations, les métadonnées ou les nouvelles versions de documents),
* **N5: ARender Rendition**: est composé de 4 microservices Spring Boot lancés dans des conteneurs docker qui offrent différents services comme la génération d'images, l'extraction de texte, la conversion de documents et plus encore.
