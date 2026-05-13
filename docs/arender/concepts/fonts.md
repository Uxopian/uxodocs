---
title: Font handling
sidebar_position: 7
---

# Font handling

ARender renders documents on the server side through the rendition backend. When a PDF references a font that is not embedded in the document, the backend falls back to a configurable font directory. This page explains how fonts are resolved, which formats are supported, and how to add custom fonts to a deployment.

For the complete list of font-related properties, see [Rendition properties: Fonts](../reference/rendition-properties.md#fonts).

## Font resolution model

When ARender renders a PDF page, the rendition backend resolves each glyph using the following order:

1. **Embedded fonts.** If the source PDF embeds the font used by a text run, that font is used directly. No backend configuration is involved.
2. **Fallback font directory.** If a font is referenced by name but not embedded, the backend looks up the name in a font map built from `document.font.path`. When a match is found, the file from that directory is used as a substitute.
3. **Default substitution.** If no match is found in the fallback directory, the backend falls back to a generic font shipped with the underlying PDF library. Glyphs not present in that font may render as the substitute character.

The font map is built at startup by scanning `document.font.path` recursively. Each file with an allowed extension is parsed, and the font is registered under the name declared inside the file (the internal TrueType name), not under its file name.

## Supported font formats

ARender accepts TrueType (`.ttf`) and OpenType (`.otf`) files. The allowlist is controlled by `document.font.allowed.extensions`. Files with other extensions in `document.font.path` are ignored and logged.

## Adding custom fonts

Custom fonts are made available by placing TTF or OTF files in the directory pointed to by `document.font.path`. The default value is `../fonts/`, resolved relative to the rendition backend working directory.

### Docker deployment

Mount a host directory containing the font files into the rendition backend container, and set `document.font.path` to the mount target. Example:

```yaml
services:
  rendition:
    image: arondor/arender-rendition:2026.0.0
    volumes:
      - ./fonts:/opt/arender/fonts:ro
    environment:
      DOCUMENT_FONT_PATH: /opt/arender/fonts
```

The directory may contain subfolders; the scan is recursive.

### Spring Boot deployment

Place the font files in a directory on the host and reference its absolute path in the `application.properties` of the rendition backend:

```properties
document.font.path=/opt/arender/fonts
```

A relative path is resolved against the working directory of the Spring Boot process.

## Fonts used for text-to-PDF conversion

When ARender converts a plain text file to PDF, it uses a configurable font that is independent of the embedded-font fallback described above. The relevant properties are listed under [Text-to-PDF](../reference/rendition-properties.md#text-to-pdf):

- `text.to.pdf.font.family` selects one of the standard PDF fonts (`COURIER`, `HELVETICA`, `TIMES_ROMAN`, `SYMBOL`, `ZAPFDINGBATS`).
- `text.to.pdf.font.file.path` overrides the standard font with a custom file. This is needed for languages whose glyphs are not covered by the standard PDF fonts, such as Arabic, Hebrew, or CJK scripts.

## Fonts for textual annotations

Annotations that draw text on the document (free-text, redaction overlay text, callouts) use a separate font configured via `annotation.textual.unicode.font.path`. This is the font ARender uses when burning annotation text into the exported PDF, particularly when the annotation contains Unicode characters outside the basic ASCII range.

## AFP documents

Conversion of AFP documents uses a dedicated font catalog. The path to the directory containing the AFP font entries file is configured via `arender.afp.font.entries.directory.path`. AFP fonts are not interchangeable with TTF or OTF and are not used for PDF rendering.

## Related pages

- [Rendition properties: Fonts](../reference/rendition-properties.md#fonts)
- [Rendition properties: Text-to-PDF](../reference/rendition-properties.md#text-to-pdf)
- [Rendition pipeline](./rendition-pipeline.md)
