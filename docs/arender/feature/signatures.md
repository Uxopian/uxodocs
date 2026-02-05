---
title: Signatures
sidebar_position: 16
last_update:
  date: '2026-02-05T15:11:39.219Z'
  author: CI/CD Bot
content_hash: 585cf751d267e2a79cfd9eda96b828f7a7c1a7fbed465a0d45cf3d7e31683040
---
### Signatures tab


To enable the Signatures tab, the following property must be enabled :

Before 4.6.0, the configuration is done in the document-service-broker (RenditionEngine)

```cfg title="application-security.yaml"
services-broker:
  signaturePDF: true
```

Since 4.6.0, the configuration is done in the document-text-handler service (PDFBoxEngine)

```cfg title="application.properties"
pdf.signatures.enable=true
```


After opening a document, a new tab dedicated to signature appears. At the header of the latter two icons may appear:

Valid signature :
![image](pathname:///img/arender/signatureExplorerOK.png)
Invalid signature :
![image](pathname:///img/arender/signatureExplorerNOK.png)

### Nominal case : a valid signature

The signature is designated as valid as long as the header of the tab in question contains the icon of the valid signature.

A click on it opens the tab like below :
![image](pathname:///img/arender/SignaturesOK2_en.PNG)

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

![image](pathname:///img/arender/SignaturesNOK.PNG)

Different types of errors are reported to the signature panel :

- Wrong integrity : ![image](pathname:///img/arender/signature-nok.svg)
  Whether the document has been modified or damaged.

- Invalid signature : ![image](pathname:///img/arender/document-altered.svg)
  If the signature of the document is invalid.

- Unknown certificate: ![image](pathname:///img/arender/certificate-unknown.svg)
  It is possible to configure a list of valid certificates.
  To do this, place the desired certificates in a folder defined by the PUBLIC_CERT property for the document-text-handler service, whose default value is ../defaultPathPublicCert:

```cfg title="application.properties"
PUBLIC_CERT=../defaultPathPublicCert
```

If the signature does not use one of the certificates placed in this folder, then the unknown certificate error will be reported.
To not check the certificates, leave the folder empty.