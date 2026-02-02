---
title: "Use REST API"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: e611bc5f7b0b00135c21d472b22df4774c15b865c6ce4ad6192b3410e52b0a0f
---

This guide is using as default URL for the rendition server
[http://localhost:8761](http://localhost:8761) , it will be necessary for you to update these
curl calls to your current rendition server URLs and ports for the REST
API.

## List of exposed services

### How to obtain the capabilities of your rendition server

In order to obtain the capabilities of the rendition server, you can
asked the simple following URL:

[http://localhost:8761/capabilities](http://localhost:8761/capabilities)

You should have an answer of this form if your rendition server is up,
in XML format:

``` xml
<ar:capabilities xmlns:ar="http://www.arender.fr/rest">
    <ar:map>
        <ar:entry>
            <ar:string>com.arondor.viewer.client.client.api.Version</ar:string>
            <ar:string>3.1.0-rc3</ar:string>
        </ar:entry>
        <ar:entry>
            <ar:string>
                com.arondor.viewer.client.rendition.ServerAddressRest
            </ar:string>
            <ar:string>http://localhost:8761/</ar:string>
        </ar:entry>
        <ar:entry>
            <ar:string>
                com.arondor.viewer.client.api.document.ProgressiveDocumentPageLayout.isSupported
            </ar:string>
            <ar:boolean>false</ar:boolean>
        </ar:entry>
        <ar:entry>
            <ar:string>com.arondor.viewer.client.rendition.Version</ar:string>
            <ar:string>3.1.0-rc3</ar:string>
        </ar:entry>
        <ar:entry>
            <ar:string>com.arondor.viewer.client.rendition.ServerAddress</ar:string>
            <ar:string>http://rendition-server:8761/</ar:string>
        </ar:entry>
    </ar:map>
    <ar:category>com.arondor.viewer.client.rendition.Capabilities</ar:category>
</ar:capabilities>
```

The corresponding curl command to launch would be:

```bash
curl -H "Accept: application/xml" -H "Content-Type: application/xml" \
-X GET "http://localhost:8761/capabilities"
```

### How to know if your rendition server has loaded a document referenced by an ARender documentId

Regarding documents, we need to call the document ressource , exposed at
this URL: [http://localhost:8761/document](http://localhost:8761/document)

As an example, if you want to know if the default ARender document has
been opened already you can check with:

[http://localhost:8761/document/b64_I2RlZmF1bHQ=](http://localhost:8761/document/b64_I2RlZmF1bHQ=)

If the default document hasn't been opened, that's the typical answer
you'll see:

``` xml
<ar:boolean xmlns:ar="http://www.arender.fr/rest">false</ar:boolean>
```

La corresponding curl command is:

```bash
$> curl -H "Accept: application/xml" -H "Content-Type: application/xml" \
-X GET "http://localhost:8761/document/b64_I2RlZmF1bHQ="
```

### Getting the document layout

It is possible and useful before asking images to the rendition in curl
to know what are the default dimensions and number of page of the
original document.

To do so, one shall ask the document ressource on its layout method:

> `http://localhost:8761/document/{documentId}/layout`

An example of this call is:

```bash
$> curl -H "Accept: application/xml" -H "Content-Type: application/xml" \
-X GET "http://localhost:8761/document/b64_I2RlZmF1bHQ=/layout"
```

Here is an extract of a result on the default document:

``` xml
<ar:documentPageLayout xmlns:ar="http://www.arender.fr/rest">
    <ar:documentId>b64_I2RlZmF1bHQ=</ar:documentId>
    <ar:documentTitle>arender-en.pdf</ar:documentTitle>
    <ar:mimeType>application/pdf</ar:mimeType>
    <ar:pages>
        <ar:pageDimensions>
            <ar:width>720.0</ar:width>
            <ar:height>405.0</ar:height>
            <ar:rotation>0</ar:rotation>
            <ar:dpi>0</ar:dpi>
        </ar:pageDimensions>
        <ar:pageDimensions>
            <ar:width>720.0</ar:width>
            <ar:height>405.0</ar:height>
            <ar:rotation>0</ar:rotation>
            <ar:dpi>0</ar:dpi>
        </ar:pageDimensions>
        <ar:pageDimensions>
            <ar:width>720.0</ar:width>
            <ar:height>405.0</ar:height>
            <ar:rotation>0</ar:rotation>
            <ar:dpi>0</ar:dpi>
        </ar:pageDimensions>
        ...
    </ar:pages>
</ar:documentPageLayout>
```

### Upload a document in the rendition server

In order to push a document to the rendition server, we have to use a
partial chunk loading in order not to saturate the server memory.

To start uploading, the first method to call is a POST method named
startPartialLoading:

```bash
$> curl -H "Accept: application/xml" \
-H "Content-Type: application/xml" \
-X POST "http://localhost:8761/document/{documentId}/startPartialLoading?mimeType={mimeType}&documentTitle={documentTitle}&contentSize={contentSize}"
```

ContentSize is the size in bytes of the file to send. The rendition
server will expect as many bytes as declared in this call.

Another method is then responsible to load the binary content of the
document, chunk by chunk.

Here is the corresponding curl command, supposing your data chunk in
stored in a file called binaryData.bin:

```bash
$> curl --request POST --data-binary "@binaryData.bin" "http://localhost:8761/document/{documentId}/continuePartialLoading?offset={offset}&finished={finished}"
```

The "finished" parameter has to be set to true when the last chunk is
being sent as it will confirm to the rendition server that the document
is finished to transfer and can be parsed. "Offset" corresponds to the
current offset in bytes of the file, allowing you to send custom chunk
sizes (useful if you're sending a document you haven't entirely
retrieved from your document storage system as an example).

### Getting the rendered pages of a document existing in the rendition server

In order to obtain an image, you need to call the document resource on
its method "image":

> `http://localhost:8761/document/{documentId}/image/{page}/{description}`

The parameter "description" corresponds to "\[IM\]()" followed by two
integer values that we use to describe the kind of page we went to
receive, successively the width of the picture asked and its rotation in
degrees.

:::note

IM_1080_90 asks a 1080 pixels wide picture, rotated of 90°.

Here is a curl example of such a method:

```bash
$> curl -X GET 'http://localhost:8761/document/b64_I2RlZmF1bHQ=/image/0/IM_1920_0'
```

This obtains the first page of the default document of ARender with a
width of 1920px (the width/height ratio is kept from the original
document).
:::

### Getting the textual content of a page

After obtaining the images of a document it might be useful to obtain
its textual content for search purposes. To do so, one can call the
document resource on the "contents" method:

> `http://localhost:8761/document/{documentId}/contents/{page}`

Here is an example of such call:

```bash
$> curl -H "Accept: application/xml" -H "Content-Type: application/xml" \
-X GET 'http://localhost:8761/document/b64_I2RlZmF1bHQ=/contents/2'
```

This obtains the textual content of the third page (pages numbers starts
at 0 in ARender) of the ARender default document.

And here is an abridged result (we can observe the text contained, its
font, font size, and position on the document):

``` xml
<ar:pageContents xmlns:ar="http://www.arender.fr/rest">
    <ar:pageNumber>2</ar:pageNumber>
    <ar:positionTextList>
        <ar:positionText>
            <ar:pageNumber>2</ar:pageNumber>
            <ar:position>
                <ar:x>249.1</ar:x>
                <ar:y>-0.83999634</ar:y>
                <ar:w>456.0941</ar:w>
                <ar:h>36.0</ar:h>
            </ar:position>
            <ar:text>Document Viewing can be hard</ar:text>
            <ar:individualWidths>
                <ar:float>22.154755</ar:float>
                <ar:float>18.98465</ar:float>
                <ar:float>15.238159</ar:float>
                <ar:float>18.912598</ar:float>
                <ar:float>28.783173</ar:float>
                <ar:float>17.939941</ar:float>
                <ar:float>18.62442</ar:float>
                <ar:float>12.068054</ar:float>
                <ar:float>7.7451477</ar:float>
                <ar:float>20.425598</ar:float>
                <ar:float>8.285522</ar:float>
                <ar:float>17.723785</ar:float>
                <ar:float>25.757172</ar:float>
                <ar:float>8.285522</ar:float>
                <ar:float>18.912598</ar:float>
                <ar:float>16.967285</ar:float>
                <ar:float>7.991638</ar:float>
                <ar:float>14.985962</ar:float>
                <ar:float>17.255493</ar:float>
                <ar:float>18.912598</ar:float>
                <ar:float>7.9973145</ar:float>
                <ar:float>18.912598</ar:float>
                <ar:float>17.939941</ar:float>
                <ar:float>8.033325</ar:float>
                <ar:float>18.912598</ar:float>
                <ar:float>17.255493</ar:float>
                <ar:float>12.176147</ar:float>
                <ar:float>18.912598</ar:float>
            </ar:individualWidths>
            <ar:fontSize>36.0</ar:fontSize>
            <ar:font>ABCDEE+Calibri</ar:font>
            <ar:paragraphId>0</ar:paragraphId>
            <ar:rightToLeftText>false</ar:rightToLeftText>
        </ar:positionText>
        <ar:positionText>
            <ar:pageNumber>2</ar:pageNumber>
            <ar:position>
                <ar:x>91.584</ar:x>
                <ar:y>70.66</ar:y>
                <ar:w>102.79086</ar:w>
                <ar:h>18.0</ar:h>
            </ar:position>
            <ar:text>Deployment</ar:text>
            <ar:individualWidths>
                <ar:float>13.013329</ar:float>
                <ar:float>9.9132</ar:float>
                <ar:float>11.012665</ar:float>
                <ar:float>5.046707</ar:float>
                <ar:float>11.012665</ar:float>
                <ar:float>9.859131</ar:float>
                <ar:float>15.951233</ar:float>
                <ar:float>9.96727</ar:float>
                <ar:float>11.012665</ar:float>
                <ar:float>6.001999</ar:float>
            </ar:individualWidths>
            <ar:fontSize>18.0</ar:fontSize>
            <ar:font>Arial,Bold</ar:font>
            <ar:paragraphId>1</ar:paragraphId>
            <ar:rightToLeftText>false</ar:rightToLeftText>
        </ar:positionText>
        <ar:positionText>
            <ar:pageNumber>2</ar:pageNumber>
            <ar:position>
                <ar:x>91.584</ar:x>
                <ar:y>92.26001</ar:y>
                <ar:w>55.979996</ar:w>
                <ar:h>18.0</ar:h>
            </ar:position>
            <ar:text>Issues</ar:text>
            <ar:individualWidths>
                <ar:float>5.003998</ar:float>
                <ar:float>10.008003</ar:float>
                <ar:float>9.954002</ar:float>
                <ar:float>10.998001</ar:float>
                <ar:float>10.007996</ar:float>
                <ar:float>10.007996</ar:float>
            </ar:individualWidths>
            <ar:fontSize>18.0</ar:fontSize>
            <ar:font>Arial,Bold</ar:font>
            <ar:paragraphId>2</ar:paragraphId>
            <ar:rightToLeftText>false</ar:rightToLeftText>
        </ar:positionText>
        <ar:positionText>
            <ar:pageNumber>2</ar:pageNumber>
            <ar:position>
                <ar:x>61.296</ar:x>
                <ar:y>81.54001</ar:y>
                <ar:w>20.039997</ar:w>
                <ar:h>20.0</ar:h>
            </ar:position>
            <ar:text></ar:text>
            <ar:individualWidths>
                <ar:float>20.039997</ar:float>
            </ar:individualWidths>
            <ar:fontSize>20.0</ar:fontSize>
            <ar:font>ABCDEE+FontAwesome</ar:font>
            <ar:paragraphId>2</ar:paragraphId>
            <ar:rightToLeftText>false</ar:rightToLeftText>
        </ar:positionText>
        <ar:positionText>
            <ar:pageNumber>2</ar:pageNumber>
            <ar:position>
                <ar:x>91.584</ar:x>
                <ar:y>138.17</ar:y>
                <ar:w>81.684006</ar:w>
                <ar:h>18.0</ar:h>
            </ar:position>
            <ar:text>Technical</ar:text>
            <ar:individualWidths>
                <ar:float>9.720001</ar:float>
                <ar:float>10.008003</ar:float>
                <ar:float>9.918007</ar:float>
                <ar:float>10.998001</ar:float>
                <ar:float>11.070007</ar:float>
                <ar:float>5.003998</ar:float>
                <ar:float>10.007996</ar:float>
                <ar:float>9.953995</ar:float>
                <ar:float>5.003998</ar:float>
            </ar:individualWidths>
            <ar:fontSize>18.0</ar:fontSize>
            <ar:font>Arial,Bold</ar:font>
            <ar:paragraphId>3</ar:paragraphId>
            <ar:rightToLeftText>false</ar:rightToLeftText>
        </ar:positionText>
        <ar:positionText>
            <ar:pageNumber>2</ar:pageNumber>
            <ar:position>
                <ar:x>91.584</ar:x>
                <ar:y>159.77</ar:y>
                <ar:w>103.89601</ar:w>
                <ar:h>18.0</ar:h>
            </ar:position>
            <ar:text>Restrictions</ar:text>
            <ar:individualWidths>
                <ar:float>12.996002</ar:float>
                <ar:float>9.918007</ar:float>
                <ar:float>10.008003</ar:float>
                <ar:float>5.9940033</ar:float>
                <ar:float>6.9120026</ar:float>
                <ar:float>5.003998</ar:float>
                <ar:float>10.007996</ar:float>
                <ar:float>5.9940033</ar:float>
                <ar:float>5.003998</ar:float>
                <ar:float>11.052002</ar:float>
                <ar:float>10.998001</ar:float>
                <ar:float>10.007996</ar:float>
            </ar:individualWidths>
            <ar:fontSize>18.0</ar:fontSize>
            <ar:font>Arial,Bold</ar:font>
            <ar:paragraphId>4</ar:paragraphId>
            <ar:rightToLeftText>false</ar:rightToLeftText>
        </ar:positionText>
        <ar:positionText>
            <ar:pageNumber>2</ar:pageNumber>
            <ar:position>
                <ar:x>59.76</ar:x>
                <ar:y>145.05</ar:y>
                <ar:w>20.040005</ar:w>
                <ar:h>20.0</ar:h>
            </ar:position>
            <ar:text></ar:text>
            <ar:individualWidths>
                <ar:float>20.040005</ar:float>
            </ar:individualWidths>
            <ar:fontSize>20.0</ar:fontSize>
            <ar:font>ABCDEE+FontAwesome</ar:font>
            <ar:paragraphId>4</ar:paragraphId>
            <ar:rightToLeftText>false</ar:rightToLeftText>
        </ar:positionText>
        ...
    </ar:positionTextList>
</ar:pageContents>
```
