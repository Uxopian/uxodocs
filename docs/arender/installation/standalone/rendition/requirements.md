---
title: "Requirements"
---







## Operating system

| Category | Requirement                                                                                                                                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows  | Windows Server 2016 or higher                                                                                                                                                                                               |
| Linux    | Kernel 2.6 or greater, glibc 2.14 or greater, minimal recommended version for Linux distributions (due to our software requirements): RedHat (7 or 8), CentOS (7), Debian (8), Ubuntu (14.04+), Amazon Linux AMI (2016.09+) |

## Minimal hardware

| Category                      | Minimum | Advised                                                                                  |
| ----------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| Number of rendition server(s) | 1       | 2 (for high availability)                                                                |
| RAM                           | 8GB     | 16GB                                                                                     |
| CPU (vCPU)                    | 4       | 8                                                                                        |
| CPU type                      | 64Bits  | 64Bits                                                                                   |
| Storage                       | 20Go    | The maximum between 20Go and a storage where a full day of temporary files can be stored |

## Port configuration

The ports of the different micro-services need to be free to use and are as follows:

| Service              | Protocols  | Default listening port |
| :------------------- | :--------: | :--------------------: |
| Service broker       | HTTP/HTTPS |                   8761 |
| Text handler         |    HTTP    |                   8899 |
| Renderer             |    HTTP    |                   9091 |
| Converter            |    HTTP    |                  19999 |

## Software requirement

| Software                        | Requirement                                                                                                                                               |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Java Runtime                    | JRE 1.8 64 bits Minimum, OpenJDK 11 advised. Oracle JDK are supported, JRE IBM J9 is unsupported.                                                         |


If the JVM used is not **64 bits**, the rendition will now stop its boot and
warn in the logs/console that the version of the JVM used is incorrect.


## Access rights

### Installation

The user must have the following rights:
* Folder creation,
* Service creation.

### Launch

The user must have the following rights:
* Read and execution for the files into the Rendition folder, 
* Read and execution for third party softwares.

## Amazon Web Services (AWS) specific

Ensure the role attached to the EC2 instance has permissions to describe the instance if it needs to be identified by a 
tag.