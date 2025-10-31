# Prérequis - Serveur de Rendition

Avant d'installer le serveur de rendition ARender, assurez-vous que votre environnement répond à tous les prérequis système et logiciels.

## Vérification de l'environnement

### Script de vérification automatique
```bash
#!/bin/bash
# arender-prereq-check.sh
# Script de vérification des prérequis ARender Rendition Server

echo "=== Vérification des prérequis ARender Rendition Server ==="

# Vérification OS
echo -n "Système d'exploitation: "
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "Linux ✓"
    OS_VERSION=$(cat /etc/os-release | grep PRETTY_NAME | cut -d'"' -f2)
    echo "  Version: $OS_VERSION"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    echo "Windows ✓"
else
    echo "Non supporté ✗"
    exit 1
fi

# Vérification Java
echo -n "Java JDK: "
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2)
    echo "$JAVA_VERSION ✓"
    
    # Vérification version supportée
    if [[ $JAVA_VERSION == 11* ]] || [[ $JAVA_VERSION == 17* ]] || [[ $JAVA_VERSION == 21* ]]; then
        echo "  Version supportée ✓"
    else
        echo "  Version non supportée ✗ (Requis: 11, 17 ou 21)"
    fi
else
    echo "Non installé ✗"
fi

# Vérification mémoire
echo -n "Mémoire RAM: "
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    TOTAL_RAM=$(free -g | grep Mem | awk '{print $2}')
    echo "${TOTAL_RAM}GB"
    if [ $TOTAL_RAM -ge 8 ]; then
        echo "  Mémoire suffisante ✓"
    else
        echo "  Mémoire insuffisante ✗ (Minimum: 8GB)"
    fi
fi

# Vérification espace disque
echo -n "Espace disque disponible: "
AVAILABLE_SPACE=$(df -BG . | tail -1 | awk '{print $4}' | sed 's/G//')
echo "${AVAILABLE_SPACE}GB"
if [ $AVAILABLE_SPACE -ge 100 ]; then
    echo "  Espace suffisant ✓"
else
    echo "  Espace insuffisant ✗ (Minimum: 100GB)"
fi

# Vérification ports
echo "Vérification des ports:"
for port in 8080 8090; do
    echo -n "  Port $port: "
    if command -v netstat &> /dev/null; then
        if netstat -ln | grep ":$port " &> /dev/null; then
            echo "Utilisé ✗"
        else
            echo "Libre ✓"
        fi
    else
        echo "Impossible à vérifier (netstat manquant)"
    fi
done

echo "=== Fin de la vérification ==="
```

## Prérequis système détaillés

### Systèmes d'exploitation supportés

#### Linux (Recommandé)
```yaml
Ubuntu:
  versions: [20.04 LTS, 22.04 LTS, 24.04 LTS]
  architecture: x86_64, ARM64
  
Red Hat Enterprise Linux:
  versions: [8.x, 9.x]
  architecture: x86_64, ARM64
  
CentOS:
  versions: [8.x, 9.x Stream]
  note: CentOS 8 EOL décembre 2021
  
SUSE Linux Enterprise:
  versions: [15.x]
  architecture: x86_64
  
Debian:
  versions: [11.x, 12.x]
  architecture: x86_64, ARM64
```

#### Windows Server
```yaml
Windows Server:
  versions: [2019, 2022]
  editions: [Standard, Datacenter]
  architecture: x86_64
  
Windows Client (Développement):
  versions: [Windows 10 21H2+, Windows 11]
  note: Non recommandé en production
```

### Ressources matérielles

#### CPU
```yaml
Minimum:
  cores: 4
  frequency: 2.4 GHz
  architecture: x86_64, ARM64 (Linux)
  
Recommandé:
  cores: 8-16
  frequency: 3.0+ GHz
  features: [AVX2, SSE4.2]
  
Optimal:
  cores: 24+
  frequency: 3.2+ GHz
  cache: L3 32MB+
```

#### Mémoire RAM
```yaml
Minimum: 8 GB
Recommandé: 16-32 GB
Optimal: 64+ GB

Configuration JVM recommandée:
  heap_min: 4 GB (-Xms4g)
  heap_max: 16 GB (-Xmx16g)
  non_heap: 2-4 GB (MetaSpace, CodeCache)
```

#### Stockage
```yaml
Type: SSD recommandé (NVMe optimal)
Minimum: 100 GB
Recommandé: 250-500 GB
Optimal: 1+ TB

Répartition:
  - OS et applications: 50 GB
  - Logs ARender: 20 GB
  - Cache temporaire: 100+ GB
  - Espace libre: 30% minimum
```

#### Réseau
```yaml
Bande passante:
  minimum: 100 Mbps
  recommandé: 1 Gbps
  optimal: 10 Gbps

Latence:
  interne: <1ms
  client: <50ms
  
Connectivité:
  - Accès Internet (mise à jour, licences)
  - Résolution DNS
  - NTP pour synchronisation
```

## Prérequis logiciels

### Java Development Kit (JDK)

#### Versions supportées
```bash
# OpenJDK (Recommandé)
OpenJDK 11.0.20+
OpenJDK 17.0.8+
OpenJDK 21.0.1+

# Oracle JDK
Oracle JDK 11.0.20+
Oracle JDK 17.0.8+
Oracle JDK 21.0.1+

# Adoptium Eclipse Temurin
Eclipse Temurin 11.0.20+
Eclipse Temurin 17.0.8+
Eclipse Temurin 21.0.1+
```

#### Installation Java - Ubuntu/Debian
```bash
# OpenJDK 17 (Recommandé)
sudo apt update
sudo apt install openjdk-17-jdk

# Vérification
java -version
javac -version

# Configuration JAVA_HOME
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$PATH:$JAVA_HOME/bin' >> ~/.bashrc
source ~/.bashrc
```

#### Installation Java - RHEL/CentOS
```bash
# OpenJDK 17
sudo dnf install java-17-openjdk-devel

# Alternatives Java (si plusieurs versions)
sudo alternatives --config java

# Configuration JAVA_HOME
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk' >> ~/.bashrc
source ~/.bashrc
```

#### Installation Java - Windows
```powershell
# Chocolatey (Recommandé)
choco install openjdk17

# Variables d'environnement
setx JAVA_HOME "C:\Program Files\OpenJDK\jdk-17.0.8.101-hotspot"
setx PATH "%PATH%;%JAVA_HOME%\bin"
```

### Bibliothèques système requises

#### Linux - Dépendances graphiques
```bash
# Ubuntu/Debian
sudo apt install -y \
    libfreetype6 \
    fontconfig \
    libx11-6 \
    libxext6 \
    libxrender1 \
    libxtst6 \
    libxi6 \
    libgconf-2-4 \
    libasound2

# RHEL/CentOS
sudo dnf install -y \
    freetype \
    fontconfig \
    libX11 \
    libXext \
    libXrender \
    libXtst \
    libXi \
    alsa-lib
```

#### Polices système
```bash
# Ubuntu/Debian - Polices Microsoft (optionnel)
sudo apt install ttf-mscorefonts-installer

# Installation manuelle de polices
sudo mkdir -p /usr/share/fonts/truetype/custom
# Copier les fichiers .ttf
sudo fc-cache -fv
```

### LibreOffice (Conversion bureautique)

#### Installation headless
```bash
# Ubuntu/Debian
sudo apt install -y libreoffice --no-install-recommends

# RHEL/CentOS
sudo dnf install -y libreoffice-headless libreoffice-writer libreoffice-calc libreoffice-impress

# Vérification
libreoffice --version
libreoffice --headless --invisible --convert-to pdf test.docx
```

#### Configuration pour ARender
```bash
# Création utilisateur dédié LibreOffice
sudo useradd -r -s /bin/false libreoffice

# Répertoire de travail
sudo mkdir -p /opt/arender/libreoffice
sudo chown libreoffice:libreoffice /opt/arender/libreoffice
```

## Configuration système

### Limites système (Linux)

#### Fichiers ouverts
```bash
# Vérification limites actuelles
ulimit -n
cat /proc/sys/fs/file-max

# Configuration permanente
echo '* soft nofile 65536' >> /etc/security/limits.conf
echo '* hard nofile 65536' >> /etc/security/limits.conf
echo 'fs.file-max = 2097152' >> /etc/sysctl.conf

# Application immédiate
sysctl -p
```

#### Processus et threads
```bash
# Configuration limits.conf
echo '* soft nproc 32768' >> /etc/security/limits.conf
echo '* hard nproc 32768' >> /etc/security/limits.conf

# Configuration sysctl.conf
echo 'kernel.pid_max = 4194304' >> /etc/sysctl.conf
echo 'kernel.threads-max = 2097152' >> /etc/sysctl.conf
```

#### Mémoire virtuelle
```bash
# Configuration swappiness
echo 'vm.swappiness = 10' >> /etc/sysctl.conf

# Configuration dirty pages
echo 'vm.dirty_background_ratio = 5' >> /etc/sysctl.conf
echo 'vm.dirty_ratio = 10' >> /etc/sysctl.conf
```

### Configuration réseau

#### Pare-feu
```bash
# Ubuntu/Debian - UFW
sudo ufw allow 8080/tcp
sudo ufw allow from 192.168.0.0/16 to any port 8080

# RHEL/CentOS - FirewallD
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --permanent --add-rich-rule="rule family='ipv4' source address='192.168.0.0/16' port protocol='tcp' port='8080' accept"
sudo firewall-cmd --reload
```

#### SELinux (RHEL/CentOS)
```bash
# Vérification statut
sestatus

# Configuration pour ARender (si activé)
sudo setsebool -P httpd_can_network_connect 1
sudo semanage port -a -t http_port_t -p tcp 8080

# Ou désactivation (non recommandé)
sudo setenforce 0
```

### Utilisateur de service

#### Création utilisateur ARender
```bash
# Linux
sudo useradd -r -s /bin/false -d /opt/arender -m arender
sudo usermod -a -G audio,video arender

# Répertoires
sudo mkdir -p /opt/arender/{bin,conf,data,logs,temp}
sudo chown -R arender:arender /opt/arender
sudo chmod -R 755 /opt/arender
```

## Vérification finale

### Checklist de validation
- [ ] OS supporté et à jour
- [ ] Java JDK 11/17/21 installé et configuré
- [ ] Mémoire RAM ≥ 8GB disponible
- [ ] Espace disque ≥ 100GB disponible
- [ ] Port 8080 libre
- [ ] LibreOffice headless installé
- [ ] Polices système installées
- [ ] Limites système configurées
- [ ] Pare-feu configuré
- [ ] Utilisateur arender créé
- [ ] Connectivité réseau validée

### Test de pré-installation
```bash
# Test Java
java -version && javac -version

# Test LibreOffice
libreoffice --headless --version

# Test mémoire disponible
free -h

# Test espace disque
df -h /opt/arender

# Test ports
ss -tlnp | grep :8080
```

Une fois tous les prérequis validés, vous pouvez procéder à l'[installation du serveur de rendition](./installation.md).