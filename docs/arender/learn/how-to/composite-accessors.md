---
title: Composite documents
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: ed4114cf08f90d8095297ab956e0bec920da86e5e8f2265f99a444b78002405a
---







Starting from 3.1.10 a new servlet exists in ARender in order to create
composite (folder) documents over the limits imposed by the URL.

In the web.xml file of ARender, the default expiration time of the
temporary containers can be set. By default, it is of one hour.

The following JS call will be functional if the loadbalancer in front of the ARender Web-UI servers is configured in sticky session

It relies on a JSON object that is passed through ARender JS API:

``` javascript
getARenderJS().loadDocuments(jsonString, loadingErrorHandlerFunction, customLoadActionFunction);
```

If you provide a custom action function, documents won't be loaded
directly into ARender. Instead, you'll get a callback on the function
*customLoadActionFunction* with the documentId generated as parameter.
If you do not provide any custom action(by not providing the function),
the documents will automatically load into ARender.

If you wish to test your JSON file, you can use this CURL command on a
non-clusterized environnement:

``` bash
curl -X POST http://<arender_host>/arendergwt/compositeAccessorServlet -d @test_openDoc_json.json --header "Content-Type: application/json"
```

This will return you the ARender ID of the processed document. Here is
the content of the Json provided for this example:

``` json

   "title": "test_Container",
   "references": [{
       "queryUrl": "loadingQuery?url=http:\/\/arender.arondor.com\/pdf\/pdf\/cdsinternationalprivacypolicy.pdf"
   }, {
       "queryUrl": "loadingQuery?url=http:\/\/arender.arondor.com\/pdf\/pdf\/programme_de_stabilite_2012-2016.pdf"
   }, {
       "queryUrl": "loadingQuery?url=http:\/\/arender.arondor.com\/pdf\/pdf\/Pearson_-_Coder_Proprement_-_2009.pdf"
   }, {
       "title": "container_two",
       "references": [{
           "queryUrl": "loadingQuery?url=http:\/\/arender.arondor.com\/pdf\/pdf\/cdsinternationalprivacypolicy.pdf"
       }, {
           "queryUrl": "loadingQuery?url=http:\/\/arender.arondor.com\/pdf\/pdf\/programme_de_stabilite_2012-2016.pdf"
       }, {
           "queryUrl": "loadingQuery?url=http:\/\/arender.arondor.com\/pdf\/pdf\/Pearson_-_Coder_Proprement_-_2009.pdf"
       }]
   }]

```

You can define a structured JSON Folder structure using this format:

- title (optional): give the current level folder a title. For a
  document, the document title from the original document might
  override it.
- queryUrl (optional): this will define the current level to be a
  document. It describes a valid loadingQuery. Syntax is
  loadingQuery?&lt;normal URL parameters\&gt;
- references (optional): this will define the current level to be a
  folder. It is an array of the same structured objects (title,
  queryUrl or references).

Please take note that references and queryUrl are mutually exclusive and
queryUrl will be the one chosen over references. (document over folder).
