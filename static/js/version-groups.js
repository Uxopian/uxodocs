(function () {
    let processed = new Set();

    function groupVersions() {
        console.log('Grouping versions...');

        const versionDropdowns = document.querySelectorAll('.navbar__item.dropdown .dropdown__menu');

        versionDropdowns.forEach(dropdown => {
            if (processed.has(dropdown)) return;

            if (dropdown.querySelector('.version-group')) {
                console.log('Already grouped, skipping dropdown');
                processed.add(dropdown);
                return;
            }

            console.log('Processing dropdown:', dropdown);

            const links = Array.from(dropdown.querySelectorAll('a'));
            console.log('Found links:', links.length);

            if (links.length === 0) return;

            const groups = {};
            const others = [];
            const allGroupedLinks = new Set();

            links.forEach(link => {
                const text = link.textContent.trim();
                const yearMatch = text.match(/v(\d{4})[\.\-]/);
                if (yearMatch) {
                    const year = yearMatch[1];
                    if (!groups[year]) {
                        groups[year] = [];
                    }
                    groups[year].push(link);
                    allGroupedLinks.add(link);
                } else {
                    others.push(link);
                }
            });

            console.log('Groups:', groups, 'Others:', others);

            if (Object.keys(groups).length === 0 && others.length === 0) return;

            processed.add(dropdown);

            Object.keys(groups).sort().reverse().forEach(year => {
                const versions = groups[year];
                if (versions.length === 0) return;

                console.log(`Creating group for ${year} with ${versions.length} versions`);

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

                versions.forEach(link => {
                    const linkClone = link.cloneNode(true);
                    linkClone.className = 'version-group__submenu-item';

                    if (link.classList.contains('dropdown__link--active')) {
                        linkClone.classList.add('dropdown__link--active');
                    }

                    submenu.appendChild(linkClone);
                });

                groupWrapper.appendChild(groupHeader);
                groupWrapper.appendChild(submenu);

                versions[0].parentNode.insertBefore(groupWrapper, versions[0]);

                versions.forEach(link => {
                    link.remove();
                });
            });

            if (others.length > 0) {
                console.log(`Found ${others.length} other versions (not grouped)`);
            }
        });
    }

    function reset() {
        console.log('Resetting version groups...');
        processed.clear();

        const existingGroups = document.querySelectorAll('.version-group');
        console.log('Removing', existingGroups.length, 'existing groups');
        existingGroups.forEach(function (group) {
            group.remove();
        });
    }

    function tryGroupVersions(attempts = 0) {
        groupVersions();

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

    const observer = new MutationObserver(function (mutations) {
        let shouldReapply = false;

        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                if (node.nodeType === 1 && (node.matches('a') || node.querySelector('a'))) {
                    shouldReapply = true;
                }
            });
        });

        if (shouldReapply) {
            console.log('DOM changed, reapplying grouping...');
            reset();
            setTimeout(groupVersions, 150);
        }
    });

    setTimeout(function () {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            observer.observe(navbar, { childList: true, subtree: true });
            console.log('Observer installed on navbar');
        }
    }, 1000);

    if (typeof window !== 'undefined') {
        window.addEventListener('popstate', function () {
            console.log('Navigation detected (popstate)');
            reset();
            setTimeout(groupVersions, 200);
        });
        
        // Hook dans le router Docusaurus si disponible
        const checkAndReapply = function() {
            const hasGroups = document.querySelector('.version-group');
            const hasVersionLinks = document.querySelector('.navbar__item.dropdown .dropdown__menu a');
            
            if (hasVersionLinks && !hasGroups) {
                console.log('Version links found without groups, applying...');
                groupVersions();
            }
        };
        
        // Vérifier périodiquement pendant les 5 premières secondes après le chargement
        let checks = 0;
        const interval = setInterval(function() {
            checkAndReapply();
            checks++;
            if (checks >= 10) {
                clearInterval(interval);
            }
        }, 500);
        
        // Vérifier aussi à chaque clic sur un dropdown
        document.addEventListener('click', function(e) {
            const dropdown = e.target.closest('.navbar__item.dropdown');
            if (dropdown) {
                setTimeout(checkAndReapply, 100);
            }
        });
    }
})();
