// Script pour grouper les versions par année dans les dropdowns
(function () {
    let processed = new Set();

    function groupVersions() {
        console.log('Grouping versions...');

        // Trouver tous les dropdowns de versions
        const versionDropdowns = document.querySelectorAll('.navbar__item.dropdown .dropdown__menu');

        versionDropdowns.forEach(dropdown => {
            // Éviter de traiter plusieurs fois le même dropdown
            if (processed.has(dropdown)) return;

            const links = Array.from(dropdown.querySelectorAll('a'));
            console.log('Found links:', links.length);

            if (links.length === 0) return;

            // Grouper par année et format
            const groups = {};
            const others = [];
            const allGroupedLinks = new Set();
            
            links.forEach(link => {
                const text = link.textContent.trim();
                // Format vYYYY.X.X ou vYYYY.X
                const yearMatch = text.match(/v(\d{4})[\.\-]/);
                if (yearMatch) {
                    const year = yearMatch[1];
                    if (!groups[year]) {
                        groups[year] = [];
                    }
                    groups[year].push(link);
                    allGroupedLinks.add(link);
                } else {
                    // Versions sans année (v1, v2, etc.)
                    others.push(link);
                }
            });

            console.log('Groups:', groups, 'Others:', others);

            // Si pas de groupes trouvés, ne rien faire
            if (Object.keys(groups).length === 0 && others.length === 0) return;

            // Marquer comme traité
            processed.add(dropdown);

            // Reconstruire le menu - en ordre inverse (plus récent en premier)
            Object.keys(groups).sort().reverse().forEach(year => {
                const versions = groups[year];
                if (versions.length === 0) return;

                console.log(`Creating group for ${year} with ${versions.length} versions`);

                // Créer le groupe parent
                const groupWrapper = document.createElement('div');
                groupWrapper.className = 'version-group';
                groupWrapper.setAttribute('data-year', year);

                const groupHeader = document.createElement('div');
                groupHeader.className = 'version-group__header';
                groupHeader.innerHTML = `
          <span>v${year}.x</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" style="margin-left: auto;">
            <path d="M3.5 1.75l3.5 3.5-3.5 3.5" stroke="currentColor" stroke-width="1.5" fill="none" />
          </svg>
        `;

                const submenu = document.createElement('div');
                submenu.className = 'version-group__submenu';

                // Ajouter les versions au sous-menu
                versions.forEach(link => {
                    const linkClone = link.cloneNode(true);
                    linkClone.className = 'version-group__submenu-item';
                    submenu.appendChild(linkClone);
                });

                groupWrapper.appendChild(groupHeader);
                groupWrapper.appendChild(submenu);

                // Insérer avant le premier lien du groupe
                versions[0].parentNode.insertBefore(groupWrapper, versions[0]);

                // Cacher tous les liens originaux de ce groupe
                versions.forEach(link => {
                    link.style.display = 'none';
                });
            });
            
            // Gérer les versions "autres" (v1, v2, etc.) - ne pas les grouper si peu nombreuses
            if (others.length > 0) {
                console.log(`Found ${others.length} other versions (not grouped)`);
                // Les laisser telles quelles, elles apparaîtront après les groupes
            }
            
            // IMPORTANT : Cacher tous les liens originaux qui ont été groupés
            // Cela évite les doublons quand une version est sélectionnée
            allGroupedLinks.forEach(link => {
                link.style.display = 'none';
            });
        });
    }

    // Fonction pour réinitialiser l'état
    function reset() {
        processed.clear();
    }

    // Exécuter au chargement avec plusieurs tentatives
    function tryGroupVersions(attempts = 0) {
        groupVersions();
        
        // Réessayer si aucun dropdown n'a été traité (max 5 fois)
        if (processed.size === 0 && attempts < 5) {
            setTimeout(() => tryGroupVersions(attempts + 1), 200);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setTimeout(() => tryGroupVersions(), 300);
        });
    } else {
        setTimeout(() => tryGroupVersions(), 300);
    }

    // Observer les changements dans la navbar pour réappliquer après navigation
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0) {
                // Réinitialiser et réappliquer
                reset();
                setTimeout(groupVersions, 100);
            }
        });
    });

    // Observer la navbar
    setTimeout(function () {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            observer.observe(navbar, { childList: true, subtree: true });
        }
    }, 1000);
    
    // Réappliquer au changement de route (navigation Docusaurus)
    if (typeof window !== 'undefined') {
        window.addEventListener('popstate', function() {
            reset();
            setTimeout(groupVersions, 200);
        });
    }
})();
