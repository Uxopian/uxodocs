---
sidebar_position: 1
last_update:
  date: '2026-01-29T10:50:12.660Z'
  author: CI/CD Bot
content_hash: 7037301522dbbc16298ac0913e74766c9e37541fe14f8b31b4305b13c45d70e1
---

# Components

Here's a quick intro explaining the purpose and role of the four main components in Fast2 :

<svg style={{height: '1em', width: '1em', verticalAlign: '-0.125em'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="custom-icon"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path><line x1="6" y1="17" x2="18" y2="17"></line></svg> **Broker**

The Broker in Fast2 serves as the migration orchestrator, managing the entire document migration process. It delegates unit tasks to the embedded worker or additional workers for scalability. By coordinating the workflow, the Broker ensures efficient and reliable migration operations.

<i className="fas fa-user-gear"></i> **Worker(s)**

The workers in Fast2 are responsible for executing the delegated migration tasks. They handle the actual processing of documents, applying transformations, conversions, and other necessary operations. Additional workers can be added to distribute the workload, enhancing performance and enabling scalability.

<i className="fas fa-database"></i> **Database**

Fast2 utilizes a NoSQL database to store all migration-related information. This database ensures crash-proof functionality, as well as providing traceability and persistence throughout the migration process. By storing the data in a structured manner, the database facilitates efficient retrieval and management of migration artifacts.

<i className="fas fa-chart-line"></i> **Dashboards**

Fast2 offers a powerful dashboards feature that provides users with comprehensive visualizations and graphs. These dashboards give an overview of the overall migration progress, even when dealing with large-scale migrations encompassing millions of documents. Users can monitor key metrics, track performance, and gain valuable insights into the migration status, facilitating effective decision-making.

With the combined functionality of the Broker, Worker(s), Database, and Dashboards, Fast2 offers a robust and scalable platform for streamlined document migration, ensuring a smooth and efficient migration experience.
