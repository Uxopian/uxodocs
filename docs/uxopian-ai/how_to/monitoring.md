---
title: "Monitoring Performance"
sidebar_position: 7
---
# Monitoring Performance

This guide covers how to monitor the health and performance of your uxopian-ai deployment using the built-in observability stack.

---

## Monitoring Architecture

The monitoring system operates in two distinct stages:

1. **Data Collection (Actuator)**: The Spring Boot Actuator module exposes operational information about the running application — health, loggers, info.
2. **Instrumentation (Micrometer)**: Micrometer, an application metrics facade, instruments key methods with `Timer` metrics, recording the duration and count of every execution for a clear view of API performance.

---

## Actuator Endpoints

Spring Boot Actuator exposes the following endpoints (configured in `metrics.yml`):

| Endpoint                  | Description                               |
| :------------------------ | :---------------------------------------- |
| `/actuator/health`        | Application health status.                |
| `/actuator/info`          | General application information.          |
| `/actuator/loggers`       | View and modify log levels at runtime.    |

### Checking Health

```bash
curl http://localhost:8080/actuator/health
```

A healthy response returns:

```json
{
  "status": "UP"
}
```

---

## Metrics Export to OpenSearch

Uxopian-ai uses Micrometer to export telemetry data directly to your OpenSearch instance. This data powers the [Admin Dashboard statistics](../admin/statistics.md).

### Configuration

The metrics export is configured in `metrics.yml`:

```yaml
management:
  elastic:
    metrics:
      export:
        enabled: true
        host: http://${opensearch.host}:${opensearch.port}
        index: micrometer-metrics
        auto-create-index: true
  endpoints:
    web:
      exposure:
        include: health,info,loggers
  metrics:
    uxopian-ai:
      enable: true  # Enables custom business metrics (Token usage, ROI, etc.)
```

### Custom Business Metrics

When `management.metrics.uxopian-ai.enable` is set to `true`, the following business metrics are collected:

- **Token consumption** — Input and output tokens per request.
- **Request latency** — Duration of LLM calls.
- **ROI tracking** — Time saved per prompt usage.
- **Feature adoption** — Multi-modal and function calling usage rates.

These metrics feed directly into the [Statistics dashboard](../admin/statistics.md).

---

## Disabling Noisy Metrics

By default, standard JVM and framework metrics can generate a large volume of data. You can disable them selectively in `metrics.yml`:

```yaml
management:
  metrics:
    enable:
      application: false
      tomcat: false
      logback: false
      jvm: false
      system: false
      http: false
      process: false
      disk: false
      executor: false
```

---

## Recommended Monitoring Setup

For production deployments, we recommend:

1. **Health checks**: Point your load balancer or orchestrator at `/actuator/health`.
2. **Log aggregation**: Forward application logs to a centralized system (ELK, Datadog, etc.).
3. **Metrics visualization**: Use the built-in Admin Dashboard or connect an external tool (Grafana, Kibana) to the `micrometer-metrics` index in OpenSearch.
4. **Alerting**: Set up alerts on key metrics — LLM response latency, error rates, and token consumption spikes.
