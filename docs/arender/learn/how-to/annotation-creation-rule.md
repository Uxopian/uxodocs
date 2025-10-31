---
title: Création d'annotation par règle
---

## Concept général

Le principe de création des annotations par des règles repose sur la recherche d'un texte ou d'une expression régulière sur laquelle on va venir appliquer une annotation qui aura été définie.

Par exemple, il est possible d'automatiser la biffure d'information sensible ayant un pattern spécifique.

## Structure des règles de création d'annotation

Les règles seront définies via des *bean* dans les fichiers de configurations d'ARender. Une règle est composée de trois grandes parties : 
- Détails de la règle
- Détails de la recherche
- Détails de l'annotation

### Détails de la règle

Une règle a besoin d'un identifiant et d'un nom.

```xml
<!-- Commentaire nettoyé -->
```

```xml


```


### Détails de la recherche

Les détails de la recherche vont permettre de choisir un terme à rechercher ou bien une expression régulière. La recherche peut être affinée en choisissant la prise en compte des accents ou de la casse.

Différents types de recherches sont configurables afin de l'appliquer sur différentes zones du document. L'application peut se faire soit sur la page courante, soit sur toutes les pages ou bien une sélection de page : 
- CURRENT_PAGE
- ALL_PAGES
- SELECTED_PAGES


```xml
<!-- Commentaire nettoyé -->
```

```xml

	**
		
		
		
		
		
			<!-- Commentaire nettoyé -->CURRENT_PAGE<!-- Commentaire nettoyé -->
	**
<!-- Commentaire nettoyé -->

```xml
```xml
<!-- Commentaire nettoyé -->
```

```xml
	<!-- Commentaire nettoyé -->your_page_number_here<!-- Commentaire nettoyé -->another page number..<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->
```

```xml

	**
		
		
			<!-- Commentaire nettoyé -->Underline<!-- Commentaire nettoyé -->
		
			**
				
				
			**
		<!-- Commentaire nettoyé -->
```


### Règle complète

Voici une exemple de *bean* d'une règle complète réunissant les trois grandes parties. L'exemple permet de souligner en rouge chaque lettre 'e' de la page courante.

```xml
<!-- Commentaire nettoyé -->
```

```xml
**
	<!-- Commentaire nettoyé -->
	
	
	<!-- Commentaire nettoyé -->
	
		**
			
			
			
			
			
				<!-- Commentaire nettoyé -->CURRENT_PAGE<!-- Commentaire nettoyé -->
		**
	<!-- Commentaire nettoyé -->
	
		**
			
			
				<!-- Commentaire nettoyé -->Underline<!-- Commentaire nettoyé -->
			
				**
					
					
				**
			<!-- Commentaire nettoyé -->		
**
```


### Ajout d'une règle au catalogue de règles

Les règles personnalisées ne sont connues d'ARender uniquement à partir du catalogue de règle qui liste les différents identifiants des règles.

```xml
<!-- Commentaire nettoyé -->
```

```xml
**
	
		<!-- Commentaire nettoyé -->
		<!-- Commentaire nettoyé -->
**
```



## Utilisation des règles par Javascript

Il est possible avec du javascript de déclencher l'application de toutes les règles du catalogue.


```js
$wnd.getARenderJS().createAnnotationByRuleWithCatalog();
```


Il est également possible de faire une liste des identifiants des règles présentes dans le catalogue qui doivent être déclenchées : 


```js
$wnd.getARenderJS().createAnnotationByRulesWithRuleId(["annotationCreationRuleExample"]);
```



## Exemple d'utilisation

L'exemple qui suit va permettre de définir une règle permettant de biffer les mots *view* sur la page courante.

### Création d'une règle personnalisée

```xml
<!-- Commentaire nettoyé -->
```

```xml
**
	<!-- Commentaire nettoyé -->
	
	
	<!-- Commentaire nettoyé -->
	
		**
			
			
			
			
			
				<!-- Commentaire nettoyé -->CURRENT_PAGE<!-- Commentaire nettoyé -->
		**
	<!-- Commentaire nettoyé -->
	
		**
			
			
				<!-- Commentaire nettoyé -->RedactText<!-- Commentaire nettoyé -->
			
				**
					
					
				**
			<!-- Commentaire nettoyé -->		
**
```


### Configuration du catalogue des règles d'annotations

```xml
<!-- Commentaire nettoyé -->
```

```xml
**
	
		<!-- Commentaire nettoyé -->
			<ref>
		<!-- Commentaire nettoyé -->
**
```


### Utilisation dans un bouton personnalisé

Premièrement, on définit un bouton personnalisé :

```xml
<!-- Commentaire nettoyé -->
```

```xml
**
	<constructor-arg value="customButton">
	<constructor-arg value="Custom Button" >
	<constructor-arg value="standardButton">
	
	
		**
			
				<!-- Commentaire nettoyé -->
			<!-- Commentaire nettoyé -->
**
```



Ensuite, nous devons ajouter l'identifiant du bean customButtonToRedactSomething à la liste des boutons d'annotation comme ci-dessous : 

```xml
<!-- Commentaire nettoyé -->
```

```cfg
topPanel.annotation.buttons.beanNames=addStickyNoteAnnotationButton,addFreeTextAnnotationButton,customButtonToRedactSomething
```


Cet exemple de configuration ajoute 3 boutons à la section annotation du panneau supérieur.
