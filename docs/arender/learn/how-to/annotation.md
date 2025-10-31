---
title: Annotations
---

## Configuration de la politique de creation d'annotation

Il est possible de définir au préalable différents comportements vis-à-vis de la création d'annotation dans ARender. 
Cette configuration se fait dans le fichier _configurations/arender-custom-server.properties_.

| Propriété                                             | Description                                                             | Type    |
| ----------------------------------------------------- | ----------------------------------------------------------------------- | ------- |
| arender.server.annotations.can.create                 | Autoriser à créer des annotations.                                      | Booléen |
| arender.server.annotations.text.html.support          | Notes textuelles supportent le HTML.                                    | Booléen |
| arender.server.annotations.text.reply.support         | Notes textuelles supportent les réponses.                               | Booléen |
| arender.server.annotations.text.status.support        | Notes textuelles supportent les statuts.                                | Booléen |
| arender.server.annotations.text.security.support      | Annotations supportent la sécurité.                                     | Booléen |
| arender.server.annotations.text.comment.reply.support | Notes textuelles supportent les réponses dans l'exploreur d'annotation. | Booléen |

Voir les parties correspondantes pour la configuration de _la sécurité des annotations **AnnotationSecurity**_ et
_les modèles de tampon **Stamp**_.

## Configuration des modèles de tampons

Afin de modifier les tampons existants, ou bien en rajouter de nouveaux,
modifier la configuration existante dans
_annotation-template-catalog.xml_. Deux
types de tampons sont disponibles, les tampons texte et image.

### Tampon texte

Les propriétés configurables sont :

| Description           | Clé du paramètre | Type                                    |
| --------------------- | ---------------- | --------------------------------------- |
| Nom du tampon         | name             | Texte                                   |
| Couleur de la police  | fontColor        | Texte (couleur en texte ou hexadécimal) |
| Taille de la police   | fontSize         | Entier                                  |
| Couleur du fond       | backgroundColor  | Texte (couleur en texte ou hexadécimal) |
| Couleur de la bordure | borderColor      | Texte (couleur en texte ou hexadécimal) |
| Style de bordure      | borderStyle      | Entier (O ou 1, sans ou avec bordure)   |
| Rotation (en °)       | rotation         | Entier                                  |


``` xml
**
    
    
         <!-- Commentaire nettoyé -->Stamp<!-- Commentaire nettoyé -->
    
    
         **
             
             
             
             
             
             
             
         **
**
```


### Tampon image

Les propriétés configurables sont :

| Description         | Clé du paramètre | Type                                     |
| ------------------- | ---------------- | ---------------------------------------- |
| Nom du tampon       | name             | Texte                                    |
| Chemin vers l'image | imageLocation    | Texte (image base64 ou url vers l'image) |
| Taille de l'image   | defaultPosition  | PageRelativePosition                     |
| Largeur             | width            | Entier                                   |
| Hauteur             | height           | Entier                                   |
| Rotation (en °)     | rotation         | Entier                                   |


``` xml
**
    
        
            <!-- Commentaire nettoyé -->ImageStamp<!-- Commentaire nettoyé -->
        
        
            **
                 
                 
            **
        <!-- Commentaire nettoyé -->
            **
                
            **
        <!-- Commentaire nettoyé -->
        **
            <!-- Commentaire nettoyé -->Square<!-- Commentaire nettoyé -->
            <!-- Commentaire nettoyé -->
            
                <!-- Commentaire nettoyé -->
                **
                    <!-- Commentaire nettoyé -->
                    
                    
                    
                        **
                            
                            
                            
                        **
                    <!-- Commentaire nettoyé -->
            <!-- Commentaire nettoyé -->
        **
    <!-- Commentaire nettoyé -->
    **
        
        
        
    **
<!-- Commentaire nettoyé -->
    <value type="com.arondor.viewer.annotation.api.LineEndType">NONE<!-- Commentaire nettoyé -->
```

- AnnotationFlags : un tag d'obfuscation est disponible

``` xml

    **
        
    **
<!-- Commentaire nettoyé -->
    **
        <!-- Commentaire nettoyé -->CLOUDY<!-- Commentaire nettoyé -->
    **
<!-- Commentaire nettoyé -->
        <!-- Commentaire nettoyé -->
                
                    <!-- Commentaire nettoyé -->
                            <!-- Commentaire nettoyé -->fr<!-- Commentaire nettoyé -->
                            <!-- Commentaire nettoyé -->
                        <!-- Commentaire nettoyé -->
                            <!-- Commentaire nettoyé -->en<!-- Commentaire nettoyé -->
                            <!-- Commentaire nettoyé -->
                        <!-- Commentaire nettoyé -->
                <!-- Commentaire nettoyé -->
                
                    <!-- Commentaire nettoyé -->
                            <!-- Commentaire nettoyé -->fr<!-- Commentaire nettoyé -->
                            <!-- Commentaire nettoyé -->
                        <!-- Commentaire nettoyé -->
                            <!-- Commentaire nettoyé -->en<!-- Commentaire nettoyé -->
                            <!-- Commentaire nettoyé -->
                        <!-- Commentaire nettoyé -->
                <!-- Commentaire nettoyé -->
    <!-- Commentaire nettoyé -->

### Configuration actuel des boutons dans le toppanel

Voici la configuration actuelle du bean servant de conteneur pour les boutons de création d'annotation : 


``` xml
    **
		
		
		
		
			&lt;ref&gt;
```xml
		<!-- Commentaire nettoyé -->
```
		
		
	**
    
```


Voici un exemple de bean qui définit un bouton de création d'annotation se trouvant dans le toppanel : 


``` xml
    **
```xml
		<constructor-arg value="addHighlightRectangleAnnotationButton" >
		
		
		
		 
		
		
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
		
```
			**
				
				
				
			**
```xml
		<!-- Commentaire nettoyé -->
```
    
    
    
    
        &lt;ref&gt;
```xml
    <!-- Commentaire nettoyé -->
```
**
```



#### Les boutons dans le sous-menu

Pour mettre les boutons dans un sous-menu, il va falloir prendre les bean correspondants aux annotations que vous voulez mettre dans le sous-menu, puis les rajouter dans le fichier _arender-custom-integration.xml_. Ensuite, les propriétés suivantes devront être supprimées car elles ne sont pas compatibles avec un bouton de sous-menu : 
- name
- buttonGroup
- inactiveButtonHandler
- supportShortCut
- shortcut

La classe du bean doit être modifiée afin d'avoir un bouton pouvant bien s'intégrer dans le sous-menu. La nouvelle classe à utiliser est _com.arondor.viewer.client.widgets.DropdownMenuItem_.

Si le double-clique doit être géré, alors il faudra ajouter avant la propriété _buttonHandler_, la propriété suivante permettant de définir le temps, en milliseconde, de l'intervalle entre les deux cliques : 


``` xml

```


Une fois ces étapes terminées, vous allez avoir un bean ressemblant à l'exemple suivant. L'étape devra être répétée pour chaque bouton devant être ajouté dans un sous-menu.


``` xml
**
```xml
    <constructor-arg value="addHighlightRectangleAnnotationButton" >
    
    
     
    
    
        <ref>
    <!-- Commentaire nettoyé -->
        <ref>
    <!-- Commentaire nettoyé -->
        <ref>
    <!-- Commentaire nettoyé -->
        <ref>
    <!-- Commentaire nettoyé -->
```
