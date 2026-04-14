---
title: Backup and restore
slug: /operations/backup-restore
sidebar_position: 3
---

# Backup and restore

This page describes what to back up in an ARender deployment and how to restore each component. ARender itself is stateless at runtime, but several data directories and configuration files must be preserved to avoid data loss across upgrades, migrations, or disasters.

## Data inventory

Before designing a backup strategy, identify which data matters in your deployment:

| Data | Location | Criticality | Notes |
|------|----------|-------------|-------|
| Rendition cache (tmp) | Shared volume (`/arender/tmp` or `../../tmp/`) | Low | Rebuilt automatically on next document open |
| Viewer configuration | `application.properties`, `application.yml`, custom Spring profiles | High | Required to restore viewer behavior |
| Broker configuration | `application.properties`, `hazelcast.yaml`, custom JVM arguments | High | Required to restore rendition behavior |
| Annotation files | Configured annotation storage path (filesystem, database, or REST service) | Critical | User-created annotations are irreplaceable |
| Annotation database (JDBC) | SQL database table `ANNOTATIONS` or `VANNOTATIONS` | Critical | User-created annotations are irreplaceable |
| OAuth2 / security configuration | Environment variables or properties files with client secrets, issuer URIs | High | Required for authentication to work after restore |
| Helm values file | `my-values.yaml` or equivalent | High | Single source of truth for Kubernetes deployments |
| Docker Compose file | `docker-compose.yml`, `nginx.conf` | High | Defines the full service topology |

## Rendition cache

The rendition cache holds converted and rendered document pages on the shared temporary volume. This data is ephemeral: when a user opens a document, ARender regenerates any missing rendition artifacts automatically.

**Backup**: not required. The cache rebuilds on demand.

**Restore**: no action needed. After a fresh deployment, the first access to each document triggers rendition from scratch.

If you want to preserve the cache to avoid a cold-start performance hit after a migration, copy the entire shared tmp directory. On restore, mount it at the same path.

## Viewer configuration backup

The viewer reads its configuration from property files and environment variables. Back up the following:

- `application.properties` or `application.yml` (custom overrides)
- Spring profiles (`application-{profile}.properties`)
- OAuth2 client credentials and provider settings

In a Docker deployment, these are typically injected as environment variables in `docker-compose.yml`. Back up the Compose file itself.

In Kubernetes, these live in ConfigMaps, Secrets, and the Helm values file. Back up:

```bash
# Export Helm values
helm get values arender -n arender -o yaml > arender-values-backup.yaml

# Export secrets (base64-encoded)
kubectl get secret -n arender -o yaml > arender-secrets-backup.yaml
```

**Restore**: redeploy with the backed-up values file or re-apply the ConfigMaps and Secrets before installing the Helm chart.

## Broker and rendition service configuration

The Document Service Broker and rendition microservices read configuration from:

- `application.properties` in each module directory (`modules/RenditionEngine/`, `modules/TaskConversion/`, etc.)
- `hazelcast.yaml` for cache clustering
- JVM arguments in `custom-setenv.sh` or `custom-setenv.bat`

Back up these files before any upgrade. On restore, copy them back into the corresponding module directories and restart the services.

In containerized deployments, these are managed through environment variables and Helm values, so backing up the orchestration files (Compose or Helm) covers this.

## Annotation storage backup

Annotations are the most critical data to protect. ARender supports three storage backends, each with a different backup approach.

### XFDF file storage

Annotations are stored as `.xml` files in the configured annotation directory. Each file corresponds to one document.

**Backup**:

```bash
# Copy the entire annotation directory
cp -r /data/annotations/ /backup/annotations-$(date +%Y%m%d)/
```

**Restore**: copy the backed-up directory to the same path. Ensure the application user has read/write permissions.

### JDBC database storage

Annotations are stored in the `ANNOTATIONS` table (or `VANNOTATIONS` for versioned storage). Use your database's native backup tools.

**Backup**:

```bash
# SQL Server example
sqlcmd -S myserver -d arenderdb -Q "BACKUP DATABASE arenderdb TO DISK='/backup/arenderdb.bak'"

# PostgreSQL example
pg_dump -h myserver -U arender -d arenderdb -t ANNOTATIONS -F c -f /backup/annotations.dump
```

**Restore**: use the corresponding database restore command. Verify the table structure matches the expected schema before starting ARender.

### REST annotation storage

When annotations are stored in an external system via REST, backup responsibility falls on that external system. Ensure the remote annotation service is included in your organization's backup plan.

## Docker volume backup

In a Docker Compose deployment, persistent data lives in named volumes. The `arender-tmp` volume is ephemeral cache and does not require backup. Annotation volumes do.

**Identify volumes**:

```bash
docker volume ls | grep arender
```

**Backup a named volume**:

```bash
# Back up the annotations volume
docker run --rm \
  -v annotations-data:/source:ro \
  -v /backup:/target \
  alpine tar czf /target/annotations-data-$(date +%Y%m%d).tar.gz -C /source .
```

**Restore a named volume**:

```bash
# Create the volume if it does not exist
docker volume create annotations-data

# Restore from archive
docker run --rm \
  -v annotations-data:/target \
  -v /backup:/source:ro \
  alpine sh -c "cd /target && tar xzf /source/annotations-data-20260317.tar.gz"
```

After restoring, start the services normally with `docker compose up -d`.

## Kubernetes PVC backup

In Kubernetes, persistent data is stored on PersistentVolumeClaims. The rendition shared tmp PVC (`sharedTmpFolder`) is cache and can be recreated. Annotation PVCs and any log persistence PVCs should be backed up.

### Using Velero

[Velero](https://velero.io/) is the standard tool for Kubernetes backup and restore.

**Install and configure Velero** for your cloud provider, then back up the ARender namespace:

```bash
# Back up the entire namespace
velero backup create arender-backup \
  --include-namespaces arender \
  --default-volumes-to-fs-backup

# Restore
velero restore create --from-backup arender-backup
```

### Manual PVC snapshot

If Velero is not available, use volume snapshots:

```bash
# Create a VolumeSnapshot (requires CSI snapshot support)
kubectl apply -f - <<EOF
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: annotations-snapshot
  namespace: arender
spec:
  volumeSnapshotClassName: csi-snapclass
  source:
    persistentVolumeClaimName: arender-annotations-pvc
EOF
```

Restore by creating a new PVC from the snapshot:

```bash
kubectl apply -f - <<EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: arender-annotations-pvc
  namespace: arender
spec:
  dataSource:
    name: annotations-snapshot
    kind: VolumeSnapshot
    apiGroup: snapshot.storage.k8s.io
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
EOF
```

## Full restore procedure

To restore a complete ARender deployment from backup:

1. **Deploy infrastructure**: provision the Kubernetes cluster or Docker host.
2. **Restore configuration**: apply Helm values, Compose files, ConfigMaps, and Secrets from backup.
3. **Restore annotation data**: restore XFDF files to the correct volume or restore the annotation database from dump.
4. **Deploy ARender**: run `helm install` or `docker compose up -d` with the backed-up configuration.
5. **Verify**: open a document that had existing annotations and confirm they appear. Check the broker health endpoint to confirm all microservices registered.

The rendition cache rebuilds automatically on first document access. No separate restore step is needed for it.

## Backup schedule recommendations

| Data | Frequency | Retention |
|------|-----------|-----------|
| Annotation files or database | Daily | 30 days minimum |
| Configuration files / Helm values | On every change | Keep all versions in version control |
| Kubernetes namespace (Velero) | Daily | 7 days minimum |
| Docker volumes | Daily | 14 days minimum |

## Related pages

- [Docker Compose](../installation/docker-compose.md)
- [Monitoring and observability](./monitoring.md)
