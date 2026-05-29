---
title: Rendition configuration
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
slug: /reference/rendition-properties
sidebar_position: 6
content_hash: 039a7363442578f36638049d0007ae15ea518ef964389edd8b03769a13f7e98c
---

All ARender rendition services are Spring Boot applications. Properties can be set in `application.properties`, `application.yml`, or overridden via environment variables. See [Environment variables](../installation/environment-variables.md) for the naming convention.

Properties shown here are the defaults from the source. Omitting a property leaves the default in effect.

---

## Document Service Broker

The Document Service Broker (`arender-document-service-broker`) runs on port 8761 and acts as the main orchestrator.

### Network

| Property | Default | Description |
|----------|---------|-------------|
| `server.port` | `8761` | HTTP port |
| `server.address` | `0.0.0.0` | Bind address |

### Microservice HTTP client

The broker communicates with rendition services over HTTP using a reactive client.

| Property | Default | Description |
|----------|---------|-------------|
| `rest.client.max-in-memory-size` | `8000000` | Maximum bytes to buffer in memory per response |
| `rest.client.max-connections` | `200` | Maximum simultaneous connections |
| `rest.client.pending-acquire-timeout` | `120000` | Timeout (ms) to acquire a connection from the pool |
| `rest.client.pending-acquire-max-count` | `-1` | Maximum pending acquire queue size. `-1` means no limit |
| `rest.client.max-idle-time` | `-1` | Maximum channel idle time (ms). `-1` means no limit |
| `rest.client.max-life-time` | `-1` | Maximum channel lifetime (ms). `-1` means no limit |
| `rest.client.read-timeout` | `120000` | Maximum time to read a response (ms) |
| `rest.client.write-timeout` | `120000` | Maximum time to write a request (ms) |

### Health checks

| Property | Default | Description |
|----------|---------|-------------|
| `health.check.poll.interval` | `5` | Seconds between health poll cycles |
| `health.check.poll.initial` | `1` | Initial delay before first health check (seconds) |
| `health.check.template.timeout` | `5` | Timeout waiting for a health check response (seconds) |
| `health.check.template.record.timeout` | `30` | Timeout waiting for a health record response (seconds) |

### Document storage and paths

| Property | Default | Description |
|----------|---------|-------------|
| `temp.files.folder` | `/arender/tmp/` | Folder for temporary processing files |
| `spring.servlet.multipart.location` | `/arender/tmp/` | Multipart upload staging folder |
| `authorized.paths` | `../../samples/,../samples/,../../tmp/,../tmp` | Comma-separated list of allowed document paths |
| `authorized.urls` | _(empty)_ | Comma-separated list of allowed document URLs |
| `arender.url.basic.auth` | _(empty)_ | Base64-encoded `domain@secret` pairs for URL auth, comma-separated |

### Default document

| Property | Default | Description |
|----------|---------|-------------|
| `default.document.path` | `../../samples/arender-en-2019.pdf` | Path to the default document loaded at startup |
| `default.document.title` | `ARender.pdf` | Title of the default document |
| `default.document.id` | `b64_I2RlZmF1bHQ=` | Fixed ID for the default document |
| `default.document.path.startup.clear` | `false` | Clear temporary files on startup |

### Rejected document

| Property | Default | Description |
|----------|---------|-------------|
| `rejected.document.enabled` | `false` | Show a fallback document when a document fails to load |
| `rejected.document.path` | `../../samples/rejected.pdf` | Path to the fallback document |
| `rejected.document.title` | `Conversion problem` | Title shown for the fallback document |

### PDF features

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.document.pdf.portfolio.enabled` | `false` | Detect PDF Portfolios as composite documents |
| `arender.server.document.pdf.attachments.enabled` | `false` | Detect PDF with attachments as composite documents |
| `arender.flatten.pdf.xfa` | `false` | Flatten XFA forms before rendering |

### Renderer selection

| Property | Default | Description |
|----------|---------|-------------|
| `micro-services.pdf-renderer` | `PDFOwl` | PDF rendering engine: `PDFOwl` or `JNIPdfEngine` |

### Comparison defaults

| Property | Default | Description |
|----------|---------|-------------|
| `comparison.default.value.highlight.color` | `FF0000` | Default highlight color for differences (hex, no `#`) |
| `comparison.default.value.lowlight.color` | _(empty)_ | Default lowlight color (empty = no lowlight) |
| `comparison.default.value.fuzz` | `3` | Default comparison sensitivity |

### Format routing

| Property | Default | Description |
|----------|---------|-------------|
| `arender.format.nativeMimeTypes` | `application/pdf,image/tiff,video/mp4,...` | MIME types that do not need conversion |
| `arender.format.documentExtractorBeanNames.mailExtractor` | `application/mbox,...` | MIME types handled by the mail extractor |
| `arender.format.documentExtractorBeanNames.archiveExtractor` | `application/zip,...` | MIME types handled by the archive extractor |
| `arender.format.conversionTargetMimeTypes.application-pdf` | _(long MIME type list)_ | MIME types to convert to PDF (Office, images, HTML, text, etc.) |
| `arender.format.conversionTargetMimeTypes.video-mp4` | `audio/x-wav,video/quicktime,...` | MIME types to convert to MP4 video |

### Microservice memory and JVM

These properties control memory allocation and JVM arguments for each sub-process launched by the broker in standalone mode. They can also be set via environment variables (uppercase, underscore-separated).

| Property | Default | Description |
|----------|---------|-------------|
| `arender.conversion.memory` | `1024m` | Heap size for the document converter sub-process |
| `arender.conversion.jvm.args` | `-Djava.net.preferIPv4Stack=true -Dfile.encoding=UTF-8` | JVM arguments for the converter |
| `arender.jnirenderer.memory` | `1024m` | Heap size for the JNI renderer sub-process |
| `arender.jnirenderer.jvm.args` | `-Djava.net.preferIPv4Stack=true -Djava.library.path=./lib/ -Dfile.encoding=UTF-8` | JVM arguments for the JNI renderer |
| `arender.pdfbox.memory` | `1024m` | Heap size for the text handler sub-process |
| `arender.pdfbox.jvm.args` | `-Djava.net.preferIPv4Stack=true -Dfile.encoding=UTF-8` | JVM arguments for the text handler |
| `arender.dfs.memory` | `1024m` | Heap size for the file storage sub-process |
| `arender.dfs.jvm.args` | `-Djava.net.preferIPv4Stack=true -Dfile.encoding=UTF-8` | JVM arguments for the file storage |

### Annotation accessor

| Property | Default | Description |
|----------|---------|-------------|
| `arender.external.annotation.accessor.factory.bean.name` | `annotationAccessorFactory` | Bean name for the external annotation accessor factory |

### Provider registry

These properties configure REST providers used by ARender Horizon.

| Property | Default | Description |
|----------|---------|-------------|
| `registry.default-provider` | — | Default provider name when `X-Provider-ID` header is absent |
| `registry.providers.<name>.base-url` | — | Base URL of the provider microservice |
| `registry.providers.<name>.whitelisted-params` | — | Comma-separated parameter names used for document ID generation and request filtering |

The `whitelisted-params` property serves two purposes:

1. **Document ID generation** — Only whitelisted parameters are used to generate the internal `DocumentId`. Two requests with the same whitelisted parameter values are treated as the same document (cache hit).
2. **Security filtering** — Only whitelisted parameters are forwarded to the provider. Other parameters from the original request are filtered out.

**Environment variable equivalents:**

```bash
REGISTRY_DEFAULT_PROVIDER=filenet
REGISTRY_PROVIDERS_FILENET_BASE_URL=http://filenet-provider:8787
REGISTRY_PROVIDERS_FILENET_WHITELISTED_PARAMS=objectStoreName,id,vsId,objectType,contentElement
REGISTRY_PROVIDERS_ALFRESCO_BASE_URL=http://alfresco-provider:8788
REGISTRY_PROVIDERS_ALFRESCO_WHITELISTED_PARAMS=nodeRef,alf_ticket,user,versionLabel
```

### Docker/Kubernetes runtime mode

| Property | Default (Docker) | Description |
|----------|-----------------|-------------|
| `run-mode.kubMode` | `true` | Use kube-style service discovery |
| `run-mode.standalone` | `false` | Standalone mode (all services in one JVM) |
| `run-mode.restartEnabled` | `false` | Enable auto-restart of sub-processes |
| `kubeprovider.useLocalhost` | `false` | Register services as localhost (standalone mode only) |

---

## Document Converter

The Document Converter (`arender-document-converter`) runs on port 19999.

### Temporary files

| Property | Default | Description |
|----------|---------|-------------|
| `tmp.dir.doc` | `../../tmp/` | Working directory for conversion output |

### LibreOffice / soffice

| Property | Default | Description |
|----------|---------|-------------|
| `soffice.conversion.timeout` | `120` | Timeout for soffice conversion (seconds) |
| `soffice.env.user.installation.path` | `../tmp/` | User installation path for soffice instances |
| `rendition.soffice.path` | `soffice` | Executable name or path for soffice |
| `rendition.office.options` | `--headless,--convert-to` | soffice command-line options |

### DirectOffice (MSOffice)

| Property | Default | Description |
|----------|---------|-------------|
| `msoffice.conversion.timeout` | `120` | Timeout for MSOffice conversion (seconds) |
| `msoffice.aroms2pdf.startup.timeout` | `10` | Startup timeout for aroms2pdf (seconds) |
| `excel.maximum.cell.count` | `1000000` | Maximum Excel cells before falling back from MSOffice |
| `rendition.directoffice.path` | `directoffice` | Path to the DirectOffice executable |

### Image conversion

| Property | Default | Description |
|----------|---------|-------------|
| `image.conversion.timeout` | `45` | Timeout for image conversion (seconds) |
| `image.conversion.maximum.width.px` | `2000` | Maximum width (px) for images converted to PDF |
| `image.conversion.target.mime.type` | `image/png` | Output MIME type for page images |
| `image.default.min.dpi` | `1` | Minimum DPI threshold (below this value uses 72 DPI) |

### ImageMagick

| Property | Default | Description |
|----------|---------|-------------|
| `tools.imagemagick.convert.path` | `magick` | ImageMagick executable path |
| `tools.imagemagick.options` | `-quality,100,-density,72x72,...` | ImageMagick command-line options |
| `tools.imagemagick.ignore.result` | `true` | Ignore non-zero exit codes from ImageMagick |
| `tools.imagemagick.default.extension.format` | `png` | Default output format |

### HTML conversion (wkhtmltopdf)

| Property | Default | Description |
|----------|---------|-------------|
| `html.conversion.timeout` | `120` | Timeout for HTML-to-PDF conversion (seconds) |
| `tools.wkhtmltopdf.path` | `wkhtmltopdf` | wkhtmltopdf executable path |
| `tools.wkhtmltopdf.options` | `--disable-javascript,...` | wkhtmltopdf command-line options |
| `tools.wkhtmltopdf.iframe.disabled` | `true` | Disable iframe URL resolution (security) |

### Video conversion (FFmpeg)

| Property | Default | Description |
|----------|---------|-------------|
| `video.conversion.timeout` | `300` | Timeout for video conversion (seconds) |
| `rendition.avconv.path` | `ffmpeg` | ffmpeg executable path |
| `rendition.avprobe.path` | `ffprobe` | ffprobe executable path |
| `tools.ffmpeg.options` | `-vcodec,h264,...` | ffmpeg command-line options |

### Text-to-PDF

| Property | Default | Description |
|----------|---------|-------------|
| `text.to.pdf.landscape` | `true` | Render text files in landscape orientation |
| `text.to.pdf.font.family` | `COURIER` | Font for text-to-PDF. Values: `COURIER`, `HELVETICA`, `TIMES_ROMAN`, `SYMBOL`, `ZAPFDINGBATS` |
| `text.to.pdf.font.size` | `13` | Font size for text-to-PDF |
| `text.to.pdf.font.file.path` | _(empty)_ | Path to a custom font file. Empty uses the built-in default |

### PDF flattener

| Property | Default | Description |
|----------|---------|-------------|
| `tools.pdf.flattener.path` | `PDFFormsFlattener` | PDF form flattener executable path |
| `tools.pdf.flattener.timeout` | `60` | Timeout for PDF flattening (seconds) |

### Fonts

| Property | Default | Description |
|----------|---------|-------------|
| `document.font.path` | `../fonts/` | Fallback font directory for embedded-font substitution |
| `document.font.allowed.extensions` | `ttf,otf` | Allowed font file extensions |
| `annotation.textual.unicode.font.path` | _(empty)_ | Font path for annotation textual content drawing |

### Annotation rendering

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.date.display.creationDate` | `true` | Display creation date on annotations; `false` displays last modified date |
| `stickyNote.printHeader` | `true` | Print the header on sticky note annotations |
| `redact.deleteText` | `true` | Remove text in redacted areas; `false` keeps text searchable/selectable |

### vCard conversion

| Property | Default | Description |
|----------|---------|-------------|
| `vcard.label.language` | `EN` | Language for vCard information fields. Values: `FR`, `EN` |

### PDF quality evaluation

| Property | Default | Description |
|----------|---------|-------------|
| `document.evaluate.image.quality.enabled` | `false` | Enable image quality comparison between source and converted PDF/A |
| `document.comparison.pixel.color.distance.enabled` | `true` | Use pixel color distance for comparison; `false` uses exact pixel equality |
| `document.comparison.pixel.threshold` | `0.5` | Image quality tolerance threshold (0–1, where 1 = 100% equal) |

### AFP conversion

| Property | Default | Description |
|----------|---------|-------------|
| `arender.afp.executable.path` | `cpmcopy` | AFP converter executable path |
| `arender.afp.conversion.timeout.ms` | `120000` | AFP conversion timeout (ms) |
| `arender.afp.old.profile.path` | _(empty)_ | Profile path for older AFP format |
| `arender.afp.new.profile.path` | _(empty)_ | Profile path for newer AFP format |
| `arender.afp.old.profile.directory.path` | _(empty)_ | Profile directory path for older AFP format |
| `arender.afp.new.profile.directory.path` | _(empty)_ | Profile directory path for newer AFP format |
| `arender.afp.profile.directory.path` | _(empty)_ | Profile directory path for identifying AFP format |
| `arender.afp.font.entries.directory.path` | _(empty)_ | Font directory for generated font entries file |
| `arender.afp.log.directory.path` | _(empty)_ | Log directory for conversion logs |

### Email conversion

| Property | Default | Description |
|----------|---------|-------------|
| `emltopdf.config.header.language` | `FR` | Language for email header rendering. Values: `FR`, `EN`, `DE` |
| `emltopdf.config.format.date` | `EEE d MMM yyyy HH:mm:ss Z` | Date format for email headers |
| `emltopdf.config.time.zone` | _(empty)_ | Timezone for email dates. Empty uses the system timezone |
| `emltopdf.encode.header.with.body.encoding` | `false` | Encode header with body encoding |
| `emltopdf.config.filter.special.characters.regex` | `[^A-zÀ-ú0-9\\s\\-\\.]` | Regex for characters to filter from filenames. Set empty to disable |
| `emltopdf.config.filter.replacement.character` | `_` | Replacement character for filtered characters |
| `emltopdf.resize.embedded.image.enabled` | `false` | Resize oversized embedded images to fit page width |
| `emltopdf.custom.mail.title` | `Email` | Title label for converted email documents |
| `emltopdf.custom.mail.title.separator` | `:` | Separator between title label and subject |
| `emltopdf.custom.mail.attachment.header` | `Mail body` | Header label for the mail body attachment |
| `emltopdf.custom.mail.display.subject.in.title` | `true` | Display the email subject in the document title |

---

## Document Renderer (PDFOwl)

The Document Renderer (`arender-document-renderer-pdfowl`) runs on port 9091.

### Network

| Property | Default | Description |
|----------|---------|-------------|
| `server.port` | `9091` | HTTP port |
| `server.address` | `0.0.0.0` | Bind address |

### PDFOwl engine

| Property | Default | Description |
|----------|---------|-------------|
| `pdfowl.path` | `lib/pdfowl` | Path to the PDFOwl binary |
| `pdfowl.client.watchdog` | `10000` | Timeout for PDFOwl command execution (ms) |
| `pdfowl.client.ttl` | `30000` | Idle timeout before closing a PDFOwl client (ms) |
| `pdfowl.memlimit.mb` | `1024` | Memory limit per rendering thread (MB) |
| `pdfowl.recycling.enable` | `true` | Recycle PDFOwl processes in the pool |

### Health

| Property | Default | Description |
|----------|---------|-------------|
| `health.time.interval` | `60000` | Interval between health self-checks (ms) |
| `health.sample.path` | `src/main/resources/pdfS4mpl3.pdf` | Sample PDF used for health checks |

---

## Document Text Handler

The Document Text Handler (`arender-document-text-handler`) handles text extraction and comparison.

### PDF text and signatures

| Property | Default | Description |
|----------|---------|-------------|
| `pdf.text.parsing.batch.size` | `10` | Number of pages processed per text-parsing batch |
| `pdf.search.timeout` | `60` | Search timeout (seconds) |
| `pdf.search.stream.timeout` | `500` | Streamed search timeout (ms) |
| `pdf.signatures.enable` | `false` | Enable digital signature validation |
| `PRIVATE_CERT` | `../defaultPathPrivateCert` | Path to private certificate for signature validation |
| `PUBLIC_CERT` | `../defaultPathPublicCert` | Path to public certificate |
| `trusted.root.certificates.path` | `../defaultPathRootCert` | Path to trusted root certificates |
| `PASSWORD_KEYSTORE` | `defaultPassword` | Keystore password |
| `PASSWORD_PRIVATE_CERT` | `defaultPassword` | Private certificate password |

### Comparison

| Property | Default | Description |
|----------|---------|-------------|
| `document.comparison.include.diff-fragments` | `true` | Resolve diff fragments for hover popups. Can impact performance on large diffs |

---

## Shared metrics settings

All ARender services expose the same Micrometer-based metrics configuration. The properties below apply to the broker, converter, renderer, and text handler.

### Prometheus

| Property | Default | Description |
|----------|---------|-------------|
| `management.endpoints.web.exposure.include` | `prometheus,metrics,health` | Exposed actuator endpoints |
| `management.endpoint.prometheus.access` | `none` | Prometheus endpoint access level. Set to `unrestricted` to enable |
| `management.endpoint.metrics.access` | `unrestricted` | Metrics endpoint access level |

### Elasticsearch export

| Property | Default | Description |
|----------|---------|-------------|
| `management.elastic.metrics.export.enabled` | `false` | Enable Elasticsearch metrics export |
| `management.elastic.metrics.export.host` | `http://localhost:9200` | Elasticsearch host |
| `management.elastic.metrics.export.index` | `arender-micrometer-metrics` | Target index |
| `management.elastic.metrics.export.step` | `5m` | Export interval |

### Datadog export

| Property | Default | Description |
|----------|---------|-------------|
| `management.datadog.metrics.export.enabled` | `false` | Enable Datadog metrics export |
| `management.datadog.metrics.export.api-key` | `YOUR_KEY` | Datadog API key |
| `management.datadog.metrics.export.uri` | `https://app.datadoghq.com/` | Datadog ingest URL |
| `management.datadog.metrics.export.step` | `5m` | Export interval |

### CloudWatch export

| Property | Default | Description |
|----------|---------|-------------|
| `management.cloudwatch.metrics.export.enabled` | `false` | Enable CloudWatch metrics export |
| `management.cloudwatch.metrics.export.namespace` | varies | CloudWatch namespace |
| `management.cloudwatch.metrics.export.region` | `eu-west-1` | AWS region |
| `management.cloudwatch.metrics.export.step` | `5m` | Export interval |

### ARender endpoint metrics

Each service can export per-endpoint metrics. All are disabled by default. The property pattern is:

```
arender.endpoint.metrics.export.{endpoint}.enabled=false
```

Available endpoints: `has.document`, `bookmarks`, `document.layout`, `load.document.content`, `get.file.chunk`, `text.position`, `document.annotation`, `transformation`, `document.metadata`, `image`, `search`, `advanced.search`, `load.document`, `evict`, `annotation`, `compare`, `signature`, `printable.pdf`, `convert`, `health.record`.

Additional control properties:

| Property | Default | Description |
|----------|---------|-------------|
| `arender.endpoint.metrics.export.whitelist.tags` | `host,mimeType` | Tags included in endpoint metric exports |
| `arender.endpoint.metrics.export.correlation.id.tag.enabled` | `false` | Add correlation ID as a tag |
| `arender.metric.meter.tool` | `COUNTER` | Meter type: `COUNTER` or `TIMER` |

---

## Related pages

- [Environment variables](../installation/environment-variables.md)
- [Docker Compose](../installation/docker-compose.md)
