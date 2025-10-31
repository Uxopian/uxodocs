# Kubernetes - Serveur de rendition

Déploiement du serveur de rendition ARender sur Kubernetes.

## Deployment Rendition
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: arender-rendition
spec:
  replicas: 5
  selector:
    matchLabels:
      app: arender-rendition
  template:
    metadata:
      labels:
        app: arender-rendition
    spec:
      containers:
      - name: rendition
        image: arender/rendition-server:4.x.x
        ports:
        - containerPort: 8080
        env:
        - name: JAVA_OPTS
          value: "-Xms4g -Xmx8g -XX:+UseG1GC"
        - name: ARENDER_TEMP_DIR
          value: "/tmp/arender"
        resources:
          requests:
            memory: "8Gi"
            cpu: "2"
          limits:
            memory: "12Gi"
            cpu: "4"
        volumeMounts:
        - name: temp-storage
          mountPath: /tmp/arender
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 120
          periodSeconds: 30
          timeoutSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 60
          periodSeconds: 10
      volumes:
      - name: temp-storage
        emptyDir:
          sizeLimit: 10Gi
```

## Service
```yaml
apiVersion: v1
kind: Service
metadata:
  name: arender-rendition
spec:
  selector:
    app: arender-rendition
  ports:
  - port: 8080
    targetPort: 8080
  type: ClusterIP
```

## PodDisruptionBudget
```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: arender-rendition-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: arender-rendition
```

## VPA (Vertical Pod Autoscaler)
```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: arender-rendition-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: arender-rendition
  updatePolicy:
    updateMode: "Auto"
```