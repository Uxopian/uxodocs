---
title: Configuration
sidebar_position: 3
date: "2003-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 334897828370c2bee58f937fc7ff991ea6da35974ff75bdecfdf1af7be08c54a
---

# Configuration modification

Once FlowerDocs Companion has been installed, it must be configured by opening the configuration interface or directly from the configuration file.
The configuration interface is accessible from the taskbar or from the plugin banner in Microsoft applications, only if the displayConfiguration parameter is set to 1. This graphical user interface lets you enter most of the parameters in the configuration file.

In addition, the window displayed will differ according to the user's rights. These rights correspond to the admin parameter. If it's set to 0, the popup will only allow you to connect via a login/password pair. If it’s set to 1, it will be used to configure most of the parameters present in the configuration file.

## Access to FlowerDocs IHM

Plugins for Microsoft Office allow documents to be indexed within the FlowerDocs graphical user interface. To do this, you need to set up a URL to access it. This is associated with the parameter `GUI`.

**Example**: https://www.demo.flowerdocs.cloud/flower-docs-gui/

## Access account & Scope

For access accounts, only the user ID is stored in the configuration file (user). The password is not saved for security reasons. However, once the login/password pair (associated with the rest of the configuration) has allowed the user to log in, a JWT identification token has been generated.

This token is guarded by the token parameter and will keep the session open even when the plugins are closed.

The scope is associated with the scope parameter.

## Browser dimensions

When a document is exported, a browser is opened to index it before saving it. The dimensions of this browser are configurable and correspond to browserWidth for its width and browserHeight for its height. The default values are 700 and 800 respectively.

# Configuration backup

To update the entire configuration, simply click on the `Save` button shown in the popup described above. This only applies to users with administrator rights.

# Configuration test

To validate the configuration items, click on the Login button. If the message `User &lt;nom&gt; is connected.` is displayed, the configuration is operational. Otherwise, the displayed error explains the invalid parameter(s) to the user.
