---
title: Architecture générale de GED
---

```xml
<!-- Commentaire nettoyé -->
```

* **N1: ECM UI**: a la responsabilité de laisser l'utilisateur choisir quel document il veut ouvrir dans ARender,
* **N2: Browser**: va créer la "frame" d'ARender en utilisant l'URL fourni par N1,
* **N3: ARender WEB-UI**: est un module Spring Boot qui contient le connecteur,
* **N4: ECM Backend**: contient une API avec laquelle le connecteur ARender va interagir pour aller chercher les documents 
(et si besoin les annotations, les métadonnées ou les nouvelles versions de documents),
* **N5: ARender Rendition**: est un module Spring Boot qui va générer des images, extraire du texte et plus.
