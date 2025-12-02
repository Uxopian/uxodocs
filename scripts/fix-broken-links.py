#!/usr/bin/env python3
"""
Script complet pour corriger les liens cassés dans la documentation Docusaurus.

Ce script corrige automatiquement:
1. Les liens avec .en.md ou _index.en.md (reliquats de Hugo)
2. Les liens relatifs mal formés (./content/, ./guides/, etc.)
3. Les liens absolus incorrects (manquant /docs/ ou le produit)
4. Les liens vers des dossiers sans index.md
5. Les doubles parenthèses ))
6. Les URL encodées incorrectement
7. Les ancres avec .md
8. Les liens relatifs qui sortent du scope du produit

Usage:
    python scripts/fix-broken-links.py [--dry-run] [--verbose]
"""

import os
import re
import sys
import argparse
from pathlib import Path
from typing import Optional, Tuple, List, Dict

# Répertoire racine des docs
SCRIPT_DIR = Path(__file__).parent
DOCS_ROOT = SCRIPT_DIR.parent / "docs"

# Liste des produits
PRODUCTS = ['arender', 'fast2', 'flowerdocs', 'uxopian-ai']

# Préfixes qui indiquent un chemin de documentation
DOC_PREFIXES = [
    'apis/', 'config/', 'concepts/', 'connecteurs/', 'install/',
    'learn/', 'guides/', 'development/', 'installation/', 
    'features/', 'what-is-arender/', 'components/', 'catalog/',
    'advanced/', 'cookbooks/', 'getting-started/', 'architecture/',
    'configuration/', 'how-to-guides/', 'administration/', 'tags/'
]

# Mapping des chemins connus qui ont changé (ancien -> nouveau)
PATH_MAPPINGS = {
    # ARender
    'content/learn/how-to/': 'learn/how-to/',
    'content/installation/': 'installation/',
    'content/what-is-arender/': 'what-is-arender/',
    'content/development/': 'development/',
    'content/features/': 'features/',
    'guides/exploitation/': 'guides/exploitation/',
    # FlowerDocs
    'documentation/': '',
}

# Chemins de dossiers qui n'ont pas d'index et leur fichier principal
FOLDER_TO_FILE_MAPPINGS = {
    'arender/installation/docker': 'arender/installation/docker/presentation',
    'arender/learn/architecture': 'arender/learn/architecture/ecm-architecture',
    'arender/installation/standalone/web-ui/standalone': 'arender/installation/standalone/web-ui/configuration',
    'arender/guides/upgrade/4.8_to_2023.0': 'arender/guides/upgrade/4.8_to_2023.0/rendition',
    'arender/development/apis/web-ui/javascript': 'arender/development/apis/web-ui/javascript/js-api',
    'arender/guides/configurations/web-ui/connectors/alfresco': 'arender/guides/configurations/web-ui/connectors/alfresco/features-share',
    'arender/development/connector': 'arender/development/framework/loadADocument',
    'arender/guides/exploitation': 'arender/guides/performance/monitoring',
    'arender/guides/exploitation/metrics': 'arender/guides/performance/monitoring',
    'flowerdocs/config/arender-hmi-config': 'flowerdocs/install/config/arender-hmi-config',
    'flowerdocs/learn/gui-plugin/index': 'flowerdocs/learn/gui-plugin/configuration',
}

# Corrections de liens relatifs spécifiques (chemin_source -> chemin_correct)
RELATIVE_LINK_FIXES = {
    # Format: (fichier_source_pattern, lien_cassé, lien_corrigé)
}


class LinkFixer:
    def __init__(self, docs_root: Path, dry_run: bool = False, verbose: bool = False):
        self.docs_root = docs_root
        self.dry_run = dry_run
        self.verbose = verbose
        self.stats = {
            'files_processed': 0,
            'files_modified': 0,
            'links_fixed': 0,
            'links_unfixable': 0,
        }
        self.unfixed_links: List[Tuple[Path, str, str]] = []
        
        # Construire un index des fichiers existants
        self.existing_files = self._build_file_index()
    
    def _build_file_index(self) -> set:
        """Construit un index de tous les fichiers de documentation existants."""
        files = set()
        for ext in ['*.md', '*.mdx']:
            for file_path in self.docs_root.rglob(ext):
                rel_path = file_path.relative_to(self.docs_root)
                # Ajouter le chemin sans extension
                path_no_ext = str(rel_path).replace('.mdx', '').replace('.md', '')
                files.add(path_no_ext)
                # Ajouter aussi le chemin du dossier si c'est un index
                if path_no_ext.endswith('/index'):
                    files.add(path_no_ext[:-6])
        return files
    
    def _get_product_from_file(self, file_path: Path) -> Optional[str]:
        """Extrait le nom du produit depuis le chemin du fichier."""
        try:
            rel_path = file_path.relative_to(self.docs_root)
            if len(rel_path.parts) > 0 and rel_path.parts[0] in PRODUCTS:
                return rel_path.parts[0]
        except ValueError:
            pass
        return None
    
    def _normalize_link(self, link: str) -> str:
        """Normalise un lien en supprimant les extensions et patterns Hugo."""
        # Supprimer les extensions .en.md et .md
        link = re.sub(r'\.en\.md$', '', link)
        link = re.sub(r'\.md$', '', link)
        
        # Supprimer _index
        link = re.sub(r'/_index$', '', link)
        link = re.sub(r'^_index$', '', link)
        
        # Supprimer content/ au début
        link = re.sub(r'^content/', '', link)
        
        # Nettoyer les doubles slashes
        link = re.sub(r'/+', '/', link)
        
        return link
    
    def _check_path_exists(self, doc_path: str) -> bool:
        """Vérifie si un chemin de documentation existe."""
        # Enlever /docs/ du début si présent
        clean_path = doc_path
        if clean_path.startswith('/docs/'):
            clean_path = clean_path[6:]
        
        return clean_path in self.existing_files
    
    def _find_best_match(self, broken_path: str, product: str) -> Optional[str]:
        """Essaie de trouver le meilleur fichier correspondant à un chemin cassé."""
        # Nettoyer le chemin
        clean_path = broken_path
        if clean_path.startswith('/docs/'):
            clean_path = clean_path[6:]
        if clean_path.startswith(f'{product}/'):
            clean_path = clean_path[len(product)+1:]
        
        # Vérifier dans le mapping des dossiers connus
        full_path = f"{product}/{clean_path}"
        if full_path in FOLDER_TO_FILE_MAPPINGS:
            return f"/docs/{FOLDER_TO_FILE_MAPPINGS[full_path]}"
        
        # Chercher un fichier qui commence par ce chemin
        for existing in self.existing_files:
            if existing.startswith(f"{product}/{clean_path}"):
                return f"/docs/{existing}"
        
        return None
    
    def _fix_link(self, link: str, anchor: str, product: str, source_file: Path) -> Tuple[str, bool]:
        """
        Corrige un lien et retourne (lien_corrigé, a_été_modifié).
        """
        original_link = link
        modified = False
        
        # 1. Supprimer les extensions Hugo (.en.md, .md, _index)
        if '.en.md' in link or link.endswith('.md') or '_index' in link:
            link = self._normalize_link(link)
            modified = True
        
        # 2. Corriger les URL encodées mal formées
        if link.startswith('%22') or link.startswith('%5B'):
            # Lien mal encodé, probablement une URL externe mal formatée
            try:
                from urllib.parse import unquote
                decoded = unquote(link)
                if decoded.startswith('"http') or decoded.startswith('[http'):
                    url_match = re.search(r'(https?://[^\s"\]]+)', decoded)
                    if url_match:
                        return url_match.group(1), True
            except:
                pass
        
        # 3. Liens relatifs ./ vers des dossiers de doc
        if link.startswith('./'):
            relative_part = link[2:]
            relative_part = self._normalize_link(relative_part)
            
            for prefix in DOC_PREFIXES + ['content/']:
                if relative_part.startswith(prefix):
                    clean_rel = re.sub(r'^content/', '', relative_part)
                    link = f"/docs/{product}/{clean_rel}"
                    modified = True
                    break
        
        # 4. Liens absolus /uxodocs/ sans /docs/
        if link.startswith('/uxodocs/') and not link.startswith('/uxodocs/docs/'):
            path_after = link[9:]  # Enlever /uxodocs/
            path_after = self._normalize_link(path_after)
            
            for prefix in DOC_PREFIXES:
                if path_after.startswith(prefix):
                    link = f"/docs/{product}/{path_after}"
                    modified = True
                    break
        
        # 5. Liens absolus commençant par / mais sans /docs/
        if link.startswith('/') and not link.startswith('/docs/') and not link.startswith('/uxodocs/'):
            path_part = link[1:]
            path_part = self._normalize_link(path_part)
            
            for prefix in DOC_PREFIXES:
                if path_part.startswith(prefix):
                    link = f"/docs/{product}/{path_part}"
                    modified = True
                    break
        
        # 6. Liens relatifs ../ qui sortent du produit
        if link.startswith('../'):
            parts = link.split('/')
            up_count = sum(1 for p in parts if p == '..')
            remaining = '/'.join(parts[up_count:])
            remaining = self._normalize_link(remaining)
            
            for prefix in DOC_PREFIXES:
                if remaining.startswith(prefix):
                    link = f"/docs/{product}/{remaining}"
                    modified = True
                    break
        
        # 7. Corriger les chemins vers des dossiers sans index
        if link.startswith('/docs/'):
            doc_path = link[6:]  # Enlever /docs/
            if doc_path in FOLDER_TO_FILE_MAPPINGS:
                link = f"/docs/{FOLDER_TO_FILE_MAPPINGS[doc_path]}"
                modified = True
            elif not self._check_path_exists(link):
                # Essayer de trouver une correspondance
                best_match = self._find_best_match(link, product)
                if best_match:
                    link = best_match
                    modified = True
        
        return link, modified
    
    def fix_file(self, file_path: Path) -> int:
        """Corrige les liens dans un fichier. Retourne le nombre de corrections."""
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        corrections = 0
        product = self._get_product_from_file(file_path)
        
        if not product:
            return 0
        
        # Pattern pour les liens markdown: [texte](lien) ou [texte](lien#anchor)
        # Gère aussi les doubles parenthèses
        link_pattern = re.compile(r'\[([^\]]*)\]\(([^)]+)\)(\)?)')
        
        def replace_link(match):
            nonlocal corrections
            text = match.group(1)
            full_link = match.group(2)
            extra_paren = match.group(3)
            
            # Ignorer les liens externes (sauf mal formatés)
            if full_link.startswith(('http://', 'https://', 'mailto:')):
                if extra_paren:
                    corrections += 1
                    return f"[{text}]({full_link})"
                return match.group(0)
            
            # Ignorer les ancres pures
            if full_link.startswith('#'):
                return match.group(0)
            
            # Ignorer les images et fichiers
            if re.search(r'\.(png|jpg|jpeg|gif|svg|webp|pdf|zip)(\?|#|$)', full_link, re.IGNORECASE):
                return match.group(0)
            
            # Séparer le lien de l'ancre
            anchor = ''
            link = full_link
            if '#' in link:
                link, anchor = link.split('#', 1)
                # Nettoyer l'ancre des .md
                anchor = re.sub(r'\.md$', '', anchor)
                anchor = '#' + anchor
            
            # Corriger le lien
            fixed_link, was_modified = self._fix_link(link, anchor, product, file_path)
            
            # Gérer les doubles parenthèses
            if extra_paren:
                was_modified = True
            
            if was_modified:
                corrections += 1
                return f"[{text}]({fixed_link}{anchor})"
            
            return match.group(0)
        
        content = link_pattern.sub(replace_link, content)
        
        if content != original_content:
            if not self.dry_run:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
            self.stats['files_modified'] += 1
        
        self.stats['links_fixed'] += corrections
        return corrections
    
    def run(self):
        """Exécute la correction sur tous les fichiers."""
        print("=" * 60)
        print("Correction des liens cassés dans la documentation")
        if self.dry_run:
            print("(Mode dry-run - aucune modification ne sera effectuée)")
        print("=" * 60)
        print()
        
        for ext in ['*.md', '*.mdx']:
            for file_path in self.docs_root.rglob(ext):
                self.stats['files_processed'] += 1
                corrections = self.fix_file(file_path)
                
                if corrections > 0:
                    rel_path = file_path.relative_to(self.docs_root.parent)
                    print(f"✓ {rel_path}: {corrections} correction(s)")
        
        print()
        print("=" * 60)
        print("Résumé")
        print("=" * 60)
        print(f"Fichiers analysés: {self.stats['files_processed']}")
        print(f"Fichiers modifiés: {self.stats['files_modified']}")
        print(f"Liens corrigés: {self.stats['links_fixed']}")
        
        if self.unfixed_links:
            print(f"\nLiens non corrigés ({len(self.unfixed_links)}):")
            for file_path, link, reason in self.unfixed_links[:20]:
                print(f"  - {file_path}: {link}")
                print(f"    Raison: {reason}")
            if len(self.unfixed_links) > 20:
                print(f"  ... et {len(self.unfixed_links) - 20} autres")


def main():
    parser = argparse.ArgumentParser(description='Corrige les liens cassés dans la documentation')
    parser.add_argument('--dry-run', action='store_true', help='Affiche les corrections sans modifier les fichiers')
    parser.add_argument('--verbose', '-v', action='store_true', help='Affiche plus de détails')
    args = parser.parse_args()
    
    fixer = LinkFixer(DOCS_ROOT, dry_run=args.dry_run, verbose=args.verbose)
    fixer.run()


if __name__ == "__main__":
    main()
