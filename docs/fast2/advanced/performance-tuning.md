---
title: Performance tuning
last_update:
  date: '2026-09-02T10:23:28.238Z'
  author: CI/CD Bot
sidebar_position: 8
draft: false
tags:
    - performance
    - configuration
content_hash: b1bd1785be25bba66d0a3e7ba8d4383a271d879a4c3db132ac52f92889bd9d56
---

# Performance tuning

:::tip
Connector-specific tuning for the two cases that most often look like a Fast2 slowdown but are
actually a protocol or source-system setting: **IMAP fetch size** on the MailSource, and **content
transfer** on Documentum.
:::

## MailSource: slow IMAP extraction

**Symptom.** Extraction crawls — of the order of two hours for a few dozen messages — and a thread
dump taken during the campaign shows the worker parked in `IMAPInputStream.read`. The same mailbox
read through other tooling is fast.

**Cause.** The IMAP fetch size, not Fast2. Jakarta Mail reads message bodies in small blocks by
default (16 KB), so a large message becomes hundreds of round trips to the mail server. Latency
between the worker and the mail server multiplies that.

**Fix.** Raise the fetch size. The property name follows the protocol you configured on the
MailBoxProvider (see [Credentials](../catalog/credentials.md)) — `mail.imaps.fetchsize` for `imaps`,
`mail.imap.fetchsize` for `imap`:

```
mail.imaps.fetchsize = 1048576
```

There are two places to set it. **Prefer the first** — it travels with the map instead of with the
machine:

1. **The `Extended properties map` field on the MailBoxProvider.** Every entry in that map is applied
   as a Jakarta Mail session property, so this is where any mail-session tuning belongs.
2. **A JVM flag on the worker** — `-Dmail.imaps.fetchsize=1048576` in `startup-worker.bat` / `.sh`.
   Global to that worker, and lost when the worker is reinstalled.

Fast2 builds the mail session from the JVM system properties and then overlays the
`Extended properties map` on top, so both routes work and the map wins on conflict.

:::note
Fast2 2025 and later use **Jakarta Mail** (`jakarta.mail.*`) rather than the older JavaMail. The
package names changed; the `mail.*` session property names did not, so property values found in
older JavaMail documentation still apply.
:::

## Documentum: high CPU and IO wait on the Content Server

**Symptom.** During bulk extraction with several concurrent maps, the **Documentum Content Server**
sits at or near 100% CPU with a high IO wait, while the Fast2 workers themselves look idle. The
Content Server is otherwise at 5–10%.

Two levers matter here, and neither is a Fast2 defect.

### 1. Check whether `Extract renditions` is enabled

On the `DctmContentExtractor` (see [Content sources](../catalog/contentsource.md)),
`Extract renditions` does not simply _add_ renditions alongside the normal content — it **replaces
the content path**:

- With renditions off, content is **streamed**, at constant memory.
- With renditions on, each content is fetched with a call that returns the **whole content
  materialised in memory** before Fast2 sees it.

So enabling renditions asks the Content Server to produce every content synchronously and in full,
which amplifies IO on the source and raises worker heap pressure at the same time. Multiply that by
four concurrent maps and a healthy Content Server can saturate.

**If the migration does not actually need renditions, turn the option off** — that alone may be the
whole fix. If renditions are required, lower the concurrency (fewer simultaneous maps, or a smaller
`Batch size` on the `DctmSource`, see [Sources](../catalog/source.md)) rather than expecting the
Content Server to absorb it.

### 2. Configure distributed content transfer on the Documentum side

Fast2 reads the `dfc.properties` file you point it at, but only uses one entry of its own
(`dfc.date_format`). **Everything about how content bytes travel is yours to configure**, and by
default every byte is served by the Content Server process itself.

Documentum's own answer to this is distributed content transfer — serving content through
**ACS / BOCS (surrogate get)** instead of the Content Server. That is configured in `dfc.properties`
and on the Documentum server; consult the OpenText Documentum administration documentation for the
version in use, since the required entries differ between releases.

:::note
The Fast2-side Documentum recommendations (worker placement, JDK, session handling) are covered in
the Knowledge Base article on Documentum setup. It deliberately does not cover content-transfer
configuration, which is a Documentum-side concern.
:::

### Session handling, for context

Fast2 keeps one Documentum session manager **per worker thread** (DFC shares locks liberally between
threads, so a shared session manager serialises work). Connections are recycled within a thread and
never shared across threads. This means concurrency is bounded by your worker thread count, and every
additional thread is an additional set of DFC connections to the Content Server — worth remembering
when sizing a bulk migration against a Content Server you do not control.
