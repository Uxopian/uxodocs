---
title: Architecture dans M-Files
---

```xml
<!-- Commentaire nettoyé -->
```

* **N1: M-Files UI**: a la responsabilité de laisser l'utilisateur de M-Files choisir quel document il veut ouvrir dans ARender,
* **N2: Browser**: va créer la "frame" d'ARender en utilisant l'URL fourni par N1,
* **N3: ARender WEB-UI**: est un module Spring Boot qui contient le connecteur de M-Files,
* **N4: M-Files Backend**: contient une API avec laquelle le connecteur ARender va interagir pour aller chercher les documents 
(et si besoin les annotations, les métadonnées ou les nouvelles versions de documents),
* **N5: ARender Rendition**: va générer des images, extraire du texte et plus. Contient également le connecteur de M-Files.
