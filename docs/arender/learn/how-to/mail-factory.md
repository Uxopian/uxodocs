---
title: Résoudre les soucis de conversion de mail
---

Vous avez surement un problème de configuration lié à wkhtmltopdf

## Configuration avancée

Si sous Windows, la conversion de manière unitaire ne fonctionne pas,
regardez le message d'erreur Windows si vous en avez un, cela pourra
vous indiquer une potentielle absence de framework. (.NET, Visual Studio
Redistribuable, etc...)

Si sous Linux, la conversion ne se passe pas avec une erreur indiquant
un problème de serveur X, vous devez installer le paquet xvfb et faire
dans votre linux les commandes suivantes (en les adaptant à votre
installation de wkhtmltopdf)

``` bash
mv /usr/bin/wkhtmltopdf /usr/bin/wkhtmltopdf_nohead
cp wkhtmltopdf_xvfb /usr/bin/wkhtmltopdf
chmod a+x /usr/bin/wkhtmltopdf
```

Le contenu du fichier wkhtmltopdf_xvfb est le suivant:

``` bash
#!/bin/bash
xvfb-run -a -s "-screen 0 640x480x16" /usr/bin/wkhtmltopdf_nohead "$@"
```

Si l'erreur est liée à un problème réseau lors de la récupération des
images du mail, il est alors à votre choix de décider si vous souhaitez
autoriser la rendition à se connecter au net pour récupérer ces images
ou donner à wkhtmltopdf dans la configuration de la rendition un proxy
qui se chargera de résoudre les URLs autorisées et bloquera les autres
(un proxy bloquant toutes les images est possible mais le rendu en sera
dégradé)
