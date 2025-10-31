# Développement avec ARender

Cette section est dédiée aux développeurs qui souhaitent intégrer ARender dans leurs applications ou étendre ses fonctionnalités.

## APIs et SDKs

### APIs REST
ARender expose un ensemble complet d'APIs REST pour toutes ses fonctionnalités :

#### Document Management API
- **Upload de documents** : Chargement sécurisé avec métadonnées
- **Conversion de formats** : APIs de transformation documentaire
- **Gestion des versions** : Versioning et historique des documents
- **Métadonnées** : CRUD sur les propriétés documentaires

#### Annotations API  
- **CRUD annotations** : Création, lecture, mise à jour, suppression
- **Collaboration** : APIs de collaboration temps réel
- **Export/Import** : Sauvegarde des annotations dans différents formats
- **Templates** : Gestion des modèles d'annotations

#### User Management API
- **Authentification** : Login, logout, sessions
- **Gestion utilisateurs** : CRUD sur les comptes utilisateurs
- **Permissions** : Gestion fine des droits d'accès
- **Groupes et rôles** : Organisation des utilisateurs

#### Analytics API
- **Métriques d'usage** : Statistiques d'utilisation détaillées  
- **Performance** : Monitoring des temps de réponse
- **Audit** : Logs d'activité et traçabilité
- **Rapports** : Génération de rapports personnalisés

### SDKs disponibles
- **JavaScript/TypeScript** : SDK web complet avec TypeScript
- **Java** : SDK pour applications Java/JEE
- **Python** : Bibliothèque Python pour l'intégration
- **C#/.NET** : SDK pour environnements Microsoft
- **PHP** : Bibliothèque pour applications web PHP

### Documentation API
- **Référence OpenAPI** : Spécification complète OpenAPI 3.0
- **Postman Collection** : Collection prête à l'emploi
- **Exemples de code** : Snippets dans tous les langages supportés
- **Playground interactif** : Testez les APIs en ligne

## Intégration frontend

### JavaScript SDK
Le SDK JavaScript permet une intégration native dans vos applications web :

```javascript
// Initialisation du viewer ARender
const viewer = new ARenderViewer({
  containerId: 'arender-container',
  serverUrl: 'https://your-arender-server.com',
  documentId: 'document-uuid',
  authToken: 'your-jwt-token'
});

// Chargement d'un document
await viewer.loadDocument('document-id');

// Ajout d'une annotation
viewer.addAnnotation({
  type: 'text',
  content: 'Mon commentaire',
  position: { x: 100, y: 200 },
  page: 1
});
```

### Composants React
- **ARenderViewer** : Composant principal de visualisation
- **AnnotationToolbar** : Barre d'outils d'annotation personnalisable
- **DocumentThumbnails** : Miniatures de navigation
- **CollaborationPanel** : Panneau de collaboration temps réel

### Composants Vue.js
- **Integration Vue 3** : Composants compatibles Vue 3 + Composition API
- **Réactivité** : Synchronisation bidirectionnelle avec l'état
- **TypeScript ready** : Support complet TypeScript

### Composants Angular
- **Modules Angular** : Module complet avec services
- **Observables** : Integration RxJS pour la réactivité
- **Lazy loading** : Chargement à la demande des composants

## Intégration backend

### Connecteurs sur mesure
Développez vos propres connecteurs pour intégrer ARender avec vos systèmes :

#### Interface de connecteur
```java
public interface DocumentConnector {
    Document getDocument(String documentId);
    void saveDocument(Document document);
    List<Document> searchDocuments(SearchCriteria criteria);
    void deleteDocument(String documentId);
}
```

#### Implémentation exemple
```java
@Component
public class CustomConnector implements DocumentConnector {
    
    @Override
    public Document getDocument(String documentId) {
        // Récupération depuis votre système
        return myDocumentSystem.findById(documentId);
    }
    
    // Autres méthodes...
}
```

### Authentification personnalisée
Intégrez votre système d'authentification existant :

#### Provider d'authentification
```java
@Component
public class CustomAuthProvider implements AuthenticationProvider {
    
    @Override
    public User authenticate(String token) {
        // Validation de votre token
        return validateTokenAndGetUser(token);
    }
    
    @Override
    public boolean hasPermission(User user, String documentId, Permission permission) {
        // Vérification des permissions
        return checkUserPermission(user, documentId, permission);
    }
}
```

### Webhooks et événements
ARender peut notifier votre application des événements via webhooks :

#### Types d'événements
- **Document events** : Upload, conversion, suppression
- **Annotation events** : Creation, modification, suppression  
- **User events** : Connexion, déconnexion, actions
- **System events** : Démarrage, arrêt, erreurs

#### Configuration webhook
```json
{
  "webhook": {
    "url": "https://your-app.com/arender-webhook",
    "events": ["document.uploaded", "annotation.created"],
    "secret": "your-webhook-secret",
    "retries": 3
  }
}
```

## Personnalisation UI

### Thèmes personnalisés
Adaptez l'interface ARender à votre charte graphique :

#### CSS personnalisé
```css
/* Personnalisation des couleurs */
:root {
  --arender-primary-color: #your-brand-color;
  --arender-secondary-color: #your-secondary-color;
  --arender-toolbar-bg: #your-toolbar-bg;
}

/* Personnalisation des composants */
.arender-viewer {
  font-family: 'Your-Font', sans-serif;
}

.arender-toolbar {
  background: var(--arender-toolbar-bg);
  border-radius: 8px;
}
```

#### Configuration thème
```javascript
const customTheme = {
  colors: {
    primary: '#1976d2',
    secondary: '#dc004e',
    background: '#fafafa'
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: '14px'
  },
  layout: {
    toolbar: 'top', // 'top', 'bottom', 'left', 'right'
    sidebar: 'left'
  }
};

viewer.setTheme(customTheme);
```

### Plugins et extensions
Étendez les fonctionnalités d'ARender avec des plugins :

#### Plugin d'annotation personnalisée
```javascript
class CustomAnnotationPlugin {
  constructor(viewer) {
    this.viewer = viewer;
  }
  
  init() {
    // Ajout d'un outil d'annotation personnalisé
    this.viewer.addAnnotationTool({
      name: 'custom-stamp',
      icon: 'custom-stamp-icon',
      handler: this.createCustomStamp.bind(this)
    });
  }
  
  createCustomStamp(position) {
    // Logique de création du tampon personnalisé
    return {
      type: 'custom-stamp',
      position: position,
      data: { /* données spécifiques */ }
    };
  }
}
```

#### Plugin de workflow
```javascript
class WorkflowPlugin {
  constructor(viewer, workflowService) {
    this.viewer = viewer;
    this.workflowService = workflowService;
  }
  
  init() {
    // Ajout des actions de workflow
    this.viewer.addToolbarButton({
      text: 'Approuver',
      icon: 'check',
      handler: () => this.approve()
    });
  }
  
  async approve() {
    const annotations = this.viewer.getAnnotations();
    await this.workflowService.approve(this.viewer.documentId, annotations);
    this.viewer.showNotification('Document approuvé');
  }
}
```

## Déploiement et DevOps

### Containers Docker
ARender est disponible sous forme de containers Docker officiels :

#### Docker Compose exemple
```yaml
version: '3.8'
services:
  arender-rendition:
    image: arondor/arender-rendition:latest
    ports:
      - "8080:8080"
    environment:
      - JAVA_OPTS=-Xmx4g
      - DATABASE_URL=jdbc:postgresql://db:5432/arender
    
  arender-hmi:
    image: arondor/arender-hmi:latest
    ports:
      - "8090:8090"
    environment:
      - RENDITION_URL=http://arender-rendition:8080
      
  arender-document-service:
    image: arondor/arender-document-service:latest
    ports:
      - "9080:9080"
    environment:
      - DATABASE_URL=jdbc:postgresql://db:5432/arender
```

### Kubernetes
Déploiement Kubernetes avec Helm charts officiels :

```bash
# Ajout du repository Helm ARender
helm repo add arender https://helm.arender.io
helm repo update

# Installation avec configuration personnalisée
helm install my-arender arender/arender \
  --set rendition.replicas=3 \
  --set hmi.ingress.enabled=true \
  --set hmi.ingress.host=arender.mycompany.com
```

### CI/CD
Intégration dans vos pipelines de déploiement :

#### Pipeline GitLab CI
```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - docker build -t my-app-with-arender .
    
test:
  stage: test
  script:
    - docker-compose -f docker-compose.test.yml up --abort-on-container-exit
    
deploy:
  stage: deploy
  script:
    - kubectl apply -f k8s/arender-deployment.yml
  only:
    - main
```

## Bonnes pratiques

### Performance
- **Mise en cache** : Implémentez un cache local pour les rendus fréquents
- **Lazy loading** : Chargez les pages à la demande
- **Compression** : Utilisez la compression GZIP pour les APIs
- **CDN** : Distribuez les assets statiques via CDN

### Sécurité  
- **HTTPS obligatoire** : Toujours utiliser HTTPS en production
- **Validation des entrées** : Validez toutes les données côté serveur
- **Rate limiting** : Limitez les appels API par utilisateur
- **Audit logging** : Loggez toutes les actions sensibles

### Monitoring
- **Health checks** : Implémentez des endpoints de santé
- **Métriques** : Exposez les métriques Prometheus
- **Alerting** : Configurez des alertes sur les KPIs critiques
- **Distributed tracing** : Tracez les requêtes inter-services

## Support développeur

### Ressources
- **Documentation technique** : Référence complète APIs et SDKs
- **Exemples de code** : Repository GitHub avec examples
- **Forums développeurs** : Communauté active de développeurs
- **Support technique** : Assistance technique dédiée

### Formation
- **Webinaires techniques** : Sessions régulières de formation
- **Workshops** : Ateliers pratiques d'intégration
- **Certification développeur** : Programme officiel de certification
- **Mentorat** : Accompagnement personnalisé pour les projets complexes