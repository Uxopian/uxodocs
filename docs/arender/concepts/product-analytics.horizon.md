---
title: Product analytics
slug: /concepts/product-analytics
sidebar_position: 7
---

# Product analytics

ARender can report how the viewer is used to Mixpanel, so the Uxopian team can see which capabilities are used, by which deployment, and where users hit failures. It is on by default: the viewer ships with the token of the ARender Mixpanel project in its configuration file. The integrator can switch it off at any time with `analytics="false"`.

## Why product analytics

The goal of product analytics is to help the Uxopian team:

- See which features are actually used, and how often.
- Find where users fail: a document that does not open, an annotation that cannot be saved.
- Decide what to build next from real usage rather than assumptions.

## Privacy

- **No document data.** The viewer never sends a document identifier, a document name or path, page content, annotation content, selected or searched text, a user name or any user identifier.
- **Nothing stored on the device.** No cookie, no local storage: the identity of a consultation lives in memory and is gone when the page is closed.
- **No page address.** The address of the host page and the referrer are not sent, since a host can put a document identifier in them.
- **Data stays in Europe.** Events are sent to `api-eu.mixpanel.com` by default.
- **Silent.** Product analytics never delays the viewer and never shows an error. When the destination is unreachable or blocked, the events are dropped.

## What is collected

### The consultation

A consultation is one reading of one document, from the moment it opens to the moment the user opens another one or leaves the page. A ZIP, a mail or a set of documents opened together is one consultation, and moving from one entry to another does not end it.

When a consultation ends, one `Document` event describes it:

| Property                                                                                                                                                                                                                                               | Meaning                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `MimeType`                                                                                                                                                                                                                                             | MIME type of the document opened                                                   |
| `numberOfDocuments`                                                                                                                                                                                                                                    | Number of documents in the set                                                     |
| `Total Page Count`                                                                                                                                                                                                                                     | Pages of all the documents of the set                                              |
| `time_to_first_view_ms`                                                                                                                                                                                                                                | Time from the opening to the first page displayed, in milliseconds                 |
| `Viewing Duration`                                                                                                                                                                                                                                     | Time from the first page displayed to the end of the consultation, in milliseconds |
| `Viewed Page Count`                                                                                                                                                                                                                                    | Distinct pages the user went through                                               |
| `Viewed Document Count`                                                                                                                                                                                                                                | Distinct documents of the set the user displayed                                   |
| `Gesture Count`                                                                                                                                                                                                                                        | Total of the gesture counters below                                                |
| `Zoom Count`, `Rotate Count`, `Search Count`, `Download Count`, `Print Count`, `Full Screen Count`, `Panel Open Count`, `Annotation Created Count`, `Annotation Updated Count`, `Annotation Deleted Count`, `Redaction Count`, `Excel View Mode Count` | How many times the user did each gesture                                           |
| `Sampling Rate`                                                                                                                                                                                                                                        | `100` or `10`, see [Sampling](#sampling)                                           |

### Gestures

Each gesture the user makes is its own event, with the properties of that occurrence. A zoom, a rotation or a search the viewer applies on its own is not a gesture and is not reported.

| Event             | Sent when                                                                                                               | Properties                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `Zoom`            | The user zooms with the buttons, the zoom field, a zoom preset or the mouse wheel. A burst of wheel steps is one event. | `Zoom Mode`, `Zoom Level`                                      |
| `Rotate`          | The user rotates a page                                                                                                 | `Rotation Angle`                                               |
| `Search`          | A search completes. Running the same search again is not counted.                                                       | `Search Result Count`, `Search Scope`                          |
| `Download`        | The user downloads the document                                                                                         | `Download Variant`                                             |
| `Print`           | The user opens the print dialog                                                                                         |                                                                |
| `FullScreen`      | The user enters full screen                                                                                             |                                                                |
| `Panel`           | The user opens a panel                                                                                                  | `Panel Name`                                                   |
| `Annotation`      | The user creates, changes or deletes an annotation. A highlight across several pages is one event.                      | `Annotation Action`, `Annotation Type`                         |
| `Excel View Mode` | The user switches a spreadsheet between page view and data view, or the viewer applies a mode on its own                | `Excel View Mode`, `Excel Mode Source` (`user` or `automatic`) |

### Failures

| Event                    | Sent when                                | Properties     |
| ------------------------ | ---------------------------------------- | -------------- |
| `Document Load Error`    | A document fails to open                 | `Error Reason` |
| `Annotation Write Error` | The server refuses to save an annotation | `Error Reason` |

`Error Reason` holds an error code such as `NOT_FOUND` or `FORBIDDEN`, never an error message.

### On every event

| Property              | Value                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------- |
| `ARender Viewer`      | `Horizon`                                                                             |
| `ARender Version`     | Version of the viewer                                                                 |
| `ARender Server Host` | Origin of the page that embeds the viewer, for example `https://intranet.example.com` |

Mixpanel adds its own technical properties as well: browser, operating system, screen size and approximate location.

## Sampling

Every gesture is reported. The `Document` event of a consultation where the user made at least one gesture is always sent, with `Sampling Rate` set to `100`. The `Document` event of a consultation where the user only opened and read is sent once in ten, with `Sampling Rate` set to `10`.

To count consultations, add up `100 / Sampling Rate` over the `Document` events rather than counting the events. Only `Document` carries `Sampling Rate`: the gesture and failure events are never sampled.

## Configuration

### Configuration file

The viewer ships with a file named `arender-analytics.json`, next to its scripts: next to `embed.js` in the `dist/embed/` folder of the package, and next to the scripts of the standalone viewer. It is read when the viewer starts.

```json
{
    "token": "<ARender project token>",
    "host": "https://api-eu.mixpanel.com"
}
```

| Key     | Description                                                                                            |
| ------- | ------------------------------------------------------------------------------------------------------ |
| `token` | Mixpanel project token. Shipped with the token of the ARender project; an empty token reports nothing. |
| `host`  | Address the events are sent to.                                                                        |

The file is served as is and never built into the scripts, so the token and the destination change without a new release of the viewer.

A host application that bundles the `arender-ui` package with its own build tool serves its own scripts: the file is not next to them, and analytics stays off unless the host serves the file there or sets the attributes below.

### Attributes

The attributes of the [Web Component](../reference/web-component.md#html-attributes) win over the file:

| Attribute         | Default                       | Description                                                           |
| ----------------- | ----------------------------- | --------------------------------------------------------------------- |
| `analytics-token` | none                          | Mixpanel project token. When set, the configuration file is not read. |
| `analytics`       | `true`                        | `false` switches product analytics off entirely.                      |
| `analytics-host`  | `https://api-eu.mixpanel.com` | Address the events are sent to.                                       |

```html
<arender-element rendition="/" analytics-token="YOUR_PROJECT_TOKEN"></arender-element>
```

When product analytics is switched off, the viewer sends no request at all: not for the configuration file, not to Mixpanel, and it does not load the Mixpanel library. Without a token, it only reads the configuration file.

### Network and Content Security Policy

- Allow the address in `analytics-host`, `https://api-eu.mixpanel.com` by default, through the firewall and in the `connect-src` directive of the host page's Content Security Policy.
- The Mixpanel library ships with the viewer as a file of its own, next to `embed.js`. It is served from the same place as the viewer: no third-party script is loaded.
