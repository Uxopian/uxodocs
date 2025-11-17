#!/usr/bin/env python3
"""
Script complet pour convertir tous les fichiers FlowerDocs en format Docusaurus MDX.
"""

import os
import re
from pathlib import Path

RELEASE_NOTES_DIR = Path("/home/corentin/uxodox/uxodocs/src/pages/release-note/flowerdocs")

def convert_to_docusaurus(content, filename):
    """Convertit un fichier Hugo vers Docusaurus MDX."""
    
    # 1. Remplacer le frontmatter TOML par YAML
    if content.startswith('+++'):
        # Extraire le titre depuis le frontmatter
        title_match = re.search(r'title\s*=\s*"([^"]+)"', content)
        title = title_match.group(1) if title_match else f"Release Notes"
        
        # Créer un nouveau frontmatter YAML
        yaml_frontmatter = f"""---
title: {title}
description: {title}
---

"""
        # Supprimer l'ancien frontmatter TOML
        content = re.sub(r'^\+\+\+\n.*?\n\+\+\+\n', yaml_frontmatter, content, flags=re.DOTALL)
    
    # 2. Convertir les shortcodes avec %
    content = re.sub(r'\{\{%\s*laptop\s*%\}\}', '💻', content)
    content = re.sub(r'\{\{%\s*gear\s*%\}\}', '⚙️', content)
    content = re.sub(r'\{\{%\s*dev\s*%\}\}', '👨‍💻', content)
    content = re.sub(r'\{\{%\s*crown\s*%\}\}', '👑', content)
    
    # 3. Convertir les shortcodes avec <
    content = re.sub(r'\{\{<\s*laptop\s*>\}\}', '💻', content)
    content = re.sub(r'\{\{<\s*gear\s*>\}\}', '⚙️', content)
    content = re.sub(r'\{\{<\s*dev\s*>\}\}', '👨‍💻', content)
    content = re.sub(r'\{\{<\s*crown\s*>\}\}', '👑', content)
    
    # 4. Convertir les admonitions
    content = re.sub(r'\{\{%\s*info\s*%\}\}', ':::info', content)
    content = re.sub(r'\{\{%\s*/info\s*%\}\}', ':::', content)
    content = re.sub(r'\{\{%\s*warning\s*%\}\}', ':::warning', content)
    content = re.sub(r'\{\{%\s*/warning\s*%\}\}', ':::', content)
    content = re.sub(r'\{\{%\s*note\s*%\}\}', ':::note', content)
    content = re.sub(r'\{\{%\s*/note\s*%\}\}', ':::', content)
    content = re.sub(r'\{\{%\s*tip\s*%\}\}', ':::tip', content)
    content = re.sub(r'\{\{%\s*/tip\s*%\}\}', ':::', content)
    content = re.sub(r'\{\{%\s*danger\s*%\}\}', ':::danger', content)
    content = re.sub(r'\{\{%\s*/danger\s*%\}\}', ':::', content)
    content = re.sub(r'\{\{%\s*caution\s*%\}\}', ':::caution', content)
    content = re.sub(r'\{\{%\s*/caution\s*%\}\}', ':::', content)
    
    # 5. Convertir les liens ref
    content = re.sub(r'\{\{<\s*ref\s+"([^"]+)"\s*>\}\}', lambda m: './' + m.group(1).replace('.md', ''), content)
    content = re.sub(r'\{\{%\s*ref\s+"([^"]+)"\s*%\}\}', lambda m: './' + m.group(1).replace('.md', ''), content)
    
    # 6. Convertir les images
    # {{< img src="/path/to/img.png">}} -> ![Image](/uxodocs/path/to/img.png)
    content = re.sub(
        r'\{\{<\s*img\s+(?:class="[^"]*"\s+)?src="([^"]+)"\s*>\}\}',
        lambda m: f'![Image](/uxodocs{m.group(1)})',
        content
    )
    
    # 7. Corriger les balises HTML
    content = content.replace('<br>', '<br />')
    content = content.replace('</br>', '<br />')
    
    return content

def process_file(filepath):
    """Traite un fichier markdown."""
    print(f"  Processing: {filepath.name}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Convertir vers Docusaurus
    content = convert_to_docusaurus(content, filepath.name)
    
    # Écrire si modifié
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"    ✓ Converted to Docusaurus format")
        return True
    else:
        print(f"    - Already in Docusaurus format")
        return False

def main():
    print("🔧 Converting all FlowerDocs files to Docusaurus MDX format...")
    
    # Parcourir tous les fichiers .md (sauf _index.md)
    md_files = [f for f in RELEASE_NOTES_DIR.rglob("*.md") if f.name != '_index.md']
    
    converted = 0
    for filepath in md_files:
        if process_file(filepath):
            converted += 1
    
    print(f"\n✅ Processed {len(md_files)} files ({converted} converted)")

if __name__ == "__main__":
    main()
