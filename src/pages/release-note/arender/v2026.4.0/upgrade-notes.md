---
title: "ARender v2026.4.0 – Upgrade Notes"
draft: false
date: "2026-11-02"
weight: -202604
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

> **Release note:** See [v2026.4.0](../release-notes).

ARender 2026.4.0 is a minor release of the 2026 line. It upgrades Hazelcast and reports password-protected and corrupted documents with a dedicated HTTP status. **Because of the Hazelcast upgrade, a clustered deployment cannot be upgraded node by node:** stop every Web-UI and Document Service Broker instance before starting the new version, whatever version you upgrade from. No data migration is needed.

## ⚙️ Customization and Configuration

### New Properties

* **`arender.data.analytics.token`** (default: empty). Applies to the Web-UI and sets the Mixpanel project the product analytics are sent to. When empty, the analytics go to the Uxopian project, as before. `arender.data.analytics.enabled=false` still disables them. See <DocLink version="v2026.4.0" product="arender" to="concepts/product-analytics">Product analytics</DocLink>.<br/>
If you ship your own full copy of `arender-hmi-configuration.xml`, the `dataReporter` bean now has a `token` property bound to `${arender.data.analytics.token}`.

### Changed and Deprecated Properties

* **`tools.ffmpeg.options`** (Rendition, Document Converter). The default now ends with `-aac_coder,fast`, which makes audio conversion two to three times faster with the ffmpeg version shipped in the 2026 converter image. See the <DocLink version="v2026.4.0" product="arender" to="reference/rendition-properties#video-conversion-ffmpeg">Rendition properties</DocLink>.

:::warning[Default change from v2026.3.0]
**Action required:** if you override `tools.ffmpeg.options`, add `,-aac_coder,fast` to the end of your value. Otherwise audio conversion stays slow.
:::

* **Labels (Web-UI).** The new labels `documentIsPasswordProtected` and `documentIsCorrupted` hold the messages shown for a document that cannot be opened. The `searchLoading` label is no longer used. If you ship your own label files, add the two new keys to translate these messages.

No properties were renamed in this release.

### Deleted Properties

No properties were deleted in this release.

## 📦 Product

### Technical Changes and Security

* **Hazelcast upgraded to 5.7.**

:::warning[Breaking change from v2026.3.0]
A Hazelcast 5.7 member cannot join a cluster of an earlier version: every earlier ARender version embeds an older Hazelcast (5.5 for 2026.x, 4.2 for 2023.x). Hazelcast clustering is used when several Web-UI instances share their cache or their HTTP sessions (`arender.server.session.hazelcast.enabled=true`), and when several Document Service Broker instances run together.

**Action required:** stop every Web-UI and Document Service Broker instance of the cluster, then start the 2026.4.0 instances. Do not upgrade them one by one. The cache and the HTTP sessions held in Hazelcast are lost, so users reopen their documents. See <DocLink version="v2026.4.0" product="arender" to="concepts/caching-hmi">Viewer caching</DocLink>.
:::

### Kubernetes Deployments

* **Scale the viewer and the broker to `0` before `helm upgrade`.** The charts keep the default `RollingUpdate` strategy. When Hazelcast clustering is on (`replicaCount` of 2 or more, or `autoscale.enabled: true`, for `viewer` or `rendition.broker`), new pods cannot join the old cluster and restart in a loop. `helm upgrade` restores the replica count set in your values. See <DocLink version="v2026.4.0" product="arender" to="installation/kubernetes-helm#upgrade">Kubernetes (Helm) → Upgrade</DocLink>.

### Behavior Changes

* **HTTP `422` for password-protected and corrupted documents.** When the Rendition cannot open a document because it is password-protected or corrupted, the Document Service Broker now answers `422` on the layout, page image and text calls. The body is an `ExceptionCapsule` whose `errorCode` is `PASSWORD_PROTECTED` or `CORRUPTED`. Before this release, these documents answered `500`, and protected archives were refused at upload. An archive is now uploaded normally, and its failure is reported on the first layout call. An unsupported format still answers `406`. See <DocLink version="v2026.4.0" product="arender" to="reference/rest-api/broker-api#error-responses">Broker API → Error responses</DocLink>.<br/>
**Action required:** if you call the Rendition REST API directly, treat `422` as a final error and exclude it from your retry policies.

* **Protected and corrupted documents logged at `INFO`.** The broker logs these documents as `Document refused` at `INFO` level instead of `ERROR`. Alerts based on `ERROR` log lines no longer fire for them. See <DocLink version="v2026.4.0" product="arender" to="operations/troubleshooting">Troubleshooting</DocLink>.

* **Alfresco ticket checked on every opening (ARender Classic, CMIS connector).** With user-delegated authentication (`arender.server.alfresco.user` empty), the connector asks Alfresco on every opening whether the `alf_ticket` can read the document, even when the document is already in the ARender cache. An expired or invalid ticket now makes the opening fail. See the <DocLink version="v2026.4.0" product="arender" to="guides/integration/alfresco">Alfresco integration guide</DocLink>.

* **Annotation default style applied (ARender Classic).** The default bold, italic and underline style set in the configuration for comments and free text annotations is now applied, and the toolbar shows it. Before this release, it was ignored. If your configuration sets these defaults, new annotations now use them.

## 💻 API

### JavaScript API Changes

* **`askChangePage(type, offset, position, centerPosition)`** (ARender Classic). The new optional fourth argument places the target position at the top of the view when it is `false`, like an internal hyperlink click. Without it, the position is centered, as before. See the <DocLink version="v2026.4.0" product="arender" to="reference/javascript-api#document-loading-and-navigation">JavaScript API</DocLink>.

### Java API Changes

* **`DocumentErrorCode` and `DocumentCorruptedException`** (client API). The new `DocumentErrorCode` enum (`PASSWORD_PROTECTED`, `CORRUPTED`, `UNSUPPORTED_FORMAT`, `UNKNOWN`) classifies why a document could not be opened. `ExceptionCapsule` and `ConversionOrder` (rendition API) carry a new optional `errorCode` field.
* **`DocumentService.getAdvancedSearchPageRangeResult`** (rendition API). New default method: custom `DocumentService` implementations compile unchanged.
* **`GenericEventHandler.onEvent`** (ARender Classic, GWT). The method now receives the `GwtEvent<?>` itself instead of its class name.<br/>
**Action required:** update any custom GWT code that implements `GenericEventHandler`. JavaScript listeners registered with `registerGenericEventListener` are not affected and still receive the event class name.
