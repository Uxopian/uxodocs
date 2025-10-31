---
title: Configurer les emails
---

## Formatage des dates

Il est possible de configurer un format de date pour les emails. La configuration suivante va permettre de formater 
la date *2022-01-24T04:54:42-05* qui donnera le résultat *Mon 24 Jan 2022 04:54:42 -0500*


``` cfg
emltopdf.config.format.date=EEE d MMM yyyy HHss ZZ
```


### Date dépendante du fuseau horaire

La date est configurable selon le fuseau horaire de l'utilisateur. Par défaut, la date est formatée selon le fuseau horaire UTC.


``` cfg
default.url.parser.use.timeZone.for.ids=true
```



## Sujet et pièces jointes avec des caractères non-latin

Les caractères non-latin présent dans le sujet et le nom des pièces jointes peuvent ne pas s'afficher correctement. 
Pour permettre d'effectuer le bon rendu, il faut configurer le module de rendition *document-converter* de la façon suivante : 


``` cfg
emltopdf.encode.header.with.body.encoding=true
emltopdf.config.filter.special.characters.regex=
emltopdf.config.filter.replacement.character=
```


Dans certain cas, le sujet et les pièces jointes peuvent toujours avoir des problèmes d'affichage. 
Il faudra donc appliquer la configuration suivante côté *Web-UI-server*. Cela permet de fournir la locale de l'utilisateur 
qui va servir pour déterminer le bon encodage à appliquer.


``` cfg
default.url.parser.use.locale.for.ids=true
```


## Langage de rendu d'en-tête

Il est possible de configurer la langue de rendu des en-têtes pour les emails.
Par défaut, l'en-tête est rendu en français. Les valeurs possibles sont : "FR", "EN".


``` cfg
# Configure the header rendering language. Possible values are : "FR", "EN".
emltopdf.config.header.language=FR
```