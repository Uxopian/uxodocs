# Kubernetes - Serveur de présentation

Déploiement du serveur Web-UI ARender sur Kubernetes.

## Deployment WebUI
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: arender-webui
spec:
  replicas: 3
  selector:
    matchLabels:
      app: arender-webui
  template:
    metadata:
      labels:
        app: arender-webui
    spec:
      containers:
      - name: webui
        image: arender/webui:4.x.x
        ports:
        - containerPort: 8082
        env:
        - name: ARENDER_RENDITION_SERVER
          value: "http://arender-rendition:8080"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: arender-secrets
              key: database-url
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"  
            cpu: "1"
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8082
          initialDelaySeconds: 60
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /actuator/health
            port: 8082
          initialDelaySeconds: 30
          periodSeconds: 10
```

## Service
```yaml
apiVersion: v1
kind: Service
metadata:
  name: arender-webui
spec:
  selector:
    app: arender-webui
  ports:
  - port: 8082
    targetPort: 8082
  type: ClusterIP
```

## HPA (Auto-scaling)
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: arender-webui-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: arender-webui
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```