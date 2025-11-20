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

    function tryInject() {
        MAPPINGS.forEach(({ className, href }) => {
            const parent = document.querySelector(`.${className}`);
            if (!parent) return;
            // The dropdown menu usually has class .dropdown__menu
            const menu = parent.querySelector('.dropdown__menu');
            if (menu) injectIfNeeded(menu, href);
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
