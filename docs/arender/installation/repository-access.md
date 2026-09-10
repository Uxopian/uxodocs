---
title: Repository access
slug: /installation/repository-access
sidebar_position: 7
---

# Repository access

ARender artifacts are distributed through several channels, depending on whether you need an installer, a Maven library, the npm package or a Docker image.

**Uxopian Cloudsmith is the current distribution channel for binaries and Maven libraries.** The former Arondor Artifactory Maven repository (`arondor-all`) is still online, but it is no longer the repository to use. If you are upgrading from a version older than 2023.12.0, replace your Artifactory Maven configuration with the Cloudsmith configuration below.

| What you need | Channel | Credentials |
|---|---|---|
| Installers and application binaries | Cloudsmith `uxopian/release` | Cloudsmith user ID and API key |
| Maven libraries (connector and API development) | Cloudsmith `uxopian/release` and `uxopian/herodevs-proxy` | Cloudsmith user ID and API key |
| `arender-ui` npm package | Cloudsmith `uxopian/uxopian-public` | None — public registry |
| Docker images | Artifactory `artifactory.arondor.cloud:5001` | Artifactory credentials |

To request Cloudsmith access, contact the ARender Support Team at arender-support@uxopian.com.

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
Use your Cloudsmith username without the leading `@` — `jane-doe`, not `@jane-doe`, which is rejected with a 401 error. Your email address is accepted as well. The API key is the value starting with `csa_`, not your account password.
:::

:::note
The `id` of each `<server>` must match the `id` of the corresponding `<repository>`, otherwise Maven sends no credentials and the build fails with a 401 error.
:::

Connector and API development that consumes these libraries is covered in the [integration guides](../guides/integration/index.md).

## Binaries

Installers and packaged applications — the Rendition engine installer, the Spring Boot WEB-UI package, the connector JARs and the API Javadoc — are published to the Cloudsmith `uxopian/release` repository and require the same Cloudsmith credentials as the Maven libraries.

Per-version download links are listed in the release notes of each version, under the **Download** section. See the [ARender release notes](/release-note/arender/).

Artifacts are available from Cloudsmith for 2023.20.0 and every later version. A few artifacts from earlier versions were never published there, so the download links on those release notes still resolve against Artifactory and ask for Artifactory credentials instead.

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

Docker images are **not** distributed through Cloudsmith. They remain on the Arondor Artifactory Docker registry at `artifactory.arondor.cloud:5001`, which requires Artifactory credentials:

```bash
docker login artifactory.arondor.cloud:5001
```

Contact your ARender administrator if you do not have an account. The image list is documented in [Docker Compose](./docker-compose.md).

## Legacy Artifactory Maven repository

The Arondor Artifactory Maven repository at `https://artifactory.arondor.cloud/artifactory/arondor-all/` predates the Cloudsmith migration. It is still online, so existing builds do not break, but ARender libraries are published to Cloudsmith and new configurations should target Cloudsmith only.

If you maintain a build that still resolves against `arondor-all`, migrate it to the Cloudsmith `settings.xml` shown above. Should you need both repositories active during a transition, declare the `artifactory` and `cloudsmith` profiles side by side and list both in `<activeProfiles>`.
