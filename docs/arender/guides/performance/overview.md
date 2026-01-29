---
title: "Overview"
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
sidebar_position: 1
content_hash: b024eaabf997eeff717afeeb937b798666f91229eb73dc1c7901b36699c07e96
---

## Performance planning - the Theory

ARender's architectural design is split into two distinct components

- Presentation Server (Web-UI)
- Rendition Server

### Presentation Server

The Presentation Server, deployed in a standard J2EE Application Server,
connects the user, the ECM repository and the Rendition Server. As such
it does not perform real work, and does not involve much CPU or RAM in
order to work. Standard recommendations for these servers involve at
least 128Mb of extra RAM of the JVM in the Application Server.

### Rendition Server

The Rendition Server performs three distinct, important tasks:

1. Identify document type, analyze its layout (number of pages, page size)
2. Extract text information for each page, for search/annotation/copy-paste features
3. Render pages into images in a streaming manner

Document identification and analysis involves mostly disk I/O and a bit
of RAM, but the real worker here is the page rendition part, which
requires a large part of RAM and CPU power. As a result, correctly
dimensioning a production-grade ARender platform only implies to have a
consistent estimation of the number of pages to be rendered per second.

#### Per-page performance

ARender has a very powerful page image renderer, written in native C for
performance. As a rule of thumb, modern hardware and virtual machines
are able to render pages with the following performances:

| Image size                  | Width (pixels) | Timing (ms) |
| --------------------------- | -------------- | ----------- |
| Thumbnails                  | 100px          | 23ms        |
| Mobile device screen        | 348px          | 38ms        |
| Desktop screen, 2/3 size    | 595px          | 68ms        |
| Desktop screen, full screen | 1280px         | 191ms       |

These figures are taken at server-side (not considering network time),
on a 8-CPU multi-document scenario. Collecting these figures allows to
compute how much CPUs are required to process the number of pages asked.

#### Estimated usage

On the other hand, we have to estimate the number of pages the rendition
server will ask. This is usually estimated by estimating the following:

- Total number of users (ECM users for example)
- Average percentage of users simultaneously active
- Average number of documents opened per hour, per user
- Average number of pages per document, per document format

Having this allows to give an accurate average for the number of
documents open per second, and then the number of pages open per second.
Final dimensioning should take care of the fact that:

- ARender does not necessarily render each page of the document: only
  the pages shown to the user (and the ones surrounding) are rendered.
  As a result, the larger the document, the smaller the ratio between
  pages rendered and total pages.
- Dimensioning must be done for the busy-hour (peak activity), so
  whole-day averages can be misleading. As a rule of thumb, a
  busy-hour can represent from 25% to 50% of the daily activity,
  depending on the business and organization.

## Clustering and Rendition farms

ARender natively supports horizontal scalability, both for the
Presentation server (using standard J2EE techniques), and for the
Rendition server (using ARender's rendition-client features).

Horizontal scaling increases both reliability (high-availability) and
performance (load balancing). Because load balancing is performed on a
per-document basis without the need of node synchronization, two
Rendition servers are considered to open twice as much documents as a
single Rendition Server, with no performance loss.

## Benchmarks - Performance in the field

| Company type - Usage                                                               | Total number of users | Average number of documents opened daily | Number & type of Rendition Servers |
| ---------------------------------------------------------------------------------- | --------------------- | ---------------------------------------- | ---------------------------------- |
| Insurance company - Agencies & Extranet                                            | 20,000+               | 350,000                                  | 2x 16 CPU, Physical machine        |
| Real Estate company - Internal/Extranet usage                                      | 1,500                 | 20,000                                   | 2x 4 CPU, Virtual machine          |
| Insurance company - Internal usage + Batch-based document conversion using ARender | 800                   | 60,000                                   | 6x 4 CPU, Virtual machine          |
