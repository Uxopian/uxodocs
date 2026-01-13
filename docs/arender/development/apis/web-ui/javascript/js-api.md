---
title: Get started with the javascript API
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: cc4109c94f04d01c9ed40a2cf0c9b08a77544c62b41d37876383244c3a47f446
---

## Configuring a custom JavaScript file

The JavaScript custom file must contain a function such as:

```js
function arenderjs_init(arenderjs_){ ... }
```

This function is called by ARender at startup, the arenderjs
argument is the JavaScript object collecting all the API functions, as
provided by ARender.

You can configure the Javascript custom file to use within ARender by
two different ways:

### Using property arenderjs.startupScript

The property arenderjs.startupScript, if defined, will be used by
ARender to fetch the custom Javascript file and execute it when the
interface is ready.

This property can be set in the profile file:

```cfg
arenderjs.startupScript=scripts/myarenderscript.js
```

Or directly in the URL parameters:

```html
https://www.demo.arender.io/?url=https://arender.io/docs/demo/ARender-doc-demo.pdf&arenderjs.startupScript=scripts/arenderJSPAPITest.js
```

See the default profile jsapi-demo.properties (in the
arondor-arender-hmi-spring-boot-.jar\BOOT-INF\classes\ folder of the ARender
Web-UI) for an example profile. Note that the JavaScript URL can be provided:

- as a relative URL: the URL is relative to the ARender Web-UI context
  root, for example [https://www.demo.arender.io/](https://www.demo.arender.io/)
- as an absolute URL: in this case, beware that most modern browsers
  forbid having queries from multiple sources, because of the XSS
  limitations.

### The "[Hollywood Principle](https://en.wikipedia.org/wiki/Hollywood_principle)"

The other option is to define the init function arenderjs_init() in
ARender's parent context. Consider ARender in a IFrame inclusion; the
calling application creates an IFrame with a URL pointing to ARender.
In this case, the calling application only has to define the function:

```js
function arenderjs_init([arenderjs]()){ ... }
```

ARender will look at this function in its parent context, and call it if
it exists.
