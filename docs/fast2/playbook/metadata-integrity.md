---
title: Metadata Integrity
sidebar_label: Metadata Integrity
sidebar_position: 6
---

# Preserving Metadata & System Fields

In a lot of migrations, and especially the ones driven by legal or audit requirements, the **original metadata has to survive the move**: creation dates, retention dates, modification dates, and who originally created or owned the document. Get it wrong and a naive migration stamps everything with today's date and whatever service account ran the job. That's exactly what an auditor doesn't want to find.

This playbook explains how Fast2 keeps original values intact, and what the destination system and the project team must provide for it to work. It is written to be **system-agnostic**: "source system" and "destination system" stand for whatever you migrate from and to.

:::tip TL;DR
- Fast2 **passes source values through unchanged** unless a mapping step is intentionally configured to transform them.
- **Dates** carry over untouched when both systems share the same format and timezone. No conversion needed.
- **Creator / owner / modifier** are set by *referencing* identities (“profiles”) that must already exist in the destination.
- **Read-only / system fields** are typically *settable-once-at-creation*: Fast2 sets them at document creation through the destination's official API, using credentials with sufficient permissions.
- A built-in **migration-asset tracking system** lets you verify the state of any asset at any step; UAT and business validation remain essential.
:::

## Keeping source values unchanged

If the format of the expected value in the destination is the same as the source (ex/ same date format, numbers stored under *integer* or *String* or *Decimal* data) Fast2 can keep these values and will not update those unless stated otherwise (like, adding a property mapping step updating not only the name, so it fits the expected nomenclature of the destination, but also the value). This would be an “intentional” migration step added during the workflow design phase.

## Tracking and validation

Fast2 provides a migration-asset tracking system where we can check the state (inbound/outbound) of any asset, for any step of the workflow. Of course, validating the absence of side-effects of the configured task is a crucial aspect of the UAT phase of a Fast2 project. Business validation (outside of Fast2, comparing the sample data from the source and from the destination) is highly recommended as well, and is the responsibility of the project team.

## Creator, owner and modifier

As for the users, the destination system must have the “profiles” configured beforehand, so Fast2 is just “linking” these references when setting the creator/owner/modifier when creating these documents in the destination via the API's.

## Dates

As for the Dates, as long as the source and destination systems use the same format (ex/ YYYY-MM-DD'T'hh:mm:ss.SSSS Z) and are on the same timezone, the destination will understand and interpret the input date values directly from the output of the source system, without Fast2 having to convert them.

## Read-only / system fields

As for the *read-only* values, usually they are just settable-only-once-at-creation values. Fast2 needs credentials with sufficient permissions to create documents and force these values, which cannot be updated once they are set during the document creation. For this, Fast2 uses the official destination API's to prevent any discrepancy between a document metadata/references and the destination knowledge of the expected values.

## In practice

Read-only field preservation works when three things line up: the **destination exposes** the field at creation time through its API, the migration account has **enough permission** to set it, and any creators or owners you reference **already exist** on the destination side. Pin these down early, during discovery or the PoC. They're properties of the destination system, not of Fast2, so finding out late tends to be expensive.

:::info Related
- [Transformation tasks](../catalog/transformer.md) for property mapping
- [Credentials](../catalog/credentials.md) for configuring the migration account
- [Content Integrity](./content-integrity.md): the companion content-validation playbook
:::
