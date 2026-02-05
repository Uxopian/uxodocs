---
title: Files
sidebar_position: 8
description: >-
    This section applies to the OpenSearch connector coupled with file system
    storage.
date: "2023-06-01"
last_update:
  date: '2026-02-05T13:50:19.106Z'
  author: CI/CD Bot
content_hash: 342022410252766ca04eaaa2ac703c9840039e8d5a3d80d7bd05ea420a8fd8ef
---

# Encryption

## Concept

When encryption is enabled, the files handled by FlowerDocs are protected in the event of an attacker accessing the file system.
Files are thus rendered unreadable, and you need the secret key to decrypt them.

FlowerDocs uses symmetrical encryption (default `AES 256` per block) to encrypt both document content and temporary files.

To enable content protection by encryption, you need to add the `file.encrypt.enabled=true` property to the `core.properties` configuration file.

When Amazon S3 is used for file storage, FlowerDocs encryption cannot be activated.

S3 natively supports encryption of stored files.

The encryption/decryption performed by S3 is transparent to FlowerDocs.

With S3, the `file.encrypt.enabled=true` property must not be present in the `core.properties` configuration file.

## Key management

Key security is one of the main issues when using encryption.
The same secret key is used for each FlowerDocs platform. This key must therefore be configured for each instance of **FlowerDocs Core**. Different management strategies are possible:

### Derived key

The secret key used for encryption can be derived from a character string (`file.encrypt.passphrase`).
Key derivation is performed using the `PBKDF2` algorithm, the `HMAC` function using the `SHA-256` hash function and 65536 iterations.
The default key size is 256bits. Its size can be increased or reduced using the `file.encrypt.key-length` property (size in bits).

### Keystore

The secret key used for encryption can be stored in a keystore (or _keystore_) in [PKCS12] format (https://tools.ietf.org/html/rfc7292).
To use a keystore, you need to configure it using the following properties:

- `key-store.path`: keystore path (example: `file:/data/flowerdocs.pfx`)
- `key-store.password`: keystore password

The keystore can hold several keys. To identify the one to be used, you need to enter the `file.encrypt.key.alias` and
`file.encrypt.key.password` properties. These properties respectively define the alias and password of the key entered when registering in the keystore.

## Algorithm

The default algorithm is `AES/CBC/PKCS5Padding`. Another algorithm can be used using the `file.encrypt.algorithm` property.

The algorithm used should only be changed after careful analysis, to maintain and guarantee the level of security provided by the type of encryption chosen.

For example, the _DES_ algorithm is not recommended.

## File system encryption

The CLM command-line utility encrypts unencrypted files stored on file systems using the same information as for the **FlowerDocs Core** instances used:

- the secret key
- the key size
- the encryption algorithm

For more details, see the section below dedicated to its use.

# Integrity

To ensure the integrity of files stored through web services exposed by **FlowerDocs Core**, a fingerprinting mechanism is activated by default.

When copying to the file system, the _hash_ of each file is calculated using the configured algorithm. The result and the algorithm used are stored with the file information in OpenSearch.

The default algorithm is `SHA-256`. Another algorithm can be used using the `file.hash.algorithm` property and one of the values supported by the JVM (see MessageDigest).

# Utility

## Directory analysis

By analyzing a directory before encrypting its contents, you can determine the size of the directory to be encrypted and the number of files it contains. The calculation is performed recursively.

The directory is analyzed using the CLM `dir analyze` job, which takes the directory to be analyzed as the `input` parameter.

```properties
java -jar flower-docs-clm-2025.3.0-bundle.jar dir analyze --input=<directory to analyze>
```

:::info
The optional parameter `--output=<path to report>` is used to create a report at the end of the analysis.
:::

## Directory encryption

As the aim is to encrypt the directory so that it can be read by the various instances of **FlowerDocs Core**, a configuration identical to these must be used.

The directory is analyzed using the CLM `dir analyze` job. It requires the following parameters, regardless of the type of encryption used:

- `input`: the directory to be encrypted
- `output`: the target directory in which the encrypted copy of the directory provided in `input` parameter will be created
- `conf` : patch of the configuration file containing information about the key store or passphrase

The command to be executed is as follows:

```properties
java -jar flower-docs-clm-2025.3.0-bundle.jar dir encrypt --input=<directory to encrypt> --output=<target directory with encrypted data> --conf=<config file path>
```

### Derived key

In order to encrypt a directory using a derived key, the parameter to be supplied is `conf` with the value of the path to a configuration file containing the information mentioned in the [Derived key](/docs/flowerdocs/config/core/securite/files#derived-key) section and enable encryption:

```properties
#Enable encryption
file.encrypt.enabled=true

#Derived key
file.encrypt.passphrase=MyDerivedKey
```

### Keystore

In order to encrypt a directory using a keystore strategy, the parameter to be supplied is `conf` with the value of the path to a configuration file containing the information mentioned in the [Keystore](/docs/flowerdocs/config/core/securite/files#keystore) section and enable encryption:

```properties
#Enable encryption
file.encrypt.enabled=true

#Keystore management

```properties
key-store.path=file:PATH
key-store.password=****
file.encrypt.key.alias=my-file-encryption-key-alias
file.encrypt.key.password=****
```

```
<br/>
```
