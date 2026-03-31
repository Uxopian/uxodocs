---
title: Document ID generators
sidebar_position: 3
last_update:
  date: '2026-03-31T15:03:09.690Z'
  author: CI/CD Bot
content_hash: 18da3db0d4fe916663f84fabe4580029c38004cecd046053c525c5eb4aff68ee
---


# Document ID generators

ARender uses an ID generator to produce `DocumentId` values from document parameters. Three generators are available, each with different trade-offs between readability, security, and portability.


## Available generators

| Generator | Prefix | Behavior |
|-----------|--------|----------|
| `Base64SelfContainedDocumentIdGenerator` | `b64_` | Encodes parameters as Base64. Default. |
| `EncryptedPerishableSelfContainedDocumentIdGenerator` | `bXX_` | Encrypts parameters with DES/CBC. Supports a configurable time-to-live. |
| `UUIDDocumentIdGenerator` | (none) | Generates a random UUID. Parameters are not recoverable from the ID. |

The **Base64** generator is the default. IDs are self-contained: the original parameters (e.g., `url=...`) can be decoded from the ID string. This is convenient for debugging but means document URLs are visible in the encoded ID.

The **encrypted** generator also produces self-contained IDs, but the parameters are encrypted. It additionally supports a time-to-live (TTL) mechanism that makes document links expire after a configurable duration.

The **UUID** generator produces opaque, random IDs. The original parameters cannot be recovered from the ID. This requires the document to be pre-registered in the broker cache before the viewer can access it.

## Configuration

The generator is configured as the Spring bean named `documentIdGenerator`. If no bean is defined, the system falls back to the Base64 generator.

```properties
# Bean names: documentIdGenerator (Base64) or encryptedDocumentIdGenerator (encrypted)
arender.documentid.generator.beanName=documentIdGenerator
```

### Encrypted generator TTL

The encrypted generator can embed an `eolTimestamp` parameter in the ID. When the ID is decoded after the TTL has elapsed, the system rejects it with an `IllegalArgumentException`, preventing replay of stale document links.

```properties
# Add a time-to-live token to encrypted document IDs
arender.documentid.encrypted.ttl.add=false

# Attempt to revert (validate) the time-to-live token from an existing encrypted ID
arender.documentid.encrypted.ttl.revert=false

# Time-to-live duration in milliseconds (default: one hour)
arender.documentid.encrypted.ttl.duration.ms=3600000

# attempt to revert the time to live token from an existing encrypted id
arender.documentid.encrypted.ttl.revert=false
```
