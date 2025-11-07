---
title: "Hyperlinks"
---







## General

- Key: hyperlinks

    | Description                                        | Parameter Key            | Type    |
    | -------------------------------------------------- | ------------------------ | ------- |
    | Load URLs into the ARender frame                   | hyperlinks.loadInARender | Boolean |
    | Load hyperlinks from the source document           | hyperlinks.loadFromPDF   | Boolean |
    | Display frame/blue box around hyperlinks if needed | hyperlinks.displayFrame  | Boolean |
    | Allow internal hyperlinks from the source document | hyperlinks.load.internal | Boolean |
    | Allow external hyperlinks from the source document | hyperlinks.load.external | Boolean |

These parameters allow to influence of the behavior associated with
internal hyperlinks stored into source documents. If you do not wish to
have the internal links of a PDF to be displayed or clicked, use the
parameter *hyperlinks.loadFromPDF=false*.

## Annotation

The following properties defines the annotation behaviours when creating hyperlinks:

- Key: annotation.hyperlink

    | Description                                                                                                       | Parameter Key                               | Type    |
    | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------- |
    | Opacity for the Hyperlink annotation                                                                              | annotation.hyperlink.opacity                | Float   |
    | Color for the Hyperlink annotation                                                                                | annotation.hyperlink.default.color          | String  |
    | Allow the hyperlink target to be an external document                                                             | annotation.hyperlink.externe.target.enabled | Boolean |
    | Define the time limitation (in ms) to display the hyperlink target elements                                       | annotation.hyperlink.target.show.timeout    | Integer |
    | Set the legacy hyperlink creation. If true, the target page starts from index 1 otherwise it starts from index 0. | annotation.hyperlink.use.legacy.creation    | Boolean |
    | If true, clicking on a hyperlink leading to another document will open this document in a new tab.                | annotation.hyperlink.open.document.tab      | Boolean |



```cfg


```properties

```properties

```properties

```properties

```properties

```properties
annotation.hyperlink.opacity=0.5f
annotation.hyperlink.default.color=#0000FF
annotation.hyperlink.externe.target.enabled=true
annotation.hyperlink.target.show.timeout=10000
annotation.hyperlink.use.legacy.creation=false
annotation.hyperlink.open.document.tab=true
```
```
```
```
```
```

```

