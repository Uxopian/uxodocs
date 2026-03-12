---
title: Signatures
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: 9121e6c983b0aa1a46cf9fbe38b75e9e1814619f34d4b495d98e8ef249988ffc
---

### Signatures tab

To enable the Signatures tab, the following property must be enabled :

Before 4.6.0, the configuration is done in the document-service-broker (RenditionEngine)

```yml
services-broker:
  signaturePDF: true
```

Since 4.6.0, the configuration is done in the document-text-handler service (PDFBoxEngine)

```properties
pdf.signatures.enable=true
```

After opening a document, a new tab dedicated to signature appears. At the header of the latter two icons may appear:

Valid signature :
![image](/img/arender/signatureExplorerOK.png)
Invalid signature :
![image](/img/arender/signatureExplorerNOK.png)

### Nominal case : a valid signature

The signature is designated as valid as long as the header of the tab in question contains the icon of the valid signature.

A click on it opens the tab like below :
![image](/img/arender/SignaturesOK2_en.PNG)

On this tab, we can see the following signature information :

- The signer,
- The PDF integrity, whether or not it's preserved,
- The validation of the certificate chain,
- The signature date,
- The signature reason
- The signature location.

### Error cases

It is possible that the PDF has been modified after affixing the signature, that the signature contained in the PDF or that its certificates are not valid.
Thus, the integrity is not preserved or the identity of the signatory cannot be verified.

At the interface level, the alert is given by the invalid signature icon.

![image](/img/arender/SignaturesNOK.PNG)

Different types of errors are reported to the signature panel :

- Wrong integrity : ![image](/img/arender/signature-nok.svg)
  Whether the document has been modified or damaged.

- Invalid signature : ![image](/img/arender/document-altered.svg)
  If the signature of the document is invalid.

- Unknown certificate: ![image](/img/arender/certificate-unknown.svg)
  It is possible to configure a list of valid certificates.
  To do this, place the desired certificates in a folder defined by the PUBLIC_CERT property for the document-text-handler service, whose default value is ../defaultPathPublicCert:

```properties
PUBLIC_CERT=../defaultPathPublicCert
```

If the signature does not use one of the certificates placed in this folder, then the unknown certificate error will be reported.
To not check the certificates, leave the folder empty.
