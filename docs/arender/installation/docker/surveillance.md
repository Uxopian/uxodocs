# Docker - Surveillance

Monitoring et observabilité pour ARender avec Docker.

## Stack de monitoring
```yaml
version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

  arender-rendition:
    image: arender/rendition-server:4.x.x
    environment:
      - MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE=health,info,metrics,prometheus
    labels:
      - "prometheus.scrape=true"
      - "prometheus.port=8080"
      - "prometheus.path=/actuator/prometheus"
```

## Configuration Prometheus
```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'arender'
    static_configs:
      - targets: ['arender-rendition:8080', 'arender-webui:8082']
    metrics_path: '/actuator/prometheus'
```

## Dashboards Grafana
- Métriques JVM (mémoire, GC, threads)
- Métriques applicatives ARender
- Performance des conversions
- Utilisation des ressources

## Logs centralisés
```yaml
fluentd:
  image: fluent/fluentd
  volumes:
    - ./fluent.conf:/fluentd/etc/fluent.conf
```