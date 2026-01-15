---
title: Confirmation
description: Pop up allowing to confirm a user choice
date: "2004-03-27T13:25:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: b26c41ac0fd17a368fbccf47d5715a3b9328e4efb1edd4d84a7a678c1f0a1710
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info
This type of pop-up displays a message confirming the user's choice.
:::

There are two types of confirmation popups: Validate/Cancel popups, and Yes/No popups.

Both types of popups work in the same way:

When the user clicks on the `Validate` button (for Validate/Cancel popups) or `Yes` (for Yes/No popups), the integrator has the power to define the treatment to be executed.

<Tabs>
  <TabItem value="validation-cancel" label="Validation/Cancel">

```javascript
var popup = JSAPI.get().getPopupAPI().buildCancelValidateConfirmationPopup('This action will be performed', function(confirmed){
	if(confirmed){
		// .....

	popup.close();
});
popup.setDescription('My description');
popup.setTitle('My title");
popup.setIcon('fa fa-remove');
popup.show();
```

  </TabItem>
  <TabItem value="yes-no" label="Yes/No">

```javascript
var popup = JSAPI.get().getPopupAPI().buildYesNoConfirmationPopup('Do you confirm this action?', function(confirmed){
	if(confirmed){
		// .....

	popup.close();
});
popup.setDescription('My description');
popup.setTitle('My title");
popup.setIcon('fa fa-remove');
popup.show();
```

  </TabItem>
</Tabs>
