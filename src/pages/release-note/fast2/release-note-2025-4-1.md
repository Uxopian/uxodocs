---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2025-08-01

# To modify
version: "2025.4.1"
major_version: "2025"
description: "Summary of the changes in version 2025.4.1 of Fast2."
---

## **What's new?**

<br />
We are excited to introduce Fast2 version 2025.4.1! This new release brings highly anticipated features, as well as numerous improvements and fixes aimed at strengthening the platform's stability, security, and user experience.

Discover the details of what's new below, organized by functional area.

<br />

Note: due to a critical issue in the final packaging of the 2025.4.0, it will never be released, and is replaced by the current 2025.4.1 version.

<br />

_Details below for the other features..._

<br />

---

## 🔍 Feature Highlight: Introducing Dynamic Campaign Parameters

Take your workflow automation to the next level! With version 2025.4.1, we're introducing a powerful enhancement to improve campaign flexibility: **dynamic campaign parameters**.

<br />
<img src="/img/release-notes/2025-4-1-campaignParametersSwagger.png" alt="Campaign Parameters Demo" style={{width: '80%'}} />
<br />

### What is it?

This new feature allows you to define parameter keys with default values directly within a Map, turning it into a reusable template. When you launch a Campaign, you can now override these defaults or provide specific values on the fly.

This means a single, generic Map can be used for countless scenarios—from targeting different environments (development, production) to processing data with varied criteria—simply by changing its parameters at runtime. This capability drastically reduces the need for duplicate maps and makes your automation workflows more agile and maintainable.

### How to use it?

As a powerful backend enhancement, this feature is immediately available through the Fast2 API, making it perfect for your automated scripts and system-to-system integrations. A dedicated user interface for managing these parameters is planned for a future release.

Dive into our official documentation to explore how you can leverage campaign parameters to streamline your processes today!

<br />

---

## 🌏 Generic Features & UI

### 🔧 Improvements

- The reliability of the content download feature has been enhanced.

### 🐞 Bug Fixes

- **Tables**: It is once again possible to scroll in tables after a fix for an issue that was preventing it.
- **Tables**: A table's scrollbar no longer resets to the top after selecting a row.
- **Lists**: It is no longer necessary to refresh the libraries page after canceling an import.
- **Tables**: The table in the "Email" section now refreshes correctly after an item is deleted.
- **Modals**: Clicking the validation button in the "RetryPunnet" pop-up now correctly sets the focus on that button.
- **Toast Messages**: The error toast message displayed when Fast2 is offline no longer includes a timestamp.

---

## 🔐 Authentication & Team Management

### 🔧 Improvements

- **Home Page**: The design of the login and registration pages has been modernized for a more intuitive experience.
- **Configuration**: The property to enable or disable user registration has been removed to simplify configuration.

### 🐞 Bug Fixes

- **Security**: A successful login by one user no longer unlocks other users' accounts.
- **Brute Force Protection**: The failed login attempt counter is now correctly reset after a successful login.
- **Error Messages**: Clear error messages are now displayed when a user is locked.
- **Passwords**: Fixed several issues in the "Team Place" password reset pop-up.
- **Error Messages**: Fixed an issue that displayed duplicate error notifications when accessing a "Team Place" management page via a URL.
- **Team Place**: The "Add member" button in a "Team Place" is now clickable again after a cancel operation.
- **Configuration**: Resolved a bug related to logging in after reactivating the authentication module.

---

## ⚙️ Technical & Configuration

### 🔧 Improvements

- **Queues**: The number of threads for the default queue has been increased to improve processing performance.
- **JSTransform**: The JavaScript runtime engine has been updated to GraalVM to improve performance and security.
- **DevMode**: The port used by `devMode` has been adjusted to facilitate local development.

### 🐞 Bug Fixes

- **Workers**: Fixed an issue where a worker thread could get stuck after a fresh start of the application.
- **Dependencies**: Resolved various technical and dependency issues to improve code robustness.

---

## 🚀 Campaigns & Scheduler

### ✨ New Features

- **Campaign Management**: It is now possible to stop all running campaigns in a single click, simplifying maintenance and management operations.

### 🔧 Improvements

- **Campaign Parameters**: You can now start a campaign by directly passing parameters to it.

### 🐞 Bug Fixes

- **Campaigns Deletion**: Campaigns with the "Deleting" status are now correctly deleted after a Fast2 restart.
- **Error Messages**: The error message displayed for an empty job name is now correct.
- **Job Names**: Special characters are no longer allowed in job titles to prevent errors.
- **Error Messages**: The "Campaign" field in the scheduler now correctly shows an error when its value is invalid.

---

## 📚 Places & Data Model

### 🔧 Improvements

- **Error Messages**: The error message displayed when uploading a file that is not a map has been clarified.

### 🐞 Bug Fixes

- **Queues**: Importing a map that refers to non-existent queues now creates them automatically.
- **Explorer Place**: It is now possible to access the explorer place from a map even if no campaign was run for this map.

---

## 🧠 Known Issues

- **Team Place**: resetting passwords, deleting a team member account, and modifying the role of a team member don't work anymore in this version. A fix is already implemented for version 2025.5.0 which will be release on September the 5th.
- **Authentication**: Linux doesn’t auto-logout on Fast2 kill (fix planned).
- **Trigger Campaign Task**: API call blocked unless security is disabled (fix planned).
- **Undo/Redo**: Undo may leave ghost tasks or fail to revert config until place is reloaded.
- **Punnet Tracker**: `Copy to clipboard` currently non-functional.

---
