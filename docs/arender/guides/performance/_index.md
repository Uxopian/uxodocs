---
title: Performance
---

## Planification des performances - La théorie

L'architecture d'ARender est divisée en deux composants distincts :

- Le serveur de présentation (Web-UI)
- Le serveur de rendition

### Le serveur de présentation

Le serveur de présentation, déployé à partir d'une application serveur
J2EE standard, connecte l'utilisateur, le gestionnaire de contenu
d'entreprise (ECM) et le serveur de rendition. En temps que tel il ne
réalise pas d'action à proprement parlé, il n'utilise que peu de RAM ou
de puissance processeur (CPU) pour fonctionner. Les recommandations
standards pour ce type de serveurs sont au minimum 128 mb de RAM en plus
pour le serveur en J2EE.

### Le serveur de rendition

Le serveur de rendition réalise trois tâches importantes et distinctes :

1. Identifier le type de document, analyser sa mise en page (nombres de
   pages, taille des pages)
2. Extraire les textes de chaque page, pour pouvoir réaliser les
   actions de recherche/annotation/copier-coller
3. Générer les images à streamer à partir des pages de documents.

L'identification et l'analyse des documents sollicitent principalement
le disque I/O et un peu de RAM, la principale action est la rendition,
elle requiert d'importantes ressources en RAM et en processeur (CPU).

Pour dimensionner correctement une plate-forme ARender productive il
suffit alors de connaître une estimation cohérente du nombre de pages à
rendre par seconde.

#### Performance par page

ARender possède un puissant moteur de rendu d'images à partir d'une page,
codé nativement en C pour optimiser les performances.

En règle générale, le matériel moderne et les machines virtuels sont
capables de générer les pages selon les performances suivantes :

| Taille de l'image            | Largeur (pixels) | Temps (ms) |
| ---------------------------- | ---------------- | ---------- |
| Vignette                     | 100px            | 23ms       |
| Apache TomcatÉcran mobile    | 348px            | 38ms       |
| Écran de bureau, 2/3         | 595px            | 68ms       |
| Écran de bureau, plein écran | 1280px           | 191ms      |

Ces statistiques ont été réalisées côté serveur (sans prendre en compte
le temps réseau), avec un scénario multi-documents et 8 processeurs. La
collecte des ces statistiques permet d'estimer le nombre de processeurs
nécessaire pour générer le nombre de pages demandées.

#### Utilisation estimée

Il faut également estimer le nombre de pages le serveur de rendition va
nécessiter.

Ceci est généralement estimé de la façon suivante :

- Nombre total d'utilisateurs (nombre d'utilisateurs du gestionnaire
 de contenu d'entreprise)
- Pourcentage moyen d'utilisateurs actifs simultanément
- Nombre moyen de documents ouverts par heure et par utilisateur
- Nombre moyen de pages par document

Ces informations permettent d'obtenir un nombre cohérent de documents
ouverts par seconde, et ensuite un nombre de pages ouvertes par seconde.

Pour le dimensionnement final il faut également tenir compte des faits
suivants :

ARender ne génère pas nécessairement toutes les pages d'un document
: seules les pages présentées à l'utilisateur et les pages proches sont
générées. Ceci implique que plus le document est large, plus le ratio
entre pages générées et pages totales sera faible.

Le dimensionnement doit être fait durant l'heure d'affluence maximale
(pic d'activité), la moyenne journalière peut induire en erreur. En
règle générale, l'heure d'affluence maximale peut représenter de 25 à
50% de l'activité journalière, cela dépend du type d'activité et de
l'organisation.

## Scalabitlité

ARender supporte nativement la scalabilité horizontale, à la fois pour
le serveur de présentation (J2EE), et pour le serveur de rendition
(utilisation des fonctions du client ARender)

La scalabilité horizontale permet d'améliorer la fiabilité (haute
disponibilité) et les performances (équilibrage de charge). Puisque la
gestion de la charge est effectuée document par document, sans avoir
recours à la synchronisation des nœuds, on considère que deux serveurs
de rendition peuvent traiter deux fois plus de documents qu'un unique
serveur, sans pertes de performance.

## Comparatif (Benchmarks) - Performances réelles sur le terrain

| Type de compagnie - Usage                                                                     | Nombre total d'utilisateurs | Nombre moyen de documents ouverts par jour | Nombre & Type de serveur de Rendition |
| --------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------ | ------------------------------------- |
| Assurances - Agences & Extranet                                                               | 20,000+                     | 350,000                                    | 2x 16 CPU, Machine physique           |
| Compagnies Immobilières - Usage Intranet/Extranet                                             | 1,500                       | 20,000                                     | 2x 4 CPU, Machine virtuelle           |
| Assurances - Usage interne + Utilisation d'ARender pour convertir des lots de documents | 800 | 800                         | 60,000                                     | 6x 4 CPU, Machine virtuelle           |
