---
title: Sélection de texte
---

## Sélection de texte du document

ARender est composé de différentes couches, qui sont :

- Couche Contenu (Couche inférieure) : Chaque page est affichée en tant qu'image
- Couche Textuelle (Couche intermédiaire) : L'utilisateur peut sélectionner, copier, rechercher ou annoter le texte du document
- Couche Annotation (Couche supérieure) : L'utilisateur peut visionner, créer, modifier les annotations individuellement

## Comment sélectionner le texte

Lorsque l'utilisateur passe la souris sur le texte, le curseur de la souris devient un pointeur textuel. L'utilisateur peut cliquer et déplacer la souris sur une partie du mot pour le sélectionner et copier ou annoter le texte. Le texte sélectionné est alors surligné en bleu. Pour copier le texte sélectionné, l'utilisateur peut appuyer sur la touche CTRL puis appuyer sur la touche C (CTRL+C).
Une fois le texte copié, il peut coller le texte dans une autre application tierce.
L'utilisateur peut également sélectionner un mot en double cliquant dessus.

```xml
<!-- Commentaire nettoyé -->
```


Lorsque la sélection de texte est finie, le menu rapide s'affiche en dessous du texte pour permettre diverses actions concernant le texte sélectionné.

```xml
<!-- Commentaire nettoyé -->
```

## Sélection de texte - Caractère par Caractère

Par défaut, la sélection de texte surligne caractère par caractère :

```xml
<!-- Commentaire nettoyé -->
```

## Sélection de texte - Mot par Mot

La version 4.1.x d'ARender introduit une nouvelle fonctionnalité de sélection de texte permettant une utilisation plus optimale de traitement de texte.

Dès lors qu'un mot ou une partie d'un mot est sélectionné, la sélection s'étend automatiquement pour inclure la totalité du mot.

```xml
<!-- Commentaire nettoyé -->
```

L'utilisateur a la possibilité d'annuler la sélection du mot dans son entièreté en changeant la direction dans laquelle le pointeur de la souris est déplacé lors de la sélection.
Cette action annule la sélection automatique du mot en entier et permet à l'utilisateur de sélectionner précisément une partie ou la totalité du mot.

```xml
<!-- Commentaire nettoyé -->
```

```xml
Pour activer cette nouvelle fonctionnalité, veuillez vous référer à la configuration dédiée [ici](<!-- Commentaire nettoyé -->)
```

## Sélection de texte - Ligne entière

Depuis la version 4.7.3 d'ARender, il est possible de sélectionner une ligne entière en faisant trois clics consécutifs.

```xml
<!-- Commentaire nettoyé -->
```

## Sélection de texte - Page entière

Depuis la version 4.7.3 d'ARender, il est possible de sélectionner une page entière en faisant quatre clics consécutifs.

```xml
<!-- Commentaire nettoyé -->
```

## Sélection de texte - Document entier

La version 4.8.0 d'ARender introduit la sélection de tout le texte du document courant. Cette fonctionnalité est disponible par un bouton
 dans le toppanel qui est désactivé par défaut.

Pour l'activation du bouton, il faut rajouter la propriété suivante au fichier de configuration *configurations/arender-custom-client.properties* :


```cfg
# Activate the copy all text of the document button
topPanel.copy.document.text=true
```


```xml
<!-- Commentaire nettoyé -->
```

Au clique, le bouton va lancer la récupération du texte de chaque page du document courant. L'avancement de la copie sera indiqué
 par une notification en bas à droite. Une fois la copie du texte finis, une notification sera à nouveau visible pour informer l'utilisateur.

```xml
<!-- Commentaire nettoyé -->
```

## Sélection de texte - Par zone

Depuis la version 4.5.x d'ARender, il est possible de sélectionner le texte contenu dans une zone tracé.

L'utilisateur peut faire `CTRL + clique-gauche` ou `ALT + clique-gauche` afin de pouvoir commencer la sélection de texte par zone.

```xml
<!-- Commentaire nettoyé -->
```


