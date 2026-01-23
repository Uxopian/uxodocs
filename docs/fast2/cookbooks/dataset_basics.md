---
title: Dataset management
sidebar_position: 4
tags:
    - boilerplate
    - dataset
    - java
    - data
last_update:
  date: '2026-01-23T15:35:56.881Z'
  author: CI/CD Bot
content_hash: faada52c2270dce21667a3a298c5365818b296182921ec30ef3ab9486705d1b8
---

# Learn how to deal with datasets

![Dataset structure](../assets/img/cookbooks/dataset.png)

Datasets are Fast2 objects which can be involved at different levels within the punnet.

They can be found on the

- punnets
- documents
- workflows

Datasets gather data which can be manipulated to store properties, and can be accessed as follows:

```java
DataSet dataset = punnet.getDataSet();

DataSet dataset = document.getDataSet();

DataSet dataset = workflow.getDataSet();
```

Since datasets are just groups of data, understanding basic operations with data is primordial.

## Data object

In Fast2, a data has 3 different informations:

- its name,
- its type (`String` or `int`)
- its value(s)

The following line retrieve the data as object :

```java
Data data = dataset.getData(dataName);
```

### Name

Getting the name of a data just goes like:

```java
String dataName = data.getSymbolicName();
```

### Type

If no type has been defined when the data has been created, the data type will be `null`.

However Fast2 will treat the value of the data as a regular `String`.

```java
String dataType = data.getType();
```

### Value(s)

When dealing with data, some can be single-valued while others can be multi-valued.

The returned object will differ accordingly.

```java
String dataValue = data.getValue();

List<String> dataValues = data.getValues();
```

Data values can be added along the way, even when the data has already been created with a given value to begin with:

```java
data.addValue(value);
```

<br />
<br />

### Properties

A data can be dealt with just like any other object with properties.

Therefore, adding a property, removing it or getting it are just as simple as you would think:

```java
data.setProperty(name, value);

String value = data.getProperty(name);

data.removeProperty(name);
```

## Add data

Several ways of adding data to the dataset are available, depending on the type of value you are willing to store:

```java
Data myData = myDataset.addData(name, "String", value);  // String
Data myData = myDataset.addData(name, null, value);

Data myData = myDataset.addData(name, "boolean", true);  // boolean

Data myData = myDataset.addData(name, type, 10);         // long, int

Data myData = myDataset.addData(name, "String");             // list or arrays of String
myData.getValues().addAll(Arrays.asList("a", "b", "c"));

document.getDataSet().addData("multivalued", "String").getValues().addAll(Arrays.asList("value #1", "value #2"));
```

Adding a new data with the same name as an already stored one, will result in overwriting the existing value with the new one.

## Iterating through all data

Data mapping often requires to cover all data, no matter their name. To do so, the easiest way is to get them as a list:

```java
List<Data> allData = myDataset.getData();

for(Data data : allData){
    // ...
}
```

## Retrieve data value(s)

The following line retrieve the data as object :

```java
Data data = dataset.getData(dataName);
```

### Single-valued data

The dataset offers a shortcut to get the value(s) of any data:

```java
// 1st way : via data object
String value = myDataSet.getData(dataName).getValue();

// or

// 2nd way : dataset shortcut
String value = myDataSet.getDataValue(dataName);
```

### Multi-valued data

```java
// 1st way : via data object
List<String> value = myDataSet.getData(dataName).getValues();

// or

// 2nd way : dataset shortcut
List<String> value = myDataSet.getDataValues(dataName);
```

## Remove data

If the data has been found and could successfully be removed, the following method will return `TRUE`:

```java
boolean removedSuccessfully = myDataset.removeData(name);
```

## Check if data exists

Rely on this method to make sure not to overwrite any existing data, nor having a `DataNotFoundException` exception.

```java
boolean exists = myDataset.hasData(name);
```

## DataNotFound exception

When operations are performed on non-existing data, an exception of type `DataNotFoundException` is thrown.

---
