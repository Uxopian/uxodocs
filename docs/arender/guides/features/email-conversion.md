---
title: Email conversion
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /guides/features/email-conversion
sidebar_position: 4
content_hash: 307490b1bfed3f0229c20d2c45dd8f3bf9f445e99c2a2dec7841fd3a20b91a70
---

# Email conversion

ARender converts email files (EML, MSG) to PDF for rendering. The conversion is handled by the rendition engine (document-service-broker) and uses `wkhtmltopdf` for HTML-to-PDF conversion. This page covers the configuration properties that control how email metadata and content are rendered.

All properties in this page are set on the **rendition engine** (`application.properties`) unless stated otherwise.

## Date formatting

Control how dates appear in the converted email header.

```properties
emltopdf.config.format.date=EEE d MMM yyyy HH:mm:ss ZZ
```

The format follows Java `SimpleDateFormat` patterns. The example above renders `2022-01-24T04:54:42-05` as `Mon 24 Jan 2022 04:54:42 -0500`.

### Timezone

By default, dates are formatted in the UTC timezone. To use a specific timezone:

```properties
emltopdf.config.time.zone=Europe/Paris
```

To use the timezone extracted from each email's date header, set the following property on the **Web UI** side:

```properties
default.url.parser.use.timeZone.for.ids=true
```

## Non-Latin character encoding

Subjects and attachment names containing non-Latin characters (Chinese, Arabic, Cyrillic, etc.) may display incorrectly. To fix this, configure the rendition engine to use the email body's encoding for header fields:

```properties
emltopdf.encode.header.with.body.encoding=true
emltopdf.config.filter.special.characters.regex=
emltopdf.config.filter.replacement.character=
```

Setting the regex and replacement to empty strings disables the default special-character filter, which would otherwise replace non-Latin characters with underscores.

:::tip
If encoding issues persist after applying the above, enable locale-based encoding on the **Web UI** side. This passes the user's locale to the rendition engine so it can select the correct character encoding:

```properties
default.url.parser.use.locale.for.ids=true
```
:::

## Header language

The rendered email header labels (From, To, Subject, Date, etc.) default to French. To switch to English:

```properties
emltopdf.config.header.language=EN
```

Supported values: `FR`, `EN`.

## HTML embedded image resizing

Emails with HTML bodies may contain large embedded images that exceed the page width in the converted PDF. Enabling image resizing scales these images to fit within the page boundaries:

```properties
emltopdf.resize.embedded.image.enabled=true
```

Default: `false`.

:::warning Performance tradeoff
Enabling this option adds processing overhead during conversion. The rendition engine must decode each embedded image to determine its dimensions and rewrite the HTML before passing it to `wkhtmltopdf`. For emails with many or large embedded images, this increases conversion time. Enable it only if oversized images are a recurring problem in your document set.
:::

## Troubleshooting

### wkhtmltopdf not converting

Email HTML-to-PDF conversion relies on `wkhtmltopdf`. If conversion fails:

- **Linux**: if the error mentions an X server problem, install the `xvfb` package. The ARender Docker images include this by default. For manual installations, wrap the binary:

  ```bash
  mv /usr/bin/wkhtmltopdf /usr/bin/wkhtmltopdf_nohead
  ```

  Create `/usr/bin/wkhtmltopdf`:

  ```bash
  #!/bin/bash
  xvfb-run -a -s "-screen 0 640x480x16" /usr/bin/wkhtmltopdf_nohead "$@"
  ```

  ```bash
  chmod a+x /usr/bin/wkhtmltopdf
  ```

### External images not loading

If the email body references external images (hosted URLs), `wkhtmltopdf` must be able to reach those URLs from the rendition server. If network access is restricted, you can configure a proxy or accept degraded rendering without external images.

## Property reference

The table below summarizes the properties covered on this page. For the full list of email conversion properties across all services, see the [Rendition properties — Email conversion](../../reference/rendition-properties.md#email-conversion).

| Property | Default | Service | Description |
|---|---|---|---|
| `emltopdf.config.format.date` | `EEE d MMM yyyy HH:mm:ss Z` | Rendition engine | Date format pattern (Java `SimpleDateFormat`) |
| `emltopdf.config.time.zone` | _(empty)_ | Rendition engine | Timezone for date formatting. Empty uses system default |
| `emltopdf.config.header.language` | `FR` | Rendition engine | Header label language: `FR` or `EN` |
| `emltopdf.encode.header.with.body.encoding` | `false` | Rendition engine | Use body encoding for header fields |
| `emltopdf.config.filter.special.characters.regex` | `[^A-zÀ-ú0-9\\s\\-\\.]` | Rendition engine | Regex for characters to filter from filenames. Set empty to disable |
| `emltopdf.config.filter.replacement.character` | `_` | Rendition engine | Replacement character for filtered characters |
| `emltopdf.resize.embedded.image.enabled` | `false` | Rendition engine | Resize oversized embedded images to fit page width |
| `default.url.parser.use.timeZone.for.ids` | `false` | Web UI | Use email timezone for date rendering |
| `default.url.parser.use.locale.for.ids` | `false` | Web UI | Pass user locale for encoding detection |
