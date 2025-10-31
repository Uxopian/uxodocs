# Installation d'ARender

ARender propose plusieurs modes d'installation pour répondre aux différents besoins et environnements d'entreprise.

## Modes d'installation disponibles

### 🖥️ Mode classique (Non-Docker)
Installation traditionnelle sur serveurs physiques ou machines virtuelles :
- **Rendition** : Serveur de conversion de documents
- **Web-UI** : Interface utilisateur et connecteurs GED
- Compatible avec tous les systèmes d'exploitation supportés
- Configuration manuelle des services et dépendances

### 🐳 Docker
Installation containerisée pour un déploiement simplifié :
- Images Docker officielles maintenues
- Configuration via variables d'environnement
- Orchestration avec Docker Compose
- Isolation des services et portabilité

### ⚓ Kubernetes
Déploiement cloud-native pour la production à grande échelle :
- Haute disponibilité et auto-scaling
- Gestion automatique des ressources
- Monitoring et observabilité intégrés
- Compatible avec tous les cloud providers

## Choisir son mode d'installation

### Critères de décision

| Critère | Mode classique | Docker | Kubernetes |
|---------|----------------|---------|------------|
| **Simplicité** | ⭐⭐ | ⭐⭐⭐ | ⭐ |
| **Performance** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **Scalabilité** | ⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Maintenance** | ⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Sécurité** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

### Recommandations par environnement

#### Environnement de développement
- **Docker** recommandé
- Démarrage rapide
- Isolation garantie
- Réinitialisation facile

#### Environnement de test/recette
- **Docker** ou **Mode classique**
- Reproduction fidèle de la production
- Tests de montée en charge
- Validation des configurations

#### Production
- **Kubernetes** pour les grandes entreprises
- **Mode classique** pour les installations spécifiques
- **Docker** pour les PME avec besoins standards

## Composants ARender

ARender est composé de plusieurs services :

### ARender Rendition Server
- **Rôle** : Conversion et rendu des documents
- **Port par défaut** : 8080
- **Ressources** : Intensif en CPU et mémoire

### ARender Document Service  
- **Rôle** : Gestion des métadonnées et annotations
- **Port par défaut** : 9080
- **Ressources** : Intensif en base de données

### ARender HMI (Interface utilisateur)
- **Rôle** : Interface web de visualisation
- **Port par défaut** : 8090
- **Ressources** : Léger, principalement réseau

## Prochaines étapes

Choisissez votre méthode d'installation :
1. **[Installation Docker](./docker)** - Recommandée pour débuter rapidement
2. **[Installation Kubernetes](./kubernetes)** - Pour les environnements de production
3. **[Installation traditionnelle](./traditional)** - Pour les besoins spécifiques

Une fois l'installation terminée, consultez le guide de [Configuration](../configuration/) pour personnaliser votre instance ARender.