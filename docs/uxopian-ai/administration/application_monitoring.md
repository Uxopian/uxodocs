---
title: Application Performance Monitoring APM
last_update:
  date: '2025-12-09T08:47:49.723Z'
  author: CI/CD Bot
content_hash: fc33824e73c742382a82fca45f67da1694b41d099f58b8b1e6291263df78889d
---

# Application Performance Monitoring (APM)

To ensure high availability and performance, this application is actively monitored using a modern observability stack composed of **Spring Boot Actuator** and **Micrometer**.

This setup provides detailed, real-time insights into the performance of critical operations, particularly the latency of API calls and service method executions.

---
### Monitoring Architecture 🏗️

The monitoring system operates in two distinct stages:

1.  **Data Collection (Actuator)**: The Spring Boot Actuator module exposes operational information about the running application — health, loggers, info.

2.  **Instrumentation (Micrometer)**: We use Micrometer, an application metrics facade, to instrument our code. Key methods are wrapped with `Timer` metrics, which record the duration and count of every execution, providing a clear view of API performance.