# Démarrage - Serveur de Rendition

Ce guide détaille le démarrage du serveur de rendition ARender et la gestion du service en mode classique.

## Démarrage du service

### Première vérification
Avant de démarrer le service, effectuons une vérification finale :

```bash
# Vérifier la configuration
sudo -u arender java -jar /opt/arender/rendition/arender-rendition.jar \
  --spring.config.location=/etc/arender/rendition.yml \
  --spring.profiles.active=validate

# Vérifier les permissions
ls -la /opt/arender/rendition/
ls -la /etc/arender/
ls -la /var/log/arender/
```

### Démarrage avec systemd (Recommandé)

#### Activation du service
```bash
# Recharger la configuration systemd
sudo systemctl daemon-reload

# Activer le démarrage automatique
sudo systemctl enable arender-rendition.service

# Démarrer le service
sudo systemctl start arender-rendition.service

# Vérifier le statut
sudo systemctl status arender-rendition.service
```

#### Suivi des logs en temps réel
```bash
# Logs du service systemd
sudo journalctl -u arender-rendition.service -f

# Logs applicatifs
sudo tail -f /var/log/arender/rendition.log

# Logs de conversion spécifiques
sudo tail -f /var/log/arender/conversion.log
```

### Démarrage manuel (Debug)

#### Mode debug complet
```bash
# Démarrage avec logs détaillés
sudo -u arender java \
  -Xms4g -Xmx8g \
  -XX:+UseG1GC \
  -Dspring.profiles.active=dev \
  -Dlogging.level.com.arondor.arender=DEBUG \
  -jar /opt/arender/rendition/arender-rendition.jar \
  --spring.config.location=/etc/arender/rendition.yml
```

#### Mode foreground (test)
```bash
# Démarrage en premier plan
sudo -u arender java -jar /opt/arender/rendition/arender-rendition.jar \
  --server.port=8080 \
  --arender.rendition.temp-dir=/tmp/arender-test
```

## Vérification du démarrage

### Tests de connectivité

#### Health check
```bash
# Test de santé basique
curl -s http://localhost:8080/actuator/health | jq '.'

# Réponse attendue
{
  "status": "UP",
  "components": {
    "diskSpace": {"status": "UP"},
    "libreoffice": {"status": "UP"},
    "pdfium": {"status": "UP"},
    "ping": {"status": "UP"}
  }
}
```

#### Test des endpoints
```bash
# Informations sur l'application
curl -s http://localhost:8080/actuator/info | jq '.'

# Métriques disponibles
curl -s http://localhost:8080/actuator/metrics

# Métriques spécifiques
curl -s http://localhost:8080/actuator/metrics/jvm.memory.used | jq '.'
```

### Validation des moteurs

#### Test LibreOffice
```bash
# Création d'un document test
echo "Test document ARender" > /tmp/test.txt

# Test de conversion via API
curl -X POST \
  -F "file=@/tmp/test.txt" \
  -F "format=pdf" \
  http://localhost:8080/api/v1/convert \
  -o /tmp/test.pdf

# Vérification du résultat
file /tmp/test.pdf
```

#### Test PDFium
```bash
# Création d'un PDF test
echo "Test PDF" | ps2pdf - /tmp/test-input.pdf

# Test de rendu
curl -X POST \
  -F "file=@/tmp/test-input.pdf" \
  -F "page=1" \
  -F "format=png" \
  http://localhost:8080/api/v1/render \
  -o /tmp/test.png

# Vérification
file /tmp/test.png
```

## Gestion du service

### Commandes systemctl essentielles

```bash
# Statut détaillé du service
sudo systemctl status arender-rendition.service -l

# Redémarrage du service
sudo systemctl restart arender-rendition.service

# Rechargement de configuration (sans arrêt)
sudo systemctl reload arender-rendition.service

# Arrêt propre du service
sudo systemctl stop arender-rendition.service

# Désactivation du démarrage automatique
sudo systemctl disable arender-rendition.service
```

### Scripts de gestion personnalisés

#### Script de contrôle
```bash
#!/bin/bash
# /opt/arender/bin/arender-control.sh

SCRIPT_NAME="ARender Rendition Control"
SERVICE_NAME="arender-rendition"
PID_FILE="/var/run/arender/rendition.pid"
LOG_FILE="/var/log/arender/rendition.log"

case "$1" in
    start)
        echo "Starting $SERVICE_NAME..."
        sudo systemctl start $SERVICE_NAME
        ;;
    stop)
        echo "Stopping $SERVICE_NAME..."
        sudo systemctl stop $SERVICE_NAME
        ;;
    restart)
        echo "Restarting $SERVICE_NAME..."
        sudo systemctl restart $SERVICE_NAME
        ;;
    status)
        sudo systemctl status $SERVICE_NAME -l
        ;;
    health)
        echo "Checking health..."
        curl -s http://localhost:8080/actuator/health | jq '.'
        ;;
    logs)
        echo "Showing logs..."
        sudo tail -f $LOG_FILE
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|health|logs}"
        exit 1
        ;;
esac
```

### Monitoring en temps réel

#### Dashboard simple
```bash
#!/bin/bash
# monitor-arender.sh

watch -n 2 '
echo "=== ARender Rendition Server Monitor ==="
echo
echo "Service Status:"
systemctl is-active arender-rendition.service
echo
echo "Memory Usage:"
ps aux | grep "arender-rendition" | grep -v grep | awk "{print \"RSS: \" \$6/1024 \"MB\"}"
echo
echo "CPU Usage:"
top -bn1 | grep "arender" | awk "{print \"CPU: \" \$9\"%\"}"
echo
echo "Disk Usage:"
df -h /opt/arender /var/log/arender | tail -2
echo
echo "Network Connections:"
ss -tuln | grep :8080
echo
echo "Recent Log Entries:"
tail -5 /var/log/arender/rendition.log
'
```

## Optimisation du démarrage

### Configuration systemd avancée

#### Service avec redémarrage intelligent
```ini
# /etc/systemd/system/arender-rendition.service
[Unit]
Description=ARender Rendition Server
Documentation=https://arender.fr/docs
After=network-online.target
Wants=network-online.target
StartLimitIntervalSec=30
StartLimitBurst=3

[Service]
Type=simple
User=arender
Group=arender
WorkingDirectory=/opt/arender/rendition

# Variables d'environnement
Environment=JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
Environment=SPRING_CONFIG_LOCATION=/etc/arender/rendition.yml
Environment=SPRING_PROFILES_ACTIVE=prod

# Configuration JVM optimisée
Environment=JAVA_OPTS=-Xms8g -Xmx16g -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:+UseStringDeduplication

# Commandes
ExecStartPre=/bin/bash -c 'mkdir -p /var/run/arender && chown arender:arender /var/run/arender'
ExecStart=/usr/bin/java $JAVA_OPTS -jar arender-rendition.jar
ExecStop=/bin/kill -TERM $MAINPID
ExecReload=/bin/kill -HUP $MAINPID

# Redémarrage automatique
Restart=on-failure
RestartSec=10
RestartPreventExitStatus=1

# Timeouts
TimeoutStartSec=120
TimeoutStopSec=30

# Sécurité
NoNewPrivileges=yes
ProtectSystem=strict
ProtectHome=yes
ReadWritePaths=/opt/arender /var/log/arender /var/run/arender /tmp

# Ressources
LimitNOFILE=65536
LimitNPROC=32768
LimitCORE=0

# PID tracking
PIDFile=/var/run/arender/rendition.pid

[Install]
WantedBy=multi-user.target
```

### Démarrage en mode cluster

#### Configuration multi-instances
```bash
# Instance 1 - Port 8080
sudo systemctl start arender-rendition@8080.service

# Instance 2 - Port 8081  
sudo systemctl start arender-rendition@8081.service

# Load balancer (HAProxy/Nginx)
sudo systemctl start haproxy.service
```

#### Template de service
```ini
# /etc/systemd/system/arender-rendition@.service
[Unit]
Description=ARender Rendition Server (Port %i)
After=network.target

[Service]
Type=simple
User=arender
Group=arender
WorkingDirectory=/opt/arender/rendition

Environment=JAVA_OPTS=-Xms4g -Xmx8g -XX:+UseG1GC
ExecStart=/usr/bin/java $JAVA_OPTS -jar arender-rendition.jar --server.port=%i

Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

## Dépannage du démarrage

### Problèmes courants

#### Port déjà utilisé
```bash
# Identifier le processus
sudo lsof -i:8080
sudo netstat -tlnp | grep 8080

# Arrêter le processus conflictuel
sudo kill -9 <PID>

# Ou changer le port
sudo -u arender java -jar arender-rendition.jar --server.port=8081
```

#### Problèmes de mémoire
```bash
# Vérifier la mémoire disponible
free -h

# Réduire l'allocation JVM temporairement
Environment=JAVA_OPTS=-Xms2g -Xmx4g

# Ou augmenter la swap
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

#### Problèmes de permissions
```bash
# Corriger les permissions
sudo chown -R arender:arender /opt/arender
sudo chmod -R 755 /opt/arender
sudo chown -R arender:arender /var/log/arender
sudo chmod -R 755 /var/log/arender
```

### Logs de démarrage

#### Analyse des logs
```bash
# Logs systemd détaillés
sudo journalctl -u arender-rendition.service --no-pager -l

# Logs avec horodatage
sudo journalctl -u arender-rendition.service -f --output=json-pretty

# Logs d'erreur uniquement
sudo journalctl -u arender-rendition.service -p err

# Logs depuis une date
sudo journalctl -u arender-rendition.service --since="2024-01-01 10:00:00"
```

## Validation post-démarrage

### Checklist de validation
- [ ] Service systemd actif
- [ ] Port 8080 en écoute
- [ ] Health check répond "UP"
- [ ] Logs sans erreur critique
- [ ] Moteurs LibreOffice/PDFium opérationnels
- [ ] Tests de conversion fonctionnels
- [ ] Monitoring accessible
- [ ] Ressources système dans les limites

Une fois le démarrage validé, procédez à la [vérification complète](./verification.md) de l'installation.