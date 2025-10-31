# Configuration - Serveur de Rendition

Ce guide détaille la configuration du serveur de rendition ARender pour optimiser les performances et la sécurité selon votre environnement.

## Configuration de base

### Structure des fichiers de configuration
```bash
/etc/arender/
├── rendition.yml          # Configuration principale
├── jvm.conf               # Paramètres JVM
├── engines.yml            # Configuration des moteurs
├── security.yml           # Configuration sécurité
└── logging.yml            # Configuration logs
```

### Fichier principal rendition.yml
```yaml
# ARender Rendition Server - Configuration complète

# Server Configuration
server:
  port: 8080
  address: 0.0.0.0
  servlet:
    context-path: /arender-rendition
  
  # Compression
  compression:
    enabled: true
    mime-types: text/html,text/xml,text/plain,text/css,application/json,application/javascript
    min-response-size: 1024
  
  # Connection settings
  tomcat:
    max-connections: 200
    accept-count: 100
    threads:
      max: 200
      min-spare: 10

# ARender Configuration
arender:
  rendition:
    # Temporary directory
    temp-dir: /opt/arender/rendition/temp
    work-dir: /opt/arender/rendition/work
    
    # File size limits
    max-file-size: 1073741824  # 1GB
    max-pages: 10000
    
    # Processing limits
    max-processing-time: 300
    max-concurrent-conversions: 10
    
    # Cache configuration
    cache:
      enabled: true
      type: caffeine  # caffeine, redis, hazelcast
      max-size: 1000
      expire-after-access: 24h
      expire-after-write: 72h
      
    # Quality settings
    output:
      format: png  # png, jpeg, webp
      quality: 85
      dpi: 150
      max-width: 2048
      max-height: 2048
      
  # Security configuration
  security:
    authentication:
      enabled: true
      type: jwt  # none, basic, jwt, oauth2, saml
      
    cors:
      enabled: true
      allowed-origins: ["*"]
      allowed-methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
      allowed-headers: ["*"]
      allow-credentials: true
      
    api-key:
      enabled: true
      keys:
        - name: "client1"
          key: "your-secret-api-key-here"
          permissions: ["read", "convert"]

# Document engines configuration
engines:
  # LibreOffice for Office documents
  libreoffice:
    enabled: true
    path: /usr/bin/libreoffice
    max-instances: 3
    startup-timeout: 30000
    conversion-timeout: 180000
    cleanup-timeout: 5000
    
    # Options
    options:
      - "--headless"
      - "--invisible" 
      - "--nodefault"
      - "--nolockcheck"
      - "--nologo"
      - "--norestore"
      
  # PDFium for PDF files  
  pdfium:
    enabled: true
    render-quality: high
    text-rendering: true
    image-rendering: true
    
  # ImageMagick for images
  imagemagick:
    enabled: true
    path: /usr/bin/convert
    max-memory: 512MB
    max-disk: 1GB
    
  # FFmpeg for videos (preview)
  ffmpeg:
    enabled: true
    path: /usr/bin/ffmpeg
    thumbnail-time: 10  # seconds
    
# Database configuration (optional)
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/arender
    username: arender
    password: password
    driver-class-name: org.postgresql.Driver
    
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        
# Logging configuration
logging:
  level:
    com.arondor.arender: INFO
    org.springframework: WARN
    org.hibernate: WARN
    
  pattern:
    console: "%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){faint} %clr(${LOG_LEVEL_PATTERN:-%5p}) %clr(${PID:- }){magenta} %clr(---){faint} %clr([%15.15t]){faint} %clr(%-40.40logger{39}){cyan} %clr(:){faint} %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}"
    file: "%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"
    
  file:
    name: /var/log/arender/rendition.log
    max-size: 100MB
    max-history: 30
    total-size-cap: 3GB

# Management endpoints
management:
  endpoints:
    web:
      base-path: /actuator
      exposure:
        include: ["health", "info", "metrics", "prometheus", "loggers"]
  endpoint:
    health:
      show-details: when-authorized
    metrics:
      enabled: true
  metrics:
    export:
      prometheus:
        enabled: true
```

## Configuration par environnement

### Développement (dev)
```yaml
# application-dev.yml
arender:
  rendition:
    max-concurrent-conversions: 2
    cache:
      expire-after-access: 1h
      
logging:
  level:
    com.arondor.arender: DEBUG
    
management:
  endpoint:
    health:
      show-details: always
```

### Test/Recette (test)
```yaml
# application-test.yml
arender:
  rendition:
    max-concurrent-conversions: 5
    
  security:
    authentication:
      enabled: true
      
logging:
  level:
    com.arondor.arender: INFO
```

### Production (prod)
```yaml
# application-prod.yml
arender:
  rendition:
    max-concurrent-conversions: 10
    
  security:
    authentication:
      enabled: true
    cors:
      allowed-origins: ["https://your-domain.com"]
      
server:
  ssl:
    enabled: true
    
logging:
  level:
    root: WARN
    com.arondor.arender: INFO
```

## Configuration SSL/TLS

### Génération de certificats
```bash
# Certificat auto-signé (développement)
sudo -u arender keytool -genkeypair \
    -alias arender-rendition \
    -keyalg RSA \
    -keysize 2048 \
    -validity 365 \
    -keystore /etc/arender/rendition.p12 \
    -storetype PKCS12 \
    -storepass changeme123 \
    -keypass changeme123 \
    -dname "CN=rendition.arender.local,OU=IT,O=Organization,L=City,ST=State,C=FR"
```

### Configuration SSL dans rendition.yml
```yaml
server:
  port: 8443
  ssl:
    enabled: true
    key-store: /etc/arender/rendition.p12
    key-store-type: PKCS12
    key-store-password: changeme123
    key-alias: arender-rendition
    
    # Security protocols
    enabled-protocols: [TLSv1.2, TLSv1.3]
    ciphers: 
      - TLS_AES_256_GCM_SHA384
      - TLS_AES_128_GCM_SHA256
      - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
```

## Configuration des moteurs

### LibreOffice - Configuration avancée
```yaml
engines:
  libreoffice:
    enabled: true
    path: /usr/bin/libreoffice
    
    # Pool configuration
    max-instances: 5
    min-instances: 1
    instance-reuse-count: 100
    
    # Timeouts
    startup-timeout: 30000
    conversion-timeout: 300000
    shutdown-timeout: 10000
    
    # Memory limits
    max-memory: 512MB
    
    # Options spécialisées
    options:
      - "--headless"
      - "--invisible"
      - "--nodefault" 
      - "--nolockcheck"
      - "--nologo"
      - "--norestore"
      - "--convert-to"
      - "pdf:writer_pdf_Export"
      
    # Filtres par type de document
    filters:
      word: "writer_pdf_Export"
      excel: "calc_pdf_Export" 
      powerpoint: "impress_pdf_Export"
```

### PDFium - Configuration optimisée
```yaml
engines:
  pdfium:
    enabled: true
    
    # Rendering options
    render-quality: high  # low, medium, high
    anti-aliasing: true
    text-rendering: true
    image-rendering: true
    path-rendering: true
    
    # Performance
    parallel-rendering: true
    max-render-threads: 4
    
    # Memory management
    max-memory-per-page: 64MB
    cache-rendered-pages: true
```

## Optimisation des performances

### Configuration JVM optimisée
```bash
# /etc/arender/jvm.conf
-Xms8g
-Xmx16g
-XX:NewRatio=1
-XX:SurvivorRatio=8

# Garbage Collector G1
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200
-XX:G1HeapRegionSize=16m
-XX:+G1UseAdaptiveIHOP
-XX:G1MixedGCCountTarget=8

# Optimisations mémoire
-XX:+UseStringDeduplication
-XX:+UseCompressedOops
-XX:+UseCompressedClassPointers

# Monitoring GC
-Xlog:gc*:logs/gc.log:time,level,tags
-XX:+UnlockExperimentalVMOptions
-XX:+UseCGroupMemoryLimitForHeap
```

### Configuration cache Redis (optionnel)
```yaml
# Si type de cache = redis
spring:
  redis:
    host: localhost
    port: 6379
    password: 
    timeout: 2000ms
    lettuce:
      pool:
        max-active: 20
        max-idle: 10
        min-idle: 2
        
arender:
  rendition:
    cache:
      type: redis
      redis:
        key-prefix: "arender:rendition:"
        default-ttl: 86400  # 24h en secondes
```

## Configuration monitoring

### Métriques Prometheus
```yaml
management:
  metrics:
    export:
      prometheus:
        enabled: true
        descriptions: true
        step: 30s
    tags:
      application: arender-rendition
      environment: production
      
  endpoint:
    prometheus:
      enabled: true
```

### Configuration logs avancés
```yaml
logging:
  level:
    com.arondor.arender.rendition.engine: DEBUG
    com.arondor.arender.rendition.cache: INFO
    com.arondor.arender.rendition.security: WARN
    
  loggers:
    com.arondor.arender.rendition.conversion:
      level: INFO
      additivity: false
      appenders: [CONVERSION_FILE]
      
  appenders:
    CONVERSION_FILE:
      type: RollingFileAppender
      fileName: /var/log/arender/conversion.log
      filePattern: /var/log/arender/conversion.%d{yyyy-MM-dd}.%i.log.gz
      policies:
        TimeBasedTriggeringPolicy:
          interval: 1
        SizeBasedTriggeringPolicy:
          size: 100MB
      maxHistory: 30
```

## Validation de la configuration

### Script de test de configuration
```bash
#!/bin/bash
# test-config.sh

echo "=== Test de la configuration ARender Rendition ==="

# Test de syntaxe YAML
echo "Validation syntaxe YAML..."
python3 -c "import yaml; yaml.safe_load(open('/etc/arender/rendition.yml'))" && echo "✓ Syntaxe valide" || echo "✗ Erreur syntaxe"

# Test connectivité base de données
echo "Test base de données..."
java -cp "/opt/arender/rendition/lib/*" \
  -Dspring.config.location=/etc/arender/rendition.yml \
  com.arondor.arender.tools.ConfigTest

# Test moteurs de conversion
echo "Test LibreOffice..."
/usr/bin/libreoffice --headless --version && echo "✓ LibreOffice OK" || echo "✗ LibreOffice KO"

echo "Test ImageMagick..."
/usr/bin/convert --version && echo "✓ ImageMagick OK" || echo "✗ ImageMagick KO"

# Test ports
echo "Test ports..."
ss -tlnp | grep :8080 && echo "✓ Port 8080 libre" || echo "✗ Port 8080 occupé"
```

## Sécurisation

### Configuration firewall
```bash
# UFW (Ubuntu)
sudo ufw allow from 192.168.0.0/16 to any port 8080
sudo ufw deny 8080

# FirewallD (RHEL/CentOS)
sudo firewall-cmd --permanent --zone=internal --add-source=192.168.0.0/16
sudo firewall-cmd --permanent --zone=internal --add-port=8080/tcp
sudo firewall-cmd --reload
```

### Configuration fail2ban
```ini
# /etc/fail2ban/jail.d/arender.conf
[arender-rendition]
enabled = true
port = 8080
protocol = tcp
filter = arender-rendition
logpath = /var/log/arender/rendition.log
maxretry = 5
bantime = 3600
findtime = 600
action = iptables-multiport[name=arender, port="8080"]
```

Une fois la configuration terminée, procédez au [démarrage du service](./demarage.md).