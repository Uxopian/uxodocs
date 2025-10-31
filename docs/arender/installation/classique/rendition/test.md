# Test - Serveur de Rendition

Ce guide présente une suite complète de tests pour valider le fonctionnement du serveur de rendition ARender avec différents types de documents et cas d'usage.

## Suite de tests de base

### Préparation de l'environnement de test
```bash
#!/bin/bash
# setup-test-env.sh

echo "=== Préparation environnement de test ARender ==="

# Créer le répertoire de test
mkdir -p /tmp/arender-tests/{input,output,reports}
cd /tmp/arender-tests

# Configuration test
ARENDER_URL="http://localhost:8080"
TEST_RESULTS="/tmp/arender-tests/reports/test-results-$(date +%Y%m%d-%H%M%S).log"

# Fonction de test
test_conversion() {
    local input_file="$1"
    local output_format="$2"
    local test_name="$3"
    
    echo "Test: $test_name" | tee -a "$TEST_RESULTS"
    echo "Input: $input_file" | tee -a "$TEST_RESULTS"
    echo "Format: $output_format" | tee -a "$TEST_RESULTS"
    
    start_time=$(date +%s.%N)
    
    curl -s -X POST \
        -F "file=@$input_file" \
        -F "outputFormat=$output_format" \
        -w "HTTP Status: %{http_code}\nTime: %{time_total}s\n" \
        "$ARENDER_URL/api/v1/convert" \
        -o "output/$(basename "$input_file" .*).$output_format" \
        2>&1 | tee -a "$TEST_RESULTS"
    
    end_time=$(date +%s.%N)
    duration=$(echo "$end_time - $start_time" | bc -l)
    
    echo "Duration: ${duration}s" | tee -a "$TEST_RESULTS"
    echo "---" | tee -a "$TEST_RESULTS"
}

echo "Environment de test préparé dans /tmp/arender-tests"
echo "URL ARender: $ARENDER_URL"
echo "Résultats: $TEST_RESULTS"
```

### Tests par format de document

#### Test documents texte
```bash
#!/bin/bash
# test-text-documents.sh

echo "=== Tests documents texte ==="

# Document TXT simple
cat > input/simple.txt << 'EOF'
Document texte simple pour test ARender

Ce document contient:
- Du texte simple
- Des caractères spéciaux: àéèêç
- Des émojis: 🚀 ✅ ❌
- Des chiffres: 123456789

Fin du document
EOF

# Document TXT avec encodage UTF-8
cat > input/utf8.txt << 'EOF'
Test encodage UTF-8

Caractères européens: àáâãäåæçèéêë
Caractères cyrilliques: абвгдежзий
Caractères japonais: こんにちは
Caractères chinois: 你好世界
Caractères arabes: مرحبا بالعالم

Symboles mathématiques: ∑∫∞≈≠±×÷
EOF

# Document RTF
cat > input/test.rtf << 'EOF'
{\rtf1\ansi\deff0 {\fonttbl {\f0 Times New Roman;}}
{\colortbl;\red0\green0\blue0;\red255\green0\blue0;}
\f0\fs24 Document RTF de test\par
\cf2\b Texte en rouge et gras\cf1\b0\par
Liste:\par
\pard\li720 • Item 1\par
\pard\li720 • Item 2\par
\pard Fin du document RTF\par
}
EOF

# Exécution des tests
test_conversion "input/simple.txt" "pdf" "TXT simple vers PDF"
test_conversion "input/simple.txt" "png" "TXT simple vers PNG"
test_conversion "input/utf8.txt" "pdf" "TXT UTF-8 vers PDF"
test_conversion "input/test.rtf" "pdf" "RTF vers PDF"
```

#### Test documents Office
```bash
#!/bin/bash
# test-office-documents.sh

echo "=== Tests documents Office ==="

# Document HTML complexe (sera converti par LibreOffice)
cat > input/complex.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Document de test complexe</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .header { background-color: #4CAF50; color: white; padding: 10px; }
        .content { padding: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Document de test ARender</h1>
    </div>
    <div class="content">
        <h2>Section 1: Texte</h2>
        <p>Ce document teste la conversion de contenu HTML complexe avec <b>mise en forme</b>, <i>italique</i>, et <u>souligné</u>.</p>
        
        <h2>Section 2: Liste</h2>
        <ul>
            <li>Premier élément</li>
            <li>Deuxième élément</li>
            <li>Troisième élément</li>
        </ul>
        
        <h2>Section 3: Tableau</h2>
        <table>
            <thead>
                <tr><th>Colonne 1</th><th>Colonne 2</th><th>Colonne 3</th></tr>
            </thead>
            <tbody>
                <tr><td>Valeur 1</td><td>Valeur 2</td><td>Valeur 3</td></tr>
                <tr><td>Valeur 4</td><td>Valeur 5</td><td>Valeur 6</td></tr>
            </tbody>
        </table>
        
        <h2>Section 4: Formules</h2>
        <p>E = mc² et autres formules mathématiques: ∑(i=1 to n) i²</p>
    </div>
</body>
</html>
EOF

# CSV pour test Excel
cat > input/data.csv << 'EOF'
Nom,Prénom,Age,Ville
Dupont,Jean,35,Paris
Martin,Marie,28,Lyon
Dubois,Pierre,42,Marseille
Moreau,Sophie,31,Toulouse
Laurent,Paul,38,Nice
EOF

# Tests de conversion
test_conversion "input/complex.html" "pdf" "HTML complexe vers PDF"
test_conversion "input/complex.html" "docx" "HTML vers DOCX"
test_conversion "input/data.csv" "xlsx" "CSV vers XLSX"
test_conversion "input/data.csv" "pdf" "CSV vers PDF"
```

#### Test documents PDF
```bash
#!/bin/bash
# test-pdf-documents.sh

echo "=== Tests documents PDF ==="

# Créer un PDF simple avec ps2pdf
cat > input/test.ps << 'EOF'
%!PS-Adobe-3.0
/Times-Roman findfont 12 scalefont setfont
72 720 moveto
(Document PostScript de test) show
72 700 moveto
(Conversion vers PDF puis rendu) show
72 680 moveto
(Page 1 de test) show

% Nouvelle page
showpage
72 720 moveto
(Page 2 du document) show
72 700 moveto
(Test multi-pages) show
showpage
EOF

# Convertir en PDF
ps2pdf input/test.ps input/test.pdf

# PDF avec du texte complexe
echo "Test PDF complexe" | ps2pdf - input/complex.pdf

# Tests de rendu PDF
echo "Test rendu PDF page 1:"
curl -X POST \
    -F "file=@input/test.pdf" \
    -F "page=1" \
    -F "format=png" \
    -F "dpi=150" \
    "$ARENDER_URL/api/v1/render" \
    -o "output/test-page1.png" \
    -w "HTTP: %{http_code}, Time: %{time_total}s\n"

echo "Test rendu PDF page 2:"
curl -X POST \
    -F "file=@input/test.pdf" \
    -F "page=2" \
    -F "format=jpg" \
    -F "dpi=200" \
    "$ARENDER_URL/api/v1/render" \
    -o "output/test-page2.jpg" \
    -w "HTTP: %{http_code}, Time: %{time_total}s\n"

# Test métadonnées PDF
echo "Extraction métadonnées PDF:"
curl -X POST \
    -F "file=@input/test.pdf" \
    "$ARENDER_URL/api/v1/metadata" \
    | jq '.'
```

### Tests de performance

#### Test charge légère (documents petits)
```bash
#!/bin/bash
# test-light-load.sh

echo "=== Test charge légère ==="

# Créer 10 petits documents
for i in {1..10}; do
    echo "Document de test numéro $i - $(date)" > "input/light-$i.txt"
done

# Conversion séquentielle
echo "Test séquentiel (10 documents):"
start_time=$(date +%s)
for i in {1..10}; do
    curl -s -X POST \
        -F "file=@input/light-$i.txt" \
        -F "outputFormat=pdf" \
        "$ARENDER_URL/api/v1/convert" \
        -o "output/light-seq-$i.pdf"
done
seq_time=$(($(date +%s) - start_time))
echo "Temps séquentiel: ${seq_time}s"

# Conversion parallèle
echo "Test parallèle (10 documents):"
start_time=$(date +%s)
for i in {1..10}; do
    (curl -s -X POST \
        -F "file=@input/light-$i.txt" \
        -F "outputFormat=pdf" \
        "$ARENDER_URL/api/v1/convert" \
        -o "output/light-par-$i.pdf") &
done
wait
par_time=$(($(date +%s) - start_time))
echo "Temps parallèle: ${par_time}s"

echo "Amélioration: $((seq_time - par_time))s ($(echo "scale=2; ($seq_time - $par_time) * 100 / $seq_time" | bc)%)"
```

#### Test charge lourde (documents volumineux)
```bash
#!/bin/bash
# test-heavy-load.sh

echo "=== Test charge lourde ==="

# Créer un gros document HTML
cat > input/heavy.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>Gros document de test</title></head>
<body>
EOF

# Ajouter beaucoup de contenu
for i in {1..1000}; do
    echo "<h2>Section $i</h2>" >> input/heavy.html
    echo "<p>Contenu de la section $i avec beaucoup de texte pour augmenter la taille du document. " >> input/heavy.html
    echo "Cette section contient des informations importantes sur le test numéro $i. " >> input/heavy.html
    echo "Répétition de texte pour simuler un vrai document volumineux.</p>" >> input/heavy.html
done

echo "</body></html>" >> input/heavy.html

# Test de conversion avec mesure de ressources
echo "Test conversion document volumineux:"
echo "Taille du document: $(du -h input/heavy.html | cut -f1)"

# Monitorer les ressources pendant la conversion
(
    PID=$(pgrep -f arender-rendition)
    while kill -0 $PID 2>/dev/null; do
        ps -p $PID -o pcpu,pmem,vsz,rss --no-headers >> output/resource-usage.log
        sleep 1
    done
) &
MONITOR_PID=$!

# Lancer la conversion
start_time=$(date +%s)
curl -X POST \
    -F "file=@input/heavy.html" \
    -F "outputFormat=pdf" \
    "$ARENDER_URL/api/v1/convert" \
    -o "output/heavy.pdf" \
    -w "HTTP: %{http_code}, Time: %{time_total}s\n"
end_time=$(date +%s)

# Arrêter le monitoring
kill $MONITOR_PID 2>/dev/null

echo "Temps total: $((end_time - start_time))s"
echo "Taille résultat: $(du -h output/heavy.pdf | cut -f1)"

# Analyser l'utilisation des ressources
if [ -f "output/resource-usage.log" ]; then
    echo "CPU max: $(sort -nr output/resource-usage.log | head -1 | awk '{print $1}')%"
    echo "Mémoire max: $(sort -k2 -nr output/resource-usage.log | head -1 | awk '{print $2}')%"
fi
```

### Tests de robustesse

#### Test fichiers corrompus
```bash
#!/bin/bash
# test-corrupted-files.sh

echo "=== Test fichiers corrompus ==="

# Créer des fichiers corrompus
dd if=/dev/urandom of=input/random.pdf bs=1024 count=10 2>/dev/null
echo "Faux PDF" > input/fake.pdf
truncate -s 0 input/empty.pdf
echo -e "\x00\x01\x02\x03" > input/binary.txt

# Tester la gestion des erreurs
test_files=(
    "input/random.pdf"
    "input/fake.pdf"
    "input/empty.pdf"
    "input/binary.txt"
    "input/nonexistent.doc"
)

for file in "${test_files[@]}"; do
    echo "Test fichier corrompu: $file"
    response=$(curl -s -X POST \
        -F "file=@$file" \
        -F "outputFormat=pdf" \
        -w "%{http_code}" \
        "$ARENDER_URL/api/v1/convert" 2>/dev/null)
    
    if [[ "$response" =~ ^[45][0-9][0-9]$ ]]; then
        echo "✓ Erreur correctement gérée (HTTP $response)"
    else
        echo "✗ Erreur mal gérée (HTTP $response)"
    fi
done
```

#### Test limite de taille
```bash
#!/bin/bash  
# test-size-limits.sh

echo "=== Test limites de taille ==="

# Créer un fichier juste en dessous de la limite
echo "Test fichier limite (950MB)..."
dd if=/dev/zero of=input/large.txt bs=1M count=950 2>/dev/null
echo "Document de test très volumineux" >> input/large.txt

# Test avec fichier dans la limite
curl -X POST \
    -F "file=@input/large.txt" \
    -F "outputFormat=pdf" \
    -w "Large file - HTTP: %{http_code}, Time: %{time_total}s\n" \
    "$ARENDER_URL/api/v1/convert" \
    -o "output/large.pdf"

# Créer un fichier au-dessus de la limite (si configurée à 1GB)
echo "Test fichier dépassant la limite (1.1GB)..."  
dd if=/dev/zero of=input/toolarge.txt bs=1M count=1100 2>/dev/null

# Test avec fichier dépassant la limite
response=$(curl -s -X POST \
    -F "file=@input/toolarge.txt" \
    -F "outputFormat=pdf" \
    -w "%{http_code}" \
    "$ARENDER_URL/api/v1/convert" 2>/dev/null)

if [[ "$response" =~ ^413|400$ ]]; then
    echo "✓ Limite de taille correctement appliquée (HTTP $response)"
else
    echo "✗ Limite de taille non respectée (HTTP $response)"
fi

# Nettoyage
rm -f input/large.txt input/toolarge.txt
```

## Tests d'intégration

### Test API complète
```bash
#!/bin/bash
# test-complete-api.sh

echo "=== Test API complète ==="

# Test endpoints disponibles
endpoints=(
    "/actuator/health"
    "/actuator/info" 
    "/actuator/metrics"
    "/api/v1/formats"
    "/api/v1/engines"
)

for endpoint in "${endpoints[@]}"; do
    echo "Test endpoint: $endpoint"
    curl -s -w "HTTP: %{http_code}, Time: %{time_total}s\n" \
        "$ARENDER_URL$endpoint" \
        -o /dev/null
done

# Test conversion avec tous les formats de sortie
formats=("pdf" "png" "jpg" "webp")
echo "Document test API" > input/api-test.txt

for format in "${formats[@]}"; do
    echo "Test conversion vers $format:"
    curl -X POST \
        -F "file=@input/api-test.txt" \
        -F "outputFormat=$format" \
        -w "Format $format - HTTP: %{http_code}, Size: %{size_download} bytes\n" \
        "$ARENDER_URL/api/v1/convert" \
        -o "output/api-test.$format"
done
```

### Rapport final de tests
```bash
#!/bin/bash
# generate-test-report.sh

REPORT_FILE="/tmp/arender-tests/reports/final-report-$(date +%Y%m%d-%H%M%S).html"

cat > "$REPORT_FILE" << EOF
<!DOCTYPE html>
<html>
<head>
    <title>ARender Rendition - Rapport de tests</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .success { color: green; }
        .error { color: red; }
        .warning { color: orange; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>ARender Rendition Server - Rapport de tests</h1>
    <p>Date: $(date)</p>
    <p>Serveur: $(hostname)</p>
    
    <h2>Résumé des tests</h2>
    <table>
        <tr><th>Type de test</th><th>Statut</th><th>Détails</th></tr>
EOF

# Analyser les résultats et générer le rapport
total_tests=0
passed_tests=0
failed_tests=0

# Compter les fichiers de sortie générés
output_files=$(find output/ -name "*.pdf" -o -name "*.png" -o -name "*.jpg" 2>/dev/null | wc -l)
total_tests=$((total_tests + output_files))

if [ $output_files -gt 0 ]; then
    passed_tests=$((passed_tests + output_files))
    echo "        <tr><td>Conversions documents</td><td class='success'>✓ PASSED</td><td>$output_files conversions réussies</td></tr>" >> "$REPORT_FILE"
else
    failed_tests=$((failed_tests + 1))
    echo "        <tr><td>Conversions documents</td><td class='error'>✗ FAILED</td><td>Aucune conversion réussie</td></tr>" >> "$REPORT_FILE"
fi

# Vérifier les logs d'erreur
error_count=$(grep -c "ERROR\|Exception" /var/log/arender/rendition.log 2>/dev/null || echo 0)
if [ $error_count -eq 0 ]; then
    echo "        <tr><td>Logs d'erreur</td><td class='success'>✓ PASSED</td><td>Aucune erreur détectée</td></tr>" >> "$REPORT_FILE"
else
    echo "        <tr><td>Logs d'erreur</td><td class='warning'>⚠ WARNING</td><td>$error_count erreurs dans les logs</td></tr>" >> "$REPORT_FILE"
fi

# Finaliser le rapport
cat >> "$REPORT_FILE" << EOF
    </table>
    
    <h2>Statistiques</h2>
    <ul>
        <li>Tests réussis: $passed_tests</li>
        <li>Tests échoués: $failed_tests</li>
        <li>Total: $total_tests</li>
        <li>Taux de réussite: $(echo "scale=2; $passed_tests * 100 / $total_tests" | bc)%</li>
    </ul>
    
    <h2>Fichiers générés</h2>
    <ul>
EOF

# Lister les fichiers de sortie
find output/ -type f 2>/dev/null | while read file; do
    size=$(du -h "$file" | cut -f1)
    echo "        <li>$(basename "$file") - $size</li>" >> "$REPORT_FILE"
done

cat >> "$REPORT_FILE" << EOF
    </ul>
    
    <p><em>Rapport généré automatiquement - $(date)</em></p>
</body>
</html>
EOF

echo "Rapport de tests généré: $REPORT_FILE"
```

## Checklist de validation finale

### Tests obligatoires
- [ ] Conversion TXT → PDF fonctionnelle
- [ ] Conversion HTML → PDF fonctionnelle  
- [ ] Rendu PDF → PNG fonctionnel
- [ ] API health check répond "UP"
- [ ] Gestion correcte des erreurs (fichiers corrompus)
- [ ] Respect des limites de taille
- [ ] Performance acceptable (&lt;5s pour document standard)
- [ ] Pas d'erreur critique dans les logs
- [ ] Utilisation mémoire stable
- [ ] Tous les moteurs (LibreOffice, PDFium) opérationnels

### Tests optionnels avancés
- [ ] Test de charge (conversions simultanées)
- [ ] Test avec gros documents (&gt;100MB)
- [ ] Test formats exotiques (CAD, etc.)
- [ ] Test intégration HTTPS
- [ ] Test authentification (si activée)
- [ ] Test monitoring et métriques

Une fois tous les tests validés, votre serveur de rendition ARender est prêt pour la production ! Vous pouvez maintenant procéder à l'installation du [serveur Web-UI](../web-ui/) pour compléter votre installation ARender.