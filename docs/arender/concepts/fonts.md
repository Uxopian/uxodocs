---
title: Font handling
slug: /concepts/fonts
sidebar_position: 11
---

# Font handling

Font configuration is per use case: five independent mechanisms, each with its own rules, several of them sharing one directory. Pick the row that matches what you want to change, then follow the matching section.

| What you want to change | Where the files go | Property |
|---|---|---|
| The typeface used when a PDF does not embed its own font, as seen in the viewer | The shared font directory, one file named after each font a document asks for | None. See [Displaying a document](#displaying-a-document) |
| The fonts available to annotation text drawn into a document | The same directory by default, or wherever `document.font.path` points | [`document.font.path`](../reference/rendition-properties.md#fonts), [`annotation.textual.unicode.font.path`](../reference/rendition-properties.md#fonts). See [Fonts for annotation text](#fonts-for-annotation-text) |
| The fonts available when producing PDF/A output | The same directory by default, or wherever `document.font.path` points, read by a separate scan | [`document.font.path`](../reference/rendition-properties.md#fonts), [`document.font.allowed.extensions`](../reference/rendition-properties.md#fonts). See [Fonts for PDF/A output](#fonts-for-pdfa-output) |
| The font used when a text file is converted to PDF | Any path you choose | [`text.to.pdf.font.family`](../reference/rendition-properties.md#text-to-pdf), [`text.to.pdf.font.file.path`](../reference/rendition-properties.md#text-to-pdf). See [Fonts for text-to-PDF conversion](#fonts-for-text-to-pdf-conversion) |
| The fonts used by the office conversion tools | System font directories inside the converter image | None. See [Fonts used by the conversion tools](#fonts-used-by-the-conversion-tools) |

The properties above all belong to the **document-converter** service. The rendering engine reads the shared font directory as well, but takes no property: its path is built in. The viewer has font settings of its own, which choose the family an annotation asks for rather than the font files available to satisfy it.

The names are Spring Boot properties. In Docker and Kubernetes the same settings are passed as environment variables carrying the converter prefix, so `document.font.path` is set as `DCV_DOCUMENT_FONT_PATH`, see [Property-to-variable mapping rules](../installation/environment-variables.md#property-to-variable-mapping-rules).

## Displaying a document

A PDF that embeds its fonts is displayed with them, and nothing has to be configured. When a PDF names a font without embedding it, the rendering engine substitutes one, so text is always readable: real glyphs are drawn, never blank space and never empty boxes.

You can choose the substitute. Put the font in the shared font directory and **name the file after the font the PDF asks for**: a document referencing `/ReproFontXYZ` is rendered with `ReproFontXYZ.ttf`.

| Deployment | Shared font directory |
|---|---|
| Spring Boot standalone | `modules/fonts/`, next to the module directories. Ships with `Times.ttf` |
| Docker, Kubernetes | `/fonts` in the `document-renderer` container, to be mounted. The converter reads whatever `document.font.path` points at, so in Docker these are two separate mounts |

The path is `../fonts/` relative to the renderer working directory, built into the rendering engine, and no property changes it. Restart the renderer after adding a file.

With no matching file, the engine picks a face from the font name: `TimesNewRomanPSMT`, `Courier` or `Arial` give a serif, monospace or sans-serif face, and an unrecognized name gives a generic sans-serif.

:::note One directory, two matching rules
In a Spring Boot standalone install this is also where `document.font.path` points by default, so a single `modules/fonts/` serves everything. The mechanisms stay independent, and they do not look a font up the same way:

| Mechanism | Font matched on |
|---|---|
| Display substitution | The **file name**, which has to be the name the document asks for |
| Annotation text, PDF/A output | The font name **declared inside the file**, so renaming a file changes nothing |

`document.font.path` is a converter setting, described below, and it reaches only **files the converter produces**: the fonts offered to annotation text, and the fallback for a font the source PDF does not embed when a PDF/A is built. Displaying a page does not go through the converter, so that property changes nothing in the viewer. It was called `document.fallback.font.path` in ARender 4.8.
:::

## Fonts for annotation text

Annotations are drawn into the document whenever the converter produces a file that carries them: download or print with annotations, download with redactions applied or with rotations, the redacted copy, the crop-box snapshot, the Document Builder save, and any output with a watermark. Which of these a viewer offers varies.

The properties below reach only part of that text:

| Text | Font used |
|---|---|
| Sticky note, free text, and the popup note of a highlight, strikeout, underline or text redaction | A family match in `document.font.path`, or the file in `annotation.textual.unicode.font.path` when it is set |
| Stamp text, watermark text, measure-line length label | Standard Helvetica, not configurable |
| Redaction overlay text | Standard Times-Roman, not configurable |

**`document.font.path`** is the **directory of fonts offered to annotation text**: a font placed here is used when an annotation asks for its family by name. It is re-scanned every time annotations are drawn.

| Aspect | Behavior |
|---|---|
| Accepted files | `.ttf` and `.TTF` only. `document.font.allowed.extensions` does not apply here, so OpenType files and mixed-case extensions such as `.Ttf` are ignored |
| Family name | The family declared inside the file. An annotation is drawn with it only when it asks for that family, and what it asks for is decided in the viewer |
| Scan | Every file is parsed on every document, subdirectories and symbolic links included. Keep the directory small and flat |
| Empty value | Resolves to the converter working directory and walks that whole tree. Set the property explicitly |
| Unreadable directory | Warning `Can't parse font directory`, and the export still completes with the standard PDF fonts, which cover Latin-1 only |

**`annotation.textual.unicode.font.path`** is how you cover a script the standard PDF fonts cannot encode, Chinese for instance. It names one font file and draws all annotation text with it.

| Aspect | Behavior |
|---|---|
| When to set it | Annotation text written in Chinese, Japanese, Korean, Arabic, Hebrew, Cyrillic or Greek. A font dropped in `document.font.path` is not enough on its own: it is used only if the annotation asks for that family, and the viewer decides what is asked |
| Path | The full path of one font file. Keep that file in the `document.font.path` directory, so that a single mount covers both settings: `/arender/fonts/NotoSansSC-Regular.ttf` with the mount shown under [Docker and Kubernetes](#docker-and-kubernetes). Any other absolute path works, as does a path relative to the converter working directory |
| Effect | The file is embedded, and every family the annotation asks for is replaced by it, so all annotation text, Latin included, is drawn with this one font |
| Fonts from the directory | Still scanned and still registered, but no longer requested, so they stop appearing in annotation text |
| Accepted file | TrueType only. An OpenType file built on CFF outlines fails the export with `True Type fonts using CFF outlines are not supported` |

## Fonts for PDF/A output

PDF/A conversion runs only when [`pdfa.controller.enabled`](../reference/rendition-properties.md#pdfa-conversion) is `true`, on the converter and on the broker. With the default, a request returns 404.

Each page of the produced PDF/A is an image of the page, with an invisible text layer on top. That layer is the only reason the archive stays searchable and its text selectable, and a character reaches it only if a font can encode it. Fonts therefore decide how much of the text survives the conversion, never how the page looks.

Each character is drawn with, in order:

1. The font embedded in the source PDF
2. A file from `document.font.path` whose internal name matches the font the PDF asks for
3. Standard Helvetica

A character none of the three can encode is left out of the layer. Converting a Chinese document with no CJK font available gives a PDF/A that looks perfect, returns nothing when searched, and copies as nothing.

Step 2 reads the same **`document.font.path`** directory as annotation text, with its own rules on which files count and how they are named:

| Aspect | Behavior |
|---|---|
| Accepted files | Extensions from `document.font.allowed.extensions`, `ttf,otf` by default, and that property applies to this scan only. Prefer TrueType: an OpenType file built on CFF outlines cannot be registered, one carrying TrueType outlines loads normally |
| Font name | The name a font file carries inside itself, its PostScript name, which is unrelated to the file name: the `malgun.ttf` shipped in the converter image declares `MalgunGothic`. That internal name is what gets matched against the font the PDF asks for, so renaming a file changes nothing |
| Duplicates | Keep one file per font name. If two files declare the same name, which one is used is not defined |
| Scan | Subdirectories at any depth are included. A file whose extension is not in the list is logged at INFO, a file that cannot be parsed at ERROR, and is not registered |
| After a change | New files are picked up on the next conversion. **Restart the converter after removing or replacing a file**: the name-to-file table is kept for the lifetime of the service |

## Fonts for text-to-PDF conversion

Converting a plain text file to PDF uses its own font settings and never reads `document.font.path`.

| Property | Default | Notes |
|---|---|---|
| `text.to.pdf.font.family` | `COURIER` | Exactly five values, upper case, matched literally: `COURIER`, `HELVETICA`, `TIMES_ROMAN`, `SYMBOL`, `ZAPFDINGBATS`. Bold and oblique variants are not accepted. Any other value fails every text conversion with `Not acceptable font family name <value>`, and the converter reports itself unhealthy at start-up |
| `text.to.pdf.font.size` | `13` | Points |
| `text.to.pdf.landscape` | `true` | Pages are A3, so the default is A3 landscape |
| `text.to.pdf.font.file.path` | empty | A single TrueType file, embedded as a subset. When set, `text.to.pdf.font.family` is not used. An unreadable path is logged as `Could not load font <path>` and the family above is used instead |

:::caution Check that the font covers your documents
Characters the font has no glyph for are omitted from the output, with no box and no question mark, so a page can look complete while text is missing. The standard PDF fonts cover Latin-1: accented Latin is fine, while Arabic, Hebrew, Cyrillic, Greek and CJK need a font supplied through `text.to.pdf.font.file.path`. `SYMBOL` and `ZAPFDINGBATS` are meant for their own character sets and drop ordinary Latin text.
:::

Two limits when supplying your own file:

- Use a single-font TrueType file. A TrueType Collection (`.ttc`) cannot be parsed and the conversion fails with `'head' table is mandatory`.
- Text is drawn in logical order, without complex-script shaping or bidirectional reordering. Arabic and Hebrew come out as unjoined letters in reverse reading order even with a font that has the glyphs. CJK, Cyrillic and Greek are unaffected.

## Fonts used by the conversion tools

Office conversion relies on third-party tools that read fonts from the operating system, not from any ARender property. In the `document-converter` image these live under `/usr/share/fonts/TTF/`, where the Chinese and Korean fonts shipped with ARender are installed, plus the font packages and bundled tool directories of the image. Install fonts needed for office conversion there, not in `document.font.path`.

CAD conversion has its own SHX font mechanism. See [CAD conversion](../guides/features/cad-conversion.mdx).

## Where to put the files

### Spring Boot standalone

`modules/fonts/` sits next to the module directories, and both services resolve `../fonts/` to it: the renderer from `modules/PDFOwl/` or `modules/JNIPdfEngine/`, the converter from `modules/TaskConversion/`. One directory therefore serves display substitution, the annotation scan and the PDF/A scan at once, each with its own matching rule.

Point `document.font.path` elsewhere and the two converter scans follow it, while display substitution stays on `modules/fonts/`.

### Docker and Kubernetes

The images have no `modules/` layout and none of them creates a font directory, so **`document.font.path` must be set explicitly**. Mount your fonts and point the property at the mount target:

```yaml title="docker-compose.yml"
services:
  document-converter:
    image: artifactory.arondor.cloud:5001/arender-document-converter
    volumes:
      - ./fonts:/arender/fonts:ro
    environment:
      - "DCV_DOCUMENT_FONT_PATH=/arender/fonts"
      # Only for annotation text in a non-Latin script, see above
      # - "DCV_ANNOTATION_TEXTUAL_UNICODE_FONT_PATH=/arender/fonts/NotoSansSC-Regular.ttf"
```

Display substitution runs in another container, and its path does not come from a property, so it needs its own mount: attach a font directory at `/fonts` on `document-renderer`, with one file named after each font a document asks for, as described in [Displaying a document](#displaying-a-document).

## Related pages

- [Rendition properties: Fonts](../reference/rendition-properties.md#fonts)
- [Rendition properties: Text-to-PDF](../reference/rendition-properties.md#text-to-pdf)
- [Environment variables](../installation/environment-variables.md)
- [Rendition pipeline](./rendition-pipeline.md)
