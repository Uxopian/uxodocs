---
title: Task conversion
---

## Rendition sans accès à internet et besoin de visualisation de mail contenant des images externes

Si la Rendition est installée sur un serveur qui **n'a pas accès à Internet** et qu'un besoin de **visualisation de mail contenant des images stockées sur Internet** existe, veuillez suivre la procédure suivante :

- Ajouter un proxy à la configuration WKHTMLTOPDF. Pour cela créer un fichier nommé **application.properties** dans le module TaskConversion et contenant la propriété ci-dessous (Valeur du proxy à adapter si besoin) (version 4.3.8 et supérieures) :

```xml
<!-- Commentaire nettoyé -->
```

```cfg
tools.wkhtmltopdf.options=--disable-javascript,--quiet,--encoding,UTF-8,--load-error-handling,ignore,--disable-external-links,--disable-internal-links,--disable-local-file-access,--proxy,localhost
```


Les liens internes et externes, l'accès aux fichiers locaux et l'URL de l'iframe sont désactivés par défaut pour la conversion HTML en PDF.
Le but est d'éviter les problèmes de sécurité.

Notez que cela peut avoir un impact sur le rendu du HTML dans ARender :
- Les liens cliquables seront désactivés
- L'affichage d'image à partir d'un lien interne/externe ou d'un fichier local ne sera pas rendu
- L'URL de l'iframe ne sera pas rendue

Les propriétés par défaut du service TaskConversion ressemblent à ceci :

```xml
<!-- Commentaire nettoyé -->
```

```cfg
tools.wkhtmltopdf.options=--disable-javascript,--quiet,--encoding,UTF-8,--load-error-handling,ignore,--disable-external-links,--disable-internal-links,--disable-local-file-access
# Désactiver l'URL iframe par mesure de sécurité
outils.wkhtmltopdf.iframe.disabled=true
```



## Langue des libellés des cartes de visite

Le format VCF est pris en charge depuis la version 2023.6.0. Certaines informations, comme l'adresse, le téléphone ou l'email sont précédées du type,
appelé "libellé", comme par exemple "Domicile" qui indique que les informations qui suivent sont personnelles.
Il est possible de changer la langue de ces libellés. Pour l'instant, deux langues sont disponibles : l'anglais et le français.


La propriété par défaut du service TaskConversion ressemble à ceci :

```xml
<!-- Commentaire nettoyé -->
```

```cfg
# Configurer la langue des champs d'information. Les valeurs possibles sont : "FR", "EN".
vcard.label.language=EN
```


## Rendition des images des TIFF

Des propriétés sont disponibles afin de configurer le rendu des images générées depuis les TIFF.

```xml
<!-- Commentaire nettoyé -->
```

| Description                                                                                                                  | Clé du paramètre                  | Valeur par défaut | Type   |
| ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------- | ------ |
| Pour la création de PDF à partir d'images, la largeur maximale demandée (en pixels)                                          | image.conversion.maximum.width.px | 2000              | Entier |
| Le mime type des images générées (Depuis la version 2023.14.0)Les valeurs possibles sont **image/png** et **image/jpeg** | image.conversion.target.mime.type | image/png         | String |

