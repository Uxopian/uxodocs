---
title: Test
description: Validating the configuration of a Fast2 injection
date: '2001-03-28T15:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: b408e9fe35ec545f1b894cd0eb7f9d60d5dd8678cd82703e7642bb8c50a21570
---





# Import task


* In the map, open the task ``ImportTask``
* Define the ``fileScanner`` property with a ``DirectoryScanner`` class object with the properties: 
 
  * ``filters`` with the path of the description files (or ``punnet``) (for example : `D:\fast2\punnet1.xml`)
  * ``xmlSkipParse`` disabled



# Example of a punnet

To determine the test documents to be injected into FlowerDocs, we need to define a ``punnet`` in the XML format expected by Fast2.
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
