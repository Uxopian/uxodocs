---
title: Groupe d'annotations
---

L'assignation d'un groupe à une annotation se fait avec l'utilisation de la propriété *Security* qui permet de stocker une valeur désignant l'appartenance à un groupe.

Par défaut, seulement deux valeurs sont utilisables :
- Privé
- Publique

La liste de valeur est configurable. Une propriété doit être activée afin de visualiser la liste déroulante en étant en mode d'édition d'annotation.


```cfg
arender.server.annotations.text.security.support=true
```


## Modification par configuration

La liste de groupe d'annotation est configurable.

Exemple de configuration du bean qui va peupler la liste de groupe d'annotation :


```cfg
**
    <!-- Commentaire nettoyé -->
            **
                
                
                    <!-- Commentaire nettoyé -->
                        <entry>
                    <!-- Commentaire nettoyé -->
            **
            **
                
                
                    <!-- Commentaire nettoyé -->
                        <entry>
                    <!-- Commentaire nettoyé -->
            **
            **
                
                
                    <!-- Commentaire nettoyé -->
                        <entry>
                    <!-- Commentaire nettoyé -->
            **
        <!-- Commentaire nettoyé -->
**
```



Visuellement, une liste déroulante s'affiche dans le toppanel à l'édition d'une annotation.

```xml
<!-- Commentaire nettoyé -->
```

## Modification par le connecteur

Dans la classe Java qui implémente l'interface *DocumentAccessor*, vous pouvez changer l'implémentation du setter pour l'*AnnotationAccessor* afin de définir une nouvelle liste de valeur pour les groupes d'annotation. 

Voici un exemple basique d'implémentation de la fonction *setAnnotationAccessor* qui va définir une nouvelle liste de valeur :

```java

@Override
@JsonIgnore
public void setAnnotationAccessor(AnnotationAccessor annotationAccessor) throws AnnotationsNotSupportedException
<!-- Commentaire nettoyé -->

private SecurityLevel buildSecuriyLevel(String symbolicName, String fr, String en)
<!-- Commentaire nettoyé -->

private Map<String, String> buildLocalizedDisplayNames(String fr, String en)
<!-- Commentaire nettoyé -->

```



## Garder la notion d'annotation privée

```xml
La notion d'annotation privée est compatible avec la notion de groupe d'annotation. Il faut garder la définition de *property name="symbolicName" value="private"*. La description des annotations privées est trouvable à la section *Annotation securities configuration* dans la page [Annotation](<!-- Commentaire nettoyé -->)
```

Exemple de configuration du bean qui va peupler la liste de groupe d'annotation avec le choix *Privé* :


```cfg
**
    <!-- Commentaire nettoyé -->
            **
                
                
                    <!-- Commentaire nettoyé -->
                        <entry>
                    <!-- Commentaire nettoyé -->
            **
            **
                
                
                    <!-- Commentaire nettoyé -->
                        <entry>
                    <!-- Commentaire nettoyé -->
            **
            **
                
                
                    <!-- Commentaire nettoyé -->
                        <entry>
                    <!-- Commentaire nettoyé -->
            **
            **
                
                
                    <!-- Commentaire nettoyé -->
                        <entry>
                    <!-- Commentaire nettoyé -->
            **
        <!-- Commentaire nettoyé -->
**
```



```xml
<!-- Commentaire nettoyé -->
```


## Comment utiliser la notion de groupe

Maintenant que les annotations ont une notion de groupe, il est possible, par exemple, de rendre non modifiable les annotations dans le groupe "privé".

Exemple dans l'implémentation de l'*AnnotationAccessor* qui va créer ou mettre à jour les annotations non modifiable si le groupe est "privé" : 
```java

@Override
public void create(List<!-- Commentaire nettoyé --> annotations) throws AnnotationsNotSupportedException, AnnotationNotAvailableException, AnnotationCredentialsException, InvalidAnnotationFormatException
<!-- Expression supprimée -->;

    // Code custom + appel à la base de donnée pour mettre à jour les annotations
}

private void updateAnnotationSecurity(List<Annotation> annotations)
<!-- Expression supprimée -->;
        }
    }
}

```
