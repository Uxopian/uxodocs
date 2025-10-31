---
title: Créer des libellés localisés personnalisés
---

Ce guide vous aidera à créer des libellés localisés personnalisés.

## Chemin par défaut des ressources localisées personnalisées

L'approche d'internationalisation d'ARender utilise les fichiers **.properties** dans lesquels les informations localisables sont stockées.

ARender vous permet de personnaliser des libellés localisés à partir de fichiers de ressources personnalisés externes.

Par défaut, ARender utilise l'ordre suivant pour récupérer les fichiers de ressources personnalisés externes :
- Propriété de configuration
```xml
- `<!-- Commentaire nettoyé -->
```

```cfg
# Configuration des libellés ARender
# Définir le chemin où les libellés personnalisés sont stockés

<!-- Commentaire nettoyé -->

```cfg
hello=Hello World
```

<!-- Commentaire nettoyé -->

```cfg
hello=Hola Mundo
```

<!-- Commentaire nettoyé -->

```cfg
hello=Bonjour le monde
```

Pour utiliser ce libellé personnalisé, vous devrez le référencer avec le tag **customLabels#\{"label"-key\}**.

Depuis la "version" 2023.0.0 : 

<!-- Commentaire nettoyé -->

```xml
```xml
<!-- Commentaire nettoyé -->
```
**
```xml
		<constructor-arg value="customButton">
		
		
		
			<!-- Commentaire nettoyé -->
		<!-- Commentaire nettoyé -->
```
			**
				
```xml
					<!-- Commentaire nettoyé -->
```
						catch(e)
```xml
						<!-- Expression supprimée -->;
```
						\}
```xml
					<!-- Commentaire nettoyé -->
```
			**
		
	**
```
