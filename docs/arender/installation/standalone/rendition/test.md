---
title: Testing
sidebar_position: 6
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 90d366a3f807d28ecefe14c7bc357f86113414869465c3f0b1dd500eac7617b6
---

The test jar «
arondor-arender-rendition-tester-**&#123;VERSION-NUMBER&#125;**-jar-with-dependencies.jar
», allow the user to launch some functional test on rendition server
with following options **as admin**:

```bash
$> java -jar arondor-arender-rendition-tester-{VERSION-NUMBER}.jar
```

| Option | Description                                                                                                                           |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| d      | Define the rendition server to use.                                                                                                   |
| w      | Width of generated pictures. The given parameter can be the width or a width gap with the number to increment. (Default value: 595)   |
| t      | Number of documents to concurrently process: simulate several users                                                                   |
| l      | When user open a document (URL), this one is get before to be sent to rendition server                                                |
| c      | Disable conversion of pages in pictures                                                                                               |
| p      | Generated pages. The configuration is the same as width parameter, the page is directly given or given in a gap. (Default: all pages) |
| n      | Disable pages content getting back                                                                                                    |
| z      | Waiting time between parsing and pages conversion (Default: 0)                                                                        |
| o      | Output folder where are stored the pictures. If no folder is given, picture are stored in cache                                       |
| f      | Path of a file containing a test files list                                                                                           |
| v      | Test reporting file path (CSV)                                                                                                        |
| r      | Test reporting file path (XML)                                                                                                        |
| k      | Output folder where are stored renditioned documents                                                                                  |
| h      | Help menu                                                                                                                             |

- Basic test: This test is based on the default file of rendition
  server. To launch the test, all you need is, via the console, go to jar
  location and type the following command:

```bash
$> java -jar arondor-arender-rendition-tester-{VERSION-NUMBER}.jar -d http://rendition-server:8761/ -w "(100,1100,100)" -t 4 -v report_ARender.csv
```

- adapt the port 8761 depending on your configuration

In order to test the rendition server against business sample files:

- create a _files.txt_ in the tester folder
- add one absolute file path per line

To launch the test, all you need is, via the console, go to jar location
and type the following command:

```bash
$> java -jar arondor-arender-rendition-tester-{VERSION-NUMBER}.jar -d http://rendition-server:8761/ -w "(100,1100,100)" -t 4 -l -f ./fichiers.txt -v rapport_ARender.csv
```

## Analysis report

### Columns

| Column        | Description                                               |
| ------------- | --------------------------------------------------------- |
| Name          | Metric name                                               |
| Total         | Total execution duration (ms)                             |
| Calls         | Total number of calls                                     |
| Minimum       | Minimum execution duration (ms)                           |
| Maximum       | Maximum execution duration (ms)                           |
| TheoricalRate | Theorical rate of executions per second and client thread |
| EffectiveRate | Effective rate of executions per second                   |

### Statistics

- `[Image_IM]()$&#123;width&#125;_0`: renditions of pages of width $&#123;width&#125; (px)
- Image: renditions of all pages
- Image_PageContents: extraction of page textual content
- Fetch_DocumentPageLayout: extraction of document layout
  information (mime type, page count, page dimensions) and conversion

```javascript
  if necessary
```

### Report example (4 threads)

| name                     | total | calls | minimum | maximum | average      | theoreticalRate  | effectiveRate |
| ------------------------ | ----- | ----- | ------- | ------- | ------------ | ---------------- | ------------- |
| Open                     | 10    | 1     | 10      | 10      | 10.0         | 100.0            | 0.25967282    |
| Fetch_DocumentPageLayout | 170   | 1     | 170     | 170     | **170**      | 5.882353         | 0.25974026    |
| Image_IM_100_0           | 771   | 19    | 17      | 83      | 40.57895     | 24.64332         | 4.9337835     |
| Image_IM_200_0           | 317   | 19    | 11      | 31      | 16.68421     | 59.9369159.93691 | 4.9325027     |
| Image_IM_300_0           | 427   | 19    | 14      | 50      | 22.473684    | 44.496487        | 4.935065      |
| Image_IM_500_0           | 831   | 19    | 29      | 95      | 43.736843    | 22.86402         | 4.9337835     |
| Image_IM_400_0           | 648   | 19    | 26      | 53      | 34.105263    | 29.320988        | 4.9337835     |
| Image_IM_600_0           | 1070  | 19    | 35      | 87      | 56.31579     | 17.75701         | 4.9337835     |
| Image_IM_700_0           | 1409  | 19    | 40      | 150     | 74.1579      | 13.484741        | 4.9325027     |
| Image_IM_800_0           | 1411  | 19    | 48      | 148     | 74.26316     | 13.465628        | 4.9325027     |
| Image_IM_900_0           | 1808  | 19    | 59      | 211     | 95.1579      | 10.508849        | 4.935065      |
| Image_IM_1000_0          | 1973  | 19    | 74      | 149     | **103.8421** | 9.630005         | 4.9337835     |
| Image_IM_1100_0          | 2222  | 19    | 86      | 176     | 116.947365   | 8.550855         | 4.9337835     |
| Image                    | 12875 | 209   | 11      | 211     | 61.60287     | 16.23301         | **54.271618** |
| Image_PageContents       | 561   | 209   | 1       | 42      | 2.6842105    | 372.549          | 54.271618     |

To conclude, this report shows that:

- the average time to generate 1000 pixels images is 104 milliseconds
- the rendition server was able to render 54 pages per second
- PDF layout extract took 170 millisecondes
