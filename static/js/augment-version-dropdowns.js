// Inject a separator and a "Release notes" link into docs version dropdown menus
(function () {
    const MAPPINGS = {
        'fast2': '/uxodocs/releases/fast2',
        'arender': '/uxodocs/releases/arender',
        'flowerdocs': '/uxodocs/releases/flowerdocs',
        'uxopian-ai': '/uxodocs/releases/uxopian-ai',
    };

    function injectReleaseNotesLink(menu, product) {
        if (!menu || menu.dataset.releaseNotesInjected === '1') return;

        const releaseHref = MAPPINGS[product];
        if (!releaseHref) return;

        // Create separator
        const separator = document.createElement('li');
        separator.className = 'dropdown__separator';
        separator.setAttribute('role', 'separator');

        // Create link item
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'dropdown__link';
        link.href = releaseHref;
        link.textContent = 'Release notes';
        link.setAttribute('target', '_self');
        li.appendChild(link);

        // Append to menu
        menu.appendChild(separator);
        menu.appendChild(li);
        menu.dataset.releaseNotesInjected = '1';
    }

    function detectProduct(element) {
        // Check if element or its parents have product-specific classes
        let current = element;
        while (current && current !== document.body) {
            const classes = current.className || '';
            for (const product in MAPPINGS) {
                if (classes.includes(`verdd--${product}`) || classes.includes(product)) {
                    return product;
                }
            }
            current = current.parentElement;
        }

        // Check by URL in dropdown links
        const links = element.querySelectorAll('a[href]');
        for (const link of links) {
            const href = link.getAttribute('href') || '';
            for (const product in MAPPINGS) {
                if (href.includes(`/docs/${product}`) || href.includes(`docs/${product}`)) {
                    return product;
                }
            }
        }

        return null;
    }

    function processDropdowns() {
        // Find all dropdown menus
        const dropdowns = document.querySelectorAll('.dropdown__menu, [class*="dropdown"][class*="menu"]');

        dropdowns.forEach((menu) => {
            if (menu.dataset.releaseNotesInjected === '1') return;

            const product = detectProduct(menu);
            if (product) {
                injectReleaseNotesLink(menu, product);
            }
        });
    }

    // Initial load
    function init() {
        processDropdowns();
    }

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Watch for dynamically added dropdowns
    const observer = new MutationObserver((mutations) => {
        let shouldProcess = false;
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === 1) { // Element node
                    const element = node;
                    if (element.classList &&
                        (element.classList.contains('dropdown__menu') ||
                            element.querySelector && element.querySelector('.dropdown__menu'))) {
                        shouldProcess = true;
                        break;
                    }
                }
            }
            if (shouldProcess) break;
        }
        if (shouldProcess) {
            // Small delay to ensure dropdown is fully rendered
            setTimeout(processDropdowns, 10);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Also process on click events (backup mechanism)
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.closest && target.closest('.navbar__item')) {
            setTimeout(processDropdowns, 50);
        }
    }, true);
})();
