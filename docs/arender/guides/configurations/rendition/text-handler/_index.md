---
title: Text handler
---

## Gestion des signatures électroniques

ARender application prend en charge l’affichage et la vérification des signatures numériques dans les fichiers PDF.
Cette fonctionnalité est désactivée par défaut, mais peut être activée dans les paramètres.
Une fois l’affichage activé, les informations de signature deviennent visibles et il est possible de configurer des certificats de confiance afin de vérifier l’authenticité des signatures présentes dans les documents.

```xml
<!-- Commentaire nettoyé -->
```

| Description                                                                                                        | Clé du paramètre               | Valeur par défaut        | Type    |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------ | ------------------------ | ------- |
| Activer la vérification et extraction des signatures électroniques                                                 | pdf.signatures.enable          | false                    | Booléen |
| Chemin du dossier contenant des certificats dont au moins un doit correspondre à un certificat trouvé dans le PDF  | PUBLIC_CERT                    | ../defaultPathPublicCert | String  |
| Chemin du dossier contenant des certificats approuvés par Adobe (AATL) (Depuis la version 2023.14.0)               | trusted.root.certificates.path | ../defaultPathRootCert   | String  |

