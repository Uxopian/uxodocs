---
title: Repository access
slug: /installation/repository-access
sidebar_position: 7
---

# Repository access

ARender artifacts are distributed through several channels, depending on whether you need an installer, a Maven library, the npm package or a Docker image.

**Uxopian Cloudsmith is the distribution channel for every ARender artifact** — binaries, Maven libraries, Docker images and the npm package. The former Arondor Artifactory repository is not available outside Uxopian: if you are upgrading from a version older than 2023.12.0, replace your Artifactory configuration with the Cloudsmith configuration below.

| What you need | Channel | Credentials |
|---|---|---|
| Installers and application binaries | Cloudsmith `uxopian/release` | Cloudsmith user ID and API key |
| Maven libraries (connector and API development) | Cloudsmith `uxopian/release` and `uxopian/herodevs-proxy` | Cloudsmith user ID and API key |
| Docker images | Cloudsmith `uxopian/release` | Cloudsmith user ID and API key |
| `arender-ui` npm package | Cloudsmith `uxopian/uxopian-public` | None — public registry |

A single Cloudsmith account covers all of them. To request access, contact the ARender Support Team at arender-support@uxopian.com.

## Maven libraries

Maven libraries are published to two Cloudsmith repositories:

| Repository | URL | Contents |
|---|---|---|
| `uxopian-release` | `https://dl.cloudsmith.io/basic/uxopian/release/maven/` | ARender libraries and APIs |
| `uxopian-herodevs` | `https://dl.cloudsmith.io/basic/uxopian/herodevs-proxy/maven/` | Extended-support third-party dependencies |

Both repositories require authentication. Add the following to your `settings.xml`, located at `~/.m2/`:

```xml title="~/.m2/settings.xml"
<?xml version="1.0" encoding="UTF-8"?>
<settings xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd"
  xmlns="http://maven.apache.org/SETTINGS/1.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <servers>
    <server>
      <id>uxopian-release</id>
      <username>CLOUDSMITH_ID</username>
      <password>CLOUDSMITH_TOKEN</password>
    </server>
    <server>
      <id>uxopian-herodevs</id>
      <username>CLOUDSMITH_ID</username>
      <password>CLOUDSMITH_TOKEN</password>
    </server>
  </servers>

  <profiles>
    <profile>
      <id>cloudsmith</id>
      <repositories>
        <repository>
          <id>uxopian-release</id>
          <url>https://dl.cloudsmith.io/basic/uxopian/release/maven/</url>
        </repository>
        <repository>
          <id>uxopian-herodevs</id>
          <url>https://dl.cloudsmith.io/basic/uxopian/herodevs-proxy/maven/</url>
        </repository>
      </repositories>
    </profile>
  </profiles>

  <activeProfiles>
    <activeProfile>cloudsmith</activeProfile>
  </activeProfiles>
</settings>
```

Replace **CLOUDSMITH_ID** with your Cloudsmith user ID and **CLOUDSMITH_TOKEN** with your Cloudsmith API key.

:::note
Use your Cloudsmith username without the leading `@` — `jane-doe`, not `@jane-doe`, which is rejected with a 401 error. Your email address is accepted as well. Authenticate with your API key, not your account password.
:::

:::note
One API key covers every repository your Cloudsmith account can reach, so the same user ID and key work for `uxopian-release` and `uxopian-herodevs`. If you were issued per-repository entitlement tokens instead of an account API key, set the token matching each repository on its own `<server>`.
:::

:::note
The `id` of each `<server>` must match the `id` of the corresponding `<repository>`, otherwise Maven sends no credentials and the build fails with a 401 error.
:::

Connector and API development that consumes these libraries is covered in the [integration guides](../guides/integration/index.md).

## Binaries

Installers and packaged applications — the Rendition engine installer, the Spring Boot WEB-UI package, the connector JARs and the API Javadoc — are published to the Cloudsmith `uxopian/release` repository and require the same Cloudsmith credentials as the Maven libraries.

Per-version download links are listed in the release notes of each version, under the **Download** section. See the [ARender release notes](/release-note/arender/).

## npm package

The ARender React UI is distributed as the `arender-ui` npm package from the Cloudsmith public registry. **No credentials are required** — the registry is public and anonymous:

```bash
npm install arender-ui@{{version}} --registry=https://npm.cloudsmith.io/uxopian/uxopian-public
```

To avoid passing `--registry` on every command, scope the registry in your project's `.npmrc`:

```ini title=".npmrc"
registry=https://npm.cloudsmith.io/uxopian/uxopian-public
```

The same registry also serves `@uxopian/arender-rendition-mcp`. The full integration walkthrough is in the Quickstart section of the Horizon documentation.

## Docker images

Docker images are published to the Cloudsmith `uxopian/release` repository, served from the `docker.uxopian.com` registry. Authenticate with the same Cloudsmith user ID and API key as the Maven repositories:

```bash
docker login docker.uxopian.com
```

Images are then addressed as `docker.uxopian.com/release/<image>:<version>`:

```bash
docker pull docker.uxopian.com/release/arender-ui-springboot:{{version}}
```

| Image | Role |
|---|---|
| `arender-ui-springboot` | Viewer WEB-UI. The `-alfresco` and `-filenet` tag suffixes ship the matching connector |
| `arender-document-service-broker` | REST API gateway and orchestration |
| `arender-document-converter` | Format conversion |
| `arender-document-renderer-pdfowl` | Page rendering |
| `arender-document-text-handler` | Text extraction |
| `arender-alfresco-provider` | Alfresco provider (Horizon) |
| `arender-filenet-provider` | FileNet provider (Horizon) |
| `arender-mfiles-provider` | M-Files provider (Horizon) |

Deployment manifests using these images are covered in [Docker Compose](./docker-compose.md).

## Migrating from Artifactory

Builds and deployments created before the Cloudsmith migration resolve against the Arondor Artifactory repository `arondor-all`, or pull images from `artifactory.arondor.cloud:5001`. Artifactory is internal to Uxopian and is not open to customers or partners, so a configuration still pointing at it cannot retrieve ARender artifacts.

To migrate, replace the `arondor` server and the `artifactory` profile in your `~/.m2/settings.xml` with the Cloudsmith configuration shown above, remove `artifactory` from `<activeProfiles>`, and repoint your image references to `docker.uxopian.com/release/`.
