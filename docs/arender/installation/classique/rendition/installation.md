# Installation - Serveur de Rendition

Ce guide détaille l'installation du serveur de rendition ARender en mode classique (non-Docker).

## Préparation de l'installation

### Téléchargement d'ARender
```bash
# Créer le répertoire d'installation
sudo mkdir -p /opt/arender/rendition
cd /opt/arender/rendition

# Télécharger ARender Rendition Server
# (Remplacez par l'URL fournie par Arondor)
wget https://releases.arender.fr/stable/arender-rendition-server-4.x.x.jar

# Vérifier l'intégrité
sha256sum arender-rendition-server-4.x.x.jar
```

### Structure des répertoires
```bash
# Créer l'arborescence complète
sudo mkdir -p /opt/arender/rendition/{bin,conf,data,logs,temp,lib}
sudo mkdir -p /var/log/arender
sudo mkdir -p /etc/arender

# Permissions
sudo chown -R arender:arender /opt/arender
sudo chown -R arender:arender /var/log/arender  
sudo chown -R arender:arender /etc/arender
```

## Configuration de base

### Fichier de configuration principal
```bash
# Créer le fichier application.yml
sudo -u arender tee /etc/arender/rendition.yml > /dev/null << 'EOF'
# ARender Rendition Server Configuration

# Server Configuration
server:
  port: 8080
  address: 0.0.0.0
  
  # SSL Configuration (Production)
  ssl:
    enabled: false
    key-store: classpath:arender.p12
    key-store-password: changeme
    key-store-type: PKCS12
    key-alias: arender

# ARender Configuration
arender:
  rendition:
    # Temporary directory for conversion
    temp-dir: /opt/arender/rendition/temp
    
    # Maximum file size (in bytes)
    max-file-size: 1073741824  # 1GB
    
    # Maximum processing time (in seconds)
    max-processing-time: 300
    
    # Number of conversion threads
    conversion-threads: 4
    
    # Cache configuration
    cache:
      enabled: true
      max-size: 1000
      expire-after-access: 24h
      
  # Document engines configuration
  engines:
    libreoffice:
      enabled: true
      path: /usr/bin/libreoffice
      max-instances: 3
      startup-timeout: 30000
      
    pdfium:
      enabled: true
      
    imagemagick:
      enabled: true
      path: /usr/bin/convert
      
  # Security configuration  
  security:
    # Authentication mode: none, basic, jwt, oauth2
    authentication: none
    
    # Allowed origins (CORS)
    allowed-origins: ["*"]
    
    # API key protection
    api-key:
      enabled: false
      key: ""

# Logging configuration
logging:
  level:
    com.arondor.arender: INFO
    org.springframework: WARN
    root: INFO
    
  pattern:
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
    
  file:
    name: /var/log/arender/rendition.log
    max-size: 100MB
    max-history: 30
    total-size-cap: 1GB

# Management endpoints
management:
  endpoints:
    web:
      exposure:
        include: ["health", "info", "metrics", "prometheus"]
  endpoint:
    health:
      show-details: always
    metrics:
      enabled: true
EOF
```

### Script de démarrage systemd
```bash
# Créer le service systemd
sudo tee /etc/systemd/system/arender-rendition.service > /dev/null << 'EOF'
[Unit]
Description=ARender Rendition Server
Documentation=https://arender.fr/docs
After=network.target
Wants=network.target

[Service]
Type=simple
User=arender
Group=arender
WorkingDirectory=/opt/arender/rendition

# Java configuration
Environment=JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
Environment=JAVA_OPTS=-Xms4g -Xmx8g -XX:+UseG1GC -XX:MaxGCPauseMillis=200
Environment=SPRING_CONFIG_LOCATION=/etc/arender/rendition.yml

# Service configuration
ExecStart=/usr/bin/java $JAVA_OPTS -jar arender-rendition-server-4.x.x.jar
ExecStop=/bin/kill -TERM $MAINPID
Restart=on-failure
RestartSec=10

# Security settings
NoNewPrivileges=yes
ProtectSystem=strict
ProtectHome=yes
ReadWritePaths=/opt/arender /var/log/arender /tmp

# Resource limits
LimitNOFILE=65536
LimitNPROC=32768

[Install]
WantedBy=multi-user.target
EOF
```

## Installation et configuration

### Installation du package
```bash
# Copier le JAR dans le répertoire final
sudo cp arender-rendition-server-4.x.x.jar /opt/arender/rendition/
sudo chown arender:arender /opt/arender/rendition/arender-rendition-server-4.x.x.jar

# Créer un lien symbolique pour faciliter les mises à jour
sudo -u arender ln -sf arender-rendition-server-4.x.x.jar /opt/arender/rendition/arender-rendition.jar
```

### Configuration des permissions
```bash
# Permissions des fichiers de configuration
sudo chmod 640 /etc/arender/rendition.yml

# Permissions des répertoires de données
sudo chmod 755 /opt/arender/rendition/temp
sudo chmod 755 /var/log/arender

# Permissions d'exécution
sudo chmod +x /opt/arender/rendition/arender-rendition-server-4.x.x.jar
```

### Configuration du service
```bash
# Recharger systemd
sudo systemctl daemon-reload

# Activer le service au démarrage
sudo systemctl enable arender-rendition.service

# Vérifier la configuration
sudo systemctl status arender-rendition.service
```

## Configuration avancée

### Optimisation Java
```bash
# Configuration JVM pour production
sudo tee /etc/arender/jvm.conf > /dev/null << 'EOF'
# Memory settings
-Xms8g
-Xmx16g
-XX:MaxDirectMemorySize=2g

# Garbage Collector
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200
-XX:+UseStringDeduplication

# Performance tuning
-XX:+AlwaysPreTouch
-XX:+UseCompressedOops
-XX:+OptimizeStringConcat

# Monitoring
-XX:+UnlockExperimentalVMOptions
-XX:+UseCGroupMemoryLimitForHeap
-XX:+PrintGCDetails
-XX:+PrintGCTimeStamps
-XX:+PrintGCApplicationStoppedTime
-Xloggc:/var/log/arender/gc.log

# Security
-Djava.awt.headless=true
-Dfile.encoding=UTF-8
-Dsun.java2d.fontpath=/usr/share/fonts
EOF
```

### Configuration SSL/TLS
```bash
# Génération certificat auto-signé (développement)
sudo -u arender keytool -genkeypair \
    -alias arender \
    -keyalg RSA \
    -keysize 2048 \
    -validity 365 \
    -keystore /etc/arender/arender.p12 \
    -storetype PKCS12 \
    -storepass changeme \
    -dname "CN=arender.local,O=Organization,L=City,ST=State,C=FR"

# Configuration HTTPS dans rendition.yml
sudo -u arender sed -i 's/enabled: false/enabled: true/' /etc/arender/rendition.yml
sudo -u arender sed -i 's/port: 8080/port: 8443/' /etc/arender/rendition.yml
```

### Configuration monitoring
```bash
# Installation agent Prometheus (optionnel)
wget https://github.com/prometheus/node_exporter/releases/download/v1.6.1/node_exporter-1.6.1.linux-amd64.tar.gz
tar xzf node_exporter-1.6.1.linux-amd64.tar.gz
sudo cp node_exporter-1.6.1.linux-amd64/node_exporter /usr/local/bin/
sudo chown arender:arender /usr/local/bin/node_exporter
sudo chmod +x /usr/local/bin/node_exporter
```

## Installation des outils externes

### ImageMagick (traitement images)
```bash
# Ubuntu/Debian
sudo apt install -y imagemagick imagemagick-doc

# Configuration policy.xml pour les PDF
sudo sed -i 's/<policy domain="coder" rights="none" pattern="PDF" \/>/<policy domain="coder" rights="read|write" pattern="PDF" \/>/' /etc/ImageMagick-6/policy.xml

# RHEL/CentOS
sudo dnf install -y ImageMagick ImageMagick-devel
```

### FFmpeg (traitement vidéo)
```bash
# Ubuntu/Debian
sudo apt install -y ffmpeg

# RHEL/CentOS (nécessite EPEL)
sudo dnf install -y epel-release
sudo dnf install -y ffmpeg
```

### Ghostscript (PostScript/PDF)
```bash
# Ubuntu/Debian  
sudo apt install -y ghostscript

# RHEL/CentOS
sudo dnf install -y ghostscript
```

## Tests d'installation

### Test de base
```bash
# Vérifier que Java fonctionne
java -version

# Test de lancement à sec
sudo -u arender java -jar /opt/arender/rendition/arender-rendition.jar --help
```

### Validation de la configuration
```bash
# Vérifier la syntaxe YAML
sudo -u arender java -jar /opt/arender/rendition/arender-rendition.jar \
  --spring.config.location=/etc/arender/rendition.yml \
  --spring.profiles.active=validate-config
```

Une fois l'installation terminée, procédez à la [configuration](./configuration.md) puis au [démarrage](./demarage.md) du service.