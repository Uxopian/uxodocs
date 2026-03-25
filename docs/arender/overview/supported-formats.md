---
title: Supported formats
last_update:
  date: '2026-03-23T10:20:59.293Z'
  author: CI/CD Bot
slug: /overview/supported-formats
sidebar_position: 3
content_hash: 6e6cd97f99132aa3ccf437677cf7e0c15229c0be5357880c5b87a7e3f968e723
---

# Supported formats

ARender supports viewing over 100 document formats. Formats are either rendered natively or converted to PDF before rendering.

## PDF

| Format | Extension | MIME type |
|--------|-----------|-----------|
| Portable Document Format (1.x to 2.0) | .pdf | application/pdf |
| PDF/A-1, PDF/A-2, PDF/A-3 | .pdf | application/pdf |
| PDF Portfolio | .pdf | application/pdf |
| Form Data Format (FDF) | .fdf | application/vnd.fdf |
| XML Forms Data Format (XFDF) | .xml | text/xml |

## Images

| Format | Extension | MIME type |
|--------|-----------|-----------|
| PNG | .png | image/png |
| JPEG | .jpeg | image/jpeg |
| TIFF | .tiff | image/tiff |
| GIF | .gif | image/gif |
| BMP | .bmp | image/x-ms-bmp, image/x-bmp, image/x-portable-bitmap |
| Photoshop Document | .psd | image/vnd.adobe.photoshop |
| EPS | .eps | image/x-eps |
| PostScript | .ps | application/postscript |
| DICOM | .dicom | application/dicom |
| PCX | .pcx | application/pcx, image/pcx, image/x-pcx |
| JPEG 2000 | .jp2 | image/jp2 |
| HEIF | .heif | image/heif |
| WebP | .webp | image/webp |

Conversion engine: ImageMagick (all image formats). TIFF is rendered natively.

## Email

| Format | Extension | MIME type |
|--------|-----------|-----------|
| MSG (Outlook) | .msg | application/vnd.ms-outlook |
| EML | .eml | message/rfc822, application/mbox |

Conversion engine: wkhtmltopdf. See [Email conversion](../guides/features/email-conversion.md) for configuration.

## HTML

| Format | Extension | MIME type |
|--------|-----------|-----------|
| HTML | .html | text/html |
| SVG | .svg | image/svg+xml |

Conversion engine: wkhtmltopdf.

## Office — Text

| Format | Extension | MIME type |
|--------|-----------|-----------|
| Microsoft Word | .doc, .dot | application/msword |
| Microsoft Word Open XML | .docx, .dotx, .docm, .dotm | application/vnd.openxmlformats-officedocument.wordprocessingml.document |
| Rich Text Format | .rtf | text/rtf |
| OpenDocument Text | .odt, .odm, .ott | application/vnd.oasis.opendocument.text |

## Office — Presentation

| Format | Extension | MIME type |
|--------|-----------|-----------|
| Microsoft PowerPoint | .ppt, .pot, .pps, .ppa | application/vnd.ms-powerpoint |
| Microsoft PowerPoint Open XML | .pptx, .potx, .pptm, .potm | application/vnd.openxmlformats-officedocument.presentationml.presentation |
| OpenDocument Presentation | .odp | application/vnd.oasis.opendocument.presentation |

## Office — Spreadsheet

| Format | Extension | MIME type |
|--------|-----------|-----------|
| Microsoft Excel | .xls, .xlt, .xla | application/vnd.ms-excel |
| Microsoft Excel Open XML | .xlsx, .xlsm, .xltx, .xltm | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet |
| OpenDocument Spreadsheet | .ods | application/vnd.oasis.opendocument.spreadsheet |

## Office — Other

| Format | Extension | MIME type |
|--------|-----------|-----------|
| Microsoft Visio | .vsd | application/vnd.visio |
| Microsoft Visio Open XML | .vsdx | application/vnd.ms-visio |
| OpenDocument Graphics | .odg | application/vnd.oasis.opendocument.graphics |
| Microsoft Project | .mpp | application/vnd.ms-project |
| Microsoft Publisher | .pub | application/x-mspublisher, application/vnd.ms-publisher |

Conversion engine: LibreOffice (default, free), DirectOffice (paid add-on), or MS Office/AROMS (licensed, Windows-only). See [Office conversion](../guides/features/office-conversion.mdx).

## Text

| Format | Extension | MIME type |
|--------|-----------|-----------|
| Plain text | .txt | text/plain |
| vCard (2.1, 3.0) | .vcf | text/vcard |

Conversion engine: PDFBox.

## Video

| Format | Extension | MIME type |
|--------|-----------|-----------|
| MP4 | .mp4 | video/mp4 |
| QuickTime | .mov, .qt | video/quicktime |
| 3GPP | .3gpp | video/3gpp |
| FLV | .flv | video/x-flv |
| MPEG | .mpeg | video/mpeg |
| AVI | .avi | video/x-msvideo |
| Matroska | .mkv | video/x-matroska |
| Windows Media Video | .wmv | video/x-ms-asf |
| MPEG-2 | .mp2p | video/mp2p |

MP4 (H.264) is streamed natively to the browser. All other formats are converted to MP4 by FFmpeg.

## Audio

| Format | Extension | MIME type |
|--------|-----------|-----------|
| MP3 | .mp3 | audio/mp3 |
| WAV | .wav | audio/x-wav |
| MPEG audio | .mpeg | audio/mpeg, audio/x-mpeg |
| AIFF | .aiff | audio/x-aiff |
| MP4 audio | .m4a, .m4b | audio/mp4 |

Conversion engine: FFmpeg.

## AutoCAD

| Format | Extension | MIME type |
|--------|-----------|-----------|
| AutoCAD DWG | .dwg | image/vnd.dwg, image/x-dwg |
| AutoCAD DXF (2013 and earlier) | .dxf | image/vnd.dxf, image/x-dxf |
| Autodesk Design Web Format | .dwf | model/vnd.dwf, image/x-dwf |
| MicroStation DGN (V7, V8) | .dgn | image/vnd.dgn |
| Industry Foundation Classes (IFC 2x3, 4) | .ifc | application/x-step |

Supported DWG versions:

```
DWG 2018 (AC1032) — AutoCAD 2018/2019/2020/2021
DWG 2013 (AC1027) — AutoCAD 2013/2014/2015/2016/2017
DWG 2010 (AC1024) — AutoCAD 2010/2011/2012
DWG 2007 (AC1021) — AutoCAD 2007/2008/2009
DWG 2004 (AC1018) — AutoCAD 2004/2005/2006
DWG 2000 (AC1015) — AutoCAD 2000/2000i/2002
DWG R14  (AC1014) — AutoCAD Release 14
DWG R13  (AC1012) — AutoCAD Release 13
DWG R11/12 (AC1009) — AutoCAD Release 11/12
```

Conversion engine: CADConverter (paid add-on). See [AutoCAD conversion](../guides/features/cad-conversion.mdx).

## AFP

| Format | Extension | MIME type |
|--------|-----------|-----------|
| Advanced Function Presentation | .afp, .mda | application/x-afp |

Conversion engine: AFP converter.

## Archives

| Format | Extension | MIME type |
|--------|-----------|-----------|
| ZIP | .zip | application/zip |
| 7-Zip | .7z | application/x-7z-compressed |
| Java archive | .jar | application/java-archive |

Archives are extracted and each contained file is rendered individually.

## XFA forms

| Format | Extension | MIME type |
|--------|-----------|-----------|
| PDF with XFA forms | .pdf | application/pdf |

Conversion engine: dedicated XFA flattener.

## Related pages

- [Rendition pipeline](../concepts/rendition-pipeline.md)
- [Office conversion](../guides/features/office-conversion.mdx)
- [Email conversion](../guides/features/email-conversion.md)
- [System architecture](./architecture.md)
