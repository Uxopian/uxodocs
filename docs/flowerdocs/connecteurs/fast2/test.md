---
title: Test
description: Validating the configuration of a Fast2 injection
date: "2001-03-28T15:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 354d95efddd3ecf099d53f7d1fb1059049ed5dbaef7e7524dd7a092daf22353d
---

# Import task

- In the map, open the task `ImportTask`
- Define the `fileScanner` property with a `DirectoryScanner` class object with the properties:
    - `filters` with the path of the description files (or `punnet`) (for example : `D:\fast2\punnet1.xml`)
    - `xmlSkipParse` disabled

# Example of a punnet

To determine the test documents to be injected into FlowerDocs, we need to define a `punnet` in the XML format expected by Fast2.
This XML file is used to specify the class of the document to be injected and the folders in which to file it, such as :

```xml
<?xml version='1.0' encoding='UTF-8'?>
<ns:punnet xmlns:ns="http://www.arondor.com/xml/document">
	<documentset>
		<ns:document name="Doc1" canCreate="true">
			<ns:dataset>
				<ns:data name="className" type="string">
					<ns:value>Document</ns:value>
				</ns:data>
				<ns:data name="name" type="string">
					<ns:value>My Document 2</ns:value>
				</ns:data>
			</ns:dataset>
			<ns:folderset>
				<ns:folder name="Test6">
					<ns:dataset>
							<ns:data name="className" type="string">
								<ns:value>Folder</ns:value>
							</ns:data>
					</ns:dataset>
					<ns:folder name="parents" canCreate="true">
						<ns:dataset>
							<ns:data name="className" type="string">
								<ns:value>Folder</ns:value>
							</ns:data>
						</ns:dataset>
						<ns:folder name="A1" canCreate="true">
							<ns:dataset>
								<ns:data name="className" type="string">
									<ns:value>Folder</ns:value>
								</ns:data>
							</ns:dataset>
							<ns:folder name="A6" canCreate="true">
								<ns:dataset>
									<ns:data name="className" type="string">
										<ns:value>Folder</ns:value>
									</ns:data>
								</ns:dataset>
							</ns:folder>
						</ns:folder>
					</ns:folder>
				</ns:folder>
			</ns:folderset>
		</ns:document>
	</documentset>
</ns:punnet>
```
