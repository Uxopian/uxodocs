#!/usr/bin/env python3
"""
Script de transformation complet Hugo → Docusaurus pour FlowerDocs.
Ce script préserve TOUT le contenu et ne fait que transformer la syntaxe.
"""

import os
import re
from pathlib import Path
from datetime import datetime

RELEASE_NOTES_DIR = Path("/home/corentin/uxodox/uxodocs/src/pages/release-note/flowerdocs")

def convert_frontmatter(content):
    """Convertit le frontmatter TOML (Hugo) en YAML (Docusaurus)."""
    
    # Détecter le frontmatter TOML
    toml_match = re.match(r'^\+\+\+\n(.*?)\n\+\+\+\n', content, re.DOTALL)
    
    if not toml_match:
        return content  # Pas de frontmatter TOML, retourner tel quel
    
    toml_content = toml_match.group(1)
    rest_of_content = content[toml_match.end():]
    
    # Extraire les valeurs du frontmatter TOML
    title_match = re.search(r'title\s*=\s*"([^"]+)"', toml_content)
    title = title_match.group(1) if title_match else "Release Notes"
    
    # Créer le frontmatter YAML
    yaml_frontmatter = f"""---
title: {title}
description: {title}
---
"""
    
    return yaml_frontmatter + rest_of_content

def convert_shortcodes_icons(content):
    """Convertit les shortcodes d'icônes Hugo en emojis."""
    
    # Shortcodes avec %%
    content = re.sub(r'\{\{%\s*laptop\s*%\}\}', '💻', content)
    content = re.sub(r'\{\{%\s*gear\s*%\}\}', '⚙️', content)
    content = re.sub(r'\{\{%\s*dev\s*%\}\}', '👨‍💻', content)
    content = re.sub(r'\{\{%\s*crown\s*%\}\}', '👑', content)
    
    # Shortcodes avec <<>>
    content = re.sub(r'\{\{<\s*laptop\s*>\}\}', '💻', content)
    content = re.sub(r'\{\{<\s*gear\s*>\}\}', '⚙️', content)
    content = re.sub(r'\{\{<\s*dev\s*>\}\}', '👨‍💻', content)
    content = re.sub(r'\{\{<\s*crown\s*>\}\}', '👑', content)
    
    return content

def convert_admonitions(content):
    """Convertit les admonitions Hugo en syntaxe Docusaurus."""
    
    # Shortcodes avec %%
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
    
    # Shortcodes avec <<>>
    content = re.sub(r'\{\{<\s*info\s*>\}\}', ':::info', content)
    content = re.sub(r'\{\{<\s*/info\s*>\}\}', ':::', content)
    content = re.sub(r'\{\{<\s*warning\s*>\}\}', ':::warning', content)
    content = re.sub(r'\{\{<\s*/warning\s*>\}\}', ':::', content)
    content = re.sub(r'\{\{<\s*note\s*>\}\}', ':::note', content)
    content = re.sub(r'\{\{<\s*/note\s*>\}\}', ':::', content)
    content = re.sub(r'\{\{<\s*tip\s*>\}\}', ':::tip', content)
    content = re.sub(r'\{\{<\s*/tip\s*>\}\}', ':::', content)
    content = re.sub(r'\{\{<\s*danger\s*>\}\}', ':::danger', content)
    content = re.sub(r'\{\{<\s*/danger\s*>\}\}', ':::', content)
    content = re.sub(r'\{\{<\s*caution\s*>\}\}', ':::caution', content)
    content = re.sub(r'\{\{<\s*/caution\s*>\}\}', ':::', content)
    
    return content

def convert_links(content):
    """Convertit les liens ref Hugo en liens relatifs Docusaurus."""
    
    # {{< ref "file.md" >}} ou {{< ref "file.md#anchor" >}}
    def replace_ref(match):
        target = match.group(1)
        # Retirer l'extension .md
        target = target.replace('.md', '')
        # Si c'est juste un nom de fichier, ajouter ./
        if not target.startswith('/') and not target.startswith('.'):
            target = './' + target
        return target
    
    content = re.sub(r'\{\{<\s*ref\s+"([^"]+)"\s*>\}\}', replace_ref, content)
    content = re.sub(r'\{\{%\s*ref\s+"([^"]+)"\s*%\}\}', replace_ref, content)
    content = re.sub(r'\{\{<\s*relref\s+"([^"]+)"\s*>\}\}', replace_ref, content)
    content = re.sub(r'\{\{%\s*relref\s+"([^"]+)"\s*%\}\}', replace_ref, content)
    
    return content

def convert_images(content):
    """Convertit les images Hugo en syntaxe Markdown standard."""
    
    # {{< img src="/path/to/image.png" >}}
    # {{< img class="..." src="/path/to/image.png" >}}
    def replace_img(match):
        src = match.group(1)
        # Ajouter /uxodocs si ce n'est pas déjà là
        if not src.startswith('/uxodocs'):
            src = '/uxodocs' + src
        return f'![Image]({src})'
    
    content = re.sub(
        r'\{\{<\s*img\s+(?:class="[^"]*"\s+)?src="([^"]+)"(?:\s+[^>]*)?\s*>\}\}',
        replace_img,
        content
    )
    
    # Images avec %%
    content = re.sub(
        r'\{\{%\s*img\s+(?:class="[^"]*"\s+)?src="([^"]+)"(?:\s+[^>]*)?\s*%\}\}',
        replace_img,
        content
    )
    
    return content

def fix_html_tags(content):
    """Corrige les balises HTML pour qu'elles soient auto-fermantes."""
    
    # <br> → <br />
    content = re.sub(r'<br\s*>', '<br />', content)
    
    # </br> → <br />
    content = re.sub(r'</br\s*>', '<br />', content)
    
    return content

def escape_remaining_braces(content):
    """Échappe les accolades restantes qui ne sont pas du JSX valide."""
    
    lines = content.split('\n')
    processed_lines = []
    in_code_block = False
    in_frontmatter = False
    
    for i, line in enumerate(lines):
        # Détecter le frontmatter YAML
        if i == 0 and line.strip() == '---':
            in_frontmatter = True
            processed_lines.append(line)
            continue
        
        if in_frontmatter:
            if line.strip() == '---':
                in_frontmatter = False
            processed_lines.append(line)
            continue
        
        # Détecter les blocs de code
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            processed_lines.append(line)
            continue
        
        if in_code_block:
            processed_lines.append(line)
            continue
        
        # Détecter les admonitions (:::info, :::warning, etc.)
        if line.strip().startswith(':::'):
            processed_lines.append(line)
            continue
        
        # Échapper les accolades isolées (qui ne font pas partie de JSX)
        # Ne pas échapper si déjà échappé
        line = line.replace('\\{', '\x00LEFTBRACE\x00')
        line = line.replace('\\}', '\x00RIGHTBRACE\x00')
        
        # Échapper les accolades isolées
        line = line.replace('{', '\\{')
        line = line.replace('}', '\\}')
        
        # Restaurer les accolades déjà échappées
        line = line.replace('\x00LEFTBRACE\x00', '\\{')
        line = line.replace('\x00RIGHTBRACE\x00', '\\}')
        
        processed_lines.append(line)
    
    return '\n'.join(processed_lines)

def convert_hugo_to_docusaurus(content, filename):
    """Pipeline complet de conversion Hugo → Docusaurus."""
    
    print(f"    → Converting frontmatter...")
    content = convert_frontmatter(content)
    
    print(f"    → Converting icon shortcodes...")
    content = convert_shortcodes_icons(content)
    
    print(f"    → Converting admonitions...")
    content = convert_admonitions(content)
    
    print(f"    → Converting links...")
    content = convert_links(content)
    
    print(f"    → Converting images...")
    content = convert_images(content)
    
    print(f"    → Fixing HTML tags...")
    content = fix_html_tags(content)
    
    print(f"    → Escaping remaining braces...")
    content = escape_remaining_braces(content)
    
    return content

def process_file(filepath):
    """Traite un fichier markdown."""
    print(f"\n📄 Processing: {filepath}")
    
    # Lire le contenu original
    with open(filepath, 'r', encoding='utf-8') as f:
        original_content = f.read()
    
    # Sauvegarder une copie de backup
    backup_path = filepath.with_suffix('.md.backup')
    with open(backup_path, 'w', encoding='utf-8') as f:
        f.write(original_content)
    print(f"    ✓ Backup saved to {backup_path.name}")
    
    # Convertir
    converted_content = convert_hugo_to_docusaurus(original_content, filepath.name)
    
    # Vérifier que le contenu n'a pas été réduit de manière suspecte
    original_lines = len(original_content.split('\n'))
    converted_lines = len(converted_content.split('\n'))
    
    if converted_lines < original_lines * 0.8:  # Si on perd plus de 20% des lignes
        print(f"    ⚠️  WARNING: Content reduced from {original_lines} to {converted_lines} lines")
        print(f"    ⚠️  Conversion skipped, check the file manually")
        return False
    
    # Écrire le fichier converti
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(converted_content)
    
    print(f"    ✅ Converted successfully ({original_lines} → {converted_lines} lines)")
    return True

def main():
    print("=" * 80)
    print("🔧 SCRIPT DE CONVERSION HUGO → DOCUSAURUS POUR FLOWERDOCS")
    print("=" * 80)
    print("\nCe script va :")
    print("  1. Sauvegarder une copie backup de chaque fichier")
    print("  2. Convertir le frontmatter TOML → YAML")
    print("  3. Convertir tous les shortcodes Hugo")
    print("  4. Échapper les accolades pour MDX")
    print("  5. Vérifier que rien n'est perdu")
    print("\n")
    
    # Parcourir tous les fichiers .md (sauf _index.md et .backup)
    md_files = [
        f for f in RELEASE_NOTES_DIR.rglob("*.md") 
        if f.name != '_index.md' and not f.name.endswith('.backup')
    ]
    
    print(f"📊 Found {len(md_files)} files to process\n")
    
    success_count = 0
    skip_count = 0
    
    for filepath in sorted(md_files):
        if process_file(filepath):
            success_count += 1
        else:
            skip_count += 1
    
    print("\n" + "=" * 80)
    print(f"✅ Conversion completed!")
    print(f"   - {success_count} files converted successfully")
    print(f"   - {skip_count} files skipped")
    print(f"   - Backup files created with .md.backup extension")
    print("=" * 80)

if __name__ == "__main__":
    main()
