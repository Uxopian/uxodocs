#!/bin/bash

# Script pour convertir les shortcodes Hugo en syntaxe MDX compatible avec Docusaurus
# pour tous les fichiers FlowerDocs

RELEASE_NOTES_DIR="/home/corentin/uxodox/uxodocs/src/pages/release-note/flowerdocs"

echo "🔧 Conversion des shortcodes Hugo vers MDX pour FlowerDocs..."

# Trouver tous les fichiers .md
find "$RELEASE_NOTES_DIR" -type f -name "*.md" | while read -r file; do
    echo "  Processing: $file"
    
    # Conversion des shortcodes Hugo courants
    # {{< warning >}} -> :::warning
    sed -i 's/{{< warning >}}/:::warning/g' "$file"
    sed -i 's/{{% warning %}}/:::warning/g' "$file"
    sed -i 's/{{< \/warning >}}/:::/g' "$file"
    sed -i 's/{{% \/warning %}}/:::/g' "$file"
    
    # {{< info >}} -> :::info
    sed -i 's/{{< info >}}/:::info/g' "$file"
    sed -i 's/{{% info %}}/:::info/g' "$file"
    sed -i 's/{{< \/info >}}/:::/g' "$file"
    sed -i 's/{{% \/info %}}/:::/g' "$file"
    
    # {{< note >}} -> :::note
    sed -i 's/{{< note >}}/:::note/g' "$file"
    sed -i 's/{{% note %}}/:::note/g' "$file"
    sed -i 's/{{< \/note >}}/:::/g' "$file"
    sed -i 's/{{% \/note %}}/:::/g' "$file"
    
    # {{< tip >}} -> :::tip
    sed -i 's/{{< tip >}}/:::tip/g' "$file"
    sed -i 's/{{% tip %}}/:::tip/g' "$file"
    sed -i 's/{{< \/tip >}}/:::/g' "$file"
    sed -i 's/{{% \/tip %}}/:::/g' "$file"
    
    # {{< danger >}} -> :::danger
    sed -i 's/{{< danger >}}/:::danger/g' "$file"
    sed -i 's/{{% danger %}}/:::danger/g' "$file"
    sed -i 's/{{< \/danger >}}/:::/g' "$file"
    sed -i 's/{{% \/danger %}}/:::/g' "$file"
    
    # {{< caution >}} -> :::caution
    sed -i 's/{{< caution >}}/:::caution/g' "$file"
    sed -i 's/{{% caution %}}/:::caution/g' "$file"
    sed -i 's/{{< \/caution >}}/:::/g' "$file"
    sed -i 's/{{% \/caution %}}/:::/g' "$file"
    
    # Icônes Hugo -> Emojis
    sed -i 's/{{% laptop %}}/💻/g' "$file"
    sed -i 's/{{< laptop >}}/💻/g' "$file"
    sed -i 's/{{% gear %}}/⚙️/g' "$file"
    sed -i 's/{{< gear >}}/⚙️/g' "$file"
    sed -i 's/{{% dev %}}/👨‍💻/g' "$file"
    sed -i 's/{{< dev >}}/👨‍💻/g' "$file"
    sed -i 's/{{% crown %}}/👑/g' "$file"
    sed -i 's/{{< crown >}}/👑/g' "$file"
    
    # {{< ref "..." >}} -> lien relatif
    # Remplacer par un lien relatif simple
    sed -i 's/{{< ref "\([^"]*\)" >}}/\1/g' "$file"
    sed -i 's/{{% ref "\([^"]*\)" %}}/\1/g' "$file"
    
    # Gérer les images avec relref
    sed -i 's/{{< relref "\([^"]*\)" >}}/\1/g' "$file"
    sed -i 's/{{% relref "\([^"]*\)" %}}/\1/g' "$file"
    
    # {{< image ... >}} -> <img ... />
    # Note: cela nécessite une conversion plus complexe, on commentera ces lignes pour l'instant
    sed -i 's/{{< image /<!-- HUGO_IMAGE: /g' "$file"
    sed -i 's/ >}}/ -->/g' "$file"
done

echo "✅ Conversion terminée!"
