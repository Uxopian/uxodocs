---
title: Plugins
---

ARender permet l'intégration de Plugins. Ces derniers peuvent être
ouverts de deux façon:

- Ouverture directe depuis l'URL ARender avec le paramètre d'URL
  *plugin=pluginName*
- Ouverture depuis ARender dans une nouvelle fenêtre par lancement
  d'évènements (configuration d'un bouton)

## Configuration XML des Plugins

Si vous utilisez le mode lancement depuis un bouton, vous devrez
configurer un bouton de la façon suivante:


``` xml
**
    
        <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
    
        <ref>
    <!-- Commentaire nettoyé -->
    
        **
            
            
            
        **
    <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
        **
            <!-- Commentaire nettoyé -->
                        <!-- Commentaire nettoyé -->
                    <!-- Commentaire nettoyé -->
                **
            <!-- Commentaire nettoyé -->
**
```




``` xml
**
    
        <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
    
        <ref>
    <!-- Commentaire nettoyé -->
    
    
        <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
        **
            <!-- Commentaire nettoyé -->
                        <!-- Commentaire nettoyé -->
                    <!-- Commentaire nettoyé -->
                **
            <!-- Commentaire nettoyé -->
**
```


Les points importants ici sont :

- *openInMultiView* qui annonce à ARender que ce plugin se lance en
  multiView et non pas en tant que document fullpage.
- *AskOpenPluginEvent* qui possède un constructor-arg qui doit
  posséder le même nom que le plugin défini côté serveur en XML.

Pour configurer le plugin en lui même, il suffit d'ajouter la
configuration soit dans le fichier arender-plugin.xml d'ARender Web-UI soit
d'ajouter à ce fichier plugin un import de votre XML contenant la
configuration de votre plugin.


``` xml
<?xml version="1.0" encoding="UTF-8"?>

**

    <!-- Commentaire nettoyé -->
    **
**
```


``` xml
<?xml version="1.0" encoding="UTF-8"?>

**

    **
        
    **
**
```


Vous pourrez noter dans la configuration du plugin de classe
*com.arondor.viewer.common.plugin.Plugin* que nous avons utilisé la
propriété iframeSrc. Cette propriété permet de définir l'URL à utiliser
pour le plugin à intégrer dans ARender en tant qu'iframe.

Les modes de configuration sont les suivants :

- **iframeSrc :** spécifie la source URL de l'iframe d'intégration du
  plugin. Ceci implique le mode iframe.
- **html :** spécifie le contenu HTML total. Ceci permet un contrôle
  complet mais retire le paramétrage par JS.
- **innerHTML :** spécifie le HTML contenu à placer dans l'iframe.
  Permet une iframeSrc vide et un contenu innerHTML.
