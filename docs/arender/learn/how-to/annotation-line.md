---
title: Annotation personalisé
---

## Exemple : L'annotation Line

L'annotation Line est tirée de l'annotation Arrow avec les éléments de
la tête (head) et de la queue (tail) à None. C'est donc une
personnalisation de cette annotation. Nous avons besoin que de deux
fichiers, _configurations/arender-custom-integration.xml_
et _configurations/arender-custom-client.properties_.

## Modification de _arender-custom-integration.xml_

A l'intérieur de ce fichier nous allons faire deux choses. Créer le
modèle de l'annotation et faire le bouton qui appelera cette
annotation.

### Modèle de l'annotation

Pour le faire, on peut partir de la base de l'annotation arrow et la
personnaliser. On peut récupérer le bean de arrowCreationAction qui se
trouve dans _event-configuration.xml_. Une
fois fait, pour avoir une ligne il faut que la propriété head et la
propriété tail soient à `NONE`.

```xml
<!-- Commentaire nettoyé -->
```

``` xml
**
  <!-- Commentaire nettoyé -->
        <value type="com.arondor.viewer.annotation.common.AnnotationType">Line<!-- Commentaire nettoyé -->
      
        <!-- Commentaire nettoyé -->
        **
          <!-- Commentaire nettoyé -->
          
            <value type="com.arondor.viewer.annotation.api.LineEndType">NONE<!-- Commentaire nettoyé -->
          
            <value type="com.arondor.viewer.annotation.api.LineEndType">NONE<!-- Commentaire nettoyé -->
        **
      <!-- Commentaire nettoyé -->
**
```


Il est possible de personnaliser ensuite l'annotation pour avoir une
couleur ou une taille par défaut.

### Bouton de l'annotation

On peut maintenant faire le bouton de l'annotation. On peut partir du
modèle de base de la flèche qui se trouve dans _toppannel-annotations-configuration.xml_
et le personnalisé dans _arender-custom-integration.xml_.


``` xml
**
    
    
        **
            
            
        **
    <!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->
        <ref>
    <!-- Commentaire nettoyé -->
		
		
		
		
		
	  
			<ref>
		<!-- Commentaire nettoyé -->
			<ref>
		<!-- Commentaire nettoyé -->
			<ref>
		<!-- Commentaire nettoyé -->
			<ref>
		<!-- Commentaire nettoyé -->
			<ref>
		<!-- Commentaire nettoyé -->
		
			**
				
				
				
			**
		<!-- Commentaire nettoyé -->
		
		
		
		
	  
			<ref>
		<!-- Commentaire nettoyé -->
			<ref>
		<!-- Commentaire nettoyé -->
			<ref>
		<!-- Commentaire nettoyé -->
			<ref>
		<!-- Commentaire nettoyé -->
			<ref>
		<!-- Commentaire nettoyé -->
		
			**
				
				
				
			**
		<!-- Commentaire nettoyé -->

```cfg
topPanel.annotation.buttons.beanNames=addLineAnnotationButton
```


Attention, si vous voulez avoir tout les boutons d'annotations, il faut
récupérer le `topPanel.annotation.buttons.beanNames` de _configurations/arender-custom-client.properties_
et rajouter votre bouton. Ensuite, il suffit d'activer votre annotation.

<!-- Commentaire nettoyé -->

```cfg
topPanel.annotationMenu.line=true
```


Relancer votre Web-UI et votre annotation line apparaitra.
