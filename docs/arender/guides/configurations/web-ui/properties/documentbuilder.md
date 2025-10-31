---
title: Composition de documents
---

## Généralités


| Description                                                                                                                           | Clé du paramètre                                                         | Valeur par défaut   | Type    |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------- | ------- |
| Activation/désactivation du composant                                                                                                 | documentbuilder.enabled                                                  | false               | Booléen |
| Montrer/Cache le bouton de la composition de documents                                                                                | documentbuilder.button.visible                                           | true                | Booléen |
| Rendre les images du composeur de documents déplaçables (ou non)                                                                      | documentbuilder.thumbs.draggable                                         | true                | Booléen |
| Activation de la composition de document au démarrage                                                                                 | documentbuilder.activateOnStartup                                        | false               | Booléen |
| Cache le navigateur de document                                                                                                       | documentbuilder.hideDocumentNavigator                                    | false               | Booléen |
| Largeur (en pixel)                                                                                                                    | documentbuilder.width                                                    | 280                 | Entier  |
| Action de la sauvegarde                                                                                                               | documentbuilder.save.action                                              | save                | Texte   |
| Comportement de la sauvegarde (UPDATE_NO_DOCUMENT, CREATE_NEW_FIRST_DOCUMENT, UPDATE_FIRST_DOCUMENT, UPDATE_ALL_DOCUMENT)             | documentbuilder.save.behavior                                            | UPDATE_NO_DOCUMENT  | Texte   |
| Télécharger le document après la sauvegarde                                                                                           | documentbuilder.save.download                                            | true                | Booléen |
| Effacer le document après la sauvegarde. Autrement le document est figé/grisé.                                                        | documentbuilder.save.delete                                              | false               | Booléen |
| Afficher une notification quand on quitte la page avec des documents non sauvegardés                                                  | documentbuilder.displaySaveWarning                                       | true                | Booléen |
| Créer un document enfant (fichiers)                                                                                                   | documentbuilder.addChild.enabled                                         | false               | Booléen |
| Créer un nouveau document (pas seulement composer)                                                                                    | documentbuilder.createDocument.enabled                                   | true                | Booléen |
| Supprimer par clic droit une liste de vignettes sélectionnées                                                                         | documentbuilder.deleteSelectedThumbs.enabled                             | true                | Booléen |
| Créer un nouveau document à partir des vignettes sélectionnées                                                                        | documentbuilder.createDocumentFromSelectedThumbs.enabled                 | true                | Booléen |
| Fermer le constructeur                                                                                                                | documentbuilder.close.enabled                                            | true                | Booléen |
| Afficher le bouton d'enregistrement d'origine du constructeur de documents                                                            | documentbuilder.button.legacySave.enabled                                | false               | Booléen |
| Afficher le bouton : télécharger le document construit en local                                                                       | documentbuilder.button.download.enabled                                  | true                | Booléen |
| Afficher le bouton : exécuter une action personnalisée sur le document construit                                                      | documentbuilder.button.custom.enabled                                    | false               | Booléen |
| Afficher le bouton : télécharger le document construit avec annotation                                                                | documentbuilder.button.download.annotations.enabled                      | false               | Booléen |
| Afficher le bouton : mettre à jour tous les documents                                                                                 | documentbuilder.button.updateAll.enabled                                 | false               | Booléen |
| Afficher le bouton : Créer un nouveau premier document                                                                                | documentbuilder.button.createFirst.enabled                               | false               | Booléen |
| Afficher le bouton : Mettre à jour le document                                                                                        | documentbuilder.button.updateFirst.enabled                               | false               | Booléen |
| Afficher le bouton "Enregistrer tout", même si les documents sont vides                                                               | documentbuilder.button.saveAll.active.when.empty                         | false               | Booléen |
| Afficher le bouton "Tout mettre à jour", même si les documents sont vides                                                             | documentbuilder.button.updateAll.active.when.empty                       | false               | Booléen |
| Configurer la stratégie pour remplir le constructeur de documents (CopyCurrentDocument or EmptyDocument)                              | documentbuilder.populatorPolicy                                          | CopyCurrentDocument | Texte   |
| Configurer la stratégie CopyCurrentDocument depuis le constructeur de documents : besoin d'aplatir ou non l'indentation des documents | documentbuilder.populatorPolicy.CopyCurrentDocument.flattenNodeHierarchy | true                | Booléen |
| Masquer le bouton du constructeur de documents jusqu'à ce que tous les documents aient été chargés                                    | documentbuilder.button.hideUntilLoaded                                   | true                | Booléen |
| Comportement de l'affichage du navigateur des vignettes après le traitement d'un téléchargement dans le constrcteur de documents      | documentbuilder.afterDownload                                            | hide                | Texte   |
| Afficher le bouton : Rafraîchir le document à son état d'origine                                                                      | documentbuilder.button.refresh.enabled                                   | true                | Booléen |
| Activation/Désactivation du bouton de téléchargement local dans le menu contextuel                                                    | documentbuilder.contextual.menu.download.enabled                         | false               | Booléen |
| Activation/Désactivation du bouton de téléchargement avec annotations dans le menu contextuel                                         | documentbuilder.contextual.menu.download.annotations.enabled             | false               | Booléen |
| Activation/Désactivation du bouton création de document dans le menu contextuel                                                       | documentbuilder.contextual.menu.createFirst.enabled                      | false               | Booléen |
| Activation/Désactivation du bouton de mise à jour du document dans le menu contextuel                                                 | documentbuilder.contextual.menu.updateFirst.enabled                      | false               | Booléen |
| Activation/Désactivation du bouton de suppression de document dans le menu contextuel                                                 | documentbuilder.contextual.menu.delete.enabled                           | false               | Booléen |


