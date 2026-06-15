---
title: Email conversion
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
slug: /guides/features/email-conversion
sidebar_position: 4
content_hash: 9d56d4d82da4df71638672ec9450a5a2498e0e70d8ba125be4fd00ee9b1bdf7f
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

## Hyperlinks in converted emails

By default, ARender renders email bodies **without clickable hyperlinks**: the link text is still shown, but it is not clickable in the resulting PDF. This is a deliberate security measure.

Link handling is controlled by the shared HTML-to-PDF options, `tools.wkhtmltopdf.options`. Two flags are responsible:

| Flag                        | Effect |
|-----------------------------|--------|
| `--disable-external-links ` | Removes clickable links that point to external URLs (`http(s)://…`) |
| `--disable-internal-links`  | Removes clickable links that point elsewhere inside the same document (anchors) |

Both flags are part of the default value:

```properties
tools.wkhtmltopdf.options=--disable-javascript,--quiet,--encoding,UTF-8,--load-error-handling,ignore,--disable-external-links,--disable-internal-links,--disable-local-file-access
```

### Enabling clickable links

Override `tools.wkhtmltopdf.options` on the rendition engine and remove the flag for the link type you want to allow:

- drop `--disable-external-links` to allow external URLs (`http(s)://…`)
- drop `--disable-internal-links` to allow internal anchors
- drop both to make every link clickable

For example, to enable all links:

```properties
tools.wkhtmltopdf.options=--disable-javascript,--quiet,--encoding,UTF-8,--load-error-handling,ignore,--disable-local-file-access
```

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

See [Rendition properties — Email conversion](../../reference/rendition-properties.md#email-conversion) for the full list of email conversion properties.
