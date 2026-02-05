---
title: "Configure emails"
sidebar_position: 5
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: bd3054a52e8ce574e870ca0e6b82d5088f40c8124a507d519cca61eea7a6c7ef
---

## Date formatting

Since version 4.8.0, it is possible to configure a date format for emails. The following configuration will format the date 
*2022-01-24T04:54:42-05* which will give the result *Mon 24 Jan 2022 04:54:42 -0500*


``` cfg
    emltopdf.config.format.date=EEE d MMM yyyy HH:mm:ss ZZ
```

### Date dependent on time zone

Since version 4.8.0, the date is configurable according to the user's time zone. By default, the date is formatted according to the UTC time zone.


``` cfg
    default.url.parser.use.timeZone.for.ids=true
```


## Subject and attachments with non-Latin characters

Since version 4.8.0, non-Latin characters in subject and attachment names may not be displayed correctly. 
To enable proper rendering, you must configure the *document-converter* rendering module as follows :


``` cfg
    emltopdf.encode.header.with.body.encoding=true
    emltopdf.config.filter.special.characters.regex=
    emltopdf.config.filter.replacement.character=
```

In some cases, the subject and attachments may still have display issues. It will therefore be necessary 
to apply the following configuration on the *Web-UI-server* side. This makes it possible to provide the locale of 
the user which will be used to determine the correct encoding to apply.


``` cfg
    default.url.parser.use.locale.for.ids=true
```