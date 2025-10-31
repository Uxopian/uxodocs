# Vérification - Serveur de Rendition

Ce guide présente les procédures complètes pour vérifier le bon fonctionnement du serveur de rendition ARender après installation.

## Vérifications système

### Statut des services
```bash
# Statut du service principal
sudo systemctl status arender-rendition.service --no-pager -l

# Vérification des processus
ps aux | grep arender | grep -v grep

# Utilisation des ressources
top -p $(pgrep -f arender-rendition)

# Ports en écoute
sudo netstat -tlnp | grep java
sudo ss -tlnp | grep :8080
```

### Vérification des logs
```bash
# Logs récents sans erreur
sudo journalctl -u arender-rendition.service -n 50 --no-pager

# Recherche d'erreurs critiques
sudo grep -i "error\|exception\|failed" /var/log/arender/rendition.log | tail -10

# Logs de démarrage
sudo grep -i "started\|ready" /var/log/arender/rendition.log | tail -5
```

## Tests fonctionnels

### Health Check complet
```bash
#!/bin/bash
# health-check.sh

echo "=== ARender Rendition Health Check ==="

# Test basique
echo "1. Health endpoint..."
HEALTH=$(curl -s -w "%{http_code}" http://localhost:8080/actuator/health -o /tmp/health.json)
if [ "$HEALTH" = "200" ]; then
    echo "✓ Health check OK"
    cat /tmp/health.json | jq '.'
else
    echo "✗ Health check failed (HTTP $HEALTH)"
fi

# Test info
echo -e "\n2. Application info..."
curl -s http://localhost:8080/actuator/info | jq '.'

# Test métriques
echo -e "\n3. Metrics..."
curl -s http://localhost:8080/actuator/metrics/jvm.memory.used | jq '.measurements[0].value'

echo -e "\nHealth check terminé."
```

### Test de conversion basique
```bash
#!/bin/bash
# conversion-test.sh

echo "=== Test de conversion ARender ==="

# Créer un document test
cat > /tmp/test-doc.txt << 'EOF'
Document de test ARender Rendition Server

Ce document sert à valider le bon fonctionnement
du serveur de conversion ARender.

Date: $(date)
Système: $(uname -a)
EOF

# Test conversion TXT vers PDF
echo "Test conversion TXT -> PDF..."
curl -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/tmp/test-doc.txt" \
  -F "outputFormat=pdf" \
  http://localhost:8080/api/v1/convert \
  --output /tmp/test-result.pdf \
  --write-out "HTTP Status: %{http_code}\nTime: %{time_total}s\n"

# Vérification du résultat
if [ -f "/tmp/test-result.pdf" ]; then
    FILE_TYPE=$(file /tmp/test-result.pdf)
    FILE_SIZE=$(stat -f%z /tmp/test-result.pdf 2>/dev/null || stat -c%s /tmp/test-result.pdf)
    echo "✓ Conversion réussie"
    echo "  Type: $FILE_TYPE"
    echo "  Taille: $FILE_SIZE bytes"
else
    echo "✗ Échec de conversion"
fi

# Nettoyage
rm -f /tmp/test-doc.txt /tmp/test-result.pdf
```

### Test des moteurs de conversion

#### Test LibreOffice
```bash
#!/bin/bash
# test-libreoffice.sh

echo "=== Test moteur LibreOffice ==="

# Créer un document Word basique
cat > /tmp/test.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>Test LibreOffice</title></head>
<body>
<h1>Document de test</h1>
<p>Ce document teste la conversion LibreOffice.</p>
<table border="1">
<tr><th>Colonne 1</th><th>Colonne 2</th></tr>
<tr><td>Valeur 1</td><td>Valeur 2</td></tr>
</table>
</body>
</html>
EOF

# Test de conversion
curl -X POST \
  -F "file=@/tmp/test.html" \
  -F "outputFormat=pdf" \
  http://localhost:8080/api/v1/engines/libreoffice/convert \
  -o /tmp/libreoffice-test.pdf

# Vérification
if [ -f "/tmp/libreoffice-test.pdf" ]; then
    echo "✓ Moteur LibreOffice fonctionnel"
    pdfinfo /tmp/libreoffice-test.pdf 2>/dev/null || echo "  (pdfinfo non disponible)"
else
    echo "✗ Moteur LibreOffice défaillant"
fi

rm -f /tmp/test.html /tmp/libreoffice-test.pdf
```

#### Test PDFium
```bash
#!/bin/bash  
# test-pdfium.sh

echo "=== Test moteur PDFium ==="

# Créer un PDF simple
echo "Test PDFium" | ps2pdf - /tmp/test-input.pdf

# Test de rendu
curl -X POST \
  -F "file=@/tmp/test-input.pdf" \
  -F "page=1" \
  -F "format=png" \
  -F "dpi=150" \
  http://localhost:8080/api/v1/engines/pdfium/render \
  -o /tmp/pdfium-test.png

# Vérification
if [ -f "/tmp/pdfium-test.png" ]; then
    echo "✓ Moteur PDFium fonctionnel"
    identify /tmp/pdfium-test.png 2>/dev/null || echo "  (ImageMagick identify non disponible)"
else
    echo "✗ Moteur PDFium défaillant"
fi

rm -f /tmp/test-input.pdf /tmp/pdfium-test.png
```

## Vérifications performance

### Test de charge basique
```bash
#!/bin/bash
# performance-test.sh

echo "=== Test de performance ARender ==="

# Créer plusieurs documents test
for i in {1..5}; do
    echo "Document de test numéro $i - $(date)" > /tmp/perf-test-$i.txt
done

# Test de conversions simultanées
echo "Lancement de 5 conversions simultanées..."
start_time=$(date +%s)

for i in {1..5}; do
    (
        curl -s -X POST \
          -F "file=@/tmp/perf-test-$i.txt" \
          -F "outputFormat=pdf" \
          http://localhost:8080/api/v1/convert \
          -o /tmp/perf-result-$i.pdf
        echo "Conversion $i terminée"
    ) &
done

# Attendre la fin de toutes les conversions
wait

end_time=$(date +%s)
duration=$((end_time - start_time))

echo "Toutes les conversions terminées en ${duration}s"

# Vérifier les résultats
success_count=0
for i in {1..5}; do
    if [ -f "/tmp/perf-result-$i.pdf" ]; then
        ((success_count++))
    fi
done

echo "Conversions réussies: $success_count/5"

# Nettoyage
rm -f /tmp/perf-test-*.txt /tmp/perf-result-*.pdf
```

### Monitoring des ressources
```bash
#!/bin/bash
# resource-monitor.sh

echo "=== Monitoring des ressources ARender ==="

PID=$(pgrep -f arender-rendition)

if [ -n "$PID" ]; then
    echo "PID ARender: $PID"
    
    # Utilisation CPU et mémoire
    echo -e "\nUtilisation des ressources:"
    ps -p $PID -o pid,pcpu,pmem,vsz,rss,time,cmd
    
    # Détails mémoire
    echo -e "\nDétails mémoire:"
    cat /proc/$PID/status | grep -E "(VmSize|VmRSS|VmHWM|VmPeak)"
    
    # Descripteurs de fichiers ouverts
    echo -e "\nDescripteurs ouverts:"
    ls /proc/$PID/fd | wc -l
    echo "Limite: $(ulimit -n)"
    
    # Threads
    echo -e "\nNombre de threads:"
    cat /proc/$PID/status | grep Threads
    
else
    echo "✗ Processus ARender non trouvé"
fi
```

## Vérifications réseau

### Test connectivité
```bash
#!/bin/bash
# network-test.sh

echo "=== Test connectivité réseau ==="

# Test local
echo "1. Test local (127.0.0.1)..."
curl -s -o /dev/null -w "Temps: %{time_total}s - Code: %{http_code}\n" \
  http://127.0.0.1:8080/actuator/health

# Test interface réseau
INTERFACE_IP=$(hostname -I | awk '{print $1}')
echo -e "\n2. Test interface réseau ($INTERFACE_IP)..."
curl -s -o /dev/null -w "Temps: %{time_total}s - Code: %{http_code}\n" \
  http://$INTERFACE_IP:8080/actuator/health

# Test DNS résolution
echo -e "\n3. Test résolution hostname..."
HOSTNAME=$(hostname -f)
curl -s -o /dev/null -w "Temps: %{time_total}s - Code: %{http_code}\n" \
  http://$HOSTNAME:8080/actuator/health 2>/dev/null || echo "Résolution hostname échouée"

# Test HTTPS (si configuré)
echo -e "\n4. Test HTTPS (si configuré)..."
curl -k -s -o /dev/null -w "Temps: %{time_total}s - Code: %{http_code}\n" \
  https://localhost:8443/actuator/health 2>/dev/null || echo "HTTPS non configuré"
```

### Analyse des connexions
```bash
# Connexions actives
echo "Connexions TCP actives sur port 8080:"
sudo netstat -anp | grep :8080 | grep ESTABLISHED

# Statistiques réseau
echo -e "\nStatistiques réseau du processus:"
PID=$(pgrep -f arender-rendition)
if [ -n "$PID" ]; then
    cat /proc/$PID/net/tcp | head -5
fi
```

## Vérifications sécurité

### Audit des permissions
```bash
#!/bin/bash
# security-audit.sh

echo "=== Audit sécurité ARender ==="

# Permissions des fichiers critiques
echo "1. Permissions fichiers:"
ls -la /opt/arender/rendition/arender-rendition*.jar
ls -la /etc/arender/rendition.yml
ls -ld /var/log/arender/

# Utilisateur du processus
echo -e "\n2. Utilisateur processus:"
PID=$(pgrep -f arender-rendition)
if [ -n "$PID" ]; then
    ps -p $PID -o user,pid,cmd
fi

# Écoute réseau
echo -e "\n3. Ports en écoute:"
sudo netstat -tlnp | grep java

# Configuration SSL
echo -e "\n4. Configuration SSL:"
curl -k -I https://localhost:8443/actuator/health 2>/dev/null | head -1 || echo "SSL non configuré"

# Tests de sécurité basiques
echo -e "\n5. Tests sécurité:"
# Test accès sans authentification (si activée)
curl -s -o /dev/null -w "Code sans auth: %{http_code}\n" http://localhost:8080/api/v1/convert

# Test avec authentification (si configurée)
# curl -s -o /dev/null -w "Code avec auth: %{http_code}\n" -H "Authorization: Bearer token" http://localhost:8080/api/v1/convert
```

## Rapport de vérification

### Script de rapport complet
```bash
#!/bin/bash
# full-verification-report.sh

REPORT_FILE="/tmp/arender-verification-$(date +%Y%m%d-%H%M%S).txt"

{
echo "======================================"
echo "ARender Rendition - Rapport de vérification"
echo "Date: $(date)"
echo "Serveur: $(hostname)"
echo "======================================"

echo -e "\n=== STATUT SYSTÈME ==="
systemctl status arender-rendition.service --no-pager -l

echo -e "\n=== PROCESSUS ==="
ps aux | grep arender | grep -v grep

echo -e "\n=== RESSOURCES ==="
PID=$(pgrep -f arender-rendition)
if [ -n "$PID" ]; then
    cat /proc/$PID/status | grep -E "(VmSize|VmRSS|Threads)"
fi

echo -e "\n=== RÉSEAU ==="
netstat -tlnp | grep :8080

echo -e "\n=== HEALTH CHECK ==="
curl -s http://localhost:8080/actuator/health | jq '.'

echo -e "\n=== MÉTRIQUES JVM ==="
curl -s http://localhost:8080/actuator/metrics/jvm.memory.used | jq '.'

echo -e "\n=== LOGS RÉCENTS ==="
tail -20 /var/log/arender/rendition.log

echo -e "\n=== ESPACE DISQUE ==="
df -h /opt/arender /var/log/arender

echo -e "\n======================================"
echo "Rapport généré: $(date)"
echo "Fichier: $REPORT_FILE"
echo "======================================"

} > "$REPORT_FILE"

echo "Rapport de vérification généré: $REPORT_FILE"
cat "$REPORT_FILE"
```

## Checklist finale

### Validation complète
- [ ] Service systemd actif et stable
- [ ] Processus Java en cours d'exécution
- [ ] Port 8080 en écoute
- [ ] Health check retourne "UP"
- [ ] Moteurs LibreOffice et PDFium opérationnels
- [ ] Conversion test réussie
- [ ] Logs sans erreur critique
- [ ] Ressources système dans les limites acceptables
- [ ] Connectivité réseau fonctionnelle
- [ ] Permissions sécurisées
- [ ] SSL configuré (si requis)
- [ ] Monitoring accessible
- [ ] Documentation à jour

### Points de vigilance
- Surveillance continue des logs d'erreur
- Monitoring de l'utilisation mémoire (fuites possibles)
- Vérification régulière des conversions
- Mise à jour des moteurs de conversion
- Sauvegarde des configurations

Une fois toutes les vérifications validées, procédez aux [tests complets](./test.md) avec vos documents métier.