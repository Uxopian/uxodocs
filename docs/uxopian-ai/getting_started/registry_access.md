---
title: Registry access
sidebar_label: Registry access
sidebar_position: 4
last_update:
  date: '2026-03-26T16:37:56.929Z'
  author: CI/CD Bot
content_hash: f7ee16d4199d531ac75dedd8ad47bf0f030462af006b47c8f40379d4ebc935be
---

Uxopian AI images are available from two Docker registries: a public preview registry on Cloudsmith and a private enterprise registry on Artifactory. Use the one that matches your access level.

## Cloudsmith public registry

The Cloudsmith registry at `docker.uxopian.com` provides public access to preview releases. No credentials are required for pulling images.

### Images

| Image | Full name |
|---|---|
| uxopian-ai | `docker.uxopian.com/preview/uxopian-ai:VERSION` |
| uxopian-gateway | `docker.uxopian.com/preview/uxopian-gateway:VERSION` |

### Log in (optional — for push access only)

Pulling preview images does not require authentication. If you need push access, log in with:

```bash
docker login docker.uxopian.com
```

### Pull an image

```bash
docker pull docker.uxopian.com/preview/uxopian-ai:2026.0.0-ft2
docker pull docker.uxopian.com/preview/uxopian-gateway:2026.0.0-ft2
```

### Use Cloudsmith images in Docker Compose

The Docker Compose examples include commented-out image lines for the Cloudsmith registry. To switch from Artifactory to Cloudsmith, edit `uxopian-ai-stack.yml` and swap the active image line for each service:

```yaml
# Comment out the Artifactory line:
# image: ${REGISTRY:-artifactory.arondor.cloud:5001}/uxopian-ai:${UXOPIAN_VERSION:-2026.0.0-ft2}
# Uncomment the Cloudsmith line:
image: docker.uxopian.com/preview/uxopian-ai:${UXOPIAN_VERSION:-2026.0.0-ft2}
```

Repeat for `uxopian-gateway`. The `REGISTRY` variable does not apply to Cloudsmith images because the image path includes the `/preview/` repository segment.

---

## Artifactory private registry

The Arondor Artifactory registry at `artifactory.arondor.cloud:5001` hosts enterprise releases. Access requires credentials provided by Arondor.

### Log in

Run the following command and enter your credentials when prompted:

```bash
docker login artifactory.arondor.cloud:5001
```

Contact your Arondor representative if you do not have credentials.

After successful authentication, Docker stores your credentials locally. You will not need to log in again until the credentials expire or you log out.

### Using credentials in CI/CD

For automated environments, pass credentials via environment variables:

```bash
echo "$REGISTRY_PASSWORD" | docker login artifactory.arondor.cloud:5001 \
  --username "$REGISTRY_USERNAME" \
  --password-stdin
```

### Verify access

```bash
docker pull artifactory.arondor.cloud:5001/uxopian-gateway:2026.0.0-ft2
```

If the pull succeeds, your credentials are correct.

### Images

| Image | Full name |
|---|---|
| uxopian-ai | `artifactory.arondor.cloud:5001/uxopian-ai:VERSION` |
| uxopian-gateway | `artifactory.arondor.cloud:5001/uxopian-gateway:VERSION` |

The Docker Compose examples use `${REGISTRY:-artifactory.arondor.cloud:5001}` as the default registry. Set `REGISTRY=artifactory.arondor.cloud:5001` in your `.env` file to make this explicit.

---

## Current version

The current release version is `2026.0.0-ft2`. The Docker Compose examples use `${UXOPIAN_VERSION:-2026.0.0-ft2}` as the version variable.

## Related pages

- [Quickstart with Docker Compose](./quickstart.mdx)
- [Downloads](./downloads.mdx)
