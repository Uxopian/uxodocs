---
title: Office conversion
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /guides/features/office-conversion
sidebar_position: 1
content_hash: 9eb80900ea7ae98b32ba915aa786bd25881a2548a2b9c58ef77e4039f76e1647
---

# Office conversion

ARender converts Office documents (Word, Excel, PowerPoint, Visio, Project, Publisher, and OpenDocument formats) to PDF before rendering. The conversion is handled by the `document-converter` (TaskConversion) microservice, which delegates to one of three backends: LibreOffice, DirectOffice, or Microsoft Office (AROMS).

## Backends overview

| Backend | License | Platform | Default | Notes |
|---|---|---|---|---|
| **LibreOffice** | Free (open-source) | Linux, Windows | Yes | Ships with ARender Docker images. Broad format support. |
| **DirectOffice** | Paid add-on | Linux, Windows | No | Higher fidelity for MS Office formats. Falls back to LibreOffice for ODF formats. |
| **Microsoft Office (AROMS)** | MS Office license required | Windows only | No | Best fidelity for complex Office documents. Requires .NET 4.5 and desktop folders. |

## LibreOffice (default)

LibreOffice is the default conversion backend. No additional configuration is needed after a standard ARender installation.

By default, all Office MIME types are routed to LibreOffice via the `genericConvertOffice` factory in the `document-converter` configuration:

```yaml title="document-converter application.yaml"
mimetype:
  support:
    libreoffice: "${mime.type.msoffice.word},${mime.type.msoffice.rtf},${mime.type.libreoffice.text},${mime.type.msoffice.excel},${mime.type.libreoffice.sheet},${mime.type.msoffice.powerpoint},${mime.type.libreoffice.presentation},${mime.type.msoffice.visio},${mime.type.libreoffice.graphics},${mime.type.msoffice.project}"
    directoffice: ""
```

### LibreOffice headless options

LibreOffice runs in headless mode inside the container. If you need to tune its behavior, you can override properties in the TaskConversion `application.properties` file.

### Conversion timeout

The default conversion timeout is 120 seconds. To change it:

```yaml title="document-converter application.yaml"
conversion:
  job:
    timeout:
      ms: 120000
```

See the [Document converter reference](/docs/arender/reference/rendition-properties#document-converter) for all converter properties including LibreOffice, DirectOffice, and ImageMagick settings.

## DirectOffice (paid add-on)

DirectOffice is a commercial conversion engine sold as an add-on. It provides faster, higher-fidelity conversion of Microsoft Office formats (Word, Excel, PowerPoint). For OpenDocument and other formats, it delegates to LibreOffice.

### Activating DirectOffice

Edit `application-security.yml` in the `modules/TaskConversion` directory. Route the desired MS Office MIME types to DirectOffice while keeping LibreOffice for the rest:

```yaml title="modules/TaskConversion/application-security.yml"
mimetype:
  support:
    msoffice: "${mime.type.msoffice.publisher},${mime.type.msoffice.visio},${mime.type.msoffice.rtf},${mime.type.msoffice.project}"
    libreoffice: "${mime.type.libreoffice.text},${mime.type.libreoffice.sheet},${mime.type.libreoffice.presentation},${mime.type.libreoffice.graphics}"
    directoffice: "${mime.type.msoffice.word},${mime.type.msoffice.excel},${mime.type.msoffice.powerpoint}"
```

In this example, Word, Excel, and PowerPoint documents go through DirectOffice. Visio, Publisher, Project, and RTF remain on MS Office/LibreOffice. OpenDocument formats stay on LibreOffice.

## Microsoft Office / AROMS

AROMS (ARender Office Microsoft Service) uses a local Microsoft Office installation to convert documents. This provides the highest fidelity for complex Office files but requires a Windows server with a licensed copy of Microsoft Office.

### Supported versions

Microsoft Office 2013 and later. Office 365 is supported if the server has internet access. Keep Office up to date.

### Prerequisites

**Required software:**

- .NET Framework 4.5 ([download](https://www.microsoft.com/en-us/download/details.aspx?id=30653))
- Microsoft Visual C++ Redistributable 2010 ([download](https://www.microsoft.com/en-US/Download/confirmation.aspx?id=14632))
- Microsoft Visual C++ Redistributable 2008 ([download](https://www.microsoft.com/en-us/download/details.aspx?id=15336))

**Scripted installation:** Download and unzip [AromsCheck](https://docs.arender.io/docs/AromsCheck.zip), then run `runCheck.bat` for automatic setup. If the scripted install succeeds, skip manual installation of the prerequisites above.

### Windows system configuration

Create the following directories (required for Office to run as a service):

```
C:\Windows\System32\config\systemprofile\Desktop
C:\Windows\SysWOW64\config\systemprofile\Desktop
```

**Important:**

- Run the Rendition service with a local account. Ensure that account can open Microsoft Office without any pop-ups, as pop-ups block rendering.
- For Excel conversion, open Excel under the service account at least once. A default printer must be configured (for example, an XPS output printer). Without a printer, Excel cannot handle page setup during conversion.
- Do not set a forwarded remote-session printer as the default. It disconnects when the session ends, breaking conversions.

### AROMS configuration

Edit `aroms.properties` in `modules/TaskConversion/aroms2pdf`:

| Property | Default | Description |
|---|---|---|
| `PDF/A` | `false` | Generate PDF/A output. |
| `processAutoKill` | `false` | Kill stale MS Office processes on AROMS start. |
| `TimeoutS` | `120` | Maximum conversion time in seconds before abort. |
| `AromsHost` | `http://localhost:8000/` | URL where AROMS is exposed. |
| `LockFields` | `false` | Disable auto-update of variable fields (e.g., date fields). |
| `IgnorePrintAreas` | `true` | Ignore print areas to avoid printing empty lines. |
| `FitSheetOnOnePage` | `true` | Fit the spreadsheet on a single PDF page instead of splitting. |

## MIME type routing

ARender uses MIME type placeholders to group related formats. These are defined in the `document-converter` `application.yaml`:

```yaml title="document-converter application.yaml (excerpt)"
mime:
  type:
    msoffice:
      word: "application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,..."
      excel: "application/msexcel,application/vnd.ms-excel,application/x-ms-excel,..."
      powerpoint: "application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,..."
      project: "application/vnd.ms-project"
      visio: "application/visio,application/x-visio,application/vnd.visio,..."
      publisher: "application/x-mspublisher,application/vnd.ms-publisher"
      rtf: "text/rtf"
    libreoffice:
      text: "application/vnd.oasis.opendocument.text"
      sheet: "application/vnd.oasis.opendocument.spreadsheet"
      presentation: "application/vnd.oasis.opendocument.presentation"
      graphics: "application/vnd.oasis.opendocument.graphics"
```

The `mimetype.support` block then assigns groups of MIME types to a conversion backend (`libreoffice`, `directoffice`, or `msoffice`). Adjust these mappings to control which backend handles which formats.

### Factory routing

The `app.factoriesBeanNames.genericConvertOffice` property in `application-security.yaml` lists all MIME types handled by the office conversion factory. This is separate from the backend selection above, which determines *which* backend the factory uses for a given type.

```yaml title="modules/TaskConversion/application-security.yaml"
app:
  factoriesBeanNames:
    genericConvertOffice: "${mime.type.msoffice.word},${mime.type.msoffice.rtf},${mime.type.libreoffice.text},${mime.type.msoffice.excel},${mime.type.libreoffice.sheet},${mime.type.msoffice.powerpoint},${mime.type.libreoffice.presentation},${mime.type.msoffice.visio},${mime.type.libreoffice.graphics},${mime.type.msoffice.project}"
```

To add or remove MIME types from office conversion, edit this list. For example, to add Publisher support, append `${mime.type.msoffice.publisher}` to the list.
