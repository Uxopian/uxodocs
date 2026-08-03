---
title: Getting Started
sidebar_position: 1
date: "2000-02-01T12:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: a895cd69cdc3e63c5eeb868377facb5302d4f0725efb486c60ba575494e9b4ef
---

## Goal

When you have completed this training module, you will be able to link one component to another using the `LinkFreeListPlugin` plugin.

## An example in practice

The example in this module is based on a job application. For application management, it is important that the application references the job offer, so that the purpose of the application can be determined.

<br/>
Using this plugin, you can use a list of values ( `FREE_LIST ` tag) to:

- browse all job offers to select the one that matches your requirements,
- access the referenced job offer at any time via an icon.

## Data model

To put the example into practice, the following model is required.

### The job offer

The starting point for this example, the job offer is a `JobOffer` class task with the following mandatory tags:

- `RH_Service`: list of services concerned
- `RH_Job`: list of job types

### The application

The application is an `ApplicationSubmission` class task with the `Lookup` type `RH_OfferLink` tag used to store the link to the job offer to which the candidate is applying.
