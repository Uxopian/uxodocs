---
title: Graphical user interface customization
date: '2022-04-19T12:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 361cd784345514292e413cf136ce9e8124d724593a8df3431fd70501f4ddd08a
---



# Goal

The aim of this module is to provide the keys to using the predefined FlowerDocs CSS variables. These variables make it easier to customise FlowerDocs colours. 

<br/>
To improve the accessibility of FlowerDocs and meet [RGAA](https://design.numerique.gouv.fr/accessibilite-numerique/rgaa/) requirements, the colours of the FlowerDocs interface have changed. On the [following page](/learn/css-variables/old-version.md), you will learn how to use FlowerDocs variables to revert to the theme prior to these changes.

# FlowerDocs versions concerned

From 2.6.0.

# Use of variables

CSS variables are defined as follows: 
```css
--<nom-de-la-variable>: <couleur>;
```
You will need to add this line to the `body` selector in your CSS file.

<br/>
In a similar way, you can redefine a predefined variable, as in the following example.  

Modifying a predefined variable will change the color of all elements using that variable.
```css
--btn-primary: #3f3cd6;
```
`btn-primary` is the predefined variable for the color of FlowerDocs' main buttons.

<br/>
Once a variable has been defined, it can be used with the `var()` function as follows: 
```css
color: var(--<nom-de-la-variable>)
```

# A full example
```css
body{
  /*Setting a new variable*/
  --new-variable: #cc3672;
  /*Overriding a predefined variable*/
  --navbar: #6558dd;
  /*Redefining a variable using another predefined variable*/ 
  --text-sidebar-menu: var(--primary-400);

/*Using the previously defined variable*/
button.btn-primary {
    color: #fff;
    background-color: var(--new-variable);
    border-color: var(--new-variable);

```
