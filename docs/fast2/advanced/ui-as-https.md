---
last_update:
  date: '2026-01-23T15:35:56.881Z'
  author: CI/CD Bot
content_hash: c7d143cbde2a142e03ea73e10282870134c8871a395bff96c047313cefc1184b
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# HTTPS Configuration Guide

This guide enables HTTPS on the Fast2 broker (which serves the UI and the REST API on port `1789`) and makes the workers trust it.

Two sides must be configured:

- **The broker** presents a certificate, configured in `config/application.properties`.
- **Every worker** connects to the broker over HTTPS and must trust that certificate. A worker is a separate JVM, including the embedded worker, which the broker launches through `startup-worker.sh` (`startup-worker.bat` on Windows). Its broker client does not use the broker's SSL settings: it relies on the **default truststore of its own JVM**.

Configuring only the broker side leaves the workers unable to connect.

## TL;DR

**1. Create one keystore holding the key pair.** The SAN must cover every host name used to reach the broker, including the one in `broker.url` (`localhost` for the embedded worker).

```bash
keytool -genkeypair -v -alias fast2_ui -keyalg RSA -keysize 2048 -validity 365 \
  -storetype PKCS12 -keystore config/fast2_ui.p12 -storepass changeit \
  -dname "CN=<fqdn>" -ext SAN=dns:localhost,dns:<fqdn>
```

**2. Configure the broker in `config/application.properties`.**

<Tabs groupId="fast2-version">
<TabItem value="v2.10-2.12" label="v2.10 to v2.12">

```properties
broker.url=https://localhost:1789/broker

server.ssl.key-store=config/fast2_ui.p12
server.ssl.key-store-password=changeit
server.ssl.key-store-type=PKCS12
server.ssl.key-alias=fast2_ui
```

</TabItem>
<TabItem value="v2025" label="v2025">

```properties
server.protocol=https
server.host=localhost

server.ssl.key-store=config/fast2_ui.p12
server.ssl.key-store-password=changeit
server.ssl.key-store-type=PKCS12
server.ssl.key-alias=fast2_ui
```

</TabItem>
</Tabs>

**3. Export the certificate and make the worker JVM trust it.**

```bash
keytool -exportcert -rfc -alias fast2_ui -keystore config/fast2_ui.p12 -storepass changeit -file fast2_ui.crt
keytool -delete -alias fast2_ui -keystore <JAVA_HOME>/lib/security/cacerts -storepass changeit   # only if the alias already exists
keytool -importcert -noprompt -alias fast2_ui -file fast2_ui.crt -keystore <JAVA_HOME>/lib/security/cacerts -storepass changeit
```

**4. Restart the broker and the workers**, then check the logs (see [Verify the setup](#6-verify-the-setup)).

---

#### 1. **Create the keystore**

The broker needs a keystore containing a private key and its certificate. For testing, a self-signed certificate is enough:

```bash
keytool -genkeypair -v -alias fast2_ui -keyalg RSA -keysize 2048 -validity 365 \
  -storetype PKCS12 -keystore config/fast2_ui.p12 -storepass changeit \
  -dname "CN=<fqdn>" -ext SAN=dns:localhost,dns:<fqdn>
```

**Explanation of the command:**

- `-genkeypair`: generates a key pair (private key and public key) wrapped in a self-signed certificate.
- `-alias fast2_ui`: the name of the entry in the keystore. It is referenced by `server.ssl.key-alias`.
- `-keyalg RSA -keysize 2048`: an RSA key of 2048 bits.
- `-validity 365`: the certificate is valid for 365 days.
- `-storetype PKCS12 -keystore config/fast2_ui.p12`: the keystore file and its format. This is the file referenced by `server.ssl.key-store`.
- `-storepass changeit`: the keystore password. With PKCS12, the key password is the same as the store password.
- `-dname "CN=<fqdn>"`: the subject of the certificate. Replace `<fqdn>` with the fully qualified name of the broker host.
- `-ext SAN=dns:localhost,dns:<fqdn>`: the Subject Alternative Names. Clients check the host name they connect to against this list, not against the CN. List **every** name used to reach the broker: the host in `broker.url` (by default `localhost`, used by the embedded worker), the name remote workers use, and the name users type in their browser.

:::warning[Generate the key pair only once]
Every `-genkeypair` creates a **new** key, even with the same alias and the same subject. If you run it again after the certificate has been imported on the worker side, the broker serves a new certificate while the worker still trusts the old one, which has the same name. The connection then fails with `Path does not chain with any of the trust anchors`.

Create one keystore, reference that same file from `application.properties`, and export the certificate from it. If you regenerate it, import the new certificate again on every worker.
:::

For production, use a certificate signed by a certificate authority (CA). Import it with its private key into the PKCS12 keystore, and make sure its SAN covers the names above. If the CA is already trusted by the worker JDK, step 4 is not needed.

---

#### 2. **Export the public certificate**

Extract the certificate from the keystore created in step 1:

```bash
keytool -exportcert -rfc -alias fast2_ui -keystore config/fast2_ui.p12 -storepass changeit -file fast2_ui.crt
```

To be sure you trust exactly what the broker serves, you can instead fetch the certificate from the running broker, once step 3 is done:

```bash
openssl s_client -connect localhost:1789 -servername localhost -showcerts </dev/null 2>/dev/null \
  | openssl x509 -outform PEM > fast2_ui.crt
```

`openssl x509` keeps the first certificate of the chain, which is the broker's own certificate. Check its subject, SAN and fingerprint with:

```bash
openssl x509 -in fast2_ui.crt -noout -subject -ext subjectAltName -fingerprint -sha256
```

---

#### 3. **Configure the broker for HTTPS**

Edit `config/application.properties`. The way to switch the worker URL to HTTPS depends on the Fast2 version.

<Tabs groupId="fast2-version">
<TabItem value="v2.10-2.12" label="v2.10 to v2.12">

There is no `server.protocol` property in these versions. Set the URL used by the worker directly:

```properties
# Remote broker url to use by the worker
broker.url=https://localhost:1789/broker

server.ssl.key-store=config/fast2_ui.p12
server.ssl.key-store-password=changeit
server.ssl.key-store-type=PKCS12
server.ssl.key-alias=fast2_ui
```

</TabItem>
<TabItem value="v2025" label="v2025">

`broker.url` is built from the server properties (`broker.url=${server.protocol}://${server.host}:${server.port}/broker`). Switch the protocol and keep a host covered by the certificate SAN:

```properties
# Fast2 server URI
server.protocol=https
server.host=localhost
server.port=1789

server.ssl.key-store=config/fast2_ui.p12
server.ssl.key-store-password=changeit
server.ssl.key-store-type=PKCS12
server.ssl.key-alias=fast2_ui
```

The broker also calls its own endpoints through `server.protocol`, `server.host` and `server.port` (disk-space monitoring, broker log download). The broker JVM must therefore trust the certificate too. With option A of step 4, this is automatic when the broker and the worker use the same JDK. With option B, add the same two `-D` options to the `java` line of `startup-broker.sh` (or `startup-broker.bat`).

</TabItem>
</Tabs>

**Explanation of the properties:**

- `server.ssl.key-store`: path to the keystore created in step 1, relative to the Fast2 root folder.
- `server.ssl.key-store-password`: the keystore password.
- `server.ssl.key-store-type`: the keystore format, `PKCS12` here (or `JKS`).
- `server.ssl.key-alias`: the alias of the key entry.

:::note[`server.ssl.trust-store` does not configure the workers]
`server.ssl.trust-store` is a broker-side setting: it is the store the broker uses to check **client** certificates in mutual TLS. It has no effect on the workers, which never read it. Leave it out unless you set up mutual TLS.
:::

---

#### 4. **Make every worker trust the certificate**

The broker client of the worker does not configure any SSL context of its own. It trusts only the default truststore of the worker JVM, which is:

- the file given by `-Djavax.net.ssl.trustStore`, if this option is set on the `java` command line;
- otherwise `<JAVA_HOME>/lib/security/cacerts` of the JDK that runs the worker. `startup-worker.sh` takes `JAVA_HOME` from `config/env.properties`, or else from the `java` found on the `PATH`. The script prints `Using JAVA_HOME=...` at startup.

Use one of the two options below. The embedded worker is started through the same script, so both options cover it.

##### Option A. Import the certificate into the JDK `cacerts`

```bash
# Look for an existing entry with the same alias
keytool -list -v -keystore <JAVA_HOME>/lib/security/cacerts -storepass changeit | grep -i fast2_ui

# Remove a stale entry first, if there is one
keytool -delete -alias fast2_ui -keystore <JAVA_HOME>/lib/security/cacerts -storepass changeit

# Import the current certificate
keytool -importcert -noprompt -alias fast2_ui -file fast2_ui.crt \
  -keystore <JAVA_HOME>/lib/security/cacerts -storepass changeit
```

- `changeit` is the default password of `cacerts`.
- On JDK 8, the file is `<JAVA_HOME>/jre/lib/security/cacerts`.
- The change applies to every Java application using this JDK, and is lost when the JDK is upgraded or replaced.

##### Option B. Use a dedicated truststore

Create a truststore holding only the broker certificate:

```bash
keytool -importcert -noprompt -alias fast2_ui -file fast2_ui.crt \
  -storetype PKCS12 -keystore config/truststore.p12 -storepass changeit
```

Then declare it on the `java` line of `startup-worker.sh`, before `-jar`:

```bash
"$JAVA" -Xmx$WORKER_MAX_MEMORY \
		-Djavax.net.ssl.trustStore=config/truststore.p12 \
		-Djavax.net.ssl.trustStorePassword=changeit \
		... \
		-jar fast2-worker-package-<version>.jar
```

On Windows, add the same two options to the `java` line of `startup-worker.bat`. This truststore replaces `cacerts` for the worker JVM: if the worker also connects to servers signed by public CAs over HTTPS, import those CAs into it as well, or use option A.

##### Remote workers

A remote worker runs on its own machine, with its own JDK. On each machine:

- set `broker.url=https://<fqdn>:1789/broker` in its `config/application.properties`, with a `<fqdn>` listed in the certificate SAN;
- apply option A or option B with the broker certificate.

---

#### 5. **Restart**

Restart the broker and every worker, including the embedded one.

Open `https://<fqdn>:1789` in a browser to check the UI. With a self-signed certificate, the browser shows a warning until the certificate is trusted on the client machine.

---

#### 6. **Verify the setup**

The worker is connected when:

- `logs/worker.log` shows `Successful ping ESbroker !` (`Successful ping ESBroker !` from v2025.7);
- `logs/broker.log` shows `Worker <id> provided N accessible classes !`.

---

#### 7. **Troubleshooting SSL errors**

The worker logs the cause of a failed connection in `logs/worker.log`. Map the message to its cause:

| Message | Cause | Fix |
|---|---|---|
| `PKIX path validation failed: ... Path does not chain with any of the trust anchors` | The worker truststore holds a certificate with the same name as the one served by the broker, but it is an older one (the key pair was generated again). | Fetch the served certificate with `openssl s_client` (step 2), `-delete` the stale alias, import the new certificate (step 4). |
| `PKIX path building failed: ... unable to find valid certification path to requested target` | The certificate is not in the truststore of the worker JVM at all, or the worker runs on another JDK than the one you updated. | Import the certificate (step 4) into the truststore of the JDK shown by `Using JAVA_HOME=...`, or declare a dedicated truststore. |
| `Certificate for <localhost> doesn't match any of the subject alternative names` | The host in `broker.url` is not listed in the certificate SAN. | Generate the certificate with `-ext SAN=dns:localhost,dns:<fqdn>` (step 1), or point `broker.url` to a name that is in the SAN. Then import the new certificate on every worker. |

To compare what the broker serves with what the worker trusts, compare the SHA-256 fingerprints:

```bash
openssl s_client -connect localhost:1789 -servername localhost </dev/null 2>/dev/null \
  | openssl x509 -noout -fingerprint -sha256
keytool -list -v -alias fast2_ui -keystore <JAVA_HOME>/lib/security/cacerts -storepass changeit | grep "SHA256:"
```
