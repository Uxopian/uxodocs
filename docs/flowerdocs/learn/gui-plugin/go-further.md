---
title: Going further
date: "2020-02-02T15:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 31c4cd25dce718fed04f1503fadd2fb76880782829e6e4e7dbf085e14affb9c4
---

:::info
Not directly linked to the module, this section allows you to go further in implementing a FlowerDocs client.
:::

# Validation type

The `@FlowerDocsClient(security = SecurityMode.TOKEN)` annotation secures requests received by the application by requiring a user token.
By default, a received token is validated by querying **FlowerDocs Core** but this behaviour can be changed thanks to the `token.validation.type` property which accepts the values:

- `none`: no token validation at client level. The token supplied must be legible, but its signature is not validated. This mode should therefore be used with caution, for example when all requests received by the FlowerDocs client are forwarded to **FlowerDocs Core**. In this case, the token will be validated directly by **FlowerDocs Core** when requests are received.
- `local`: token validation is carried out by the customer. This mode requires the client to have the secret key (`secret.key`) used to verify the tokens.

# Customized safety

In this module, an HTTP filter intercepts each request received and initializes the user context based on the token provided.
Custom security mode (`SecurityMode.CUSTOM`) gives developers the freedom to implement their own authentication mechanism.

<br/>
The security configuration below, for example, allows you to implement your security management by defining an HTTP filter to intercept incoming requests.

```java
package com.flower.samples;

import javax.servlet.Filter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.flower.docs.security.authentication.TokenAuthenticationFilter;

@Configuration
@Order(2)
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter

    @Override
    public void configure(HttpSecurity http) throws Exception

        // @formatter:off
        http
            .addFilterBefore(customFilter(), BasicAuthenticationFilter.class)
            .authorizeRequests().anyRequest().authenticated();
        // @formatter:on

    @Bean
    Filter customFilter() throws Exception

        // Return custom HTTP filter


```
