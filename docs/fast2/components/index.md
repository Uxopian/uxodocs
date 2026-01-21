---
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 5875f34db2db378dba5d336fffcb219fa46e64808a29df5ab2c566a6f1cc6b51
---

# Components

Here's a quick intro explaining the purpose and role of the four main components in Fast2 :

<i class="fas fa-hat-chef"></i> **Broker**

The Broker in Fast2 serves as the migration orchestrator, managing the entire document migration process. It delegates unit tasks to the embedded worker or additional workers for scalability. By coordinating the workflow, the Broker ensures efficient and reliable migration operations.

<i class="fas fa-user-gear"></i> **Worker(s)**

The workers in Fast2 are responsible for executing the delegated migration tasks. They handle the actual processing of documents, applying transformations, conversions, and other necessary operations. Additional workers can be added to distribute the workload, enhancing performance and enabling scalability.

<i class="fas fa-database"></i> **Database**

Fast2 utilizes a NoSQL database to store all migration-related information. This database ensures crash-proof functionality, as well as providing traceability and persistence throughout the migration process. By storing the data in a structured manner, the database facilitates efficient retrieval and management of migration artifacts.

<i class="fas fa-chart-line"></i> **Dashboards**

Fast2 offers a powerful dashboards feature that provides users with comprehensive visualizations and graphs. These dashboards give an overview of the overall migration progress, even when dealing with large-scale migrations encompassing millions of documents. Users can monitor key metrics, track performance, and gain valuable insights into the migration status, facilitating effective decision-making.

With the combined functionality of the Broker, Worker(s), Database, and Dashboards, Fast2 offers a robust and scalable platform for streamlined document migration, ensuring a smooth and efficient migration experience.
