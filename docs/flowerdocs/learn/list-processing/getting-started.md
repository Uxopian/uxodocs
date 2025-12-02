---
title: Getting Started
date: '2020-01-01T11:20:01+02:00'
last_update:
  date: '2025-12-02T14:29:22.460Z'
  author: CI/CD Bot
content_hash: 3bbb7cb4b6506777fa122338770914b48e41f2c9037bff923bd006d92ed82335
---


# Goals

In this module, you will configure an example of a processing session that can be started from certain virtual folder aggregations. This example allows you to manipulate the processing session so that only tasks with the same priority are opened. 
 
# Before getting started

This tutorial is based on the configuration of a processing session via the [FlowerDocs JS API](/docs/flowerdocs/apis/jsapi/recherche/list-processing)

In this tutorial we will be using the following components: 

* `Choice list` type `Priority` tag containing the values 
	* Urgent
	* Critical 
	* Normal
* `Choice list` type `Status` tag containing the values 
	* `TOBEPROCESSED`
	* `UNDERWAY`
	* `PROCESSED`
*  `Mail` class task containing `Priority` and `Status` tags
*   `Mail` virtual folder whose search is configured as follows: 
	* Identifier: `SearchMails`
	* Number of results: `100`
	* Aggregation: `Status`
	* Tick: `Priority`
	* Category: `Task`
	* Criterion: `Class equal to Mail` 
	
:::info
Add a tab for easy access to the virtual folder.
:::
	
