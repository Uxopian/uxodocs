---
title: Custom display name
sidebar_position: 11
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 4c42af2ad354a2cb16b968f0dd73821a5a3075330f98488f9d4d9a711d27a211
---

ARender allows to customize display names.

By default, as an example using FileNet, the technical ID of the user
will be displayed to the end user. If this ID is not known or it is not
meant to be read by the end user, it can be good to alter it only on the
browser side and let the server handle the real unique user ID.

In order to simplify reading the annotations, ARender allows to
implement in the Front end side (Web-UI) an interface of
_DisplayNameProvider_.

```java
public interface DisplayNameProvider
{
  String fetchDisplayName(String originalCreatorName);

  List<String> fetchDisplayNames(List<String> originalCreatorNames);
}
```

Those two methods needs to be implemented (one of them being a list
format call of the first) and to return _displayNames_ from given
userNames.

Here is a default base sample (available inside ARender default
packaging) which allows to prefix all usernames by _arender_.

```java
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
    
    for (String originalCreatorName:originalCreatorNames)
    {
      prefixed.add(getPrefixedString(originalCreatorName));
      return prefixed;
    }
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
  _arender-custom-server-integration.xml _):

```xml
<bean id="myCustomNameProvider" class="com.arondor.viewer.MyCustomDisplayNameProvider" />
```

- Example of property setup (modifications to do in
  _configurations/arender-custom-server.properties_):

```properties
arender.server.displayName.provider=myCustomNameProvider
```
