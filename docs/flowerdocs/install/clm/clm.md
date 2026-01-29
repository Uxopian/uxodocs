---
title: Command Line Manager (CLM)
sidebar_position: 2
date: "2004-03-21T13:20:01+02:00"
last_update:
  date: '2026-01-29T08:51:52.623Z'
  author: CI/CD Bot
content_hash: 56dd232944a1c22c661b75c959bf6f7e539f4188e34f111031a1474b6697f909
---

This tool lets you interact with FlowerDocs from the command line. It offers a range of features:

- import
- export
- merge several modules
- administration

<br/>
__Download:__

**Note:** In this section, the extraction file is referred to as `${CLM_HOME}`

# Execution

The CLM is an executable JAR and can be run with a command like:

```properties
java -jar flower-docs-clm-2.8.3-bundle.jar
```

To interact with FlowerDocs, you need to define the URL for accessing web services, as well as login details:

```properties
java -jar flower-docs-clm-2.8.3-bundle.jar --ws.url=http://<server>:<port>/<context>/services	--password=<password>
```

_The default user name is `system`, which can be changed by adding the `--USER=&lt;user&gt;` parameter._

 <br/>

The `clm.batch.size=1` parameter sets the batch size for processing jobs in CLM. It can prove useful for resolving conflict issues during updates, as it ensures that each operation is processed individually, thus preventing concurrency errors.

<br/>

**Usage example :**

```properties
java -jar flower-docs-clm-2.8.3-bundle.jar update --ws.url=http://<server>:<port>/<context>/services --clm.batch.size=1 […]
```

:::info
**Note:** In the following sections `&lt;clm&gt;` is the command to run CLM from the command line.
:::

# Jobs

A list of jobs is supplied to the CLM to indicate the instructions to be executed. These jobs are supplied after the CLM execution command:

```properties
<clm> job1 job2
```

The various possible jobs are listed in the following sections.
