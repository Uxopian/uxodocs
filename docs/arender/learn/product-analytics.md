---
title: "Product Analytics"
last_update:
  date: '2026-03-13T09:40:04.584Z'
  author: CI/CD Bot
sidebar_position: 3
content_hash: 6a68c234af33011116edea91454a30f4c99e49a1e94d5f30dbca9344bd2450ad
---

## What is Product Analytics in ARender?

Since version 2023.5.0, ARender has included a Product Analytics feature powered by Mixpanel, enabling the Uxopian team 
to better understand how ARender is used in real-world scenarios. This feature is activated by default and can be easily
disabled by configuring a simple parameter following the ARender configuration guide.

### Why Product Analytics?

The primary goal of Product Analytics in ARender is to help the Uxopian team:

* Gain valuable insights into feature usage.
* Identify the most and least used functionalities.
* Prioritize enhancements and new developments in the product roadmap.

This ensures that ARender evolves in line with real user needs, ultimately delivering a better experience for all.

### Privacy and Compliance

The Product Analytics feature is **compliant with local data protection laws** and respects user privacy:

* All data is stored in Europe, ensuring compliance with data protection regulations.
* No document contents, annotations, or metadata are transmitted.
* The collected data is limited to feature usage metrics only.

With this setup, users can rest assured that their sensitive information remains private and secure.

### What Data is Collected?

Here are the specific metrics tracked by the Product Analytics feature:

#### Document Usage

* **Opening documents**: Tracks the opening of a document. It includes information on MIME type, the number of 
  documents opened, the total page count and also the time taken to open the document.
* **Closing documents**: Tracks the closing of a document. It includes information on the total page count, 
  the time spent viewing the document and the number of pages viewed.

#### Annotations

* **Annotation CRUD**: Tracks the number of annotations created, updated, and deleted, along with their types.
* **Repeat annotation mode**: Tracks the usage of any repeat annotation feature.

#### Navigation and Interaction

* **Lasso**: Tracks usage of the lasso feature.
* **Text search**: Tracks the usage of the text search feature.
* **Page rotation**: Tracks the usage of the rotation feature.
* **Document zoom**: Tracks the usage of the zoom feature.
* **Fullscreen mode**: Tracks the usage of the fullscreen feature.

#### Document Manipulation

* **Document builder**: Tracks the usage of the DocumentBuilder feature.
* **Document comparison**: Tracks the usage of the Comparison feature.

#### Export and Output

* **PDF printing**: Tracks the usage of the Print feature.
* **Document download**: Tracks the usage of the download feature.
* **Image filtering**: Tracks the usage of the Image filter feature.

### Safe and Purposeful Data Collection

The analytics collected are solely for improving the user experience. This data is reviewed by the Uxopian team to:

* Understand how features are being utilized.
* Identify pain points or underused functionalities.
* Prioritize future updates and improvements.

This feature is designed with user safety and privacy in mind, ensuring that no sensitive document data is ever exposed.
By using Product Analytics, ARender becomes a smarter, more focused tool that better serves its users.

### Configuration Notes

For proper functioning of the Product Analytics, ensure that the URL https://api-js.mixpanel.com/ is authorized on the
users machine.

To disable Product Analytics, set the property **arender.data.analytics.enabled** to false in the configuration settings
(More information [here](../../guides/configurations/web-ui/properties/full-config#arender)).