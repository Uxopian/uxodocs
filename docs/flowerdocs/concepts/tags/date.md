---
title: Date
sidebar_position: 6
description: Use date tags.
date: "2018-03-07T13:24:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 3c6d9826daf3cc3e08972f134089252f35b7d4ffa3dcfae19d7b43401dce8f87
---

The FlowerDocs data model allows you to define tags of type `DATE`.

## Stored value

The stored value of a `DATE` tag is the timestamp associated with the date.
This timestamp corresponds to the number of milliseconds elapsed since 1st January 1970 UTC. In the case of a date prior to this reference date, the number of milliseconds is negative.

## Display format

Although the value of a `DATE` tag is stored as a timestamp, it can be displayed in different ways.

<br/>
Configuring the format in which a date is displayed allows you to define how it will be presented to users.

This configuration can be carried out using the `pattern` field at the level of a tag class or tag reference, and accepts the following formats:

| Name             | Description        | Example                                 |
| ---------------- | ------------------ | --------------------------------------- |
| DATE_FULL        | Full date          | Friday 23rd October 2020                |
| DATE_LONG        | Long date          | 23rd October 2020                       |
| DATE_MEDIUM      | Medium date        | 23rd Oct. 2020                          |
| DATE_SHORT       | Short date         | 23/10/2020                              |
| DATE_TIME_FULL   | Full date + time   | Friday 23rd October 2020 00:00:00 UTC+2 |
| DATE_TIME_LONG   | Long date + time   | 23rd October 2020 00:00:00 UTC+2        |
| DATE_TIME_MEDIUM | Medium date + time | 23 Oct. 2020 00:00:00                   |
| DATE_TIME_SHORT  | Short date + time  | 23/10/2020 00:00                        |
| ISO_8601         | ISO 8601           | 2020-10-23T00:00:00.000+02:00           |
| RFC_2822         | RFC 2822           | Fri, 23 Oct 2020 00:00:00 +0200         |
