---
title: Return to FlowerDocs 2.5 theme
date: "2022-04-19T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 7597bb1d0d6070b24f01cc31e71d2f5ac2856c25c43a23fe81483f3480e21ab5
---

## Visual change

To meet [RGAA] requirements (https://design.numerique.gouv.fr/accessibilite-numerique/rgaa/), the colors of the FlowerDocs interface have changed.

Based on the use of variables, it is quite possible to get a visual similar to FlowerDocs version 2.5.x.
Find out how to do this below.

```css
body{
  --btn-success: #1abc9c;
  --btn-success-hover: #159a80;

  --checkbox: #84c7c1;
  --checkbox-after: #26a69a;

  --btn-secondary: #6c757d;
  --btn-secondary-hover: #5a6268;

  --btn-danger: #f1556c;
  --btn-danger-hover: #ee324d;

  --btn-pink: #f672a7;
  --btn-pink-hover: #f44e91;

  --text-sidebar-menu-hover: #00acc1;
  --element-focus: #26a69a;

  --badge-pink: #f672a7;
  --badge-success: #1abc9c;

button.btn-primary.disabled,
button.btn-primary:disabled{
  color: #fff;
  background-color: #6658dd;
  border-color: #6658dd;
  opacity: .65;

button.btn-success.disabled,
button.btn-success:disabled{
  color: #fff;
  background-color: var(--btn-secondary);
  border-color: var(--btn-secondary);
  opacity: .65;

.contextual-menu .menu-item:hover {
  background-color: #5fbeaa;

.contextual-menu .menu-item:hover .icon:before,
.contextual-menu .menu-item:hover .label {
    color: #FFF!important;

```

<!--:::info
Find the scope module corresponding to this training [here]("")
:::
-->
