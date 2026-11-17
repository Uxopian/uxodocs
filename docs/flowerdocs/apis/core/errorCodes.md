---
title: Error codes
sidebar_position: 6
description: Every error code FlowerDocs can return, and what to do about it.
date: "2026-11-16T00:00:00+01:00"
---

Every error FlowerDocs Core returns carries a code: `F00xxx` for **functional** errors
(something about the request, the data or the caller's rights — usually fixable by the
caller) and `T00xxx` for **technical** errors (the platform itself failed — search engine,
storage, directory). The tables below list every code, when it is returned and what to do
about it.

## How an error reaches the caller

- **REST**: Core answers with the HTTP status of the code (column *HTTP*), the headers `code` and `message`, and the body `{"code": "F00328", "message": "F00328: …"}`. The message always starts with the code.
- **GUI**: shows the server message. `F00039` and `T00001` are shown as they are, without the generic header.
- **Operation handlers**: Core passes on the code of a remote (REST) operation handler's error, read from the body or the `code` header, but only as a technical code. It reads the code as a `T` code, so a handler that answers an `F` code (e.g. `F00039`) does not get its code through. A Java operation handler can throw any code directly, using the `FunctionalErrorCode` / `TechnicalErrorCode` enum.
- **HTTP 500 for many functional codes**: most older functional codes still answer 500. Only the codes listed with 400, 403 or 404 use a client-error status.

## Error blocks

| Block | Domain                                      |
| ----- | ------------------------------------------- |
| F000  | Components and search                       |
| F001  | Folders                                     |
| F002  | Classes                                     |
| F003  | Security, sign-in and roles                 |
| F004  | Tasks                                       |
| F006  | Scopes                                      |
| F007  | Document files                              |
| F008  | Shares                                      |
| F009  | Tag categories and tag classes              |
| F010  | Reservations                                |
| F011  | Delegations                                 |
| F013  | Annotations and data masking                |
| F014  | Processes (workflows)                       |
| F015  | Versions                                    |
| F016  | Status (closed, draft)                      |
| F017  | Favorites                                   |
| F018  | Text content index                          |
| F019  | Feature flags                               |
| F020  | Logos                                       |
| T000  | General technical errors                    |
| T001  | Component storage                           |
| T002  | Class, scope, fact and saved-search storage |
| T003  | Process storage                             |
| T005  | Login history storage                       |
| T006  | Scope storage                               |
| T007  | File storage                                |
| T0080 | Tag class storage                           |
| T0085 | Tag category storage                        |
| T010  | ACL storage, users, groups and tokens       |
| T011  | Dates and other                             |
| T013  | Delegation storage                          |
| T014  | GUI labels                                  |
| T015  | Archives and exports                        |
| T016  | Jobs                                        |
| T018  | Text content index                          |
| T019  | Text extraction                             |
| T020  | Annotations                                 |
| T021  | History entries (facts)                     |
| T022  | Caches                                      |
| T0230 | OpenSearch reindex                          |
| T0231 | Shares                                      |

## F000xx · Components and search

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F00000` | `{0}` | 500 | A generic refusal whose message says what went wrong. | An operation handler changed a component or content in a way the operation does not allow; updating a favorite of a user who has none. | Read the message: it names the object. Check the operation handlers configured on the scope. |
| `F00001` | `Cannot process an empty list of documents` | 500 | The request carries no document or component to process. | Creating, updating or deleting components with an empty list. | Send at least one component. |
| `F00002` | `The document {0} cannot be deleted because it is attached to a closed folder {1}` | 500 | A document attached to a closed folder cannot be deleted. | Never returned. | - |
| `F00005` | `The supplied document {0} is invalid. It must contain data` | 500 | The component sent has no data (class, tags…). | Creating or updating a component. | Send the component with its data block. |
| `F00008` | `Class must be set for each component` | 500 | A component was sent without a class. | Creating or updating a component. | Set the class id on every component. |
| `F00009` | `The component class with id {0} does not exits but is set to component with id {1}` | 500 | The class set on the component does not exist in the scope. | Creating or updating a component. | Check the class id, or create the class first. |
| `F00012` | `The component {0} does not exist` | 500 | The component does not exist. | Getting, updating, versioning or deleting a component by id; getting a document's files; thumbnails. | Check the id and the scope. |
| `F00013` | `The provided creation date ''{0}'' is later than server one.` | 500 | The creation date sent is later than the server's clock. | Creating a component with an explicit creation date. | Send a date in the past, or let the server set it. |
| `F00016` | `The category of component {0} is {1} whereas the category of class {2} is {3}` | 500 | The component's category does not match its class's category (e.g. a folder with a document class). | Creating or updating a component. | Use a class of the same category as the component. |
| `F00020` | `The component {0} is invalid: the value {2} is not an allowed choice for tag {1}` | 500 | A tag value is not one of the allowed choices of its choice list. | Creating or updating a component. | Use a value listed in the tag class. |
| `F00023` | `Criterion operator is not correctly set, correct values are {0}` | 500 | A search criterion has an unknown operator. | Search requests. | Use one of the operators the message lists. |
| `F00024` | `Criterion type is not correctly set, correct values are {0}` | 500 | A search criterion has an unknown type. | Search requests. | Use one of the types the message lists. |
| `F00026` | `Criterion name must be set` | 500 | A search criterion has no name. | Search requests. | Name the field the criterion filters on. |
| `F00027` | `Criterion value must be set` | 500 | A search criterion has no value. | Search requests. | Give the criterion a value. |
| `F00029` | `Order name must be set` | 500 | A sort clause has no field name. | Search requests. | Name the field to sort on. |
| `F00030` | `Order type is not correctly set, correct values are {0}` | 500 | A sort clause has an unknown direction. | Search requests. | Use one of the values the message lists. |
| `F00031` | `Criteria item is not correctly set, correct values are {0}` | 500 | A search criteria item is malformed. | Search requests. | Use one of the item types the message lists. |
| `F00032` | `The tags {1} are not allowed for component {0} of class {2}` | 500 | The component carries tags its class does not declare. | Creating or updating a component. | Remove the tags, or add them to the class. |
| `F00033` | `The component {0} is invalid: the tag {1} is mandatory for class {2}` | 500 | A mandatory tag is missing. | Creating or updating a component; answering a task whose answer requires the tag. | Fill in the tag the message names. |
| `F00034` | `The component {0} is invalid: the value ''{1}'' does not match expected pattern for tag ''{2}''` | 500 | A tag value does not match the pattern set on its tag class. | Creating or updating a component. | Enter a value in the expected format. |
| `F00035` | `Component to update has no Id set` | 500 | The component to update has no id. | Updating a component. | Send the id of the component to update. |
| `F00036` | `The component {0} is invalid: the value ''{2}'' is not valid for tag {1}` | 500 | A tag value is not valid for its type (date, number, boolean…). | Creating or updating a component. | Enter a value of the tag's type. |
| `F00037` | `Component {0} of class {2} has a multivalued tag {1} whereas it is not referenced as multivalued` | 500 | Several values were sent for a tag that takes only one. | Creating or updating a component. | Send a single value, or make the tag multivalued in the class. |
| `F00038` | `The component {0} has an invalid conditional tag {1} with value {2}` | 500 | A conditional tag value is not allowed for the value of the tag it depends on. | Creating or updating a component. | Pick a value allowed for the parent tag's value. |
| `F00039` | `{0}` | 500 | A business rule refused the operation; the message comes from the rule. | FlowerDocs itself never raises it; it is for custom operation handlers. The GUI shows its message as it is. | Read the message: it is the rule's own text. |
| `F00040` | `The component {0} is invalid: the tag name ''{1}'' is duplicated` | 500 | The same tag appears twice on the component. | Creating or updating a component. | Send each tag once. |

## F001xx · Folders

| Code     | Message (EN)                                                                                          | HTTP | Meaning                                                  | When it is returned          | What you can do                                             |
| -------- | ----------------------------------------------------------------------------------------------------- | ---- | -------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------- |
| `F00101` | `Cannot process an empty list of folders` | 500  | No folder to process.                                    | Never returned.              | -                                                           |
| `F00102` | `A folder already exists with the name {0} in scope {1}` | 500  | A folder with this name already exists in the scope.     | Never returned.              | -                                                           |
| `F00104` | `Scope must be set and non Empty for folders. The scope of folder {0} is not set` | 500  | A folder has no scope.                                   | Never returned.              | -                                                           |
| `F00105` | `Scope must be unique for provided folders. Some folders have scope {0} and others {1}` | 500  | Folders processed together belong to different scopes.   | Never returned.              | -                                                           |
| `F00106` | `There is more than one folder with name {0} to process` | 500  | Two folders sent together have the same name.            | Never returned.              | -                                                           |
| `F00107` | `Folders data must be set` | 500  | Folder data is missing.                                  | Never returned.              | -                                                           |
| `F00108` | `Status code is a mandatory data for folder. The folder with name {0} does not have status code` | 500  | A folder has no status.                                  | Never returned.              | -                                                           |
| `F00109` | `The folder class {0} must be active` | 500  | The folder class is not active.                          | Never returned.              | -                                                           |
| `F00110` | `The tag {0} is mandatory for folder {1} but it is not set or is empty` | 500  | A folder is missing a mandatory tag.                     | Never returned.              | -                                                           |
| `F00111` | `Folder name must be set` | 500  | A folder has no name.                                    | Never returned.              | -                                                           |
| `F00112` | `Owner is a mandatory data for folder. Owner is not set for folder with name {0}` | 500  | A folder has no owner.                                   | Never returned.              | -                                                           |
| `F00113` | `The folder with name {0} has no class set.` | 500  | A folder has no class.                                   | Never returned.              | -                                                           |
| `F00114` | `The tag {0} must match pattern {1}. Value of this tag set for folder {2} is not matching` | 500  | A folder tag value does not match its pattern.           | Never returned.              | -                                                           |
| `F00115` | `The tag {0} is choice list type. The folder {1} has {2} value set which is not part of allowed values` | 500  | A folder tag value is not an allowed choice.             | Never returned.              | -                                                           |
| `F00116` | `The folder {0} is closed, it cannot be updated` | 500  | A closed folder cannot be updated.                       | Never returned.              | -                                                           |
| `F00117` | `The component {1} is already a child of {0}` | 500  | The component is already a child of this folder.         | Adding children to a folder. | Do not add it twice.                                        |
| `F00118` | `Folder {0} has a child with class {1} but it is not allowed for folder class {2}` | 500  | The folder class does not accept children of this class. | Adding children to a folder. | Add the child class to the folder class's allowed children. |
| `F00119` | `Folders {0} can not be deleted since they have at least a child` | 500  | A folder that still has children cannot be deleted.      | Deleting folders.            | Remove its children first.                                  |

## F002xx · Classes

| Code     | Message (EN)                                                                            | HTTP | Meaning                                              | When it is returned                                                    | What you can do                                            |
| -------- | --------------------------------------------------------------------------------------- | ---- | ---------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------- |
| `F00201` | `The list of component class must not be empty` | 500  | The request carries no class to process.             | Creating or updating classes (document, folder, virtual folder, task). | Send at least one class.                                   |
| `F00202` | `A component class already exist with the id {0}` | 500  | A class with this id already exists.                 | Creating a class.                                                      | Pick another id, or update the existing class.             |
| `F00203` | `The component class {0} has no data set` | 500  | The class has no data.                               | Creating or updating a class.                                          | Send the class with its data block.                        |
| `F00204` | `The component class {0} has no category set` | 500  | The class has no category.                           | Creating or updating a class.                                          | Set the category (DOCUMENT, FOLDER, VIRTUAL_FOLDER, TASK). |
| `F00205` | `The tag class(es) do(es) {0} not exist but are referenced for component class {1}` | 500  | The class references tag classes that do not exist.  | Creating or updating a class; validating a component's tags.           | Create the tag classes first, or remove the references.    |
| `F00206` | `The component classes {0} of category {1} do not exist` | 500  | The class does not exist.                            | Getting or updating a class by id; the logo administration screen.     | Check the class id and the scope.                          |
| `F00207` | `The component class {0} category has been changed from {1} to {2}` | 500  | The category of an existing class cannot be changed. | Updating a class.                                                      | Create a new class with the other category.                |
| `F00208` | `The component class {0} of category {1} does not reference a valid security object: {2}` | 500  | The class does not point to a valid ACL.             | Creating or updating a class.                                          | Set an existing ACL as the class's security object.        |

## F003xx · Security, sign-in and roles

| Code     | Message (EN)                                                                                                                                                                                                 | HTTP | Meaning                                                                                                        | When it is returned                                                                                                                             | What you can do                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `F00301` | `Cannot process an empty list of ACL` | 500  | The request carries no ACL to process.                                                                         | Creating or updating ACLs.                                                                                                                      | Send at least one ACL.                                                               |
| `F00302` | `Not allowed to create the scope {0}` | 403  | The user is not allowed to create a scope.                                                                     | Creating a scope.                                                                                                                               | Use a SYSTEM_ADMIN account.                                                          |
| `F00303` | `Not allowed to delete the scope {0}` | 403  | The user is not allowed to delete a scope.                                                                     | Deleting a scope.                                                                                                                               | Use a SYSTEM_ADMIN account.                                                          |
| `F00306` | `Not allowed to store a component of class {0}` | 500  | The user is not allowed to create a component of this class.                                                   | Creating a component.                                                                                                                           | Grant the create permission on the class's ACL.                                      |
| `F00308` | `Not allowed to update the component {0} of class {1}` | 500  | The user is not allowed to update this component.                                                              | Updating a component; changing a document's class.                                                                                              | Grant the update permission on the component's ACL.                                  |
| `F00309` | `Not allowed to delete the component {0} of class {1}` | 500  | The user is not allowed to delete this component.                                                              | Deleting a component (a closed component cannot be deleted); creating a component directly in the DELETED status without the delete permission. | Grant the delete permission on the component's ACL; reopen a closed component first. |
| `F00314` | `The class {0} has an invalid referenced ACL {1}` | 500  | The class points to an ACL that cannot be resolved.                                                            | Any access to a component of that class.                                                                                                        | Fix the class's security object.                                                     |
| `F00315` | `Invalid user type {0} has been retrieved from security context for user {1}` | 500  | The signed-in user's identity is of an unexpected type.                                                        | Authentication.                                                                                                                                 | Check the authentication configuration (custom user provider).                       |
| `F00316` | `User {0} is not allowed to access to {1}` | 500  | The user is not allowed in this scope.                                                                         | Signing in to a scope; any request to a scope.                                                                                                  | Add the user (or a group) to the scope's ACL.                                        |
| `F00317` | `You are not allowed to modify the scope {0}` | 403  | The user is not allowed to modify this scope.                                                                  | Updating a scope.                                                                                                                               | Use an administrator account.                                                        |
| `F00318` | `ACL {0} has no ACE set` | 500  | An ACL has no entry.                                                                                           | Creating or updating an ACL.                                                                                                                    | Add at least one entry.                                                              |
| `F00319` | `ACL {0} ''s ACE has no grant value set` | 500  | An ACL entry does not say whether it grants or denies.                                                         | Creating or updating an ACL.                                                                                                                    | Set the grant value of each entry.                                                   |
| `F00320` | `ACL {0} ''s ACE has no principal` | 500  | An ACL entry has no principal (user or group).                                                                 | Creating or updating an ACL.                                                                                                                    | Name at least one principal per entry.                                               |
| `F00321` | `ACL {0} ''s ACE has no permission` | 500  | An ACL entry has no permission.                                                                                | Creating or updating an ACL.                                                                                                                    | Give each entry at least one permission.                                             |
| `F00322` | `ACL(s) {0} do not exist` | 500  | The ACL does not exist.                                                                                        | Getting, updating or deleting an ACL.                                                                                                           | Check the ACL id.                                                                    |
| `F00323` | `Failed to change password for user {0}: given passwords are null or mismatch` | 500  | The new passwords are empty or do not match.                                                                   | Changing a password in the GUI.                                                                                                                 | Enter the same new password twice.                                                   |
| `F00324` | `The credentials of user {0} are invalid` | 500  | The user name or password is wrong.                                                                            | Signing in (GUI, REST, token); changing a password.                                                                                             | Check the credentials.                                                               |
| `F00325` | `The user is not allowed to update the content of component {0}` | 500  | The user is not allowed to change this document's content (files, annotations).                                | Adding, replacing, renaming or deleting a document's files; editing annotations.                                                                | Grant the update-content permission on the document's ACL.                           |
| `F00326` | `Change the password of user {0} is not allowed` | 500  | The user is not allowed to change another user's password.                                                     | Changing a password.                                                                                                                            | Only the user themself, a USERS_MANAGER or a SECURITY_ADMIN can.                     |
| `F00327` | `The user is not allowed to create technical fact` | 500  | The user is not allowed to create history entries (facts).                                                     | Creating facts through the API.                                                                                                                 | Use an ADMIN account.                                                                |
| `F00328` | `Not allowed to perform this operation, one of the following roles is required: {0}` | 403  | The user lacks the role the operation needs; the message lists the roles.                                      | Administration and role-gated operations (REST, GUI, MCP tools), e.g. the recycle bin.                                                          | Give the user one of the listed roles.                                               |
| `F00329` | `Your {0} role lets you edit the data model, not delete {1}. This action is reserved for the ADMIN or SYSTEM_ADMIN profile.` | 403  | Deleting part of the data model (class, tag category, process, tag value) is reserved for full administrators. | Deleting a class, tag category, process or tag value.                                                                                           | Ask an ADMIN or SYSTEM_ADMIN.                                                        |
| `F00330` | `Your {0} role lets you choose the ACL of a class when you create it, not change the ACL of {1}, which secures everything that uses the class. This action is reserved for the ADMIN or SYSTEM_ADMIN profile.` | 403  | The ACL of an existing class can only be changed by a full administrator.                                      | Updating a class's ACL.                                                                                                                         | Ask an ADMIN or SYSTEM_ADMIN.                                                        |
| `F00331` | `User {0} account is temporary locked, try again later or contact your administrator` | 500  | The account is temporarily locked after too many failed sign-ins.                                              | Signing in.                                                                                                                                     | Wait and try again, or ask an administrator to unlock it.                            |
| `F00332` | `Only a system administrator is authorized to unlock an account` | 500  | Only a system administrator can unlock an account.                                                             | Unlocking an account.                                                                                                                           | Use a SYSTEM_ADMIN account.                                                          |
| `F00333` | `Not allowed to modify the privileged profile {0}` | 403  | The user cannot add people to a privileged profile (e.g. ADMIN, SYSTEM_ADMIN).                                 | Editing users, groups or scope profiles.                                                                                                        | Ask someone who holds that profile's role.                                           |
| `F00335` | `Your {0} role lets you change the profiles of the scope {1}, not {2}. This action is reserved for the ADMIN or SYSTEM_ADMIN profile.` | 403  | An identity manager may change the scope's profiles, not the scope itself.                                     | Updating a scope's description, languages, display names or ACL.                                                                                | Ask an ADMIN or SYSTEM_ADMIN.                                                        |

## F004xx · Tasks

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F00412` | `The user is not allowed to apply the reasoned answer` | 500 | The user is not allowed to apply this answer. | Answering a task. | Grant the apply-answer permission on the task's ACL. |
| `F00413` | `At least one required attachment is missing on task {0}` | 500 | A mandatory task attachment is missing. | Answering or updating a task. | Attach the required document. |
| `F00414` | `An attachment was found but this task does not accept attachments {0}` | 500 | The task does not accept attachments. | Answering or updating a task. | Remove the attachments. |
| `F00415` | `An attachment was found from a class not accepted as attachments on task {0}` | 500 | The attachment's class is not accepted by this task. | Answering or updating a task. | Attach a document of an accepted class. |
| `F00416` | `A readOnly attachment was being updated on task {0}` | 500 | A read-only attachment was changed. | Answering or updating a task. | Leave read-only attachments unchanged. |
| `F00417` | `The monovalued attachment {0} has more than one occurrence on task {1}` | 500 | A single-valued attachment was given several times. | Answering or updating a task. | Attach one document only. |
| `F00418` | `The task {0} is already reserved by another user, you cannot assign it to yourself` | 500 | The task is reserved by another user. | Answering, assigning or updating a task. | Wait for it to be released, or ask that user. |
| `F00419` | `The answer {1} you tried to apply does not exist in task class {0}` | 500 | The answer does not exist in the task class. | Answering a task. | Use one of the class's answers. |
| `F00420` | `The user is not allowed to assign the task {0} of class {1}` | 500 | The user is not allowed to assign this task. | Assigning a task. | Grant the assign permission. |
| `F00421` | `The user is not allowed to appropriate the task {0} of class {1}` | 500 | The user is not allowed to take this task. | Taking (appropriating) a task. | Grant the appropriate permission. |
| `F00422` | `The user is not allowed to appropriate the task {0} of class {1} already assigned` | 500 | The user is not allowed to take a task already assigned to someone else. | Taking an assigned task. | Grant the appropriate-already-assigned permission. |
| `F00423` | `The task {0} is not assigned to the user` | 500 | The task is not assigned to this user. | Answering, updating or deleting a task. | Assign the task to the user first. |
| `F00433` | `The answer is invalid: the tag {0} is mandatory` | 500 | The answer is missing a mandatory tag. | Answering a task. | Fill in the tag the message names. |
| `F00434` | `The answer is invalid: the tag {0} is monovalued` | 500 | The answer gives several values for a single-valued tag. | Answering a task. | Send a single value. |

## F006xx · Scopes

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F00601` | `The symbolic name of a scope must be unique. One of {0} already exists` | 500 | A scope with this id already exists. | Creating a scope. | Pick another id. |
| `F00602` | `The supplied scope(s) {0} does not exist` | 500 | The scope does not exist. | Never returned. | - |
| `F00603` | `The symbolic name of a scope must not be empty` | 500 | The scope id is empty. | Never returned. | - |
| `F00604` | `The symbolic name of a scope must be unique. More than one  scope with {0} name has been provided` | 500 | Two scopes sent together have the same id. | Never returned. | - |
| `F00605` | `The provided list of scope must not be empty` | 500 | The request carries no scope. | Creating scopes. | Send at least one scope. |
| `F00606` | `The id of scope {0} must not be changed` | 500 | A scope's id cannot be changed. | Never returned. | - |

## F007xx · Document files

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F00701` | `The supplied file has no content` | 500 | The file sent has no content. | Never returned. | - |
| `F00702` | `The access to files of document {0} is not allowed.` | 500 | The user is not allowed to read this document's files. | Downloading or viewing a document's files. | Grant the read-content permission on the document's ACL. |
| `F00703` | `At least one of the files in document {0} has no identifier` | 500 | A file of the document has no id. | Creating or updating a document. | Give every file an id (the temporary file id from the upload). |
| `F00704` | `The file {0} cannot be found` | 500 | The file does not exist on the document. | Renaming or getting a file. | Check the file id. |

## F008xx · Shares

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F00801` | `The starting date {0} is after the ending date {1}` | 500 | The share's start date is after its end date. | Never returned. | - |
| `F00802` | `The ending date {0} is after the current date {1}` | 500 | The share's end date is in the past. | Creating a share. | Pick an end date in the future. |
| `F00803` | `The starting date must be set` | 500 | The share has no start date. | Never returned. | - |
| `F00804` | `The ending date must be set` | 500 | The share has no end date. | Creating a share. | Set an end date. |
| `F00805` | `The ending date {0} is beyond the maximum share duration of {1} days` | 500 | The share's end date is beyond the maximum share duration. | Creating a share. | Pick an earlier end date, or raise the maximum duration. |
| `F00806` | `The share cannot be created without a recipient: add at least one recipient email address.` | 500 | The share has no recipient. | Creating a share. | Add at least one recipient email address. |
| `F00807` | `The recipient address ''{0}'' is not a valid email address. Enter it in the form name@example.com.` | 500 | A recipient address is not a valid email address. | Creating a share. | Enter it as name@example.com. |
| `F00808` | `The address {1} is not allowed to open share {0}: only the addresses chosen by the person who shared it can.` | 403 | The address given is not a recipient of the share. | A recipient signing in to a share; recording a recipient's view or download. | Use the address the share was sent to. |
| `F00810` | `The share search cannot filter on {0} with the operator {1} and the values {2}. It filters on: {3}.` | 400 | The share search cannot filter this way. | Searching shares. | Filter on one of the fields the message lists. |
| `F00811` | `The share search cannot sort on {0}. It sorts on: {1}.` | 400 | The share search cannot sort on this field. | Searching shares. | Sort on one of the fields the message lists. |
| `F00812` | `You cannot open share {0}: only the user who created it, an administrator, or a user who can read one of its documents can open it.` | 403 | The user cannot open this share. | Getting a share in FlowerDocs. | Only its creator, an administrator, or a user who can read one of its documents can. |
| `F00814` | `The share {0} ended on {1}: the end date its sender set has passed. Ask the sender to share the documents with you again.` | 403 | The share has ended. | A recipient opening a share. | Ask the sender to share the documents again. |
| `F00823` | `The share search cannot look for the shares of {0} {1}: it only looks for the shares of a DOCUMENT.` | 400 | Only the shares of a document can be searched. | Searching the shares of a component. | Search on a document. |
| `F00824` | `You cannot share document {0}: sharing a document needs the Share permission on it, and you do not have it on this one, or you cannot read it, or it does not exist. Ask an administrator, or whoever manages the security of this document, to grant you the Share permission on it.` | 403 | The user cannot share this document. | Creating a share. | Grant the Share permission on the document. |
| `F00825` | `The share {0} does not exist: it may have been deleted, or the link is wrong. Ask the sender for a new link.` | 404 | The share does not exist. | Getting or opening a share. | Check the link, or ask the sender for a new one. |
| `F00826` | `The link to share {0} is not valid: it was changed or comes from another share. Open the link exactly as you received it, or ask the sender for a new one.` | 403 | The share link is not valid for this share. | A recipient opening a share. | Open the link exactly as received. |
| `F00827` | `Share {0} was revoked: its link no longer opens it. Ask the sender to share the documents with you again.` | 403 | The share was cancelled by its sender. | A recipient opening a share. | Ask the sender to share the documents again. |
| `F00830` | `The share history cannot record the action {0}: it only records a recipient viewing or downloading a shared document.` | 400 | The share history only records views and downloads. | Recording a recipient's action. | Record VIEW or DOWNLOAD only. |
| `F00831` | `Document {0} is not part of share {1}: the share history only records the documents the share gives access to.` | 403 | The document is not part of the share. | Recording a recipient's view or download. | Record only the share's documents. |
| `F00833` | `Only the share application can record what a recipient of share {0} viewed or downloaded: it does so with a system administrator account, and you are not a system administrator.` | 403 | Only the share application records what a recipient viewed or downloaded. | Recording a recipient's view or download. | Call it with the share application's system administrator account. |

## F009xx · Tag categories and tag classes

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F00898` | `A valid identifier must be set on tag category (actual=''{0}'')` | 500 | The tag category or process has an invalid id. | Creating or updating a tag category or a process (workflow). | Set a valid id. |
| `F00900` | `A tag category with id {0} already exists` | 500 | A tag category with this id already exists. | Creating a tag category. | Pick another id. |
| `F00901` | `A valid identifier must be set on tag class (actual=''{0}'')` | 500 | The tag class has an invalid id. | Creating or updating a tag class. | Use a valid id. |
| `F00902` | `A valid tag value type must be set on tag class (actual=''{0}'')` | 500 | The tag class has no valid value type. | Creating or updating a tag class. | Set a supported type (string, date, integer…). |
| `F00903` | `A tag class with id {0} already exists` | 500 | A tag class with this id already exists. | Creating a tag class. | Pick another id. |

## F010xx · Reservations

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F01002` | `Components are already reserved: {0}` | 500 | The components are already reserved. | Reserving components; versioning a reserved document. | Wait for the reservation to be released. |
| `F01003` | `The reservations for components {0} could not be released because they are reserved by other user(s).` | 500 | The reservations belong to other users and cannot be released. | Releasing reservations. | Ask the users who hold them, or an administrator. |

## F011xx · Delegations

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F01101` | `The current user who wants to create a delegation must be a Delegation Manager or the Delegator himself.` | 403 | Only a delegation manager or the delegator can create this delegation. | Creating a delegation. | Ask a delegation manager. |
| `F01102` | `The current user who wants to update a delegation must be a Delegation Manager or the Delegator himself.` | 403 | Only a delegation manager or the delegator can change or delete this delegation. | Updating or deleting a delegation. | Ask a delegation manager. |
| `F01103` | `The delegation is not valid.` | 500 | The delegation is not valid. | Creating or updating a delegation. | Check the delegation id and content. |
| `F01104` | `The delegation must have coherent dates.` | 500 | The delegation's dates are missing or incoherent, or fixed values were changed. | Creating or updating a delegation. | Set a start date before the end date; do not change fixed fields. |
| `F01105` | `Delegation(s) asked to be updated is not found in the database.` | 500 | The delegation to update does not exist. | Updating a delegation. | Check the delegation id. |

## F013xx · Annotations and data masking

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F01301` | `Current user is not allowed to create data masking on document {0}` | 500 | The user is not allowed to mask data on this document. | Creating data masking (obfuscation). | Grant the obfuscate permission. |
| `F01303` | `Current user is not allowed to read annotations for document {0}` | 500 | The user is not allowed to read this document's annotations. | Reading annotations. | Grant the read-annotation permission. |
| `F01304` | `Current user is not allowed to create annotations for document {0}` | 500 | The user is not allowed to create annotations on this document. | Creating annotations. | Grant the create-annotation permission. |
| `F01305` | `Current user is not allowed to update annotations for document {0}` | 500 | The user is not allowed to update annotations on this document. | Updating annotations. | Grant the update-annotation permission. |
| `F01306` | `Current user is not allowed to delete annotations for document {0}` | 500 | The user is not allowed to delete annotations on this document. | Deleting annotations. | Grant the delete-annotation permission. |

## F014xx · Processes (workflows)

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F01401` | `A workflow with id {0} already exists` | 500 | A process with this id already exists. | Creating a process (workflow). | Pick another id. |

## F015xx · Versions

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F01500` | `The document {0} is not the current version` | 500 | The document is not the current version. | Updating or versioning an older version. | Work on the current version. |
| `F01501` | `The version label must be set` | 500 | The version label is missing. | Promoting a version in the GUI. | Enter a version label. |
| `F01502` | `Version {0} already exist` | 500 | A version with this label already exists. | Creating a version. | Use another label. |
| `F01504` | `Reverted target version {0} does not exist in version series {1}` | 500 | The version to revert to does not exist. | Reverting a document to a version. | Check the version id. |
| `F01505` | `Not allowed to read version {0} of class {1}` | 500 | The user is not allowed to read this version. | Reading a version. | Grant the read permission. |
| `F01507` | `Not allowed to update version {0} of class {1}` | 500 | The user is not allowed to update this version. | Updating or reverting a version. | Grant the update permission. |
| `F01508` | `Not allowed to delete version {0} of class {1}` | 500 | The user is not allowed to delete this version. | Deleting a version. | Grant the delete permission. |
| `F01509` | `Not allowed to update file on version {0} of class {1}` | 500 | The user is not allowed to change files on this version. | Reverting a version. | Grant the update-content permission. |

## F016xx · Status (closed, draft)

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F01601` | `Not allowed to update a closed component {0} of class {1}` | 500 | A closed component cannot be changed. | Updating a closed component, adding children to a closed folder, answering or assigning a closed task. | Reopen it first, if the class allows it. |
| `F01602` | `Not allowed to answer a draft task {0} of class {1}` | 500 | A draft task cannot be answered. | Answering a task. | Submit the task first. |

## F017xx · Favorites

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F01701` | `Favorites concurrent modification is not supported` | 500 | Two updates of the same favorites happened at once. | Updating favorites. | Reload and try again. |

## F018xx · Text content index

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F01801` | `Cannot index document content with invalid identifiers : document={0}, file={1}` | 500 | The document or file id is invalid. | Indexing a file's text content. | Check the document and file ids. |
| `F01802` | `Cannot de-index document content with invalid identifiers : document={0}, file={1}` | 500 | The document or file id is invalid. | Removing a file's text content from the index. | Check the document and file ids. |
| `F01803` | `Cannot get document content with invalid identifiers : document={0}, file={1}` | 500 | The document or file id is invalid. | Getting a file's indexed text content. | Check the document and file ids. |

## F019xx · Feature flags

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F01901` | `External share feature is disabled` | 403 | External sharing is turned off. | Any share operation; the share application's logo. | Turn the external share feature on. |

## F020xx · Logos

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `F02001` | `No logo of type {0} is configured. Please contact your administrator.` | 404 | No logo of this type is configured. | Getting a logo (GUI, share application). | Configure the logo in the administration. |
| `F02002` | `The logo {0} of type {1} cannot be shown: {2,choice,0#it has no file&#124;1#its file format {3} is not a PNG, JPEG or SVG image}. Please contact your administrator.` | 404 | The logo has no file, or its file is not a PNG, JPEG or SVG image. | Getting a logo. | Upload a PNG, JPEG or SVG file for the logo. |

## T000xx · General technical errors

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T00000` | `{0}` | 500 | An unexpected technical error; the message carries the cause. | Anywhere: storage, OpenSearch scripts, operation handlers, imports, file integrity. | Read the message and the server log; contact support with both. |
| `T00001` | `{0}` | 500 | A technical error to show as is; the message carries the cause. | Importing folders through CLM. The GUI shows its message as it is. | Read the message; fix the import data. |
| `T00007` | `No OpenSearch node is available` | 500 | The search engine (OpenSearch) cannot be reached. | Any request that reads or writes the index; reindexing. | Check OpenSearch is up and reachable from Core. |
| `T00008` | `Authentication impossible: {0}` | 500 | Authentication failed for a technical reason. | Signing in. | Check the identity provider (LDAP, SSO) and the server log. |
| `T00012` | `The {0} object cannot be serialized to String using JAXB` | 500 | An object could not be written as XML. | Exporting a scope, classes or components through CLM; merging. | Contact support with the server log. |
| `T00013` | `XML cannot be parsed to {0}` | 500 | An XML file could not be read. | Importing through CLM. | Check the XML file is well-formed and matches the expected schema. |

## T001xx · Component storage

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T00101` | `Components cannot be stored due to a technical error` | 500 | Components could not be saved. | Creating components. | Check OpenSearch; retry; contact support. |
| `T00102` | `Components {0} cannot be updated due to a technical error` | 500 | Components could not be updated. | Updating components or favorites. | Check OpenSearch; retry. |
| `T00103` | `Components cannot be fetched due to a technical error for ids={0}` | 500 | Components could not be read. | Getting components or versions. | Check OpenSearch. |
| `T00104` | `Components cannot be found due to a technical error for {0}` | 500 | The search could not run. | Searching; exports. | Check OpenSearch and the search request. |
| `T00105` | `Components cannot be deleted due to a technical error for ids={0}` | 500 | Components could not be deleted. | Deleting components or versions. | Check OpenSearch; retry. |
| `T00106` | `Components search results count exceed search count limit` | 500 | The search returned more results than the allowed limit. | Never returned. | - |
| `T00107` | `Components {0} could not be updated due to conflict version: {1}` | 500 | The component was changed by someone else in the meantime. | Updating a component. | Reload it and apply the change again. |
| `T00108` | `Components {0} already exist` | 500 | Components with these ids already exist. | Creating components with explicit ids. | Use new ids. |
| `T10102` | `Some component cannot be updated due to a technical error: {0}` | 500 | Some components of a batch could not be updated. | Updating several components in one call. | Read which ones in the message; retry them. |

## T002xx · Class, scope, fact and saved-search storage

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T00201` | `Component classes cannot be stored: {0}` | 500 | Classes, facts, scopes or saved searches could not be saved. | Creating classes, history entries, scopes or saved searches. | Check OpenSearch; retry. |
| `T00202` | `Component classes cannot be updated` | 500 | Classes or saved searches could not be updated. | Updating classes or saved searches. | Check OpenSearch; retry. |
| `T00203` | `Component classes cannot be fetched from ids={0}` | 500 | Classes or saved searches could not be read. | Getting classes or saved searches. | Check OpenSearch. |
| `T00205` | `Component classes cannot be removed for ids={0}` | 500 | Classes or saved searches could not be deleted. | Deleting classes or saved searches. | Check OpenSearch; retry. |
| `T00206` | `Component classes cannot be found for category={1}` | 500 | The classes of a category could not be listed. | Listing all classes. | Check OpenSearch. |

## T003xx · Process storage

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T00301` | `Workflows {0} cannot be stored` | 500 | Processes could not be saved. | Creating processes (workflows). | Check OpenSearch; retry. |
| `T00302` | `Workflows {0} cannot be fetched` | 500 | Processes could not be read. | Getting processes. | Check OpenSearch. |
| `T00303` | `All workflows cannot be fetched` | 500 | The processes could not be listed. | Listing processes. | Check OpenSearch. |
| `T00304` | `Workflows {0} cannot be updated` | 500 | Processes could not be updated. | Updating processes. | Check OpenSearch; retry. |
| `T00305` | `Workflows {0} cannot be deleted` | 500 | Processes could not be deleted. | Deleting processes. | Check OpenSearch; retry. |

## T005xx · Login history storage

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T00501` | `Baskets cannot be added` | 500 | The sign-in history could not be saved. | Signing in (the login history entry). | Check OpenSearch. |
| `T00503` | `All baskets cannot be fetched` | 500 | The sign-in history could not be read or purged. | Reading or purging login history. | Check OpenSearch. |

## T006xx · Scope storage

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T00602` | `Scopes cannot be fetched for {0}` | 500 | Scopes could not be read. | Getting scopes; checking access to a scope. | Check OpenSearch and that the scope exists. |
| `T00604` | `Scopes {0} cannot be updated` | 500 | The scope could not be updated. | Updating a scope. | Check OpenSearch; retry. |
| `T00605` | `Scopes {0} cannot be deleted` | 500 | The scope could not be deleted. | Deleting a scope. | Check OpenSearch; retry. |

## T007xx · File storage

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T00701` | `The file could not be stored: {0}` | 500 | The file could not be stored. | Uploading or adding a file (file system or S3). | Check the storage (disk space, rights, S3 bucket). |
| `T00702` | `Document files cannot be retrieved for {0} and scope {1}` | 500 | The file could not be read. | Downloading or viewing a file. | Check the storage and that the file is still there. |
| `T00703` | `Document files cannot be deleted for {0}` | 500 | The file could not be deleted. | Deleting a file or a document. | Check the storage rights. |
| `T00704` | `Document file {0} cannot be read` | 500 | The file could not be read. | Reading a file's size or content (S3, text extraction). | Check the storage. |
| `T00705` | `Temporary file cannot be created in the folder {0}` | 500 | A temporary file could not be created. | Uploading a file. | Check the temporary folder exists and is writable. |
| `T00707` | `No temporary file could be found for id {0}` | 500 | The uploaded temporary file no longer exists. | Using an upload id to create a document. | Upload the file again; it may have expired. |
| `T00708` | `Integrity of file {0} has been violated` | 500 | The stored file is corrupted: its checksum no longer matches. | Reading or copying a file. | Restore the file from backup; contact support. |
| `T00709` | `File {0} cannot be indexed` | 500 | The file could not be renamed or indexed. | Renaming a file. | Check the storage and the server log. |

## T0080x · Tag class storage

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T00801` | `Tag classes cannot be stored` | 500 | Tag classes could not be saved. | Creating tag classes. | Check OpenSearch; retry. |
| `T00803` | `Tag classes cannot be got for {0}` | 500 | Tag classes could not be read. | Getting tag classes. | Check OpenSearch. |
| `T00804` | `All tag classes cannot be fetched from data store` | 500 | The tag classes could not be listed. | Listing tag classes. | Check OpenSearch. |
| `T00805` | `Tag classes {0} cannot be updated` | 500 | Tag classes could not be updated. | Updating tag classes. | Check OpenSearch; retry. |
| `T00806` | `Tag classes {0} cannot be deleted` | 500 | Tag classes could not be deleted. | Deleting tag classes. | Check OpenSearch; retry. |

## T0085x · Tag category storage

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T00851` | `Tag categories cannot be stored` | 500 | Tag categories could not be saved. | Creating tag categories. | Check OpenSearch; retry. |
| `T00853` | `Tag categories cannot be got for {0}` | 500 | Tag categories could not be read. | Getting tag categories. | Check OpenSearch. |
| `T00854` | `All tag categories cannot be fetched from data store` | 500 | The tag categories could not be listed. | Listing tag categories. | Check OpenSearch. |
| `T00855` | `Tag categories {0} cannot be updated` | 500 | Tag categories could not be updated. | Updating tag categories. | Check OpenSearch; retry. |
| `T00856` | `Tag categories {0} cannot be deleted` | 500 | Tag categories could not be deleted. | Deleting tag categories. | Check OpenSearch; retry. |

## T010xx · ACL storage, users, groups and tokens

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T01001` | `ACL cannot be stored` | 500 | ACLs could not be saved. | Creating ACLs. | Check OpenSearch; retry. |
| `T01002` | `ACL cannot be got for {0}` | 500 | ACLs could not be read. | Getting ACLs. | Check OpenSearch. |
| `T01003` | `ACL {0} cannot be updated` | 500 | The ACL could not be updated. | Updating an ACL. | Check OpenSearch; retry. |
| `T01005` | `ACL {0} could not be removed` | 500 | The ACL could not be deleted. | Deleting an ACL. | Check OpenSearch; retry. |
| `T01006` | `Could not get all ACLs` | 500 | The ACLs could not be listed. | Listing ACLs. | Check OpenSearch. |
| `T01007` | `The user {0} could not be got` | 500 | The user (or group) could not be read from the directory. | Signing in; reading a user or group (LDAP). | Check the LDAP connection and the user's DN. |
| `T01008` | `The user {0} could not be created` | 500 | The user could not be created. | Creating a user in the GUI. | Check the directory and the server log. |
| `T01009` | `The user {0} could not be modified` | 500 | The user could not be changed. | Updating a user (LDAP). | Check the directory and the server log. |
| `T01010` | `Could not find users for {0}` | 500 | Users could not be searched. | Searching users. | Check the directory. |
| `T01012` | `Could not found LDAP Distinguished Name for user {0}` | 500 | The user's entry was not found in the directory. | Signing in; reading a user (LDAP). | Check the user exists under the configured base DN. |
| `T01013` | `Could not map attribute {0} on identity` | 500 | A directory attribute could not be mapped to the user. | Reading a user (LDAP). | Check the attribute mapping configuration. |
| `T01014` | `The user token is invalid: ''{0}''` | 500 | The token is not valid: it was not signed by this platform, or it is malformed. | Any request with a token; opening a share link. | Sign in again; check every server shares the same token key. |
| `T01015` | `The user token has expired: ''{0}''` | 500 | The token has expired. | Any request with a token; opening a share link. | Sign in again, or ask for a new link. |
| `T01016` | `The password does not meet the length, complexity, or history requirements of the domain` | 500 | The password does not meet the directory's password rules. | Changing a password (LDAP). | Choose a longer or more complex password. |
| `T01017` | `LDAP action could not be performed within non-secure connection` | 500 | The directory refuses this change over an unencrypted connection. | Changing a password (LDAP). | Configure LDAPS. |
| `T01018` | `The user {0} could not be created because it already exists in the directory` | 500 | The user already exists in the directory. | Creating a user (LDAP). | Use another login. |
| `T01019` | `The group {0} could not be created because it already exists in the directory` | 500 | The group already exists in the directory. | Creating a group (LDAP). | Use another name. |
| `T01020` | `The group {0} could not be got` | 500 | The group could not be read from the directory. | Reading groups (LDAP). | Check the LDAP connection. |
| `T01021` | `The group {0} could not be created` | 500 | The group could not be created. | Creating a group. | Check the directory and the server log. |
| `T01022` | `The group {0} could not be modified` | 500 | The group could not be changed. | Updating a group. | Check the directory and the server log. |
| `T01023` | `Could not find groups for {0}` | 500 | Groups could not be searched. | Searching groups. | Check the directory. |
| `T01024` | `The user {0} could not be deleted` | 500 | The user could not be deleted. | Deleting a user. | Check the directory and the server log. |
| `T01025` | `The group {0} could not be deleted` | 500 | The group could not be deleted. | Deleting a group. | Check the directory and the server log. |

## T011xx · Dates and other

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T01101` | `The date {0} cannot be parsed. The valid format is {1}` | 500 | A date could not be read; the message gives the expected format. | Any request carrying a date. | Send the date in the format the message gives. |
| `T01102` | `Uncategorized error: {0}` | 500 | An unexpected error while changing a password. | Changing a password in the GUI. | Read the server log. |
| `T01103` | `Failed to download search result due to an internal error` | 500 | The search result could not be downloaded. | Never returned. | - |

## T013xx · Delegation storage

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T01301` | `Delegation cannot be stored: {0}` | 500 | The delegation could not be saved. | Creating a delegation. | Check OpenSearch; retry. |
| `T01302` | `Delegation cannot be updated` | 500 | The delegation could not be updated. | Updating a delegation. | Check OpenSearch; retry. |
| `T01303` | `Delegation cannot be fetched from ids={0}` | 500 | Delegations could not be read. | Getting or searching delegations. | Check OpenSearch. |
| `T01304` | `Delegation cannot be removed for ids={0}` | 500 | The delegation could not be deleted. | Deleting a delegation. | Check OpenSearch; retry. |

## T014xx · GUI labels

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T01401` | `Labels from internal cannot be fetched for locale={0}` | 500 | The GUI labels could not be loaded. | Loading the GUI's labels for a language. | Check the server log. |

## T015xx · Archives and exports

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T01501` | `Content cannot be fetched for search : {0}` | 500 | The content of a search could not be gathered. | Downloading the documents of a search as an archive. | Check the search and the server log. |
| `T01502` | `Content cannot be fetched for {0} with id {1}` | 500 | The content of a component could not be gathered. | Downloading a folder or documents as an archive. | Check the server log. |
| `T01503` | `Folder does not exist or is empty, its content cannot be exported.` | 500 | The folder does not exist or is empty: nothing to export. | Exporting a folder's content. | Check the folder has documents. |
| `T01504` | `Could not convert file {0} of document {1} as PDF` | 500 | A file could not be converted to PDF. | Never returned. | - |

## T016xx · Jobs

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T01601` | `Job identifier ''{0}'' is invalid` | 500 | The job id is invalid. | Getting the file a job produced (CSV export…). | Check the job id. |
| `T01602` | `Result of job {0} cannot be get` | 500 | The job's result could not be read. | Never returned. | - |
| `T01603` | `No job can be found for jobId {0}` | 500 | No job has this id. | Getting a job's result. | Check the id; the job may have been purged. |

## T018xx · Text content index

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T01801` | `Could not index document content for file {1} of document {0}` | 500 | A file's text could not be indexed. | Indexing a file's text content. | Check OpenSearch. |
| `T01802` | `Could not de-index document content for file {1} of document {0}` | 500 | A file's text could not be removed from the index. | Removing a file's text content. | Check OpenSearch. |
| `T01803` | `Could not get document content for file {1} of document {0}` | 500 | A file's indexed text could not be read. | Getting a file's text content. | Check OpenSearch. |

## T019xx · Text extraction

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T01901` | `Could not extract document content for file {1} of document {0}. Mime type {2} is not supported` | 500 | The file type is not supported for text extraction. | Indexing a file's text content. | Nothing to fix: that file's text is not searchable. |
| `T01902` | `Could not extract document content for file {1} of document {0}. Cannot fetch page informations for Layout ''{2}''` | 500 | The page layout of the file could not be read for text extraction. | Indexing a file's text content. | Check the rendition server (ARender) is reachable from Core. |
| `T01903` | `Could not extract document content for file {1} of document {0}` | 500 | The text of the file could not be extracted. | Indexing or getting a file's text content. | Check the rendition server (ARender) and the server log. |

## T020xx · Annotations

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T02001` | `Could not create data masking for document={0}` | 500 | Data masking could not be created. | Creating data masking on a document. | Check the rendition server and the server log. |
| `T02002` | `Annotation document id={0} have no content` | 500 | An annotation document has no content. | Reading annotations. | Check the annotation document's file. |
| `T02003` | `Could not convert document content as annotation for document={0}` | 500 | Annotations could not be read from the document's content. | Reading annotations. | Check the annotation file (XFDF). |
| `T02004` | `Could not transform annotation to document={0}, annotation={1}` | 500 | An annotation could not be converted for storage. | Saving annotations. | Contact support with the server log. |
| `T02005` | `Could not serialize XFDF to document={0} for annotation={1}` | 500 | An annotation could not be written as XFDF. | Saving annotations. | Contact support with the server log. |

## T021xx · History entries (facts)

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T02101` | `Could not process object type={0} to create or to get a fact` | 500 | The history entry's object type is not supported. | Creating or reading history entries (facts) through the client library. | Use a supported object type. |
| `T02102` | `Fact cannot be null` | 500 | The history entry is missing. | Creating a fact. | Send the fact. |
| `T02103` | `The object type must be set on fact` | 500 | The history entry has no object type. | Creating a fact. | Set the object type. |
| `T02104` | `The object id must be set on fact` | 500 | The history entry has no object id. | Creating a fact. | Set the object id. |

## T022xx · Caches

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T02201` | `Cache={0} for FlowerDocs GUI does not exist` | 500 | The GUI cache does not exist. | Clearing a GUI cache by name. | Use one of the existing cache names. |

## T0230x · OpenSearch reindex

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T02301` | `OpenSearch reindex completed with validation issues: {0}` | 500 | Reindexing finished but the check found differences between source and target. | OpenSearch reindex through CLM. | Read the report in the message; run the reindex again. |
| `T02302` | `OpenSearch reindex failed due to a communication error: {0}` | 500 | Reindexing failed: a cluster could not be reached. | OpenSearch reindex through CLM. | Check both clusters are reachable. |
| `T02303` | `OpenSearch reindex was interrupted` | 500 | Reindexing was interrupted. | OpenSearch reindex through CLM. | Run it again. |

## T0231x · Shares

| Code | Message (EN) | HTTP | Meaning | When it is returned | What you can do |
|---|---|---|---|---|---|
| `T02307` | `Could not stored share {0}` | 500 | The share could not be saved. | Creating a share. | Check OpenSearch; retry. |
| `T02308` | `Could not update share {0}` | 500 | The share could not be updated. | Updating or cancelling a share. | Check OpenSearch; retry. |
| `T02309` | `Could not delete share {0}` | 500 | The share could not be deleted. | Deleting a share. | Check OpenSearch; retry. |
| `T02310` | `Could not found share {0}` | 500 | The share could not be read. | Getting or opening a share. | Check OpenSearch. |
| `T02313` | `A share token is required to open a share` | 500 | A share link was opened without its token. | Opening a share link. | Open the link exactly as received. |
| `T02314` | `Could not register the shared document with the rendition server` | 500 | The shared document could not be registered with the viewer. | A recipient viewing a shared document. | Check the rendition server is reachable from the share application. |
| `T02315` | `Could not create the rendition container for the shared documents` | 500 | The viewer could not prepare the shared documents. | A recipient viewing a share. | Check the rendition server is reachable from the share application. |
| `T02316` | `The shares cannot be searched because of a technical error. Try again, and contact your administrator if it happens again.` | 500 | The shares could not be searched. | Searching shares. | Retry; check OpenSearch. |
| `T02320` | `The shares whose end date has passed could not be marked as expired because of a technical error. They will be tried again at the next run.` | 500 | Ended shares could not be marked as expired. | The background job that expires shares. | Nothing: it retries at the next run. Check OpenSearch if it repeats. |
| `T02321` | `The share index of scope {0} could not be set up: {1}. Nothing was removed; fix the cause and run the operation again.` | 500 | The share index of a scope could not be set up. | Setting up a scope's share index through CLM. | Fix the cause the message gives and run it again. |
