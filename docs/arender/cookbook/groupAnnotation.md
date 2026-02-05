---
title: "Group annotations"
sidebar_position: 14
last_update:
  date: '2026-02-05T15:28:19.384Z'
  author: CI/CD Bot
content_hash: 7d7ef1be9e4358cd1cae5621c48049fbc6a70a9b7ca2d2c3b0a0c5035b3c7480
---

The assignment of a group to an annotation is done with the use of the *Security* property which makes it possible to store the group name of the annotation.

By default, only two values ​​can be used :
- Private
- Public

The list of values ​​is configurable. The following property must be enabled in order to view the dropdown list while in annotation edit mode.

```cfg title="arender-server-custom-vanilla.properties"
arender.server.annotations.text.security.support=true
```

## Modification by configuration

The annotation group list is configurable.

Example of configuration of the bean that will populate the annotation group list :

```cfg title="arender-custom-server-integration.xml"
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

![image](pathname:///img/arender/documentation/GroupeAnnotations/groupeannotation1.png)

## Modification by connector

In the Java class that implements the *DocumentAccessor* interface, you can change the setter implementation for the *AnnotationAccessor* to define a new list of values ​​for annotation groups.

Here is a basic example of the implementation of the function *setAnnotationAccessor* which will define a new list of values:

```java

@Override
@JsonIgnore
public void setAnnotationAccessor(AnnotationAccessor annotationAccessor) throws AnnotationsNotSupportedException
{
    this.annotationAccessor = annotationAccessor;

    List<SecurityLevel> list = new ArrayList<>();
    list.add(buildSecuriyLevel("group1", "Groupe 1", "Group 1"));
    list.add(buildSecuriyLevel("group2", "Groupe 2", "Group 2"));
    list.add(buildSecuriyLevel("group3", "Groupe 3", "Group 3"));
    annotationAccessor.getAnnotationCreationPolicy().setAnnotationsSupportSecurity(true);
    annotationAccessor.getAnnotationCreationPolicy().setAvailableSecurityLevels(list);
}

private SecurityLevel buildSecuriyLevel(String symbolicName, String fr, String en)
{
    SecurityLevel securityLevel = new SecurityLevel();
    securityLevel.setSymbolicName(symbolicName);
    securityLevel.setLocalizedDisplayNames(buildLocalizedDisplayNames(fr, en));
    return securityLevel;
}

private Map<String, String> buildLocalizedDisplayNames(String fr, String en)
{
    Map<String, String> map = new HashMap<>();
    map.put("fr", fr);
    map.put("en", en);
    return map;
}

```



## Keep the notion of private annotation

The notion of private annotation is compatible with the notion of an annotation group. We must keep the definition of *property name = "symbolicName" value = "private"*. The description of private annotations can be found in the section *Annotation securities configuration* in the page [Annotation](./annotation.md)

Example of configuration of the bean that will populate the annotation group list with the *Private* choice :

```cfg title="arender-custom-server-integration.xml"
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


![image](pathname:///img/arender/documentation/GroupeAnnotations/groupeannotation2.png)


## How to use the notion of group

Now that the annotations have a notion of group, it is possible, for example, to make the annotations in the "private" group non-modifiable.

Example in the implementation of the *AnnotationAccessor* which will create or update the non-modifiable annotations if the group is "private" :
```java

@Override
public void create(List<Annotation> annotations) throws AnnotationsNotSupportedException, AnnotationCredentialsException, InvalidAnnotationFormatException, AnnotationNotAvailableException
{
    updateAnnotationSecurity(annotations);

    // Custom code + call to database to store the annotations
}

@Override
public void update(List<Annotation> annotations) throws AnnotationsNotSupportedException, AnnotationNotAvailableException, AnnotationCredentialsException, InvalidAnnotationFormatException
{
    updateAnnotationSecurity(annotations);

    // Custom code + call to database to update the annotations
}

private void updateAnnotationSecurity(List<Annotation> annotations)
{
    for(Annotation annotation : annotations)
    {
        if("private".equals(annotation.getSecurity()))
        {
            annotation.getFlags().setLocked(true);
            annotation.getFlags().setReadonly(true);
        }
    }
}

```