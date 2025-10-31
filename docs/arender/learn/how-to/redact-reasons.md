---
title: Les raisons des biffures
---

### Ajouter une raison

Il est possible d'ajouter des raisons de biffage. Les valeurs du paramètre `symbolicName` seront affichées directement sur la biffure. 


```xml
<!-- Commentaire nettoyé -->
```

```xml
    **
		<!-- Commentaire nettoyé -->
				**
					
					
						<!-- Commentaire nettoyé -->
							<entry>
						<!-- Commentaire nettoyé -->
				**
			<!-- Commentaire nettoyé -->
	**
```


## Valeur par défaut 

Vous pouvez ajouter une ou plusieurs raisons par défaut grâce à la propriété suivante. La valeur par défaut (ici '(b)(1)') correspond à la valeur de la propriété avec le nom "symbolicName" (voir l'exemple ci-dessus).

Si plusieurs raisons sont ajoutées comme valeur par défaut elles seront séparées par des virgules (ex : (b)(1),(b)(2) ).

```xml
<!-- Commentaire nettoyé -->
```

```cfg
arender.server.annotations.default.redact.reason=(b)(1)
```

Si cette propriété n'a pas de valeur, par défaut la biffure ne possédera pas de raison.

```xml
<!-- Commentaire nettoyé -->
```

Votre valeur par défaut **doit** être ajoutée dans votre fichier de customisation (la configuration de arender-custom-integration.xml). Sinon, cette valeur ne sera pas prise en compte.


