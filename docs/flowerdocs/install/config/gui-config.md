---
title: "GUI configuration"
date: "2000-03-30T13:20:01+02:00"
---


This section describes the various FlowerDocs GUI configurations to be defined in the application's `gui.properties` file.


# General

|Property					|	  Description														|
|---------------------------|-----------------------------------------------------------------------|
|system.admin.username  	|System admin username											|
|system.admin.password  	|System account password, can be encrypted with a secret		|
|token.key			   |Token shared between **FlowerDocs Core**, **FlowerDocs GUI** and 							|
|secret						|Secret used to encode password *(optional)*				|
|gui.context				|Application context												|
|gui.password.change.enabled|Enables password modification on login page |
|gui.client.arender.url     |ARender HMI URL													|
|scope.edit					|Allow to select the target scope on the login page				|
|gui.session.timeout		|User session validity time in seconds					|
|ws.url						| **FlowerDocs Core** WebServices URL						|


# Logging

|Property		   |	  Description											|
|------------------|------------------------------------------------------------|
|logging.file.name |Log file path and name								|
|logging.level.root|Log level: `WARN`, `ERROR`, `INFO`, `DEBUG`		|

# Redis

|Property   |	  Description													|
|------------|------------------------------------------------------------------|
|redis.nodes |Addresses of the various Redis separated by a ``,``  			|


It is not recommended to modify Arender properties by setting parameters in the `gui.properties` file. Properties that are not defined in the documentation are not qualified by FlowerDocs: the correct operation of the application is therefore not guaranteed with these modifications.
