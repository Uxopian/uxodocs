---
title: Noms d’utilisateurs personnalisables
---

ARender permet de personnaliser les noms utilisateurs affichés à
l'écran.

Par défaut, sous FileNet par exemple, l'identifiant technique va être
affiché à l'utilisateur. Si celui n'est pas significatif pour
l'utilisateur il est par contre important pour la gestion des
annotations car il permet alors d'assurer l'existence unique de cet
utilisateur dans la base. Afin de clarifier la lecture des annotations,
ARender permet d'implémenter côté serveur front end (Web-UI) une interface
de *DisplayNameProvider*.

``` java
public interface DisplayNameProvider
<!-- Commentaire nettoyé -->
```

Il suffit alors d'implémenter les deux méthodes (l'une étant simplement
un appel au format liste de l'autre) et de retourner pour une liste de
noms technique donnés une liste de *displayNames*.

Voici un exemple (disponible dans le code d'ARender) qui par exemple
préfixe tous les noms par *arender*

``` java
public class DefaultPrefixerDisplayNameProvider implements DisplayNameProvider
<!-- Commentaire nettoyé -->

    @Override
    public List<!-- Commentaire nettoyé --> originalCreatorNames)
    <!-- Commentaire nettoyé -->
        return prefixed;
    }

    private String getPrefixedString(String originalCreatorName)
    <!-- Expression supprimée -->
        {
            return prefix;
        }
        else
        {
            return prefix + separator + originalCreatorName;
        }
    }

    public String getPrefix()
    {
        return prefix;
    }

    public void setPrefix(String prefix)
    <!-- Commentaire nettoyé -->

    public String getSeparator()
    {
        return separator;
    }

    public void setSeparator(String separator)
    <!-- Commentaire nettoyé -->

}
```

La dernière étape consiste à indiquer à ARender le provider de display
names afin de l'utiliser. Cela se fait dans le fichier
*configurations/arender-custom-server.properties* :

- Exemple de déclaration du bean dans le fichier
*arender-custom-server-integration.xml *:

```xml
**
```

- Exemple de configuration de la propriété dans le fichier
*configurations/arender-custom-server.properties*:

```cfg
arender.server.displayName.provider=myCustomNameProvider
```
