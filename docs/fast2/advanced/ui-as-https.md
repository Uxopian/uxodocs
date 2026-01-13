---
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: a2dc19d77df2c05d831764deb365693bd1a2c2ae8ad4eff9b92fd5c6fb5a4c35
---

# HTTPS Configuration Guide

This guide outlines the steps to enable HTTPS for your application, including generating a self-signed SSL certificate, importing it into the Java keystore, and configuring your server to use HTTPS.

## TL;DR

**Generate a self-signed certificate**

```bash
`keytool -genkeypair -v -keystore fast2_ui.jks -keyalg RSA -keysize 2048 -storepass changeit -validity 365 -alias fast2_ui`
```

**Export the public certificate**

```bash
`keytool -export -keystore fast2_ui.jks -alias fast2_ui -file fast2_ui.crt -storepass changeit`
```

**Import the certificate into the Java keystore**

```bash
`keytool -importcert -file /path/to/fast2_ui.crt -keystore /path/to/your/jdk/lib/security/cacerts -alias fast2_ui`
```

**Configure the server in `application.properties`**

```properties
server.protocol=https
server.ssl.key-store: config/fast2_ui.p12
server.ssl.key-store-password: password
server.ssl.key-store-type: pkcs12
server.ssl.key-alias: fast2_ui
server.ssl.key-password: password
server.ssl.trust-store=config/truststore.jks
```

---

#### 1. **Generate a Self-Signed SSL Certificate**

To configure HTTPS, the first step is to generate an SSL certificate. For testing purposes, we will use a self-signed certificate. Run the following command to create a new keystore and generate the certificate:

```bash
`keytool -genkeypair -v -keystore fast2_ui.jks -keyalg RSA -keysize 2048 -storepass changeit -validity 365 -alias fast2_ui`
```

**Explanation of the command:**

- `-genkeypair`: This generates a key pair (private key and public key).
- `-v`: This option enables verbose output, so you can see detailed information during the key generation process.
- `-keystore fast2_ui.jks`: The name of the keystore file that will store the private key and certificate.
- `-keyalg RSA`: The algorithm used to generate the key (RSA).
- `-keysize 2048`: The size of the key in bits (2048 bits is a good size for security).
- `-storepass changeit`: The password for the keystore (you can choose any password you like).
- `-validity 365`: The validity of the certificate, which in this case is set to 365 days.
- `-alias fast2_ui`: The alias used to identify the key in the keystore.

This command will generate a keystore file (`fast2_ui.jks`) containing a private key and a self-signed certificate.

---

#### 2. **Export the Public Certificate**

Next, you need to extract the public certificate from the keystore to import it into the Java system keystore. Use the following command to export the certificate:

```bash
`keytool -export -keystore fast2_ui.jks -alias fast2_ui -file fast2_ui.crt -storepass changeit`
```

This command extracts the public certificate (`fast2_ui.crt`) from the keystore. This certificate will later be imported into the Java system keystore to be trusted by Java applications.

---

#### 3. **Import the Certificate into the Java Keystore**

Now that you have the public certificate, you need to import it into the Java system keystore (`cacerts`) so that the Java environment can trust it. Use the following command to import the certificate:

```bash
`keytool -importcert -file /path/to/fast2_ui.crt -keystore /usr/lib/jvm/java-11-openjdk-amd64/lib/security/cacerts -alias fast2_ui`
```

- Replace `/path/to/fast2_ui.crt` with the actual path to the `fast2_ui.crt` file you exported earlier.
- The `-keystore` option points to the Java system keystore (`cacerts`), which stores trusted certificates.
- The `-alias` is used to identify the certificate in the keystore.

When prompted, enter the password for the Java keystore (the default is `changeit`).

If the alias already exists in the keystore, you will see a warning. You can confirm that the certificate should be imported anyway.

---

#### 4. **Configure the Server for HTTPS**

With the certificate installed, the next step is to configure your server to use HTTPS. Below are the typical configuration steps for a Spring Boot application:

##### a. **Update `application.properties`**

For Spring Boot, you need to configure the application to use HTTPS. In the `application.properties` file, add the following settings:

```properties
server.protocol=https
server.ssl.key-store: config/fast2_ui.p12
server.ssl.key-store-password: password
server.ssl.key-store-type: pkcs12
server.ssl.key-alias: fast2_ui
server.ssl.key-password: password
server.ssl.trust-store=config/truststore.jks
```

**Explanation of the properties:**

- `server.protocol=https`: The new secured protocol
- `server.ssl.key-store=<path_to_fast2_ui.jks>`: Specifies the location of the keystore containing the certificate and private key. You can place this file in your classpath.
- `server.ssl.key-store-password=changeit`: The password for the keystore.
- `server.ssl.key-store-type:pkcs12`: The type of the key store (JKS or PKCS12).
- `server.ssl.key-alias: fast2_ui`: The alias that identifies the key in the key store.
- `server.ssl.key-password: password`: The password used to access the key in the key store.
- `server.ssl.trust-store=config/truststore.jks`: The trust store path in case of self signed certificate

##### b. Use a Valid SSL Certificate

For production, it's recommended to use an SSL certificate signed by a trusted certificate authority (CA) rather than a self-signed certificate. However, if you're using a self-signed certificate for testing, you need to ensure that clients trust this certificate.

---

#### 5. **Verify and Test the HTTPS Setup**

Once the keystore is set up and the server configuration is updated, restart your application and verify that it is correctly serving traffic over HTTPS.

To test, open your browser and visit `https://localhost:1789` (or the appropriate URL/port for your application). You should see that the connection is secured, and the SSL certificate is correctly applied.

If everything is configured correctly, you will no longer see SSL errors, and the connection should be encrypted using HTTPS.

---

#### 6. **Troubleshooting SSL Errors**

If you encounter SSL errors such as "PKIX path building failed" or "SSLHandshakeException", it is usually because the Java environment does not trust the certificate. You can resolve this by ensuring that the certificate is correctly imported into the Java keystore (`cacerts`), as described in step 3.

If using a self-signed certificate, you may need to manually add it to the list of trusted certificates in all client environments.
