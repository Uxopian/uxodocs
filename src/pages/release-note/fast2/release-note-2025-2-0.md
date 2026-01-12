---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2025-06-06

# To modify
version: "2025.2.0"
major_version: "2025"
description: "Summary of the changes in version 2025.2.0 of Fast2."
---

## **What's up ?**

<br />
The 2025.2.0 is a new minor version, bringing new features, enhancements and bug fixes.

This version guarantees retrocompatibility for the catalog.

<br />
_Details below..._

<br />

---

## 🔐 Authentication & Team Management

### ✨ New Features

- **Manage Team**: New UI to view and manage team members.
- **Team Creation**: Add new members directly from the interface.

### 🔧 Improvements

- **Role Hierarchy**: Introduced a 3-level hierarchy:
    - _Superadmin_: Can manage admins and users
    - _Admin_: Can manage users only
    - _User_: Cannot manage other members
- **Log Access Restriction**: Only admins and superadmins can now download worker and broker logs.
- **Profile Info**: Team member roles are now visible on their profile leaflets.

### 🐞 Bug Fixes

- Fixed issue where logging in sometimes required double-clicking the button.
- Resolved a Linux-specific bug where refreshing the page would log the user out.
- Fixed expired worker tokens blocking broker access.

---

## 🔔 Notifications

### 🐞 Bug Fixes

- Warning messages now correctly display when leaving a mandatory field empty.

---

## 🔐 Security

### 🔧 Improvements

- Workers are now authenticated when calling broker endpoints.
- Patched potential **XXE vulnerability** that could allow file access or remote code execution.

---

## ⚙️ Start-up & Configuration

### 🔧 Improvements

- New setting: `broker.stop.campaign.max.attemps` to customize retry timing when stopping a campaign.

### 🐞 Bug Fixes

- Console shutdown on some locales no longer shows unreadable characters.

---

## 🗺️ Edit Place

### 🧭 Map Construction

#### 🐞 Bug Fixes

- Config panel no longer stays open after creating a new map.
- Warning messages are no longer duplicated when reopening an empty JSTransform config.
- Prevents unintentional map versioning when no campaign was launched.

---

## 📚 Catalog

### ✨ New Features

- **M-Files Connector**: Added support for 2.x-LTS.
- **FileInspector Tool**: New task to detect and optionally extract embedded documents in Word files.

### 🔧 Improvements

- **Alfresco Connector**: Can now extract folder-level permissions (from 2.x-LTS).
- **AWSInjector**: Stores S3 key in the punnet dataset for AWS targets.

### 🐞 Bug Fixes

- **DeleteContent Task**: Now deletes annotations and linked content (from 2.x-LTS).
- **CSVSource**: Now compatible with Java 8.

---

## 🚀 Run Place

_(No new features or improvements listed)_

---

## 🧭 Explorer Place

### 🐞 Bug Fixes

- Filtering on datetime columns now works correctly.

---

## 📊 Maps Overview & Campaign Management

### 🗺️ Maps Overview

- _No notable changes._

### 📈 Campaign Management

#### 🐞 Bug Fixes

- Deleting a running campaign no longer falsely triggers a success message when it fails.

---

## 🖥️ Server Place

### 📦 Libraries

### ✨ New Features

- **Libraries Tab**: View all JARs in the `worker-libs` folder.
- **Upload JAR**: Add new JARs via interface.
- **Search**: Locate specific JARs in the list.

---

## 🧱 Shared Objects Place

- _No notable changes._

---

## 📅 Scheduler Place

- _No notable changes._

---

## 🧠 Known Issues

- **Authentication**: Linux doesn’t auto-logout on Fast2 kill (fix planned).
- **Trigger Campaign Task**: API call blocked unless security is disabled (fix planned).
- **Undo/Redo**: Undo may leave ghost tasks or fail to revert config until place is reloaded.
- **Punnet Tracker**: "Copy to clipboard" currently non-functional.
- **SleepTask**: Sleeps block threads. Use dedicated queues and ensure thread availability.
- **Recent Patches**: Some Pro Services patches may not be included — check with your contact. This version is compatible with 2.12 worker libs. (Concerns: ComparePunnets, FileNetInjector, LocalSource)
- **Security Gap**: Maps can access local files via JSTransform or ReadContent tasks — restrict UI access or enable authentication.

---
