# Annotations supportées

ARender offre une palette complète d'outils d'annotation pour tous les besoins de collaboration et de révision documentaire.

## 🎨 Vue d'ensemble des annotations

### Types d'annotations disponibles
ARender propose **15 types d'annotations** répartis en 4 catégories principales :

```
📝 Annotations textuelles (40%)  ████████████████████████████████████████
🎯 Annotations graphiques (35%) ███████████████████████████████████████
🖊️ Annotations de dessin (15%)  ███████████████████
⚡ Annotations avancées (10%)   ██████████████
```

### Modes d'interaction
- **👆 Tactile** : Optimisé pour tablettes et écrans tactiles
- **🖱️ Souris** : Précision maximale pour desktop
- **🖊️ Stylet** : Support des stylets avec pression et inclinaison
- **⌨️ Clavier** : Raccourcis pour productivité

---

## 📝 Annotations textuelles

### Note textuelle (Sticky Note)

#### 📌 **Type** : `text-note`
#### 🎯 **Usage** : Commentaires et remarques

##### Fonctionnalités
- **Texte enrichi** : Formatage HTML (gras, italique, couleur)
- **Redimensionnement** : Taille ajustable dynamiquement
- **Couleurs personnalisées** : Palette étendue + couleurs custom
- **Auteur et horodatage** : Métadonnées automatiques
- **Réponses en fil** : Conversations contextuelles

##### Configuration
```javascript
{
  type: 'text-note',
  content: 'Mon commentaire avec <b>formatage</b>',
  position: { x: 100, y: 200, page: 1 },
  style: {
    backgroundColor: '#ffff88',
    textColor: '#000000',
    fontSize: '12px',
    fontFamily: 'Arial, sans-serif'
  },
  metadata: {
    author: 'alice.martin',
    createdAt: '2024-03-15T10:30:00Z',
    priority: 'high'
  }
}
```

##### Cas d'usage
- **Revue de contrats** : Clauses à modifier
- **Validation technique** : Points d'attention
- **Formation** : Explications pédagogiques
- **Audit** : Observations de conformité

### Zone de texte (Text Box)

#### 📌 **Type** : `text-box`  
#### 🎯 **Usage** : Annotations de surface

##### Caractéristiques spécifiques
- **Zone délimitée** : Rectangle de texte positionnable
- **Texte multiligne** : Support paragraphes et listes
- **Transparence** : Arrière-plan semi-transparent
- **Ancrage** : Liaison à des éléments du document
- **Auto-resize** : Ajustement automatique à contenu

### Bulle de dialogue (Callout)

#### 📌 **Type** : `callout`
#### 🎯 **Usage** : Annotations avec pointeur

##### Fonctionnalités avancées
- **Pointeur directionnel** : Flèche vers l'élément ciblé
- **Styles multiples** : Bulles, rectangles, nuages
- **Texte et images** : Contenu riche multimédia
- **Positionnement intelligent** : Évitement des chevauchements

---

## 🎯 Annotations graphiques

### Surlignage (Highlight)

#### 📌 **Type** : `highlight`
#### 🎯 **Usage** : Mise en évidence de texte

##### Modes de sélection
- **Sélection textuelle** : Par mots et phrases
- **Sélection rectangulaire** : Zone libre
- **Sélection intelligente** : Détection automatique de colonnes
- **Multi-sélection** : Plusieurs zones simultanément

##### Styles disponibles
| Style | Couleur | Opacité | Usage typique |
|-------|---------|---------|---------------|
| **Important** | Rouge | 70% | Passages critiques |
| **Attention** | Jaune | 50% | Points importants |
| **Info** | Bleu | 50% | Informations utiles |
| **Validé** | Vert | 60% | Éléments approuvés |
| **Question** | Orange | 50% | Points à clarifier |

```javascript
{
  type: 'highlight',
  selection: {
    startPage: 1,
    endPage: 1,
    startOffset: 245,
    endOffset: 312,
    text: 'passage à surligner'
  },
  style: {
    color: '#ffff00',
    opacity: 0.5,
    blendMode: 'multiply'
  }
}
```

### Formes géométriques

#### Rectangle / Carré
- **Contour personnalisable** : Épaisseur, style (plein, pointillé)
- **Remplissage** : Couleur avec transparence
- **Coins arrondis** : Radius configurable
- **Proportions** : Carré parfait avec Shift

#### Ellipse / Cercle  
- **Styles de bordure** : 12 styles prédéfinis
- **Dégradés** : Remplissage en dégradé radial/linéaire
- **Cercle parfait** : Avec touche modificatrice
- **Secteurs** : Support des portions d'ellipse

#### Ligne et flèche
- **Styles de ligne** : Pleine, pointillée, traits-points
- **Épaisseurs** : 1px à 20px
- **Terminaisons** : 8 styles de flèches différents
- **Courbes** : Lignes droites ou courbes de Bézier

##### Types de flèches
| Type | Style | Usage |
|------|-------|-------|
| **Simple** | → | Indication basique |
| **Double** | ↔ | Relation bidirectionnelle |
| **Grosse** | ⇒ | Emphase importante |
| **Contour** | ⇨ | Flux de processus |
| **Remplie** | ➤ | Direction forte |

### Polygon et formes libres

#### Polygone
- **Points multiples** : Jusqu'à 50 sommets
- **Fermeture automatique** : Retour au point de départ
- **Modification** : Déplacement des sommets après création
- **Remplissage intelligent** : Gestion des intersections

#### Forme libre (Freehand)
- **Dessin au stylet** : Pression et inclinaison supportées
- **Lissage** : Algorithme de lissage configurable
- **Simplification** : Réduction automatique des points
- **Vectorisation** : Conversion en courbes vectorielles

---

## 🖊️ Annotations de dessin

### Dessin libre (Ink/Pen)

#### 📌 **Type** : `ink`
#### 🎯 **Usage** : Annotations manuscrites

##### Outils de dessin
- **Stylo** : Trait uniforme, précision maximale
- **Marqueur** : Trait large, semi-transparent
- **Pinceau** : Trait variable selon pression
- **Crayon** : Effet texture, estompé
- **Gomme** : Effacement sélectif ou complet

##### Propriétés du trait
```javascript
{
  type: 'ink',
  strokes: [
    {
      points: [
        { x: 100, y: 100, pressure: 0.5, tiltX: 15, tiltY: 10 },
        { x: 105, y: 102, pressure: 0.7, tiltX: 16, tiltY: 9 }
        // ... autres points
      ],
      style: {
        color: '#ff0000',
        width: 2.5,
        opacity: 0.8,
        tool: 'pen'
      }
    }
  ]
}
```

##### Support matériel avancé
- **Pression** : 1024+ niveaux de pression
- **Inclinaison** : Angle du stylet (tilt X/Y)
- **Rotation** : Orientation du stylet (twist)
- **Gomme intégrée** : Bout du stylet pour effacer
- **Boutons** : Raccourcis via boutons du stylet

### Signature manuscrite

#### 📌 **Type** : `signature`
#### 🎯 **Usage** : Signatures et paraphes

##### Fonctionnalités de signature
- **Capture biométrique** : Vitesse, pression, accélération
- **Validation** : Comparaison avec signatures de référence
- **Horodatage** : Timestamp cryptographique
- **Géolocalisation** : Position GPS optionnelle
- **Certificat** : Intégration PKI pour signatures qualifiées

##### Formats de signature
- **SVG vectoriel** : Signature redimensionnable
- **Bitmap PNG** : Signature en image
- **Données biométriques** : Profil comportemental
- **Hash cryptographique** : Empreinte de validation

---

## ⚡ Annotations avancées

### Tampon (Stamp)

#### 📌 **Type** : `stamp`
#### 🎯 **Usage** : Validation et certification

##### Tampons prédéfinis
| Catégorie | Tampons disponibles | Langues |
|-----------|-------------------|---------|
| **Validation** | Approuvé, Rejeté, En attente | FR, EN, DE, ES |
| **Statut** | Confidentiel, Brouillon, Final | FR, EN, DE, ES |
| **Dates** | Date du jour, Date + heure | Format localisé |
| **Signatures** | Paraphe, Signature requise | Multilangue |
| **Workflow** | Étape 1/2/3, Validé par | Personnalisable |

##### Tampons personnalisés
- **Images custom** : Upload de logos d'entreprise
- **Texte dynamique** : Variables (nom utilisateur, date)
- **QR Codes** : Génération automatique pour traçabilité
- **Codes-barres** : 1D et 2D pour identification

```javascript
{
  type: 'stamp',
  template: 'approved',
  customText: 'Validé par ${user.name} le ${date.now}',
  position: { x: 400, y: 600, page: 1 },
  style: {
    size: 'large',
    color: 'green',
    rotation: 0
  }
}
```

### Pièce jointe (Attachment)

#### 📌 **Type** : `attachment`
#### 🎯 **Usage** : Documents liés

##### Types de pièces jointes
- **Fichiers** : Tous formats supportés par ARender
- **Images** : Références visuelles
- **URLs** : Liens vers ressources externes
- **Notes audio** : Commentaires vocaux
- **Vidéos** : Courtes séquences explicatives

##### Gestion sécurisée
- **Chiffrement** : AES-256 pour fichiers sensibles
- **Contrôle d'accès** : Permissions spécifiques par PJ
- **Audit** : Traçabilité des accès aux pièces jointes
- **Versioning** : Historique des modifications

### Mesure et cotation

#### 📌 **Type** : `measurement`
#### 🎯 **Usage** : Plans techniques et CAD

##### Types de mesures
- **Distance linéaire** : Entre deux points
- **Périmètre** : Longueur d'un tracé
- **Surface** : Aire d'un polygone fermé
- **Angle** : Mesure angulaire entre droites
- **Rayon/Diamètre** : Mesures circulaires

##### Unités supportées
| Système | Unités disponibles |
|---------|-------------------|
| **Métrique** | mm, cm, m, km |
| **Impérial** | in, ft, yd, mi |
| **Technique** | pt, pc, px |
| **Personnalisé** | Ratios définis par utilisateur |

```javascript
{
  type: 'measurement',
  measurementType: 'distance',
  startPoint: { x: 100, y: 200 },
  endPoint: { x: 300, y: 200 },
  value: 52.3,
  unit: 'mm',
  scale: { ratio: 1, unit: 'mm', display: '1:100' },
  precision: 2
}
```

---

## 🎨 Personnalisation et styles

### Palettes de couleurs

#### Palettes prédéfinies
- **Corporate** : Couleurs d'entreprise configurables
- **Accessibility** : Couleurs haute visibilité (daltonisme)
- **Print-friendly** : Couleurs optimisées impression
- **Pastel** : Teintes douces pour annotations discrètes
- **High-contrast** : Contraste élevé pour lisibilité

#### Couleurs personnalisées
```javascript
// Configuration palette entreprise
{
  colorPalettes: {
    corporate: {
      primary: '#1976d2',
      secondary: '#424242', 
      accent: '#ff5722',
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336'
    }
  }
}
```

### Templates d'annotations

#### Templates prêts à l'emploi
- **Revue contractuelle** : Annotations juridiques standardisées
- **Validation technique** : Check-lists et points de contrôle
- **Formation** : Annotations pédagogiques avec niveaux
- **Audit qualité** : Grilles d'évaluation normalisées

#### Templates personnalisés
- **Création graphique** : Interface de design intégrée
- **Variables dynamiques** : Champs calculés automatiquement
- **Logique conditionnelle** : Annotations selon contexte
- **Workflow intégré** : Processus de validation automatique

---

## 🔄 Collaboration et synchronisation

### Annotations collaboratives temps réel

#### Synchronisation
- **Operational Transform** : Algorithme de synchronisation avancé
- **Résolution de conflits** : Gestion automatique des conflits d'édition
- **Curseurs partagés** : Visualisation des actions des collaborateurs
- **Notifications push** : Alertes temps réel des nouvelles annotations

#### Gestion des permissions
| Rôle | Créer | Modifier | Supprimer | Répondre | Résoudre |
|------|-------|----------|-----------|----------|-----------|
| **Lecteur** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Commentateur** | ✅ | ⚠️ Siennes | ⚠️ Siennes | ✅ | ❌ |
| **Éditeur** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Modérateur** | ✅ | ✅ | ✅ | ✅ | ✅ |

### Workflow de validation

#### États d'annotation
```
📝 Brouillon → 💬 En discussion → ✅ Approuvée → 🔒 Résolue
     ↓              ↓              ↓          ↓
   📤 Soumise → ⚠️ En attente → ❌ Rejetée → 🗑️ Supprimée
```

#### Actions automatiques
- **Assignment automatique** : Selon règles métier
- **Escalation** : Remontée en cas de retard
- **Notifications** : Emails et push selon préférences
- **Archivage** : Sauvegarde automatique des annotations résolues

---

## 📊 Export et interopérabilité

### Formats d'export

#### Standards industriels
- **PDF avec annotations** : Annotations intégrées au PDF
- **XFDF** : Format Adobe pour annotations PDF
- **JSON** : Format ARender natif avec métadonnées complètes
- **XML** : Format structuré pour intégration
- **CSV** : Export tabulaire pour reporting

#### Intégrations métier
- **Microsoft Word** : Commentaires Word natifs
- **AutoCAD** : Annotations DWG préservées
- **SharePoint** : Métadonnées SharePoint synchronisées
- **Slack/Teams** : Résumés d'annotations automatiques

### APIs d'annotation

#### REST API
```http
# Création d'annotation
POST /api/v1/documents/{docId}/annotations
{
  "type": "highlight",
  "content": "Important passage",
  "selection": { "start": 100, "end": 200 },
  "style": { "color": "#ffff00" }
}

# Récupération des annotations
GET /api/v1/documents/{docId}/annotations?type=highlight&author=alice

# Mise à jour temps réel via WebSocket  
WS /api/v1/documents/{docId}/annotations/live
```

#### SDK JavaScript
```javascript
// Ajout d'annotation programmatique
await arenderViewer.annotations.add({
  type: 'text-note',
  content: 'Annotation via API',
  position: { x: 100, y: 200, page: 1 },
  metadata: { priority: 'high', category: 'legal' }
});

// Écoute des événements d'annotation
arenderViewer.on('annotationAdded', (annotation) => {
  console.log('Nouvelle annotation:', annotation);
  // Logique métier personnalisée
});
```

---

## 🚀 Innovations futures

### Roadmap annotations

#### T1 2025
- **Annotations 3D** : Support des modèles tridimensionnels
- **IA assistée** : Suggestions d'annotations automatiques
- **Reconnaissance vocale** : Annotations par dictée vocale
- **Réalité augmentée** : Annotations spatiales AR

#### T2 2025  
- **Blockchain** : Horodatage immuable des annotations
- **ML avancé** : Classification automatique d'annotations
- **Biométrie** : Authentification biométrique pour signatures
- **Quantum-safe** : Chiffrement post-quantique

#### 2026+
- **Neural annotations** : Annotations adaptatives par IA
- **Holographique** : Annotations dans l'espace 3D
- **Émotions** : Détection d'émotions dans annotations vocales
- **Prédictif** : Suggestions contextuelles intelligentes

La richesse des outils d'annotation ARender permet de couvrir tous les cas d'usage de collaboration documentaire, de la simple note jusqu'aux processus de validation complexes en entreprise.