---
title: Group annotations
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 9e98b9660d0697f1669e52970db058a68ef5989f3c92f8fb9e7b586fdc4bada4
---

The assignment of a group to an annotation is done with the use of the _Security_ property which makes it possible to store the group name of the annotation.

By default, only two values ​​can be used :

- Private
- Public

The list of values ​​is configurable. The following property must be enabled in order to view the dropdown list while in annotation edit mode.

```cfg
arender.server.annotations.text.security.support=true
```

## Modification by configuration

The annotation group list is configurable.

Example of configuration of the bean that will populate the annotation group list:

```cfg
<bean id="availableSecurityLevels" class="java.util.ArrayList">
    <constructor-arg>
        <list>
            <bean
                class="com.arondor.viewer.annotation.common.SecurityLevel">
                <property name="symbolicName" value="group1" />
                <property name="localizedDisplayNames">
                    <map>
                        <entry key="fr" value="Groupe 1" />
                        <entry key="en" value="Group 1" />
                    </map>
                </property>
            </bean>
            <bean
                class="com.arondor.viewer.annotation.common.SecurityLevel">
                <property name="symbolicName" value="group2" />
                <property name="localizedDisplayNames">
                    <map>
                        <entry key="fr" value="Groupe 2" />
                        <entry key="en" value="Group 2" />
                    </map>
                </property>
            </bean>
            <bean
                class="com.arondor.viewer.annotation.common.SecurityLevel">
                <property name="symbolicName" value="group3" />
                <property name="localizedDisplayNames">
                    <map>
                        <entry key="fr" value="Groupe 3" />
                        <entry key="en" value="Group 3" />
                    </map>
                </property>
            </bean>
        </list>
    </constructor-arg>
</bean>
```

Visually, a dropdown list is displayed in the toppanel when editing an annotation.

![image](/img/arender/documentation/GroupeAnnotations/groupeannotation1.png)

## Modification by connector

In the Java class that implements the _DocumentAccessor_ interface, you can change the setter implementation for the _AnnotationAccessor_ to define a new list of values ​​for annotation groups.

Here is a basic example of the implementation of the function _setAnnotationAccessor_ which will define a new list of values:

```java

@Override
@JsonIgnore
public void setAnnotationAccessor(AnnotationAccessor annotationAccessor) throws AnnotationsNotSupportedException

    this.annotationAccessor = annotationAccessor;

    List&lt;SecurityLevel&gt; list = new ArrayList<>();
    list.add(buildSecuriyLevel("group1", "Groupe 1", "Group 1"));
    list.add(buildSecuriyLevel("group2", "Groupe 2", "Group 2"));
    list.add(buildSecuriyLevel("group3", "Groupe 3", "Group 3"));
    annotationAccessor.getAnnotationCreationPolicy().setAnnotationsSupportSecurity(true);
    annotationAccessor.getAnnotationCreationPolicy().setAvailableSecurityLevels(list);

private SecurityLevel buildSecuriyLevel(String symbolicName, String fr, String en)

    SecurityLevel securityLevel = new SecurityLevel();
    securityLevel.setSymbolicName(symbolicName);
    securityLevel.setLocalizedDisplayNames(buildLocalizedDisplayNames(fr, en));
    return securityLevel;

private Map<String, String> buildLocalizedDisplayNames(String fr, String en)

    Map<String, String> map = new HashMap<>();
    map.put("fr", fr);
    map.put("en", en);
    return map;

```

## Keep the notion of private annotation

The notion of private annotation is compatible with the notion of an annotation group. We must keep the definition of _property name = "symbolicName" value = "private"_. The description of private annotations can be found in the section _Annotation securities configuration_ in the page [Annotation](/docs/arender/learn/how-to/annotation)

Example of configuration of the bean that will populate the annotation group list with the _Private_ choice:

```cfg
<bean id="availableSecurityLevels" class="java.util.ArrayList">
    <constructor-arg>
        <list>
            <bean
                class="com.arondor.viewer.annotation.common.SecurityLevel">
                <property name="symbolicName" value="private" />
                <property name="localizedDisplayNames">
                    <map>
                        <entry key="fr" value="Privé" />
                        <entry key="en" value="Private" />
                    </map>
                </property>
            </bean>
            <bean
                class="com.arondor.viewer.annotation.common.SecurityLevel">
                <property name="symbolicName" value="group1" />
                <property name="localizedDisplayNames">
                    <map>
                        <entry key="fr" value="Groupe 1" />
                        <entry key="en" value="Group 1" />
                    </map>
                </property>
            </bean>
            <bean
                class="com.arondor.viewer.annotation.common.SecurityLevel">
                <property name="symbolicName" value="group2" />
                <property name="localizedDisplayNames">
                    <map>
                        <entry key="fr" value="Groupe 2" />
                        <entry key="en" value="Group 2" />
                    </map>
                </property>
            </bean>
            <bean
                class="com.arondor.viewer.annotation.common.SecurityLevel">
                <property name="symbolicName" value="group3" />
                <property name="localizedDisplayNames">
                    <map>
                        <entry key="fr" value="Groupe 3" />
                        <entry key="en" value="Group 3" />
                    </map>
                </property>
            </bean>
        </list>
    </constructor-arg>
</bean>
```

![image](/img/arender/documentation/GroupeAnnotations/groupeannotation2.png)

## How to use the notion of group

Now that the annotations have a notion of group, it is possible, for example, to make the annotations in the "private" group non-modifiable.

Example in the implementation of the _AnnotationAccessor_ which will create or update the non-modifiable annotations if the group is "private" :

```java

@Override
public void create(List&lt;Annotation&gt; annotations) throws AnnotationsNotSupportedException, AnnotationCredentialsException, InvalidAnnotationFormatException, AnnotationNotAvailableException

    updateAnnotationSecurity(annotations);

    // Custom code + call to database to store the annotations

@Override
public void update(List&lt;Annotation&gt; annotations) throws AnnotationsNotSupportedException, AnnotationNotAvailableException, AnnotationCredentialsException, InvalidAnnotationFormatException

    updateAnnotationSecurity(annotations);

    // Custom code + call to database to update the annotations

private void updateAnnotationSecurity(List&lt;Annotation&gt; annotations)

    for(Annotation annotation : annotations)

        if("private".equals(annotation.getSecurity()))

            annotation.getFlags().setLocked(true);
            annotation.getFlags().setReadonly(true);



```
