---
title: Upgrade Notes 2026.1.0
description: Upgrade Notes 2026.1.0
toc_max_heading_level: 4
---

# Upgrade notes 2026.1.0

## Version upgrade

### Upgrading from 2026.0.x

Direct upgrade is supported, you will need to follow the plan :

1. Apply needed modifications after reading this upgrade notes
2. Upgrade ARender to 2026.1.0
3. Start all applications with their prerequisites

### Upgrading from 2025.x.x or earlier

Direct upgrade is **not** supported. Upgrades from 2025.x.x or earlier to 2026.1.0 must follow the following plan :

1. Apply the [2026.0.0 upgrade notes](/release-note/flowerdocs/2026.0.0/upgrade-notes) **first, in full**, as well as all upgrade notes between your version and 2026.0.0. They carry the breaking changes of the 2026 major : Spring Boot 4, Jackson 3, the removal of the SOAP web services and the mandatory OpenSearch reindex from 1.x to 3.6.0 (see [FlowerDocs 2026 upgrade](/docs/flowerdocs/install/opensearch/os-migrate))
2. Then apply this upgrade notes, following the plan above

## Architecture

### Modified components

- **ARender** 2026.0.1 → 2026.1.0

## Customisation and configuration

### Configuration {#configuration}

#### Configuration properties to remove

| Removed         | Replacement                  |
| :-------------- | :--------------------------- |
| `lasso.enabled` | none, the feature is removed |

### Product

#### Security

- Improvements to FlowerDocs security have been made by upgrading library versions and internal behaviours. This proactive approach ensures better protection against vulnerabilities.

#### Behaviour changes

##### Functional

- **Task attachment class patterns now require a full match.** A pattern such as `Invoice` used to match `Invoice`, `InvoiceScan` and `ScannedInvoice` ; it now matches `Invoice` only. Use `Invoice.*` or `.*Invoice.*` for partial matching.
- The `Assign To` tag is no longer part of the **default** task columns, in line with the configured `selectClause` and `filterClauses`. It remains available in the column picker, so users who need it can add it themselves.

##### Exploitation

- **Manual versioning now frees the replaced file.** Replacing a document's content deletes the file it replaced, unless another version still references it. Previously this happened only for classes configured without versioning, so with manual versioning the replaced file was left in storage.
- **A warning is logged when FlowerDocs is served over plain HTTP**, since a `Secure` cookie is never sent over an unencrypted connection. This is a diagnostic aid for operations teams and changes no behaviour.
- Two `opensearch-reindex` parameters were removed : `--report-only` → `--dry-run=true`, of which it was only an alias, and `--detailed-report` → nothing, as the per-class breakdown is now produced on every run. A leftover `--detailed-report` is ignored. This only concerns you if the 2025 to 2026 migration is still ahead of you ; the parameters added in this version are documented in [FlowerDocs 2026 upgrade](/docs/flowerdocs/install/opensearch/os-migrate).

#### Removals

- **Lasso feature.** Announced for removal in the [2025.4.0 upgrade notes](/release-note/flowerdocs/2025.4.0/upgrade-notes) and disabled by default since then, it is now removed. Remove the `lasso.enabled` property from your configuration (see [Configuration](#configuration)).

### API

#### Behaviour changes

- **CSV export column headers changed.** Headers corresponding to native technical tags are now translated according to the interface language, and the exported file now contains only the columns displayed in the interface. Both change the content of the generated file. **If you consume the CSV programmatically, check your parsing** : header labels differ per locale and previously-exported columns may no longer be present.
- **The `Content-Disposition` filename is now quoted.** The ASCII `filename` parameter is wrapped in double quotes, with embedded quotes and backslashes escaped, so a name containing a comma or a space no longer breaks the header. Clients that parse the header by splitting on separators without honouring quoting must be checked.
- **The search form JavaScript API now initialises on every search.** Previously it stayed uninitialised when no class criterion drove the search form, so `registerForFieldChange` callbacks were never called.

## FlowerDocs GEC

Update the GEC scope with CLM.

### History facts

Facts written by GEC now record **semantic action values** instead of generic ones, and the technical `classid` field they carry has changed so that the expected icon displays in the history.

| Event             | 2026.0.0 | 2026.1.0   |
| :---------------- | :------- | :--------- |
| Mail copy         | `CREATE` | `COPY`     |
| Task unassignment | `UPDATE` | `UNASSIGN` |

:::caution Only new facts are affected
This applies to facts created from 2026.1.0 onwards, which display with the expected icon. Facts already stored keep their previous action value and continue to display as before.
:::

### Modified configuration documents

The following configuration documents have been modified :

- `gec-createFactAfterCopyAndDeleteCopy.js`
- `Unassign_history.js`
- `solutionStyle.css`

## FlowerDocs eProcess

Update the eProcess scope with CLM.

### History facts

Facts written by eProcess now record **semantic action values** instead of generic ones, and the technical `classid` field they carry has changed so that the expected icon displays in the history.

| Event                                         | 2026.0.0 | 2026.1.0   |
| :-------------------------------------------- | :------- | :--------- |
| Task answer, cancellation reason, adjournment | `UPDATE` | `ANSWER`   |
| Task unassignment                             | `UPDATE` | `UNASSIGN` |

:::caution Only new facts are affected
This applies to facts created from 2026.1.0 onwards, which display with the expected icon. Facts already stored keep their previous action value and continue to display as before.
:::

### Modified configuration documents

The following configuration documents have been modified :

- `env-CreateAjournerFact.js`
- `Unassign_history.js`
- `solutionStyle.css`
