---
title: "Custom display name"
last_update:
  date: '2026-02-02T12:23:28.934Z'
  author: CI/CD Bot
content_hash: 244a713ce378a46927f72e4cdf99b97c796f1ac6e89ea080ea640f17e5179149
---

ARender allows to customize display names.

By default, as an example using FileNet, the technical ID of the user
will be displayed to the end user. If this ID is not known or it is not
meant to be read by the end user, it can be good to alter it only on the
browser side and let the server handle the real unique user ID.

In order to simplify reading the annotations, ARender allows to
implement in the Front end side (Web-UI) an interface of
*DisplayNameProvider*.

``` java
public interface DisplayNameProvider
{

    String fetchDisplayName(String originalCreatorName);

    List<String> fetchDisplayNames(List<String> originalCreatorNames);

}
```

Those two methods needs to be implemented (one of them being a list
format call of the first) and to return *displayNames* from given
userNames.

Here is a default base sample (available inside ARender default
packaging) which allows to prefix all usernames by *arender*.

``` java
public class DefaultPrefixerDisplayNameProvider implements DisplayNameProvider
{
    private String prefix = "arender";

    private String separator = "-";

    @Override
    public String fetchDisplayName(String originalCreatorName)
    {
        return getPrefixedString(originalCreatorName);
    }

    @Override
    public List<String> fetchDisplayNames(List<String> originalCreatorNames)
    {
        List<String> prefixed = new ArrayList<String>();
        for (String originalCreatorName: originalCreatorNames)
        {
            prefixed.add(getPrefixedString(originalCreatorName));
        }
        return prefixed;
    }

    private String getPrefixedString(String originalCreatorName)
    {
        if (Strings.isNullOrEmpty(originalCreatorName))
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
    {
        this.prefix = prefix;
    }

    public String getSeparator()
    {
        return separator;
    }

    public void setSeparator(String separator)
    {
        this.separator = separator;
    }

}
```

The last remaining step is required to indicate to ARender which display
names provider it should use. This is done in the following files:

- Example of bean definition (modifications to do in
*arender-custom-server-integration.xml*):

```xml
<bean id="myCustomNameProvider" class="com.arondor.viewer.MyCustomDisplayNameProvider" />
```

- Example of property setup (modifications to do in
*arender-server-custom-&lt;...\>.properties*):

```cfg
arender.server.displayName.provider=myCustomNameProvider
```
