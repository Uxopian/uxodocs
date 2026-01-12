---
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: c8faeafc30c6147b1fd6e15f6f24793e85f3873d433da3fc5a0229f611681ed5
---

# Components

Here's a quick intro explaining the purpose and role of the four main components in Fast2 :

:material-chef-hat: **Broker**

: The Broker in Fast2 serves as the migration orchestrator, managing the entire document migration process. It delegates unit tasks to the embedded worker or additional workers for scalability. By coordinating the workflow, the Broker ensures efficient and reliable migration operations.

:fontawesome-solid-user-gear: **Worker(s)**

: The workers in Fast2 are responsible for executing the delegated migration tasks. They handle the actual processing of documents, applying transformations, conversions, and other necessary operations. Additional workers can be added to distribute the workload, enhancing performance and enabling scalability.

:material-database: **Database**

: Fast2 utilizes a NoSQL database to store all migration-related information. This database ensures crash-proof functionality, as well as providing traceability and persistence throughout the migration process. By storing the data in a structured manner, the database facilitates efficient retrieval and management of migration artifacts.

:material-monitor-dashboard: **Dashboards**

: Fast2 offers a powerful dashboards feature that provides users with comprehensive visualizations and graphs. These dashboards give an overview of the overall migration progress, even when dealing with large-scale migrations encompassing millions of documents. Users can monitor key metrics, track performance, and gain valuable insights into the migration status, facilitating effective decision-making.

With the combined functionality of the Broker, Worker(s), Database, and Dashboards, Fast2 offers a robust and scalable platform for streamlined document migration, ensuring a smooth and efficient migration experience.
