---
title: Implementation
date: '2020-02-01T12:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 1daef6e45e13b84cdc9149c881167f9014df0956befad3288b6b68eb3903a567
---


# Hiding tabs

The following CSS property hides the element to which it is applied:
 
```css 
	display:none;
```
<br/> 
We are therefore going to apply the `display: none` style to all [the elements we want to hide](/learn/admin-hide-menu/getting-started.md) :

```css
	.AdminPlace//tools//memory,
	.proxiesTab,
	.usersTab,
	.ldapsTab,
	.oauthTab,
	.stylesheetsTab,
	.xmlsTab,
	.pluginsTab,
	.core,
	.serversTab{display: none!important;}
```

<br/>
The idea is to add style to the opening of FlowerDocs. To do this, we will add the `canAttach` option to the page:

``` javascript
	function hideAdminMenus(styleContent){
		const hideAdminMenusStyle = document.createElement('style');
		hideAdminMenusStyle.textContent = styleContent;
		document.head.append(hideAdminMenusStyle);

``` 

# Depending on profile 

We need to know the profile(s) of the current user to know which tabs will be visible to them. To do this, we are going to use the FlowerDocs JS API: 

``` javascript 
	var userAPI = JSAPI.get().getUserAPI();
	var profiles = userAPI.getProfiles(); 
```

<br/>
Finally, we can hide menus for users with the `MANAGER` profile: 

```javascript 
function hideAdminMenus(styleContent){
  const hideAdminMenusStyle = document.createElement('style');
  hideAdminMenusStyle.textContent = styleContent;
  document.head.append(hideAdminMenusStyle);

var hiddenMenus = '.AdminPlace\\/tools\\/memory,'
					+'.proxiesTab,'
					+'.usersTab,'
					+'.ldapsTab,'
					+'.oauthTab,'
					+'.stylesheetsTab,'
					+'.xmlsTab,'
					+'.pluginsTab,'
					+'.core,'
					+'.serversTab{display: none!important;}';
var userAPI = JSAPI.get().getUserAPI();
var profiles = userAPI.getProfiles();
if(profiles.includes('MANAGER')){
  hideAdminMenus(hiddenMenus);

``` 

<!--:::info
Find the scope module corresponding to this training [here]("".md)
:::
-->


