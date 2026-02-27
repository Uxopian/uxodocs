---
title: Installation in ACA
sidebar_position: 3
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 0332e5fafdf32dc4d729e41ef7c6e6cd42558fa8ed56099418966cd4ba2c4653
---

## Quick start with Docker

_If needed, learn how to run ARender in docker [here](/docs/arender/installation/docker/presentation)._

1. Change ARender UI context path to **/arender**.

With ARender UI container, change the context with `CONTEXT_PATH=/arender` in the container environment variable.

2. Pull the ACA image from our artifactory with:

    ```bash
    $> docker pull artifactory.arondor.cloud:5001/adf-content-app-arender:<arender-version>-aca<aca-version>
    ```

3. Then run the container with the following configuration:

```yaml
version: "3"

services:
    aca:
        image: alfresco-content-app:AR-11007
        environment:
            # ACA host
            - ADF_PUBLIC_HOST=http://localhost
            # ARender host with /arender as context path
            - ARENDER_HOST=http://localhost:8080
            # alfresco content repository host
            - ALFRESCO_HOST=http://localhost:8080
            # alfresco host for oauth
            - ALFRESCO_OAUTH_HOST=http://localhost:8080
            # list of extensions that opens with arender as preview (separator ',')
            - ARENDER_EXTENSIONS=pdf,docx,docm,dotx,dotm,doc,dot,rtf,odt,ott,xlsx,xlsm,xls,xlt,xml,csv,ods,ots,pptx,pptm,ppt,pps,odp,otp,vsdx,msg,eml,html,htm,txt,dwg,dxf,tif,tiff,dcm,mda,ica,mmr,mca,jpg,jpeg,jpe,jfif,jp2,jpf,jpx,j2k,j2c,jpc,png,gif,webp,bmp,mp4,zip
        ports:
            - 80:8080
```

## Add ARender to your Alfresco Content App

### Requirements

- Alfresco 5.2.4, 6.x
- Tomcat 7.0
- NodeJS v10.16.0,
- npm 6.14.2

### Install

As the module is preview and not publicly available you need to add it manually.

1. Clone the ACA repository.

    ```bash
    $> git clone https://github.com/Alfresco/alfresco-content-app.git
    $> git checkout v1.10.1
    ```

2. Download ARender ACA extension sources [here](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-ADF-plugin/{{version}}/arender-for-alfresco-ADF-plugin-{{version}}.zip) and unzip the archive content.

3. Create a library project.

    ```bash
    $> ng g library arondor-arender-viewer
    ```

4. Replace the content of the created folder by ARender ACA extension sources.

5. Add ARender lib to the compiler config.

```yaml

  "compilerOptions": &#123;
    // [...]
    "paths": &#123;
    // [...]
      "@arondor/arender-viewer": ["dist/@arondor/arender-viewer"],
      "@arondor/arender-viewer/*": ["dist/@arondor/arender-viewer/*"]



```

For versions 2.0 and above, refer to the version 2.0 installation

6. Add ARender assets to the app and replace project infos.

```yml

  "projects": {
    "app": &#123;
      "architect": &#123;
        //[...]
        "build": &#123;
          //[...]
          "options": &#123;
            //[...]
            "assets": [
              //[...]

                "glob": "arender.plugin.json",
                "input": "node_modules/@arondor/arender-viewer/assets",
                "output": "./assets/plugins"
              &#125;,

                "glob": "arender.plugin.json",
                "input": "projects/arondor-arender-viewer/assets",
                "output": "./assets/plugins"
              &#125;,

                "glob": "**/*",
                "input": "node_modules/@arondor/arender-viewer/assets",
                "output": "./assets/arender-viewer"
              &#125;,

                "glob": "**/*",
                "input": "projects/arondor-arender-viewer/assets",
                "output": "./assets/arender-viewer"

            ]



    &#125;,
    //[...]
    "arondor-arender-viewer": {
      "root": "projects/arondor-arender-viewer",
      "sourceRoot": "projects/arondor-arender-viewer/src",
      "projectType": "library",
      "prefix": "arender",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-ng-packagr:build",
          "options": {
            "tsConfig": "projects/arondor-arender-viewer/tsconfig.lib.json",
            "project": "projects/arondor-arender-viewer/ng-package.json"

        &#125;,
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": &#123;
            "main": "projects/arondor-arender-viewer/src/test.ts",
            "tsConfig": "projects/arondor-arender-viewer/tsconfig.spec.json",
            "karmaConfig": "projects/arondor-arender-viewer/karma.conf.js"

        &#125;,
        "lint": &#123;
          "builder": "@angular-devkit/build-angular:tslint",
          "options": &#123;
            "tsConfig": [
              "projects/arondor-arender-viewer/tsconfig.lib.json",
              "projects/arondor-arender-viewer/tsconfig.spec.json"
            ],
            "exclude": [
              "**/node_modules/**"
            ]






```

7. Add ARender extension description.

```yml

  "$references": [
    "arender.plugin.json",
    ...
  ],

```

8. Import ARender extension.

```ts
import { ArenderExtensionModule &#125; from '@arondor/arender-viewer';

@NgModule({
  imports: [ArenderExtensionModule, ... ]
&#125;)
```

9. Add ARender ACA extension to the package build scripts.

```yml

  "scripts": {
    //[...]
    "build:arender-extension": "npx rimraf dist/@arondor/arender-viewer && ng build arondor-arender-viewer && cpr projects/arondor-arender-viewer/ngi.json dist/@arondor/arender-viewer/ngi.json && cpr projects/arondor-arender-viewer/assets dist/@arondor/arender-viewer/assets",
    "build.arender": "npm run build:arender-extension",
    "build.extensions": "npm run build.shared && npm run build.aos && npm run build.arender",
    //[...]


```

For versions 2.0 and above, refer to the version 2.0 installation

### Configuration

#### ARender server config

```yml

  "arender": {
    "host": "{protocol&#125;//{hostname}:{port}/arender/",
    "onPromise": true,
    "documentbuilder": true
  },
  //[...]

```

Description:

- **arender.host**: arender host with _"/arender"_ as context path. Use the default configuration to avoid Cross Origin issues.
- **arender.onPromise**: enable multiple documents and/or folders opening.
- **arender.documentbuilder**: enable document composition feature by default.

#### File extension openned

Modify features.viewer.content.fileExtension list.

```yml

  //[...]
  "features": {
    "viewer": &#123;
      "content": [&#123;
        "id": "app.arender.viewer",
        "fileExtension": [
          "docx", "docm", "dotx", "dotm", "doc", "dot",
          "rtf", "odt", "ott",
          "xlsx", "xlsm", "xls", "xlt", "xml", "csv",
          "ods", "ots",
          "pptx", "pptm", "ppt", "pps",
          "odp", "otp", "vsdx",
          "msg", "eml",
          "html", "htm",
          "txt",
          "dwg", "dxf", "tif", "tiff", "dcm",
          "mda", "ica", "mmr", "mca",
          "jpg", "jpeg", "jpe", "jfif", "jp2", "jpf", "jpx", "j2k", "j2c", "jpc",
          "png", "gif", "webp", "bmp"
          // <- Add your extensions here or/and remove element from the list above ^
        ],
      &#125;]
    &#125;,
    // [...]


```

### Build and run

1. Install the angular-devkit.

    ```bash
    $> npm install --save-dev @angular-devkit/build-angular
    ```

2. Execute the bash script to build the app.

    ```bash
    $> ./build-tomcat-e2e.sh
    ```

3. Copy the generated folder (alfresco-content-app-1.10.1\dist\app for ACA v1.10.1) to your tomcat "/webapps" folder and rename it if needed.

4. Start Tomcat.

### Install for version 2.0

For versions 2.0 and above, the following additional changes must be done :

1. The ARender lib in the compiler configuration are placed in tsconfig.base.json and not in tsconfig.json

```yaml

  "compilerOptions": {
    // [...]
    "paths": {
    // [...]
      "@arondor/arender-viewer": ["dist/@arondor/arender-viewer"],
      "@arondor/arender-viewer/*": ["dist/@arondor/arender-viewer/*"]



```

2. Add ARender ACA extension to the package build scripts.

```yml

  "scripts": {
    //[...]
    "build:arender-extension": "npx rimraf dist/@arondor/arender-viewer && ng build arondor-arender-viewer && cpr projects/arondor-arender-viewer/ngi.json dist/@arondor/arender-viewer/ngi.json && cpr projects/arondor-arender-viewer/assets dist/@arondor/arender-viewer/assets",
    "build.arender": "npm run build:arender-extension",
    "build.extensions": "npm run build.shared && npm run build.aos && npm run build.arender",
    "build": "npm run validate-config && npm run build.extensions && npm run build.app -- --prod",
    //[...]


```

3. Execute the command to build the app and have the generated folder (/dist/app) to place in your tomcat server in the "webapps" folder.

    ```bash
    $> ng build
    ```
