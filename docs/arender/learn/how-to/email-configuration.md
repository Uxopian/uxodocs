---
title: Configure emails
sidebar_position: 6
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: e0241f65679969b6b6cf199144d4f3a2f0ed3c243852ff8cb9e1f8634712a046
---

## Date formatting

It is possible to configure a date format for emails. The following configuration will format the date
_2022-01-24T04:54:42-05_ which will give the result _Mon 24 Jan 2022 04:54:42 -0500_

```cfg
emltopdf.config.format.date=EEE d MMM yyyy HH:mm:ss ZZ
```

### Date dependent on time zone

The date is configurable according to the user's time zone. By default, the date is formatted according to the UTC time zone.

```cfg
default.url.parser.use.timeZone.for.ids=true
```

## Subject and attachments with non-Latin characters

Non-Latin characters in subject and attachment names may not be displayed correctly.
To enable proper rendering, you must configure the _document-converter_ rendering module as follows :

````cfg
```properties
emltopdf.encode.header.with.body.encoding=true
emltopdf.config.filter.special.characters.regex=
emltopdf.config.filter.replacement.character=
````

````



In some cases, the subject and attachments may still have display issues. It will therefore be necessary
to apply the following configuration on the *Web-UI-server* side. This makes it possible to provide the locale of
the user which will be used to determine the correct encoding to apply.



``` cfg
default.url.parser.use.locale.for.ids=true
````

## Header rendering language

It is possible configure the header rendering language for emails.
By default, the header is rendered in French. The possible values are : "FR", "EN".

```cfg
# Configure the header rendering language. Possible values are : "FR", "EN".
emltopdf.config.header.language=FR
```
