// Inject a separator and a "Release notes" link into docs version dropdown menus
(function () {
    const MAPPINGS = [
        { className: 'verdd--fast2', href: '/releases/fast2' },
        { className: 'verdd--arender', href: '/releases/arender' },
        { className: 'verdd--flowerdocs', href: '/releases/flowerdocs' },
        { className: 'verdd--uxopian-ai', href: '/releases/uxopian-ai' },
    ];

    function injectIfNeeded(menuEl, href) {
        if (!menuEl) return;
        if (menuEl.dataset.releaseNotesInjected === '1') return;

        // create separator
        const sep = document.createElement('li');
        sep.className = 'dropdown__separator';
        // create link item
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'dropdown__link';
        a.href = href;
        a.textContent = 'Release notes';
        li.appendChild(a);

        // append separator and link
        menuEl.appendChild(sep);
        menuEl.appendChild(li);
        menuEl.dataset.releaseNotesInjected = '1';
    }

    function detectProductForMenu(menuEl) {
        if (!menuEl) return null;
        const anchors = Array.from(menuEl.querySelectorAll('a')).map((a) => (a.href || '').toString());
        for (const { className, href } of MAPPINGS) {
            // if any anchor contains a docs route for this product, assume match
            if (anchors.some((a) => a.includes(`/docs/${className.replace('verdd--', '')}`) || a.includes(`/docs/${className.replace('verdd--', '')}/`))) {
                return href;
            }
        }
        // fallback: try to find a nearby toggle with the mapping class
        for (const { className, href } of MAPPINGS) {
            // look for an element with that class within the menu's ancestors/siblings
            const toggle = document.querySelector(`.${className}`);
            if (toggle) {
                // if toggle contains this menu as descendant or is nearby, accept
                if (toggle.contains(menuEl) || toggle.parentElement && toggle.parentElement.contains(menuEl) || toggle.nextElementSibling === menuEl || toggle.previousElementSibling === menuEl) {
                    return href;
                }
            }
        }
        return null;
    }

    function tryInject() {
        const menus = Array.from(document.querySelectorAll('.dropdown__menu'));
        menus.forEach((menu) => {
            if (menu.dataset.releaseNotesInjected === '1') return;
            const mappedHref = detectProductForMenu(menu);
            if (mappedHref) {
                injectIfNeeded(menu, mappedHref);
            }
        });
    }

    // Try once on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInject);
    } else {
        tryInject();
    }

    // Also watch for dynamic menu additions
    const observer = new MutationObserver(() => tryInject());
    observer.observe(document.body, { childList: true, subtree: true });
})();
