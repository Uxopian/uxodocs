---
title: Versions
description: Document versioning strategies
date: "2012-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 23f020e8d232d7389741ee6181a002e71ee66fb0788df8478166ce2b482e7552
---

A naming strategy defines the labels that users can enter when creating a document version. Different strategies are available:

- `MINOR`: MINOR version only.
- `MAJOR` : MAJOR version only.
- `NUMBERED`: MINOR and MAJOR versions.
- `CUSTOM` : Custom label only.
- `ALL` : Three strategies are offered to the user: MINOR, MAJOR and CUSTOM.
- `NONE` : No strategy, no promotional action displayed.

<br/>
By default, the `ALL` strategy is applied. The Javascript API can be used to restrict the naming strategies offered to users:

```javascript
var versioningAPI = JSAPI.get().getVersioningAPI();
versioningAPI.register(function (component, callback) {
    callback.onSuccess("CUSTOM");
});
```

Several resolvers can be defined, but the first valid value is used as the naming strategy.
:::info
Version numbers are automatically suggested from the previous version label.

- So if the previous version is 1.0, then for a minor version 1.1 will be proposed, and 2.0 for a major one.
- If for the previous version, the label is customized (noted: xxx) then the proposed labels will be xxx**\_0.1** for a minor version and xxx**\_1.0** for a major version.
  :::
