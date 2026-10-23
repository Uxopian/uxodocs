---
title: Upgrade Notes 2026.2.0
description: Upgrade Notes 2026.2.0
toc_max_heading_level: 4
---

# Upgrade notes 2026.2.0

## Version upgrade

### Upgrading from 2026.1.x

Direct upgrade is supported, you will need to follow the plan :

1. Apply needed modifications after reading this upgrade notes
2. Upgrade ARender to 2026.3.0
3. Start all applications with their prerequisites

### Upgrading from 2026.0.x

Apply the [2026.1.0 upgrade notes](/release-note/flowerdocs/2026.1.0/upgrade-notes) first, then this upgrade notes, following the plan above.

### Upgrading from 2025.x.x or earlier

Direct upgrade is **not** supported. Upgrades from 2025.x.x or earlier to 2026.2.0 must follow the following plan :

1. Apply the [2026.0.0 upgrade notes](/release-note/flowerdocs/2026.0.0/upgrade-notes) first, as well as all upgrade notes between your version and 2026.0.0
2. Then apply the [2026.1.0 upgrade notes](/release-note/flowerdocs/2026.1.0/upgrade-notes) and this upgrade notes, following the plan above

## Architecture

### Modified components

- **ARender** 2026.1.0 → 2026.3.0
- **Plume** 2026.0.0 → 2026.2.0

### Deprecated components

- `Popup.buildSearch` is deprecated and will be removed in the next major release. Migrate to `buildSearchToSelectUnique`, same signature and behaviour (see [Search popup](/docs/flowerdocs/apis/jsapi/popups/recherche)).
- The `criteria` option of `SearchAttachmentPlugin` is deprecated. Migrate to `criteriaBuilder`, a function building the criteria from the current task (see [Attachment plugins](/docs/flowerdocs/apis/plugins/attachment#searchattachmentplugin)).

## Customisation and configuration

### Configuration {#configuration}

#### Added properties

| Property                          | File             | Default | Description                                                                                                                                                                                     |
| :-------------------------------- | :--------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gui.search.operators.restricted` | `gui.properties` | `false` | Set to `true` to hide the **does not contain**, **is empty** and **is not empty** operators from every search, for a custom connector that does not support them.                                |

### Product

#### Security

- Improvements to FlowerDocs security have been made by upgrading library versions and internal behaviours. This proactive approach ensures better protection against vulnerabilities.

#### Administration roles

In addition to `ADMIN` and `SYSTEM_ADMIN`, which keep all their rights, FlowerDocs 2026.2.0 delegates administration to six granular roles: `RECOVERYBIN_MANAGER`, `USERS_MANAGER`, `SECURITY_ADMIN`, `DELEGATION_MANAGER`, `TEMPLATE_MANAGER` and `FUNCTIONAL_ADMIN`. They are described in [Administration roles](/docs/flowerdocs/concepts/securite/administration-roles).

Nothing has to change for a scope administered with `ADMIN` only: `ADMIN` keeps every right, and the new roles have no members until you add some. Act only if you used `SECURITY_ADMIN` to manage ACLs (see below), or if you want to delegate part of the administration to the new roles.

- **Scopes created from the 2026.2.0 template declare the six profiles, empty.** An existing scope does not receive them: add the profiles you want to use to your scope: in the administration console, under _Principals > Teams_, create a team whose identifier is the role name, then add its members (see [Administration roles](/docs/flowerdocs/concepts/securite/administration-roles)).
- **`SECURITY_ADMIN` no longer manages ACLs.** Creating and updating an ACL now requires `FUNCTIONAL_ADMIN`, deleting one requires `ADMIN`. Add the members who must keep managing ACLs to the `FUNCTIONAL_ADMIN` profile.
- **Only `ADMIN` and `SYSTEM_ADMIN` grant administration.** Adding a principal to an administration profile, team or group is refused to any other role.
- **Only `ADMIN` and `SYSTEM_ADMIN` update a scope definition.** `USERS_MANAGER` and `SECURITY_ADMIN` may still change the members of the profiles they manage.
- **Purging the caches is open to `USERS_MANAGER`, `SECURITY_ADMIN`, `FUNCTIONAL_ADMIN` and `TEMPLATE_MANAGER`**, in addition to `ADMIN`, so that each role sees its changes without waiting for the cache to expire.
- **New class ACLs for directory, OAuth and template documents.** In the 2026.2.0 scope template, the `LDAPConfiguration` and `OAuthClientConfiguration` classes use the new `acl-security-configuration-administration` ACL, and the `Template` class uses `acl-template-administration`. These ACLs let `SECURITY_ADMIN` manage the directory and OAuth configurations, and `TEMPLATE_MANAGER` manage email bodies and signatures.
  - **To use `SECURITY_ADMIN` or `TEMPLATE_MANAGER` on an existing scope:**
    1. Add the two ACLs to the scope and set them on the three classes. Updating the scope from the default flower-templates scope template does this for you.
    2. Then set the new ACL on the `LDAPConfiguration`, `OAuthClientConfiguration` and `Template` documents created before the upgrade. A document keeps the ACL it was created with, so without this step the two roles cannot manage them.

#### Behaviour changes

##### Functional

- **Faster searches for users who belong to many groups. ACL rules on `${user.authorities}` and `${user.id}` now compare exact values when filtering searches**, like the check on a single component already did. Preferences secured by the default `acl-preferences` proxy, such as stamps shared with a team, are not affected: they store full identifiers (see [Authorisation](/docs/flowerdocs/concepts/securite/autorisation)).

### API

#### Behaviour changes {#behaviour-changes-1}

- **`F00328` is now returned with HTTP 403**, instead of 500, and its message names the roles required: `Not allowed to perform this operation, one of the following roles is required: {0}`. Administration calls outside the caller's role are refused with this code.
- **The recovery bin is listed through its own endpoint.** The generic search no longer returns the deleted components of a recovery bin: the `PURGE` search context does not bypass the ACL filter anymore. Integrations that listed a recovery bin with the generic search must call `POST /{category}/recoverybin/search` instead (`documents`, `folders`, `tasks` or `virtualFolder`), open to `ADMIN`, `SYSTEM_ADMIN` and `RECOVERYBIN_MANAGER` (see [Recovery bin](/docs/flowerdocs/apis/core/examples/recoveryBin)).
- **Quotation marks in a Content criterion value are searched as typed.** They no longer mark an exact phrase, so a value wrapped in quotation marks now matches nothing. To search an exact phrase, use the `EQUALS_TO` operator without quotation marks.

#### Search operators {#search-operators}

`Operators` gains three values. `NOT_CONTAINS` (does not contain) applies to text tags and to the content criterion. `EMPTY` (is empty) and `NOT_EMPTY` (is not empty) apply to text, numeric, date and choice list tags, and to the content criterion. See [Criterion types and operators](/docs/flowerdocs/config/gui/search/configure#criterion-types-and-operators).

#### Additions

- Error codes, all HTTP 403 (see [Administration roles](/docs/flowerdocs/concepts/securite/administration-roles#error-codes)):

| Code     | Message                                                                                                                                              |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `F00329` | `Your {0} role lets you edit the data model, not delete {1}. This action is reserved for the ADMIN or SYSTEM_ADMIN profile.`                          |
| `F00330` | `Your {0} role lets you choose the ACL of a class when you create it, not change the ACL of {1}, which secures everything that uses the class. This action is reserved for the ADMIN or SYSTEM_ADMIN profile.` |
| `F00333` | `Not allowed to modify the privileged profile {0}`                                                                                                   |
| `F00335` | `Your {0} role lets you change the profiles of the scope {1}, not {2}. This action is reserved for the ADMIN or SYSTEM_ADMIN profile.`                |

- JavaScript API:
  - `Popup.buildSearchToSelectUnique` and `Popup.buildSearchToSelectMultiple` open a search popup in which the user selects one document or several documents, respectively.
  - `TaskJsAPI.registerBeforeAnswer` and `TaskJsAPI.registerAfterAnswer` run a callback before or after any task answer is applied (see [Tasks](/docs/flowerdocs/apis/jsapi/mcd/tasks)).
  - `ContextualMenuAPI.registerForActionDisplayResolution` is the new way to hide or show an action of the contextual menu. Do not override `registerToAddAnswersInTaskContextualMenu` anymore: a script that overrides it replaces the product's own script, which can break the contextual menu, as happened in previous versions. Move such scripts to `registerForActionDisplayResolution` (see [Shortcuts](/docs/flowerdocs/apis/jsapi/shortcut)).

## FlowerDocs GEC

Update the GEC scope with CLM.

### Modified configuration documents

From the GEC client package (`gec-scope`). Its `gec-env-scope`, GEC with eProcess, receives these changes and the eProcess ones listed in [FlowerDocs eProcess](#flowerdocs-eprocess).

The following configuration documents have been added :

- `acl-security-configuration-administration.xml`
- `acl-template-administration.xml`
- `gec-asyncTaskAnswer.js`
- `gec-asyncTaskAnswer.xml`

The following configuration documents have been modified :

- `acl-admin.xml`
- `acl-creation.xml`
- `acl-NA.xml`
- `acl-notifMail.xml`
- `acl-preferences.xml`
- `ACL_Courrier.xml`
- `ACL_DossierClient.xml`
- `ACL_GEC_Copy.xml`
- `ACL_GEC_Creation.xml`
- `ACL_GEC_Creation_GEC.xml`
- `ACL_GEC_End.xml`
- `ACL_GEC_End_GEC.xml`
- `ACL_GEC_NoCreation.xml`
- `ACL_GEC_PourInfo.xml`
- `ACL_GEC_PourInfo_Creation.xml`
- `ACL_GEC_Progress.xml`
- `ACL_GEC_Reaffectation.xml`
- `ACL_GED_Document.xml`
- `ACL_Reponse.xml`
- `ACL_Report.xml`
- `ACL_SOL_Modele.xml`
- `B_DirectionDestinataire.xml`
- `B_ServiceDestinataire.xml`
- `gec-copieCourrier.js`
- `gec-gui-configuration`
- `gui-solution`
- `LDAP.xml`
- `LDAPConfiguration.xml`
- `OAuthClientConfiguration.xml`
- `sol-common.js`
- `sol-hideAdminMenu.js`
- `Template.xml`
- `taskAvailable.js`
- `scope.xml`

## FlowerDocs eProcess

Update the eProcess scope with CLM.

### Attachments

- **Existing documents are attached through the `SearchAttachmentPlugin`.** The specific search script is replaced by the FlowerDocs plugin, which can attach several documents at once to a multivalued attachment. The plugin builds its criteria with `criteriaBuilder`; the static `criteria` option is deprecated.

### Modified configuration documents

From the eProcess client package (`env-scope`).

The following configuration documents have been added :

- `acl-security-configuration-administration.xml`
- `acl-template-administration.xml`
- `attachmentPlugin.js`
- `attachmentPlugin.xml`
- `searchAttachmentPlugin.js`
- `searchAttachmentPlugin.xml`

The following configuration documents have been modified :

- `acl-admin.xml`
- `acl-annotation.xml`
- `acl-creation.xml`
- `acl-NA.xml`
- `acl-notifMail.xml`
- `acl-preferences.xml`
- `ACL_DossierClient.xml`
- `ACL_ENV_Document.xml`
- `ACL_ENV_Task_Creation.xml`
- `ACL_ENV_Task_Fin.xml`
- `ACL_ENV_Task_NoCreation.xml`
- `ACL_ENV_Task_Traitement.xml`
- `ACL_ENV_Task_Traitement_EnAttente.xml`
- `ACL_ENV_Task_Traitement_ERROR.xml`
- `ACL_GED_Document.xml`
- `ACL_Report.xml`
- `ACL_SOL_Modele.xml`
- `env-enveloppes-search`
- `env-filterWorkflow.js`
- `env-home`
- `env-searchAttachment.js`
- `env-shortcuts`
- `ENV_MesEnveloppes.xml`
- `ENV_Statut.xml`
- `ENV_ToutesLesEnveloppes.xml`
- `gui-solution`
- `LDAP.xml`
- `LDAPConfiguration.xml`
- `OAuthClientConfiguration.xml`
- `sol-common.js`
- `sol-hideAdminMenu.js`
- `Template.xml`
- `scope.xml`
