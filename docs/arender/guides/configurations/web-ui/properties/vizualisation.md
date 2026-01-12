---
title: Visualization
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: faf45d2b2695c61b733c40bb3fc419266458f34867dd287054057acd9f58a925
---

## General

| Description                           | Property key                        | Default value | Type    |
| ------------------------------------- | ----------------------------------- | ------------- | ------- |
| Visualization mode : Simple, BookMode | visualization.mode                  | Simple        | Text    |
| Full screen mode at startup           | visualization.fullscreen            | false         | Boolean |
| Activate save page rotation           | visualization.rotation.save.enabled | false         | Boolean |
| Autoplay videos                       | visualization.video.autoplay        | true          | Boolean |

## Reload

| Description                                                                                                                         | Property key                                     | Default value | Type    |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------- | ------- |
| Reload lower quality images once the higher quality has been fetched (always load the perfect size, or save bandwidth)              | visualization.reload.lower.quality               | false         | Boolean |
| Difference between the old image width and the new image width. Reload the image if difference is greater than this value.          | visualization.reload.minimum.width.change        | 0.1           | Integer |
| Difference between the old image width and the new image width on mobile. Reload the image if difference is greater than this value | visualization.reload.minimum.width.change.mobile | 200.0         | Integer |

## Zoom

| Description                                                                       | Property key                       | Default value | Type    |
| --------------------------------------------------------------------------------- | ---------------------------------- | ------------- | ------- |
| Zoom type : Default, FullWidth, FullHeight, In, Out, Custom, FullPage             | visualization.zoom.type            | FullWidth     | String  |
| Zoom value (%)                                                                    | visualization.zoom.value           | 100           | Integer |
| Enable zoom animation                                                             | visualization.zoom.animation       | false         | Boolean |
| Zoom according to the biggest page (width or height). Otherwise to the first page | visualization.zoom.by.biggest.page | true          | Boolean |
| Custom zoom step value                                                            | visualization.zoom.step            | 0.1           | Float   |

## Page change

| Description                       | Property key                       | Default value | Type    |
| --------------------------------- | ---------------------------------- | ------------- | ------- |
| Page change on mouse _scroll_     | visualization.pageChange.mouse     | false         | Boolean |
| Enabling animation on page change | visualization.pageChange.animation | false         | Boolean |

**Only when visualization.bookMode=true**

| Description                     | Key parameter                      | Default value | Type    |
| ------------------------------- | ---------------------------------- | ------------- | ------- |
| Activate page corners           | visualization.pageCorner.enabled   | false         | Boolean |
| Activate page corners animation | visualization.pageCorner.animation | false         | Boolean |

## Guide ruler

| Description          | Key parameter                      | Default value | Type    |
| -------------------- | ---------------------------------- | ------------- | ------- |
| Activate guide ruler | visualization.guideRuler.enabled   | false         | Boolean |
| Guide ruler height   | visualization.guideRuler.height    | 10            | Integer |
| Guide ruler step     | visualization.guideRuler.increment | 10            | Integer |

## Multiview

| Description                                     | Key parameter                            | Default value | Type    |
| ----------------------------------------------- | ---------------------------------------- | ------------- | ------- |
| Activate multiview                              | visualization.multiview.enabled          | true          | Boolean |
| Multiview orientation:vertical , horizontal     | visualization.multiview.direction        | vertical      | String  |
| Activate document compare                       | visualization.multiview.doComparison     | false         | Boolean |
| Display multiview on startup                    | visualization.multiview.showOnStart      | false         | Boolean |
| Synchronized multiview scroll                   | visualization.multiview.synchronized     | true          | Boolean |
| Activate the focus of the document by click     | visualization.multiview.focusOnClick     | false         | Boolean |
| Configure the time to hide the multiview header | visualization.multiview.header.timeoutMs | 5000          | Long    |

## Notifications

### General

| Description                                         | Key parameter             | Default value | Type    |
| --------------------------------------------------- | ------------------------- | ------------- | ------- |
| Time elapsed before hiding the notification (ms)    | toaster.toast.timeout     | 2000          | Integer |
| Display the newest notification on top of the stack | toaster.toast.newestOnTop | true          | Boolean |

### Severe

| Description                                       | Key parameter               | Default value | Type    |
| ------------------------------------------------- | --------------------------- | ------------- | ------- |
| Activate notifications for the severe level       | toaster.log.severe.enabled  | true          | Boolean |
| Hide automatically the notif for the severe level | toaster.log.severe.autoHide | false         | Boolean |

### Warning

| Description                                        | Key parameter                | Default value | Type    |
| -------------------------------------------------- | ---------------------------- | ------------- | ------- |
| Activate notifications for the warning level       | toaster.log.warning.enabled  | true          | Boolean |
| Hide automatically the notif for the warning level | toaster.log.warning.autoHide | true          | Boolean |

### Info

| Description                                     | Key parameter             | Default value | Type    |
| ----------------------------------------------- | ------------------------- | ------------- | ------- |
| Activate notifications for the info level       | toaster.log.info.enabled  | true          | Boolean |
| Hide automatically the notif for the info level | toaster.log.info.autoHide | true          | Boolean |

### Config

| Description                                       | Key parameter               | Default value | Type    |
| ------------------------------------------------- | --------------------------- | ------------- | ------- |
| Activate notifications for the config level       | toaster.log.config.enabled  | false         | Boolean |
| Hide automatically the notif for the config level | toaster.log.config.autoHide | true          | Boolean |

### Fine

| Description                                     | Key parameter             | Default value | Type    |
| ----------------------------------------------- | ------------------------- | ------------- | ------- |
| Activate notifications for the fine level       | toaster.log.fine.enabled  | false         | Boolean |
| Hide automatically the notif for the fine level | toaster.log.fine.autoHide | true          | Boolean |

### Finer

| Description                                      | Key parameter              | Default value | Type    |
| ------------------------------------------------ | -------------------------- | ------------- | ------- |
| Activate notifications for the finer level       | toaster.log.finer.enabled  | false         | Boolean |
| Hide automatically the notif for the finer level | toaster.log.finer.autoHide | true          | Boolean |

### Finest

| Description                                       | Key parameter               | Default value | Type    |
| ------------------------------------------------- | --------------------------- | ------------- | ------- |
| Activate notifications for the finest level       | toaster.log.finest.enabled  | false         | Boolean |
| Hide automatically the notif for the finest level | toaster.log.finest.autoHide | true          | Boolean |
