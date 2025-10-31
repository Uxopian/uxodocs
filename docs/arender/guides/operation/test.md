---
title: Test de fonctionnement
---

Cette partie détaille les tests permettant de vérifier le bon
fonctionnement d’ARender. Ils peuvent être aussi bien effectués de
manière ponctuelle (installation, montée de version, etc.) que continue
pour de la supervision.

## Serveur de rendition

Pour tester le bon fonctionnement de ARender Rendition, il suffit de visualiser le retour de la page de météo, **voir la documentation post installation** (lien supprimé).

## Serveur de présentation

Afin de tester le déploiement de la partie présentation de
l’application, une simple interrogation de la page Web [http://localhost:8080](http://localhost:8080) suffit.

## Bout en bout

En fonction des exigences, des tests plus ou moins poussés peuvent être
mis en place. En effet, des tests de bout-en-bout peuvent être effectués
afin de tester l'application dans sa globalité. Typiquement, il est
possible de tester l'ouverture de documents et la rendition de leurs
pages à l'aide de requêtes HTTP GET.

- Étape 1 : charger un document via une URL :

[http://localhost:8080/arendergwt/openExternalDocument](http://localhost:8080/arendergwt/openExternalDocument)

Cette servlet retourne l'identifiant ARender du document.

Il est également possible de fournir à cette servlet, les paramètres usuels
fournis à l'URL d'appel d'ARender pour tester n'importe quel connecteur.

- Étape 2 : test de chargement d'une page :

[http://localhost:8080/arendergwt/imageServlet?uuid=b64_I2RlZmF1bHQ=&pagePosition=1&desc=IM_800_0](http://localhost:8080/arendergwt/imageServlet?uuid=b64_I2RlZmF1bHQ=&pagePosition=1&desc=IM_800_0)

Cette servlet permet de tester la génération d'une image de 800px de la
page n°1 du document **b64_I2RlZmF1bHQ=**

*Dans le cas d'architecture complexe, cette méthodologie ne
permet pas de tester toutes les branches de la plateforme. Typiquement,
si une ferme de serveur de rendition est définie, il n'est pas possible,
par ce biais, de s'assurer que les deux serveurs de rendition ont été
testés.*
