# Formats de fichiers supportés

ARender supporte plus de **250 formats de fichiers** différents, couvrant l'ensemble des besoins documentaires d'une entreprise moderne.

## 📊 Vue d'ensemble

### Répartition par catégorie
```
📄 Documents bureautiques (35%)  ████████████████████████████████████
🖼️ Images et médias (25%)       ████████████████████████████
📐 Formats techniques (20%)      ████████████████████████
📦 Archives et conteneurs (10%) ████████████
🏥 Formats spécialisés (10%)    ████████████
```

### Niveau de support
- **✅ Support natif** : Rendu haute fidélité avec toutes fonctionnalités
- **⚠️ Support étendu** : Rendu correct avec fonctionnalités limitées  
- **🔄 Via conversion** : Support via transformation automatique
- **🚧 En développement** : Support prévu dans une version future

---

## 📄 Documents bureautiques

### Microsoft Office (Support natif ✅)

#### Word Documents
| Format | Extension | Versions | Fonctionnalités |
|--------|-----------|----------|-----------------|
| Word Document | `.doc` | 97-2003 | Mise en forme complète, images, tableaux |
| Word Document | `.docx` | 2007+ | Toutes fonctionnalités Office modernes |
| Word Template | `.dot`, `.dotx` | Toutes | Templates et styles préservés |
| Rich Text Format | `.rtf` | Standard | Formatage riche cross-platform |

**Fonctionnalités avancées :**
- **Révisions et commentaires** : Affichage des modifications Office
- **En-têtes et pieds de page** : Préservation complète
- **Tables des matières** : Navigation par signets
- **Champs dynamiques** : Date, numérotation, références
- **Objets embarqués** : Graphiques, équations, diagrammes

#### Excel Spreadsheets
| Format | Extension | Versions | Fonctionnalités |
|--------|-----------|----------|-----------------|
| Excel Workbook | `.xls` | 97-2003 | Feuilles multiples, formules, graphiques |
| Excel Workbook | `.xlsx` | 2007+ | Fonctionnalités Excel complètes |
| Excel Template | `.xlt`, `.xltx` | Toutes | Modèles avec macros préservées |
| Excel Add-in | `.xla`, `.xlam` | Toutes | Compléments et macros |

**Fonctionnalités avancées :**
- **Formules complexes** : Calculs préservés avec résultats
- **Graphiques et courbes** : Rendu vectoriel haute qualité
- **Tableaux croisés dynamiques** : Structure et données
- **Mise en forme conditionnelle** : Styles et couleurs
- **Feuilles multiples** : Navigation par onglets

#### PowerPoint Presentations
| Format | Extension | Versions | Fonctionnalités |
|--------|-----------|----------|-----------------|
| PowerPoint | `.ppt` | 97-2003 | Slides, animations, transitions |
| PowerPoint | `.pptx` | 2007+ | Toutes fonctionnalités modernes |
| PowerPoint Show | `.pps`, `.ppsx` | Toutes | Mode diaporama automatique |
| PowerPoint Template | `.pot`, `.potx` | Toutes | Modèles de présentation |

**Fonctionnalités avancées :**
- **Animations** : Effets d'entrée/sortie préservés (aperçu statique)
- **Masques de diapositives** : Cohérence graphique maintenue
- **Objets multimédia** : Images, vidéos, audio intégrés
- **Notes du présentateur** : Affichage optionnel des notes
- **Mode plan** : Navigation par structure

#### Visio & Project
| Format | Extension | Versions | Fonctionnalités |
|--------|-----------|----------|-----------------|
| Visio Drawing | `.vsd`, `.vsdx` | 2003+ | Diagrammes, organigrammes, plans |
| Visio Stencil | `.vss`, `.vssx` | Toutes | Bibliothèques de formes |
| Project Plan | `.mpp` | 2003+ | Diagrammes de Gantt, ressources |

### LibreOffice / OpenOffice (Support natif ✅)

#### Suite OpenDocument
| Format | Extension | Application | Fonctionnalités |
|--------|-----------|-------------|-----------------|
| Text Document | `.odt` | Writer | Formatage complet, styles |
| Spreadsheet | `.ods` | Calc | Feuilles de calcul, formules |
| Presentation | `.odp` | Impress | Diaporamas, animations |
| Graphics | `.odg` | Draw | Dessins vectoriels |
| Formula | `.odf` | Math | Équations mathématiques |
| Database | `.odb` | Base | Structures de données |

### Google Workspace (Via conversion 🔄)

#### Google Docs formats
| Format | Type | Conversion vers | Qualité |
|--------|------|-----------------|---------|
| Google Docs | Document | `.docx` → ARender | ✅ Excellente |
| Google Sheets | Tableur | `.xlsx` → ARender | ✅ Excellente |
| Google Slides | Présentation | `.pptx` → ARender | ✅ Excellente |
| Google Drawings | Dessin | `.png` → ARender | ⚠️ Bonne |

---

## 🖼️ Images et médias

### Images bitmap (Support natif ✅)

#### Formats standards
| Format | Extension | Profondeur couleur | Compression | Métadonnées |
|--------|-----------|-------------------|-------------|-------------|
| JPEG | `.jpg`, `.jpeg` | 24-bit | Avec perte | EXIF, IPTC, XMP |
| PNG | `.png` | 1-48 bit + alpha | Sans perte | Texte, profil ICC |
| GIF | `.gif` | 8-bit indexé | Sans perte | Animation supportée |
| BMP | `.bmp` | 1-32 bit | Aucune/RLE | Basiques |
| TIFF | `.tif`, `.tiff` | 1-48 bit | LZW/JPEG/Aucune | Très riches |
| WebP | `.webp` | 24-bit + alpha | Avec/sans perte | EXIF, XMP |

#### Formats avancés
| Format | Extension | Spécialité | Support ARender |
|--------|-----------|------------|-----------------|
| HEIF/HEIC | `.heic`, `.heif` | Apple/moderne | ✅ Via conversion |
| JPEG 2000 | `.jp2`, `.j2k` | Haute qualité | ✅ Natif |
| JPEG XL | `.jxl` | Nouvelle génération | 🚧 En développement |
| AVIF | `.avif` | Nouvelle génération | 🚧 En développement |

### Images vectorielles (Support natif ✅)

#### Formats techniques
| Format | Extension | Application | Fonctionnalités ARender |
|--------|-----------|-------------|------------------------|
| SVG | `.svg` | Web/technique | Zoom infini, interactions |
| AI | `.ai` | Adobe Illustrator | Layers, effets préservés |
| EPS | `.eps` | PostScript | Vectoriel haute qualité |
| PDF | `.pdf` | Universal | Format de référence |
| WMF/EMF | `.wmf`, `.emf` | Windows | Métafichiers système |

### Images techniques spécialisées

#### Formats CAO/DAO (Support étendu ⚠️)
| Format | Extension | Logiciel | Niveau de support |
|--------|-----------|----------|------------------|
| AutoCAD | `.dwg`, `.dxf` | AutoCAD | Layers, annotations, cotes |
| SolidWorks | `.sldprt`, `.sldasm` | SolidWorks | Modèles 3D, assemblages |
| CATIA | `.catpart`, `.catproduct` | CATIA | Pièces et assemblages |
| Inventor | `.ipt`, `.iam` | Inventor | Modèles et assemblages |
| SketchUp | `.skp` | SketchUp | Modèles 3D architecturaux |

#### Formats d'imagerie scientifique
| Format | Extension | Domaine | Fonctionnalités |
|--------|-----------|---------|-----------------|
| DICOM | `.dcm`, `.dic` | Médical | Multi-frame, annotations médicales |
| NIfTI | `.nii` | Neuroimagerie | Volumes 3D/4D |
| Analyze | `.hdr`, `.img` | Médical | Imagerie volumique |
| FITS | `.fits` | Astronomie | Images scientifiques |

---

## 📐 Formats techniques et scientifiques

### Plans et schémas techniques

#### CAD 2D/3D (Support étendu ⚠️)
| Logiciel | Formats | Fonctionnalités préservées |
|----------|---------|---------------------------|
| **AutoCAD** | `.dwg`, `.dxf`, `.dwt` | Layers, blocs, annotations, cotes |
| **MicroStation** | `.dgn` | Niveaux, cellules, références |
| **ArchiCAD** | `.pln`, `.mod` | Éléments de construction, vues |
| **Revit** | `.rvt` | Familles, phases, vues 3D |
| **Rhino** | `.3dm` | Surfaces NURBS, annotations |

#### Formats d'échange
| Standard | Extension | Utilisation | Support ARender |
|----------|-----------|-------------|-----------------|
| STEP | `.stp`, `.step` | Échange 3D CAO | ✅ Géométrie |
| IGES | `.igs`, `.iges` | Échange legacy | ✅ Surfaces |
| STL | `.stl` | Prototypage 3D | ✅ Maillages |
| OBJ | `.obj` | 3D générique | ✅ Avec matériaux |
| PLY | `.ply` | Scan 3D | ✅ Nuages de points |

### Formats cartographiques (Support étendu ⚠️)

#### SIG et cartographie
| Format | Extension | Spécialité | Fonctionnalités |
|--------|-----------|------------|-----------------|
| Shapefile | `.shp` | Données vectorielles | Géométries, attributs |
| KML/KMZ | `.kml`, `.kmz` | Google Earth | Géolocalisation, médias |
| GeoTIFF | `.tiff` + métadonnées | Images géoréférencées | Projections, géocodage |
| GPX | `.gpx` | Tracés GPS | Waypoints, tracks, routes |

---

## 📦 Archives et conteneurs

### Archives compressées (Support natif ✅)

#### Formats standards
| Format | Extension | Compression | Fonctionnalités ARender |
|--------|-----------|-------------|------------------------|
| ZIP | `.zip` | Deflate/Store | Navigation, extraction à la volée |
| RAR | `.rar` | Propriétaire | Lecture seule, pas d'extraction |
| 7-Zip | `.7z` | LZMA | Navigation rapide, métadonnées |
| TAR | `.tar`, `.tar.gz`, `.tar.bz2` | Gzip/Bzip2 | Archives Unix/Linux |
| CAB | `.cab` | Microsoft LZX | Archives Windows |

#### Fonctionnalités avancées
- **Navigation arborescente** : Parcours sans extraction complète
- **Aperçu direct** : Visualisation des fichiers dans l'archive
- **Recherche intégrée** : Recherche dans les noms et contenus
- **Extraction sélective** : Téléchargement de fichiers individuels
- **Métadonnées** : Dates, tailles, commentaires préservés

### Formats de documentation

#### Conteneurs de documentation
| Format | Extension | Spécialité | Contenu supporté |
|--------|-----------|------------|------------------|
| EPUB | `.epub` | Livres électroniques | HTML, CSS, images, métadonnées |
| CHM | `.chm` | Aide Windows | Pages HTML compilées |
| Mobipocket | `.mobi`, `.prc` | E-books Amazon | Texte, images, table des matières |
| PDF Portfolio | `.pdf` | Documents composites | Multiples documents dans un PDF |

---

## 🏥 Formats spécialisés

### Formats médicaux (Support étendu ⚠️)

#### Imagerie médicale
| Standard | Extension | Spécialité | Fonctionnalités ARender |
|----------|-----------|------------|------------------------|
| DICOM | `.dcm`, `.dic` | Imagerie standard | Multi-frame, annotations, mesures |
| NIfTI | `.nii`, `.nii.gz` | Neuroimagerie | Volumes 3D, orientation |
| MINC | `.mnc` | Neuroimagerie | Données volumiques |
| Analyze 7.5 | `.hdr/.img` | Legacy médical | Volumes avec en-têtes |
| PAR/REC | `.par/.rec` | Philips MRI | Données brutes IRM |

#### Fonctionnalités médicales
- **Windowing/Leveling** : Ajustement contraste/luminosité
- **Annotations médicales** : Mesures, angles, surfaces
- **Multi-frame** : Séquences temporelles (vidéo)
- **Métadonnées DICOM** : Patient, étude, série, acquisition
- **Conformité** : Respect des standards HIPAA/RGPD

### Formats juridiques et conformité

#### Documents officiels
| Format | Extension | Spécialité | Validation |
|--------|-----------|------------|------------|
| PDF/A | `.pdf` | Archivage long terme | ISO 19005, validation |
| PDF/X | `.pdf` | Impression professionnelle | ISO 15930 |
| XPS | `.xps` | Microsoft | Signatures numériques |
| CDF | `.cdf` | Adobe | Formulaires interactifs |

### Formats multimédias (Support étendu ⚠️)

#### Audio/Vidéo (Aperçu)
| Format | Extension | Type | Support ARender |
|--------|-----------|------|-----------------|
| MP4 | `.mp4` | Vidéo | 🔄 Thumbnail + métadonnées |
| AVI | `.avi` | Vidéo | 🔄 Thumbnail + métadonnées |
| MP3 | `.mp3` | Audio | 🔄 Waveform + métadonnées |
| WAV | `.wav` | Audio | 🔄 Waveform + métadonnées |

---

## 📋 Matrice de compatibilité détaillée

### Par niveau de fidélité

#### Excellent (90-100% de fidélité)
- Microsoft Office (.docx, .xlsx, .pptx)
- Adobe PDF (toutes versions)
- Images bitmap standards (JPEG, PNG, TIFF)
- OpenDocument (.odt, .ods, .odp)
- Images vectorielles (SVG, EPS)

#### Très bon (80-89% de fidélité)
- Microsoft Office Legacy (.doc, .xls, .ppt)
- AutoCAD 2D (.dwg, .dxf)
- Images techniques (DICOM, formats scientifiques)
- Archives (ZIP, RAR, 7Z)
- Formats web (HTML, XML)

#### Bon (70-79% de fidélité)
- CAD 3D complexes
- Formats propriétaires anciens
- Multimédias (aperçu uniquement)
- Formats exotiques ou legacy

#### Conversion requise (&lt;70% fidélité native)
- Google Workspace (conversion automatique)
- Formats très récents non encore supportés
- Formats propriétaires sans spécification

### Performance par format

| Catégorie | Temps de rendu moyen | Taille max recommandée | Notes |
|-----------|---------------------|------------------------|-------|
| **PDF** | 50-200ms/page | 2GB | Optimisé pour la performance |
| **Office** | 100-500ms/document | 500MB | Dépend de la complexité |
| **Images** | 10-100ms | 200MP | Cache intelligent |
| **CAD** | 1-10s | 100MB | Conversion 3D→2D |
| **Archives** | Instantané | 10GB | Navigation sans extraction |
| **DICOM** | 200ms-2s/série | 1GB | Selon nombre d'images |

---

## 🔮 Roadmap formats

### T1 2025
- **JPEG XL** : Support natif du nouveau standard
- **AVIF** : Images nouvelle génération
- **Office 2024** : Nouveaux formats Microsoft
- **3D PDF** : Support étendu des modèles 3D

### T2 2025
- **WebAssembly docs** : Documents interactifs
- **AR/VR formats** : Réalité augmentée/virtuelle
- **Blockchain docs** : Documents certifiés blockchain
- **AI-generated** : Formats générés par IA

### 2026+
- **Quantum formats** : Préparation post-quantique
- **Holographic** : Documents holographiques
- **Neural formats** : Documents adaptatifs IA
- **Biometric** : Documents à authentification biométrique

---

## 💡 Recommandations d'usage

### Choix de format pour nouveaux documents
1. **Archivage long terme** : PDF/A-1b ou PDF/A-2u
2. **Collaboration Office** : Microsoft 365 formats (.docx, .xlsx, .pptx)
3. **Documents techniques** : PDF + DWG pour plans CAD
4. **Images haute qualité** : TIFF non compressé ou PNG
5. **Web et mobile** : WebP ou AVIF (avec fallback JPEG)

### Optimisation performance
- **Paginer** les gros documents (>100 pages)
- **Compresser** les images avant intégration
- **Éviter** l'embarquement de gros médias dans Office
- **Préférer** PDF pour les documents finalisés
- **Utiliser** les formats vectoriels quand possible

### Sécurité par format
- **PDF** : Chiffrement natif, signatures numériques
- **Office** : Protection par mot de passe, DRM
- **Images** : Watermarking, métadonnées de traçabilité
- **CAD** : Versions publiques sans données sensibles
- **Archives** : Chiffrement des conteneurs

La richesse du support de formats d'ARender garantit que pratiquement tous vos documents pourront être visualisés et annotés dans un environnement unifié et sécurisé.