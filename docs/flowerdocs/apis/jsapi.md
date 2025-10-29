---
title: "API JavaScript"
---

# JavaScript API (JSAPI)

## Getting Started

L'interface graphique FlowerDocs peut être personnalisée à l'aide de scripts écrits en JavaScript. 
Ces scripts permettent l'utilisation de l'API JS afin d'enrichir et d'interagir avec l'interface.

Pour être exécutés au sein du navigateur, ces scripts doivent être chargés à partir d'une URL accessible à partir du poste utilisateur.

## Chargement des scripts

### Documents de classe Script

Les documents stockés dans la GED avec la classe `Script` sont chargés côté client. Les utilisateurs devant charger ces documents doivent avoir les permissions `READ` et `READ_CONTENT` pour pouvoir y accéder.

Ces fichiers JavaScript sont mis en cache côté client et sont renouvelés à chaque mise à jour.

**Avantages :**
- Gestion centralisée dans FlowerDocs
- Versioning automatique
- Contrôle d'accès granulaire

### Scripts externes

Des scripts externes peuvent être chargés côté client en incluant des ressources WEB dont les URLs sont concaténées dans la propriété `js.api.scripts` (séparées par des `,`). Les URLs définies doivent être accessibles depuis les postes clients.

Si ces scripts sont amenés à changer, les URLs doivent être suffixées (par exemple avec `?version`) afin de forcer le navigateur à les renouveler.

**Configuration :**
```properties
# Dans gui.properties
js.api.scripts=https://mon-serveur.com/script1.js?v=1.0,https://mon-serveur.com/script2.js?v=2.1
```

## Structure de base d'un script

```javascript
// Attendre que l'API FlowerDocs soit disponible
FlowerDocs.ready(function() <!-- Expression supprimée -->;
});

function initializeCustomFeatures() {
    // Personnalisations de l'interface
    // Gestion des événements
    // Intégrations tierces
}
```

## API principale

### FlowerDocs Object

L'objet global `FlowerDocs` expose toutes les fonctionnalités de l'API :

```javascript
// Information sur l'utilisateur connecté
var currentUser = FlowerDocs.getCurrentUser();
console.log('Utilisateur:', currentUser.name);

// Context de l'application
var context = FlowerDocs.getContext();
console.log('Langue:', context.locale);
```

### Gestion des documents

```javascript
// Créer un nouveau document
FlowerDocs.Documents.create({
    title: 'Nouveau document',
    class: 'Facture',
    metadata: {
        'montant': 1000.50,
        'date_emission': '2025-01-15'
    }
}).then(function(document) <!-- Expression supprimée -->;
});

// Rechercher des documents
FlowerDocs.Documents.search({
    query: 'title:facture',
    limit: 10
}).then(function(results) <!-- Expression supprimée -->;
});
```

### Interface utilisateur

```javascript
// Afficher une popup personnalisée
FlowerDocs.UI.showPopup(<!-- Commentaire nettoyé -->
        },
        <!-- Expression supprimée -->;
            }
        }
    ]
});

// Afficher une notification
FlowerDocs.UI.showNotification('Opération réussie', 'success');
```

### Événements

```javascript
// Écouter les événements de l'application
FlowerDocs.Events.on('document.created', function(event) <!-- Commentaire nettoyé -->
});

FlowerDocs.Events.on('form.before.submit', function(event) <!-- Expression supprimée -->;
    }
});
```

## Cas d'usage courants

### Validation métier

```javascript
function setupBusinessValidation() <!-- Commentaire nettoyé -->
        }
    });
}
```

### Intégration avec un système tiers

```javascript
function integrateWithERP() <!-- Commentaire nettoyé -->);
            });
        }
    });
}

function sendToERP(document) <!-- Expression supprimée -->
        },
        body: JSON.stringify({
            title: document.title,
            amount: document.metadata.montant,
            date: document.metadata.date_commande
        })
    }).then(response => response.json());
}
```

## Bonnes pratiques

### Performance
- **Chargement asynchrone** : utilisez les Promises pour les opérations longues
- **Cache local** : stockez les données fréquemment utilisées
- **Debouncing** : limitez les appels répétitifs (recherche, validation)

### Sécurité
- **Validation côté serveur** : ne jamais faire confiance aux données client
- **Échappement** : protégez contre les injections XSS
- **Permissions** : respectez les droits d'accès FlowerDocs

### Maintenance
- **Documentation** : commentez votre code
- **Modularité** : organisez en modules réutilisables
- **Tests** : testez sur différents navigateurs
- **Versioning** : gérez les versions de vos scripts