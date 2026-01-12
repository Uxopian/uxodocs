---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2025-07-07

# To modify
version: "2025.3.0"
major_version: "2025"
description: "Summary of the changes in version 2025.3.0 of Fast2."
---

## **What's new?**

<br />
The 2025.3.0 is a new minor version, bringing new features, enhancements and bug fixes.
<br />
This version has a strong focus on the Manage Team place, giving new possibilities when it comes to security accounts management.

Admins and Superadmin can now reset passwords respectively for users only, or admins and users.

<br />
<img src="/img/release-notes/2025-3-0-resetPassword.gif" alt="Reset Password Demo" style={{width: '80%'}} />
<br />

Admins and Superadmin can now respectively delete users only, or admins and users.

<br />
<img src="/img/release-notes/2025-3-0-deleteUser.gif" alt="Delete Users Demo" style={{width: '80%'}} />
<br />

Superadmins can change admins into simple users, or simple users into admins.

<br />
<img src="/img/release-notes/2025-3-0-changeRole.gif" alt="Change Role Demo" style={{width: '80%'}} />
<br />

_Details below for the other features..._

<br />

---

## 🌏 Generic Features

### 🔧 Improvements

- **Modals**: You can now validate a modal with the spacebar instead of the enter key.
- **Modals**: Focus is now put on the first editable field, when opening a modal or a pop-up.
- **Modals**: Spaces and font size in modal have been revised, for a better reading experience.
- **Security**: Spring content security policy has been configured to avoid external scripting.

### 🐞 Bug Fixes

- **Notifications**: A failed deletion of an object (maps, campaigns, shared-objects, jobs...) wrongly triggered a confirmation notification. Solved.
- **Lists**: Browser zooming level could prevent users from selecting the last item in a dropdown list. Solved.
- **Lists**: Dropdown lists could freeze while scrolling, even though the scrollbar moved. Solved.
- **Home Page**: The link to the portal pointed to an old page. Fixed.
- **Security**: Via JSTransform or ReadContent tasks, maps could access local files outside of the temporary files from Fast2. Solved. Now Fast2 can only access, read and write files in a folders whitelist. Use the _security.allowed.directories_ application property to change this whitelist.

---

## 🔐 Authentication & Team Management

### ✨ New Features

- **Manage Team**: Possibility for the superadmin to change the role of users.
- **Manage Team**: Possibility for the superadmin and admins to delete users.
- **Manage Team**: Possibility for the superadmin and admins to reset passwords.

### 🔧 Improvements

- **Database Access**: Broker now authenticates when connecting to the database.

### 🐞 Bug Fixes

- **Profile**: The role tag for the superadmin account was cut in the profile leaflet. Solved.

---

## ⚙️ Start-up & Configuration

_(No new features or improvements listed)_

---

## 🗺️ Edit Place

### 🔧 Improvements

- **Map Design**: Fast2 now prevents users from starting the name of a map with an underscore, which could lead to issues.

### 🐞 Bug Fixes

- **Map Design**: After moving a task in a map, and navigating back and forth between places, the moved task wrongly returned to its previous position. Solved.

---

## 📚 Catalog

### 🔧 Improvements

- **FlowerDocs Connector**: The FlowerDocs connector is now compatible with version 2025.0 of FlowerDocs. Note that it is still compatible with the previous versions of the FlowerDocs APIs.

---

## 🚀 Run Place

_(No new features or improvements listed)_

---

## 🧭 Explorer Place

### 🐞 Bug Fixes

- **Punnet Table**: Long punnet IDs could overlap the punnet status. Solved.

---

## 📊 Maps Overview & Campaign Management

### 🐞 Bug Fixes

- **Map Overview**: Date order wasn't applied to maps in other pages than the current one. Fixed.

---

## 🖥️ Server Place

### 🐞 Bug Fixes

- **Libraries**: The libraries tab was wrongly named `Librairies`. Solved.

---

## 🧱 Shared Objects Place

- _No notable changes._

---

## 📅 Scheduler Place

### 🔧 Improvements

- **Map Versions**: For jobs using previous versions of a map, when editing the job, this version is now displayed in the dropdown list of the potential map candidates. This allows users to modify a job without having to change the map version if they need to.

---

## 🧠 Known Issues

- **Authentication**: Linux doesn’t auto-logout on Fast2 kill (fix planned).
- **Trigger Campaign Task**: API call blocked unless security is disabled (fix planned).
- **Undo/Redo**: Undo may leave ghost tasks or fail to revert config until place is reloaded.
- **Punnet Tracker**: `Copy to clipboard` currently non-functional.
- **SleepTask**: Sleeps block threads. Use dedicated queues and ensure thread availability.
- **Recent Patches**: Some Pro Services patches may not be included — check with your contact. This version is compatible with 2.12 worker libs. (Concerns: ComparePunnets, FileNetInjector, LocalSource)

---
