---
title: Installation
sidebar_position: 2
last_update:
  date: '2026-01-28T13:32:53.239Z'
  author: CI/CD Bot
content_hash: 783c9cb39309e53ffd2e7d7efee6a20f76a7f69d753100497fcb6d2918adfc8b
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Requirements

The installation of Fast2 requires a few environment specifications to run properly :

| What      |                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM       | 8GB+                   | We highly recommend having at least 8GB. <br /><br />When switching to production environments, 16GB or 32GB will be required since more documents will be handled at once, and heavy tasks (_e.g._ conversion, extraction) might get short on resources.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Processor | 8 CPUs                 | Processor capabilities need to be aligned with migration requirements, such as data mapping, content conversion and heavy I/O.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Storage   | 500GB+                 | Although the contents dealt by Fast2 will be temporarily stored (and deleted afterwards if asked), the server needs enough storage for the files/contents alongside the database tracking all the migration information. <br /><br />For production environments, we strongly recommend **500GB or more** to handle large-scale migrations and prevent storage-related issues. While 128GB may work for development or testing, it is insufficient for production workloads and can lead to increased technical operations during migrations.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Java      | JDK-11                 | Any provider will fit (Oracle, [OpenJDK](https://developers.redhat.com/products/openjdk/download), etc). If you have multiple JDK/JRE already installed, specify the correct one in the `./config/env.properties` file.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| OS        | Windows&nbsp;7+, Linux | All versions of Windows 7+ are supported. <br/><br/>All common distros of Linux are supported (Ubuntu, RedHat, CentOS, etc)<br /><br />Power architecture are supported as well (except the ones running in AIX), but only Java parts will work seamlessly whereas third-party software (_e.g._ imagemagick, libreoffice, etc) might not, as they have not all have been developed for such platforms. <br/><br/> Although the broker will not run correctly on an Windows 2003, a worker can still run on it, remotely, and communicate with a broker installed on a more recent version. |
| Bandwidth | 1GB                    | The more calls, payloads, and contents Fast2 will have to deal with, the bigger the network bandwidth must be to reduce latency. If 250-500MB might do for lower environments, we recommend 1GB for Production environments.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

While setting up the production server for Fast2, make sure to scale the Fast2 machine accordingly. You may need to increase the allocated memory for both the broker and the background database. If you planned to deal with campaigns of a few millions of documents, setting **8GB** of memory for the [broker](../components/broker.md#configure-the-broker) and **8GB** for the [database](../components/database.md#configuration) as well is a good starting point.

:::warning

    If you decide to go for a custom Elasticsearch database, make sure to confirm the compatibility with your environment at [Elasticsearch Support Matrix](https://www.elastic.co/fr/support/matrix).

:::

## Fast2 packages

The Fast2 distribution you need depends on your target environment. It exists three way to deploy a Fast2 :

&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-file-zipper"></i> On premise: regular package, as an all-in-one zip file<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<i class="fab fa-aws"></i> AWS: Standard AMIs<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<i class="fab fa-docker"></i> K8S: Docker Images

Each distribution ships the following

- A broker with one embedded worker and a user interface
- An additional worker with all tasks catalog
- A template to create workers with custom tasks

## Root folder anatomy

| Item                                                      | Purpose                                             |
| --------------------------------------------------------- | --------------------------------------------------- |
| <i class="fas fa-folder"></i> config                      | Configuration files, broker endpoint, Java home     |
| <i class="fas fa-folder"></i> logs                        | Logging files for both broker and worker(s)         |
| <i class="fas fa-folder"></i> maps                        | XML files of all maps accessible from the UI        |
| <i class="fas fa-folder"></i> opensearch-X.Y.Z or elasticsearch-X.Y.Z | Either Elasticsearch or OpenSearch                  |
| <i class="fas fa-folder"></i> service                     | All files required to start Fast2 as a service      |
| <i class="fas fa-folder"></i> worker-libs/\* | All libraries and dependencies for tasks executions |
| <i class="fab fa-java"></i> fast2-broker-package-X.Y.Z.jar | Broker unit                                         |
| <i class="fab fa-java"></i> fast2-worker-package-X.Y.Z.jar | Worker main unit                                    |
| <i class="fab fa-windows"></i> startup-broker.bat         | Binary file for Windows                             |
| <i class="fab fa-linux"></i> startup-broker.sh            | Binary file for Linux                               |
| <i class="fab fa-windows"></i> startup-worker.bat         | Binary file for Windows                             |
| <i class="fab fa-linux"></i> startup-worker.sh            | Binary file for Linux                               |

## Start-up sequence

When Fast2 is started, either as a standalone application or a service, its different modules share a precisely defined roll-out schedule:

- First, the broker and its internal databse are started. The connection between these 2 components has to be effective, otherwise Fast2 will automatically shut down after a couple of attempts to reach the database;
- The worker is then triggered, and has to register itself to the broker.
- Finally, the dashboard will be started if asked so, and if the binaries have been detected. First, Fast2 will try to connect to any dashboard instance running on the configured port.

There is no direct connection between the broker and the dashboard. The only exchange area is the Elasticsearch database, as explained in the [architecture section](overall-concepts.md#architecture).

## Start Fast2 Broker

Once the regular Fast2 package is unzipped, Fast2 can be launched right away.

Whether Fast2 is launched from the batch file or as a service on your environment, the UI will be available at [http://localhost:1789/](http://localhost:1789/).

By default, Fast2 Broker starts an embedded Elastic Search and an embedded Fast2 Worker.

All commands below are to be run under the Fast2 install path (where the Zip has been unzipped).

### From command line

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

    Go into the Fast2 install folder, and run :

    ```cmd
    C:\path-to-fast2\> startup-broker.bat
    ```

    Administrator rights might be required since Fast2 will handle some port communications.

</TabItem>
<TabItem value="linux" label="Linux">

    The following Linux installation steps work for most of Unix-based sytems.
    Elasticsearch cannot be started from root user, you will need to create a secondary user to start the database binary alongside your Fast2 process.

    Once connected as the latter user, start Elasticsearch via its binaries.

    Then, since you started Elasticsearch manually, disable the command triggering Fast2 to start the embedded Elasticsearch, from the `config/application.properties` file :

    ```log
    broker.elasticsearch.embedded.enabled=false
    ```

    You can now properly execute the following script:

    ```sh
    $ ./startup-broker.sh
    ```

</TabItem>
</Tabs>

To end the Fast2 process, just hit `Ctrl+C` in the command line the startup file opened.

### As service

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

    Go into the Fast2 installation folder, and open the Windows Command Prompt.

    Before installing, check two points:

    - **Start mode.** The delivered `service\windows\Fast2_broker_service.xml` contains `<startmode>Manual</startmode>`: the service does not start with the machine. To have it start automatically, change it to `<startmode>Automatic</startmode>` before running `install`.
    - **Java.** A Windows service does not see the `JAVA_HOME` variable of your user account, only system environment variables. If `startup-broker.bat` cannot find Java, it waits on a `pause` and the service never starts. Set `JAVA_HOME` (the JDK root folder) in `config\env.properties`, or as a system environment variable.

    To install the service :

    ```cmd
    C:\path-to-fast2\service\windows> Fast2_broker_service.exe install
    ```

    Your machine may prompt a message asking to download .NET components. Please click [OK] and proceed.

    Once this command is complete, you should see in your services registory a newly installed Fast2 service. You can start/stop/restart it as any other service, or via the Command Prompt (just replace `install` in the previous command by _start_/_stop_/_uninstall_/_restart_/_status_).

    The logs of the service will be available from the `path-to-fast2\service\log` folder.

</TabItem>
<TabItem value="linux" label="Linux">

    There are several ways to create a service under linux distribution. We will do it through systemd.
    Its major benefit is that it has been the default init system for the majority of linux distributions (Ubuntu, Red Hat, Fedora...).

    <br />

    ##### <i class="fas fa-circle-1"></i> Create a user for Fast2

    Since the embedded database cannot be started as root, you must use an existing user that meets your requirements or create a new one on the Linux machine. The service will run under this account, which allows the broker to start the database.

    Let's consider here our user to be *fast2user*.

    Make sure the Fast2 installation folder belongs to this user. The service writes into it: the broker logs (`logs/`) and the data and logs of the embedded database (`opensearch-X.Y.Z/`). If the package was unzipped as root, the service starts but the database then fails for lack of write permissions.

    ```sh
    $ sudo chown -R fast2user:fast2user /home/userName/fast2-complete-package-X.Y.Z
    ```

    :::note

        Do not edit `startup-broker.sh` to switch users (`su fast2user -c ...`). With `User=` and `Group=` in the service file (step 2), systemd already runs the whole script, embedded database included, under this account.

    :::

    <br/>

    ##### <i class="fas fa-circle-2"></i> Service file

    Edit the file `service/linux/fast2-broker.service`. As delivered, it only contains the `Description`, an `ExecStart` placeholder (`/PATH/TO/FAST2/startup-broker.sh`) and `WantedBy`:

    - replace `/PATH/TO/FAST2` with the Fast2 installation path;
    - **add** the `Environment`, `User` and `Group` lines.

    ```sh {5-8}
    [Unit]
    Description=Fast2 Broker vX.Y.Z

    [Service]
    Environment="JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64"
    ExecStart=/home/userName/fast2-complete-package-X.Y.Z/startup-broker.sh
    User=fast2user
    Group=fast2user

    [Install]
    WantedBy=default.target
    ```

    - The `[Unit]` section provides metadata and dependencies for the service.
        - `Description`: Provides a human-readable description of the service. In this case, the service is named "Fast2 Broker".
    - The `[Service]` section defines how the service behaves when it is started, stopped, or restarted.

        - `Environment`: Sets environment variables that the service will use during execution.

            This line sets the `JAVA_HOME` environment variable used by `startup-broker.sh`. Its value is the **root folder of the JDK**, not the `java` binary: the script runs `$JAVA_HOME/bin/java` and stops if that file does not exist.
            The path must be the final one (and not the Ubuntu internal link to the Java installation).
            ```sh
            ubuntu@ip-...:~/fast2$ which java
            /usr/bin/java ❌

            ubuntu@ip-...:~/fast2$ readlink -f $(which java)
            /usr/lib/jvm/java-11-openjdk-amd64/bin/java
            ```

            Remove the trailing `/bin/java`: the value to set is, in this case, `Environment="JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64"` ✅. You can also set `JAVA_HOME` in `config/env.properties` instead.

        - `ExecStart`: Specifies the command that will be executed to start the service. It points to the `startup-broker.sh` script located in the Fast2 installation folder (here `fast2-complete-package-X.Y.Z`). When the service starts, this script is executed.
        - `User`: Specifies the user account under which the service will run. This line indicates that the service should be run under the `fast2user` user account. Running services as a non-root user is a security best practice.
        - `Group`: Specifies the group under which the service will run. This line sets the group ownership for the service process to `fast2user`. This ensures that the service process has the correct permissions as defined by the user and group.
    - The `[Install]` section defines how the service should be installed or integrated with systemd.
        - `WantedBy`: Specifies the target in which this service should be started. This line indicates that the service should be started as part of the `default.target`, which is the default system runlevel (usually equivalent to multi-user mode or graphical mode, depending on the system configuration).

    <br />

    ##### <i class="fas fa-circle-3"></i> Symbolic link

    Now link it to the `/etc/systemd/system` directory through a symbolic link.

    ```sh
    $ sudo ln -s SOURCE TARGET

    $ sudo ln -s service/linux/fast2-broker.service /etc/systemd/system
    ```

    <br/>

    :::tip

        This is the moment where you might want to *rename* the Fast2 service file in case you have multiple instances of Fast2 installed on the same machine.
        For this,

        - rename the file <span style={{color: "red"}}>FAST2_HOME/services/linux/fast2-broker.service</span> to <span style={{color: "green"}}>FAST2_HOME/services/linux/fast2-broker<b>-2.11.0</b>.service</span> for example
        - run the `sudo ln -s ...` command with the new name, something like
            ```sh
            sudo ln -s service/linux/fast2-broker-2.11.0.service /etc/systemd/system
            ```

    :::

    <br/>

    If the links are broken once they're created, you probably need to put an absolute path for the target as follow ;

    ```sh
    $ sudo ln -s /home/userName/fast2-complete-package-2.0.0/service/linux/fast2-broker.service /etc/systemd/system
    ```

    Next, reload systemd services unit and enable them :

    ```sh
    $ sudo systemctl daemon-reload
    $ sudo systemctl enable fast2-broker.service
    ```

    The terminal should prompt the following message :

    ```sh
    Created symlink from /etc/systemd/system/default.target.wants/fast2-broker.service to /etc/systemd/system/fast2-broker.service.
    ```

    <br />

    ##### <i class="fas fa-circle-4"></i> Script uses

    Test your script by starting it and then checking the status :

    ```sh
    $ sudo service fast2-broker start
    $ service fast2-broker status
    ```

    or

    ```sh
    $ sudo systemctl start fast2-broker.service
    $ systemctl status fast2-broker.service
    ```

    You can restart or stop the service at anytime with the commands :

    ```sh
    $ sudo service fast2-broker start | restart | stop | status
    ```

</TabItem>
</Tabs>

## Start Fast2 Worker

The Broker starts an embedded worker by default.

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

    If you wish to start multiple workers, just hit :

    ```cmd
    C:\path-to-fast2\> startup-worker.bat
    ```

</TabItem>
<TabItem value="linux" label="Linux">

    ```
    ./startup-worker.sh
    ```

</TabItem>
</Tabs>

If the worker and broker are not booted up on the same machine, you need to setup the Broker host name in the worker configuration file.
Edit the file `config/application.properties` and modify `broker.host` accordingly.

You can setup Fast2 Worker as a service the same way you did for the Fast2 Broker.

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>

    For a worker installed on a Windows machine, create the worker service files next to the broker ones:

    - **Copy** (do not rename) `Fast2_broker_service.exe` in the `service/windows` folder to `Fast2_worker_service.exe`. The broker service needs its own `.exe` and `.xml`: renaming them breaks the broker service if it is (or will be) installed on this machine.
    - **Copy** `Fast2_broker_service.xml` in the `service/windows` folder to `Fast2_worker_service.xml`. The `.exe` and the `.xml` must have the same name. Then edit `Fast2_worker_service.xml`:
        - The `id` tag has to be changed to something different than `Fast2` in case the broker has already been installed as a service on this machine. For instance,`Fast2-worker`.
        - The `name` tag has to be changed to something different than `Fast2 Broker` to avoid any confusion in case the broker has already been installed as a service on this machine. For instance, `Fast2 Worker`.
        - The `description` tag has to be changed to something different than `Fast2 Broker vX.Y.Z` to avoid any confusion in case the broker has already been installed as a service on this machine. For instance, `Fast2 Worker vX.Y.Z`.
        - The `executable` tag has to be changed to point to the `startup-worker.bat` file which is at Fast2 root level.
        - The `startmode` tag is `Manual` in the delivered file. Set it to `Automatic` if the worker must start with the machine.

    The `Fast2_worker_service.xml` file will look like this :

    ```xml
    <service>
        <id>Fast2WorkerDCTM</id>
        <name>Fast2 Worker DCTM</name>
        <description>Fast2 Worker DCTM vX.Y.Z</description>
        <env name="FAST2_HOME" value="%BASE%\..\.." />
        <executable>%BASE%\..\..\startup-worker.bat</executable>
        <logpath>%BASE%\..\log</logpath>
        <startmode>Automatic</startmode>
        <log mode="roll-by-size">
            <sizeThreshold>10240</sizeThreshold>
            <keepFiles>8</keepFiles>
        </log>
    </service>
    ```

    And then, to install the worker as a service :

    ```cmd
    C:\path-to-fast2\service\windows> Fast2_worker_service.exe install
    ```

</TabItem>
<TabItem value="linux" label="Linux">

    The package also delivers `service/linux/fast2-worker.service`, with an `ExecStart` placeholder pointing to `/PATH/TO/FAST2/startup-worker.sh`. Follow the same steps as for the broker (dedicated user owning the installation folder, `Environment="JAVA_HOME=..."`, `User=`, `Group=`, symbolic link, `daemon-reload`, `enable`):

    ```sh {5-8}
    [Unit]
    Description=Fast2 Worker vX.Y.Z

    [Service]
    Environment="JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64"
    ExecStart=/home/userName/fast2-complete-package-X.Y.Z/startup-worker.sh
    User=fast2user
    Group=fast2user

    [Install]
    WantedBy=default.target
    ```

    ```sh
    $ sudo ln -s /home/userName/fast2-complete-package-X.Y.Z/service/linux/fast2-worker.service /etc/systemd/system
    $ sudo systemctl daemon-reload
    $ sudo systemctl enable fast2-worker.service
    $ sudo systemctl start fast2-worker.service
    ```

</TabItem>
</Tabs>

