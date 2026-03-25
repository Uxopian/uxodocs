---
title: Troubleshooting
slug: /operations/troubleshooting
sidebar_position: 2
---

# Troubleshooting

This guide covers the most common problems encountered when deploying and operating ARender. Issues are organized by symptom. For each issue you will find the symptoms to look for, the most likely causes, steps to diagnose, and how to resolve it.

For metrics-based diagnosis, see [Monitoring and observability](./monitoring.md).

---

## Service does not start

### Service exits immediately after launch

**Symptoms:** The process starts and exits within a few seconds. No meaningful log output, or an exception in the first lines of output.

**Possible causes:**
- Port already in use by another process.
- Java version mismatch. ARender requires Java 17 or later.
- Missing or unreadable JAR file.
- Insufficient memory for the requested heap size.

**Diagnosis:**
```bash
# Check the port
ss -tlnp | grep 8761

# Check Java version
java -version

# Run with verbose output to see the full exception
java -jar arender-document-service-broker-{{version}}.jar 2>&1 | head -50
```

**Resolution:**
- Kill the process holding the port or change `server.port` in `application.properties`.
- Install a supported JDK.
- Verify the JAR path and file permissions.
- Reduce the heap size or increase available memory on the host.

---

### Broker starts but rendition services do not register

**Symptoms:** The broker starts successfully. When loading a document, the viewer returns an error. Broker logs contain: `Found 0 instance of document-converter` (or `document-renderer`, `document-text-handler`).

**Possible causes:**
- The rendition service has not finished starting yet. Allow 30 to 60 seconds on first start.
- In Docker Compose: the `DSB_KUBEPROVIDER_KUBE.HOSTS_*` environment variables are missing or contain the wrong service name.
- In standalone mode: `kubeprovider.kube.hosts.*` properties are missing from the broker configuration, or the service hostname is not reachable.
- Network connectivity: the broker cannot reach the rendition service's port.

**Diagnosis:**
```bash
# Docker Compose: check broker logs
docker compose logs service-broker | grep "Found 0 instance"

# Kubernetes: check broker logs and DNS
kubectl logs deployment/arender-rendition-broker | grep "Found 0 instance"
kubectl exec deployment/arender-rendition-broker -- nslookup arender-rendition-converter

# Standalone: verify service health endpoints are reachable from the broker host
curl http://localhost:19999/actuator/health
curl http://localhost:9091/actuator/health
curl http://localhost:8899/actuator/health
```

**Resolution:**
- In Docker Compose: verify that `DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-CONVERTER=19999` (and the equivalent for renderer and text handler) are set on the broker service.
- In standalone mode: set `kubeprovider.kube.hosts.document-converter=19999` and `kubeprovider.useLocalhost=true` in the broker's `application.properties`.
- Wait for services to finish their startup sequence before checking. The broker pings services every 5 seconds by default (`health.check.poll.interval=5`).

---

### Service fails to connect to the broker

**Symptoms:** Converter, renderer, or text handler logs contain messages about failing to connect to the broker or health check timeout.

**Possible causes:**
- The broker hostname configured in the rendition service does not resolve or is unreachable.
- The broker port is incorrect.
- The broker is not yet running when the rendition service starts.

**Diagnosis:**
```bash
# Check the broker hostname setting in the failing service
# For converter (Docker Compose):
docker compose logs document-converter | grep -i "eureka\|renditionHost\|connection"

# Verify the broker is reachable from the converter container
docker compose exec document-converter curl http://service-broker:8761/actuator/health
```

**Resolution:**
- Set the correct broker hostname and port via environment variables:
  - Converter: `DCV_APP_EUREKA_HOSTNAME=<broker-host>` and `DCV_APP_EUREKA_PORT=8761`
  - Renderer: `DRN_EUREKA_INSTANCE_HOSTNAME=<broker-host>` and `DRN_EUREKA_SERVER_PORT=8761`
  - Text handler: `DTH_EUREKA_INSTANCE_HOSTNAME=<broker-host>` and `DTH_EUREKA_SERVER_PORT=8761`
- Start the broker before starting rendition services.

---

## Document does not render

### Viewer shows a blank page or a loading spinner that never resolves

**Symptoms:** The viewer opens but displays a blank page or spins indefinitely. No error message is shown to the user.

**Possible causes:**
- The viewer UI cannot reach the broker. The `arender.server.rendition.hosts` property points to a wrong address.
- The broker is up but no rendition services are registered (see [Broker starts but rendition services do not register](#broker-starts-but-rendition-services-do-not-register)).
- A network proxy or firewall blocks requests between the viewer UI and the broker.
- The document format is not supported or the format detection fails.

**Diagnosis:**
```bash
# From the browser: open the browser developer console (F12) and check for
# failed requests to the broker API (typically http://broker-host:8761/...)

# From the viewer UI container: verify the broker is reachable
curl http://service-broker:8761/actuator/health

# Check the viewer UI logs for connection errors
docker compose logs ui | grep -i "error\|refused\|timeout"
```

**Resolution:**
- Verify that the viewer is configured to reach the broker: `arender.server.rendition.hosts=http://service-broker:8761/` (or `http://localhost:8761/` in standalone mode).
- Confirm all rendition services are healthy (see [Service does not start](#service-does-not-start)).
- Check firewall rules between the viewer UI host and the broker host.

---

### Office or email documents do not render (conversion failure)

**Symptoms:** PDF and image documents load correctly. Office documents (Word, Excel, PowerPoint) or email files (.eml, .msg) fail with a conversion error. Converter logs show LibreOffice or `soffice` errors.

**Possible causes:**
- LibreOffice is not installed on the converter host.
- LibreOffice's temporary user installation path is not writable. Multiple concurrent conversions require separate user installation directories.
- The conversion timeout is too short for large documents.
- The document exceeds the spreadsheet cell count limit (`excel.maximum.cell.count=1000000`).

**Diagnosis:**
```bash
# Verify LibreOffice is installed and accessible
soffice --version

# Check converter logs for timeout or permission errors
docker compose logs document-converter | grep -i "soffice\|libreoffice\|timeout\|error"
```

**Resolution:**
- Install LibreOffice on the converter host or in the Docker image.
- Increase `soffice.conversion.timeout` (default 120 seconds) for large documents:
  ```properties
  soffice.conversion.timeout=300
  ```
- Ensure the `soffice.env.user.installation.path` is writable and unique per concurrent instance:
  ```properties
  soffice.env.user.installation.path=../tmp/
  ```
- To handle large spreadsheets, increase `excel.maximum.cell.count`.

---

### Slow rendering of the first page

**Symptoms:** The first page of an Office or email document takes significantly longer than subsequent pages or PDF documents.

**Possible causes:**
- LibreOffice cold-start: the first conversion after startup launches a new LibreOffice process, which is slow. Subsequent conversions reuse it.
- The converter pod is CPU-constrained. LibreOffice conversion is CPU-intensive.
- Large documents with many images or embedded objects require more processing time.

**Diagnosis:**
- Enable converter endpoint metrics to measure conversion duration:
  ```properties
  arender.endpoint.metrics.export.convert.enabled=true
  ```
- Check CPU usage on the converter host during conversion.

**Resolution:**
- Scale the converter horizontally if conversion load is high.
- Increase CPU limits on the converter container.
- Consider pre-warming LibreOffice by converting a small document at startup.

---

### PDFOwl renderer times out or rendering requests fail

**Symptoms:** Rendering requests for PDF pages time out. Renderer logs show watchdog timeout messages or PDFOwl process errors. The viewer may display blank pages after a delay.

**Possible causes:**
- All PDFOwl processes in the pool are busy with long-running renders.
- A single document with very high resolution or complex layers exhausts per-process memory.
- The watchdog timeout is too short for complex documents.

**Diagnosis:**
```bash
# Check renderer logs for watchdog or memory errors
docker compose logs document-renderer | grep -i "watchdog\|timeout\|memory\|pdfowl"
```

**Resolution:**
- Increase the memory limit per PDFOwl process:
  ```properties
  pdfowl.memlimit.mb=2048
  ```
- Increase the watchdog timeout:
  ```properties
  pdfowl.client.watchdog=20000
  ```
- Scale renderer replicas to handle concurrent rendering load.

---

## Annotations do not save or load

### Annotations are not saved (JDBC connector)

**Symptoms:** Annotations disappear after the page is refreshed. No error is shown in the viewer, but annotations saved by the user are not persisted.

**Possible causes:**
- JDBC connection properties are missing or incorrect (`arender.server.jdbc.url`, `arender.server.jdbc.driver.class.name`).
- The JDBC driver JAR is not on the classpath.
- The database user lacks `INSERT` or `UPDATE` privileges on the `ANNOTATIONS` table.
- Concurrent writes cause conflicts: multiple UI instances writing annotations for the same document simultaneously.

**Diagnosis:**
```bash
# Enable debug logging for the JDBC connector
# Add to application.properties:
logging.level.com.arondor.viewer.jdbc=DEBUG

# Check viewer UI logs for SQL errors
docker compose logs ui | grep -i "jdbc\|sql\|annotation"
```

**Resolution:**
- Verify the JDBC URL format: `jdbc:sqlserver://host:1433;databaseName=DB` for SQL Server.
- Confirm the driver JAR (`mssql-jdbc-*.jar` or `hsqldb-*.jar`) is in the viewer's classpath.
- Grant the database user `SELECT`, `INSERT`, and `UPDATE` on `ANNOTATIONS`.
- For concurrent write scenarios, set `useThreadSafeMode=true` on the `JDBCAnnotationContentAccessor` bean.

---

### Annotations are not saved (Alfresco CMIS connector)

**Symptoms:** Annotations can be placed but are not visible after reloading the document.

**Possible causes:**
- The authenticated user lacks write access to the annotation folder path in Alfresco.
- With `use.child.api=true`, the user lacks write access to the document itself.
- The annotation folder path (`arender.server.alfresco.annotation.path`) does not exist in the repository.

**Resolution:**
- Verify the user's Alfresco permissions on the annotation path and on the document.
- Check that the `annotation.path` folder exists in the Alfresco repository.
- Review viewer logs for `403` errors from the CMIS endpoint.

---

### Annotations do not load after migration from file storage to JDBC

**Symptoms:** Documents previously annotated show no annotations after switching to JDBC storage.

**Possible causes:**
- The `DOC_ID` values inserted in the `ANNOTATIONS` table do not match the document ID format ARender uses at query time.

**Diagnosis:**
Enable debug logging to trace the exact document ID being queried:
```properties
logging.level.com.arondor.viewer.jdbc=DEBUG
```
Compare the logged ID with the `DOC_ID` values in the database.

**Resolution:**
Update the `DOC_ID` values in the database to match the format ARender uses, or configure `reverseDocumentId=true` and `useDocumentIdArgument` on the `JDBCAnnotationContentAccessor` bean to extract the relevant part of the document ID.

---

## Feature-specific issues

### Redact explorer panel does not appear

**Symptoms:** The redact explorer is missing from the left sidebar. Users cannot place redact annotations.

**Possible causes:**
- `redactexplorer.enabled` is not set to `true`.
- The configuration file containing the property is not being loaded.
- The user does not have the `canRedact` permission in the annotation creation policy.

**Resolution:**
- Set `redactexplorer.enabled=true` in the active configuration.
- Verify the property file is loaded: check the viewer startup logs for the configuration file path.
- Check the annotation connector's `AnnotationCreationPolicy` to confirm `canRedact=true` is returned for the user.

---

### Download with redact produces no output

**Symptoms:** Clicking the "Download with redact" button produces no file, or the broker logs show an error from the `alterDocumentContent` call.

**Possible causes:**
- The document builder service is not running or not reachable from the broker.
- The broker does not have write access to the shared temporary directory.

**Resolution:**
- Verify the document builder service is running and healthy.
- Check broker logs for errors from `alterDocumentContent`.
- Confirm the shared `tmp/` directory is writable by the broker process.

---

### Document comparison shows no differences

**Symptoms:** The comparison completes but no differences are highlighted. Both documents appear identical to ARender.

**Possible causes:**
- The documents are scanned images without embedded text. Text comparison requires extractable text.
- The comparison was triggered before both documents fully loaded.

**Resolution:**
- Use image comparison instead: the image comparison mode (`visualization.image.comparison.enabled=true`) works on scanned documents by comparing pixel content.
- Confirm text is extractable: open the PDF in a standard viewer and verify that text selection works.

---

### Image comparison shows too many false differences (fuzz=0)

**Symptoms:** Every pixel shows as different even for visually identical pages.

**Cause:** Minor rendering variations between the two documents at fuzz=0 create false positives.

**Resolution:**
Increase the fuzz tolerance:
```properties
visualization.image.comparison.default.fuzz=3
```
A value of 3 to 5 filters out rendering noise without hiding genuine differences.

---

## Memory and resource issues

### Out of memory errors in broker or rendition services

**Symptoms:** Services log `java.lang.OutOfMemoryError: Java heap space`. The process may crash and restart.

**Possible causes:**
- The heap size (`-Xmx`) is too small for the document workload.
- Many large documents are being processed simultaneously.
- A memory leak accumulates over time (document cache not evicting).

**Diagnosis:**
Enable JVM memory metrics to track heap usage:
```properties
management.metrics.enable.jvm=true
```
Monitor `jvm.memory.used` in Prometheus or your metrics system.

**Resolution:**
- Increase the heap size: `-Xmx2g` or higher for services handling large documents.
- In Docker Compose, set `mem_limit` on the container and adjust `-Xmx` accordingly.
- In Kubernetes Helm, set memory requests and limits:
  ```yaml
  rendition:
    broker:
      resources:
        requests:
          memory: "2Gi"
        limits:
          memory: "4Gi"
  ```

---

### Shared volume file-not-found errors

**Symptoms:** Conversion succeeds but rendering fails. Broker logs contain `FileNotFoundException` referencing `/arender/tmp/...`.

**Possible causes:**
- The shared PVC is not mounted in all pods.
- Different PVCs are used across services: check `claimName` consistency in the Kubernetes manifests.
- The storage class does not support `ReadWriteMany`, and pods on different nodes cannot share the volume.

**Diagnosis:**
```bash
# Kubernetes: verify all pods mount the same PVC
kubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.spec.volumes[*].persistentVolumeClaim.claimName}{"\n"}{end}'
```

**Resolution:**
- Ensure all backend services (broker, converter, renderer, text handler) mount the same volume at the same path.
- Use a storage class that supports `ReadWriteMany` (NFS, CephFS, GlusterFS, or equivalent).

---

## Diagnostic commands reference

| What to check | Command |
|---|---|
| Service health | `curl http://localhost:<port>/actuator/health` |
| Broker readiness | `curl http://localhost:8761/health/readiness` |
| Broker Swagger UI | Open `http://localhost:8761/swagger-ui/index.html` in a browser |
| Docker Compose logs | `docker compose logs <service-name> --tail=100` |
| Kubernetes broker logs | `kubectl logs deployment/arender-rendition-broker --tail=100` |
| All pods status | `kubectl get pods -l app.kubernetes.io/name=arender` |
| Shared volume mounts | `kubectl describe pod <pod-name> \| grep -A5 Mounts` |

---

## Related pages

- [Monitoring and observability](./monitoring.md)
- [Docker Compose](../installation/docker-compose.md)
- [Kubernetes Helm](../installation/kubernetes-helm.md)
