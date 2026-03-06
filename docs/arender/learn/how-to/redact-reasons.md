---
title: Redact reasons
sidebar_position: 22
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: 884c7efd439cfdd2be17bcd05fa5b087c84f7f5fbf6f609f5ca8e210d2e4d7d3
---

## Add reason

It is possible to add redact reasons. These reasons will be directly displayed on the redact.

Change the value to the values you want.

```xml
<bean id="availableRedactReasons" class="java.util.ArrayList">
  <constructor-arg>
    <list>
      <bean class="com.arondor.viewer.annotation.common.RedactReason">
        <property name="symbolicName" value="(b)(1)" />
        <property name="displayName">
          <map>
            <entry key="fr" value="Informations classées pour protéger la sécurité nationale." />
            <entry key="en" value="Information that is classified to protect national security." />
          </map>
        </property>
      </bean>
    </list>
  </constructor-arg>
</bean>
```

## Default value

You can add one or more default reasons with the following property. The default reason value (here '(b)(1)') corresponds to the value in the “symbolicName” property (see the above example).

If there are several default reasons, it should be comma-separated values (ex:(b)(1),(b)(2)).

```properties
arender.server.annotations.default.redact.reason=(b)(1)
```

If this property has no value, by default the redact will have no reason.

Your default value **must** be added to your customization file (in arender-custom-integration. xml). Otherwise, this value will not be taken into account.
