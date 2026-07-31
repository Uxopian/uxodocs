---
viewer: horizon
title: Opening documents
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
slug: /guides/features/opening-documents
sidebar_position: 1
content_hash: 0756282479e4788cf77adb689d81ba772ec51b9b7b40f44b4538d264acb10b32
---

# Opening documents

A document is requested by passing a **query string of the parameters that identify it**. There is one contract, with two entry points:

| Entry point | When to use it |
|-------------|----------------|
| `document` attribute on `<arender-element>` | The document displayed when the viewer mounts |
| `window.ARender.openDocument(params)` | Any time afterwards |

Both take the same string, and the viewer forwards it verbatim to the backend, which resolves it into an ARender document ID.

For the full rules — encoding, repeated parameters, the reserved `uuid` name — see [Web Component → Parameter contract](../../reference/web-component.md#parameter-contract).

## Opening a document by URL

Pass a `url` parameter pointing to an HTTP-accessible document, with the URL itself encoded:

```javascript
window.ARender.openDocument(`url=${encodeURIComponent(docUrl)}`);
```

```jsx
<arender-element rendition="/" document={`url=${encodeURIComponent(docUrl)}`} />
```

:::info
The rendition service has a safeguard that only authorizes whitelisted domain/host URLs. By default, no domain is authorized. See the broker environment variable `DSB_AUTHORIZED_URLS`.
:::

Skipping `encodeURIComponent` happens to work as long as the URL has no query string of its own. As soon as it has one — a pre-signed URL, for instance — its `&` and `=` are read as parameter separators and the request is silently corrupted. Encode every value: see [Web Component → Encoding is the caller's responsibility](../../reference/web-component.md#encoding-is-the-callers-responsibility).

## Opening a document from a repository

Pass the parameters your provider expects. The viewer forwards them untouched, so no viewer-side configuration is needed:

```javascript
// Alfresco
window.ARender.openDocument('nodeRef=4aa144a5-a0b1-4c2d-8e3f-1234567890ab&user=admin&alf_ticket=TICKET_xxx&versionLabel=1.0');

// FileNet
window.ARender.openDocument('objectStoreName=OS1&id=93DFA526-1B2C-4D3E-8F90-ABCDEF123456');

// M-Files
window.ARender.openDocument('objectType=0&docId=521&versionId=latest');
```

See [Providers](../integration/providers.md) for the parameters each repository expects and for the `X-Provider-ID` routing performed by the gateway.

## Opening a document by pre-generated ID

Pass a `uuid` parameter containing a previously generated `DocumentId`:

```javascript
window.ARender.openDocument('uuid=b64_dXJsPWh0dHA6Ly9leGFtcGxlLmNvbS9zYW1wbGUucGRm');
```

This is the typical pattern when an external system (a provider, an ECM plugin, or a backend call) has already loaded the document and registered it with the Document Service Broker. The viewer looks up the existing `DocumentAccessor` from the cache rather than fetching the document again — **no repository call is made**.

`uuid` is a reserved parameter name for this reason: a repository must never use it for its own purposes.

## Multi-document opening

There are three ways to display several documents simultaneously.

### Several URLs

Repeat the `url` parameter. The documents are displayed in the given order, as a single container:

```javascript
window.ARender.openDocument(`url=${encodeURIComponent(urlA)}&url=${encodeURIComponent(urlB)}`);
```

### Several files of the same repository object

Repositories that identify files with parallel lists pass them as repeated parameters. Per-key order is preserved end to end, so the lists stay paired by index:

```javascript
window.ARender.openDocument('objectType=0&docId=534&fileId=576&fileId=977&title=a.pdf&title=b.pdf');
```

See [M-Files → Opening a document](../integration/m-files.md#opening-a-document) for a worked example.

### Pre-built DocumentContainer

A provider or backend code can programmatically create a `DocumentContainer`, populate its children with `DocumentReference` objects, and register it with the document service. The viewer then receives a single `uuid` pointing to the container.

In every case, child documents have [hierarchical DocumentId values](../../concepts/documents-and-ids.md#hierarchical-ids) derived from the container's root ID.

## Changing the document at runtime

Call `openDocument()` again — the most recent request wins:

```javascript
window.ARender.openDocument(`url=${encodeURIComponent(otherContractUrl)}`);
```

This is the typical pattern when the document to display depends on a user action (clicking a row in a table, selecting a file, etc.). Calls made before the viewer finishes mounting are queued automatically — no need to wait for any event.

The `document` attribute, by contrast, is read only when the component mounts: changing it afterwards has no effect.


## Related pages

- [Web Component](../../reference/web-component.md): attributes, JavaScript API, and the full parameter contract
- [Documents and document IDs](../../concepts/documents-and-ids.md): the DocumentId / DocumentAccessor mental model
- [Document ID generators](./document-id-generators.md): how IDs are generated and configured
