---
title: Introduction
---

### Fonctionnement

ARender fait le rendu des documents à la volée de sorte que vous n’ayez plus besoin de stocker plusieurs versions
converties d’un document dans votre GED.

Si vous possédez déjà ces rendus, ARender peut toujours les utiliser et prendre le format le plus optimisé pour
afficher le document.

ARender est construit sur deux composants :

- **ARender UI** : serveur d'application Web Java frontal : gère les requêtes provenant de l'utilisateur final.
- **ARender Rendition** : serveur Java principal : fournit les rendus de documents et de nombreux autres services à
  l'aide d'une API REST à ARender UI.

```xml
Plus d'information dans le chapitre [architecture](<!-- Commentaire nettoyé -->).
```

### Rendu d'un document

Si un utilisateur final souhaite consulter un document, une demande est envoyée à ARender. ARender UI analyse la
demande, recherche les ID, ainsi que toute information supplémentaire nécessaire à la récupération du document. Le
document est ensuite envoyé au serveur Rendition pour le rendu.

Si le document est un format natif pour ARender (PDF, MP4), il sera rapidement traité et renvoyé sous forme d'images de
pages ou vidéo à l'utilisateur final.

Si le document nécessite une conversion, ARender utilise ses outils de détection pour rechercher le type de document et
le convertir en un des deux formats natifs. Il sera ensuite affiché.

La liste des documents pris en charge par ARender est extensible et, tant qu’il existe un outil pour la convertir en
l’un de nos formats natifs cibles, ARender peut gérer le document.

### Annoter des documents

ARender utilise la norme XFDF introduite par Adobe pour produire des annotations compatibles avec le format Adobe.
Lorsque vous annotez avec ARender, vos annotations sont prises en charge pour de nombreuses versions à venir !

Ce format de stockage est notre propre structure interne et peut être sauvegardé soit dans votre GED, soit dans un
système de fichiers local, une base de données, etc. Les annotations ne sont donc jamais stockées directement sur vos
documents et vous pouvez toujours consulter la version originale. Modifier un document nécessite une décision et une
action manuelle pour produire une nouvelle version d'un document dans lequel les annotations sont incorporées.

Nous proposons également l’exportation de nos annotations au format binaire natif d’Adobe, FDF, pour une compatibilité
élargie. Vous n'êtes pas coincé avec ARender, mais nous sommes vraiment heureux de votre séjour avec nous !

### Performances et la mise en cache des documents

Par défaut, et pour ne pas refaire le même travail plusieurs fois, ARender stocke un cache de documents d'une heure sur
le serveur Rendition.

Ce cache est automatiquement supprimé et purgé. Dans la plupart des cas d'utilisation, il n'est pas nécessaire de
modifier les valeurs de ce mécanisme de cache, car celui-ci est correctement dimensionné en fonction des capacités de
votre plate-forme.

Veuillez noter qu'ARender ne produira pas à cet égard de demande de téléchargement des documents chaque fois qu'un
utilisateur consultera un document. Si vous souhaitez créer des traces d'audit basées sur vos téléchargements GED,
une documentation sera bientôt créée pour comprendre les possibilités d'audit qu'ARender peut vous offrir, en plus de
vos fonctionnalités GED.

### Intégration d'ARender à votre GED

Nous avons de nombreuses intégrations prêtes à l'emploi :
* [IBM FileNet](https://www.arender.io/integrations/ibm-filenet),
* [Nuxeo](https://doc.nuxeo.com/nxdoc/nuxeo-enhanced-viewer/),
* [Alfresco](https://www.arender.io/integrations/alfresco),
* [FlowerDocs](https://flowerdocs.com/).

Et de nombreux autres GED (voir
```xml
[la liste des connecteurs existants](<!-- Commentaire nettoyé -->)).
```

#### Des solutions sur mesure pour vos besoins spécifiques :

Si votre GED ne figure pas dans la liste ou si vous avez des exigences particulières, ARender offre la flexibilité de 
créer votre connecteur personnalisé. Consultez notre documentation dédiée pour des instructions détaillées sur la 
```xml
création de votre connecteur personnalisé : [documentation](<!-- Commentaire nettoyé -->).
```

Renforcez votre stratégie de gestion de documents avec les intégrations polyvalentes et les solutions personnalisables 
d'ARender. Améliorez la collaboration, rationalisez les flux de travail et optimisez vos processus centrés sur les 
documents sans effort.
