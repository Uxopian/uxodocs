// Machinery of the ARender integration (Scripts > arender-core). ARender runs it as its startup script:
//   arenderjs.startupScript=<uxopian-ai>/api/v1/scripts/arender-core
//
// 1. loads arender-config, from the URL ARender fetched this script from;
// 2. runs the startup script ARender had before (config.chainedStartupScript, FlowerDocs' scripts/menus.js);
// 3. once ARender is ready, loads the uxopian-ai chat and the scripts of config.scripts (arender-buttons);
// 4. offers them window.uxoai: top panel menus and buttons, prompts sent to the chat.
//
// ARender's JS API cannot add a top panel button: menus and buttons are injected in the DOM of the GWT top panel,
// with its own CSS classes, and put back whenever GWT redraws the panel.
(function () {
    var SCRIPTS_PATH = '/api/v1/scripts/';
    var DEFAULT_ITEM_ICON = 'icon-list-check';
    var ROBOT_ICON = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"'
        + ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="8" width="16" height="12" rx="3"/>'
        + '<path d="M12 4v4M9 13h.01M15 13h.01M9.5 17h5M2 13v2M22 13v2"/></svg>';

    // --- Loading -------------------------------------------------------------------------------------------

    // ARender fetches its startup script with an XHR and evaluates it: there is no document.currentScript,
    // but the fetch is in the resource timeline, and the scripts all live next to each other.
    function locateScriptsHost() {
        var entries = performance.getEntriesByType('resource');
        for (var i = entries.length - 1; i >= 0; i--) {
            var index = entries[i].name.indexOf(SCRIPTS_PATH);
            if (index > 0) {
                return entries[i].name.substring(0, index);
            }
        }
        throw new Error('URL of the uxopian-ai scripts not found: is arenderjs.startupScript .../api/v1/scripts/arender-core ?');
    }

    function withTimestamp(url) {
        return url + (url.indexOf('?') < 0 ? '?' : '&') + 't=' + Date.now();
    }

    // Synchronous on purpose: config and chained script must be in place before this script returns,
    // ARender may call arenderjs_init right after.
    function runNow(url) {
        var request = new XMLHttpRequest();
        request.open('GET', withTimestamp(url), false);
        request.send();
        if (request.status !== 200) {
            throw new Error(url + ': HTTP ' + request.status);
        }
        (0, eval)(request.responseText);
    }

    function loadScript(url) {
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.src = withTimestamp(url);
            script.onload = resolve;
            script.onerror = function () {
                reject(new Error('cannot load ' + url));
            };
            document.head.appendChild(script);
        });
    }

    function loadStyle(url) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }

    var scriptsHost = locateScriptsHost();
    runNow(scriptsHost + SCRIPTS_PATH + 'arender-config');
    var config = window.uxoaiConfig;
    var host = config.host.replace(/\/$/, '');

    function adminScriptUrl(id) {
        return host + SCRIPTS_PATH + encodeURIComponent(id) + (config.useDrafts ? '/draft' : '');
    }

    var chainedInit = null;
    if (config.chainedStartupScript) {
        try {
            runNow(config.chainedStartupScript);
            chainedInit = window.arenderjs_init || null;
        } catch (e) {
            console.error('[uxoai] chained startup script ' + config.chainedStartupScript + ' not run', e);
        }
    }

    // --- Public API ----------------------------------------------------------------------------------------

    var readyCallbacks = [];
    var uxoai = window.uxoai = {
        config: config,
        arenderjs: null,
        loadedScripts: [],
        onReady: onReady,
        createChat: createChat,
        addStyle: addStyle,
        addMenu: addMenu,
        addButton: addButton,
        promptItem: promptItem,
        chatItem: chatItem
    };

    function runSafely(label, callback, argument) {
        try {
            return callback(argument);
        } catch (e) {
            console.error('[uxoai] ' + label + ' failed', e);
        }
    }

    function onReady(callback) {
        if (uxoai.arenderjs) {
            runSafely('onReady', callback, uxoai.arenderjs);
        } else {
            readyCallbacks.push(callback);
        }
    }

    function createChat(request) {
        return window.createChat({ endpoint: host, wsEndpoint: host, request: request });
    }

    function addStyle(id, css) {
        var style = document.getElementById(id);
        if (!style) {
            style = document.createElement('style');
            style.id = id;
            document.head.appendChild(style);
        }
        style.textContent = css;
    }

    // --- Documents -----------------------------------------------------------------------------------------

    // Documents of the layout when several are open, [] otherwise. Read once per document change: on a single
    // document, getDocumentLayout throws inside GWT and calls neither handler, so it is never awaited.
    var layoutDocumentIds = [];

    function updateLayoutState() {
        layoutDocumentIds = [];
        getARenderJS().getDocumentLayout().getDocumentLayout(getARenderJS().getMasterDocumentId(), function (layout) {
            if (layout.isDocumentContainer()) {
                layoutDocumentIds = layout.getChildren().map(function (child) {
                    return child.getDocumentId();
                });
            }
        }, function () {
            layoutDocumentIds = [];
        });
    }

    function isMultiDocumentLayout() {
        return layoutDocumentIds.length > 1;
    }

    // { documentId, documentIds }: what a payload function receives.
    function currentDocuments() {
        var documentId = getARenderJS().getCurrentDocumentId();
        return { documentId: documentId, documentIds: isMultiDocumentLayout() ? layoutDocumentIds : [documentId] };
    }

    function promptEntry(role, label, promptId, payload, options) {
        options = options || {};
        return {
            label: label,
            icon: options.icon || DEFAULT_ITEM_ICON,
            multiDocument: !!options.multiDocument,
            run: function () {
                var content = { type: 'PROMPT', value: promptId, payload: payload ? payload(currentDocuments()) : {} };
                createChat({ inputs: [{ role: role, content: [content] }] });
            }
        };
    }

    function promptItem(label, promptId, payload, options) {
        return promptEntry('user', label, promptId, payload, options);
    }

    function chatItem(label, promptId, payload, options) {
        return promptEntry('system', label, promptId, payload, options);
    }

    // --- Top panel -----------------------------------------------------------------------------------------

    var topPanelElements = [];
    var openPopup = null;
    var elementCount = 0;

    addStyle('uxoai-core-style', [
        '.uxoai-toppanel-button { display: flex; align-items: center; justify-content: center; color: ' + config.accentColor + '; }',
        '.uxoai-toppanel-button.uxoai-open { background: color-mix(in srgb, ' + config.accentColor + ' 15%, transparent); }',
        '.uxoai-popup .dropDownMenuItem[aria-disabled="true"] { opacity: .45; pointer-events: none; }'
    ].join('\n'));

    function onActivate(element, action) {
        element.addEventListener('click', function (event) {
            event.stopPropagation();
            action();
        });
        element.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                action();
            }
        });
    }

    function closePopup() {
        if (!openPopup) {
            return;
        }
        openPopup.popup.remove();
        openPopup.button.classList.remove('uxoai-open');
        openPopup.button.setAttribute('aria-expanded', 'false');
        openPopup = null;
    }

    function menuItemElement(item) {
        var element = document.createElement('div');
        element.className = 'dropDownMenuItem';
        element.tabIndex = 0;
        element.title = item.label;
        element.setAttribute('role', 'button');
        if (item.multiDocument && !isMultiDocumentLayout()) {
            element.setAttribute('aria-disabled', 'true');
        }
        element.innerHTML = '<div class="dropDownMenuItemContainer"><div class="center-flex-justify-left">'
            + '<div class="standardButton toppanelButton dropdownMenuItems"></div>'
            + '<div class="gwt-Label dropdownMenuItems"></div></div></div>';
        element.querySelector('.standardButton').classList.add(item.icon);
        element.querySelector('.gwt-Label').textContent = item.label;
        onActivate(element, function () {
            closePopup();
            runSafely(item.label, item.run);
        });
        return element;
    }

    function openMenu(button, items) {
        var rect = button.getBoundingClientRect();
        var popup = document.createElement('div');
        popup.className = 'uxoai-popup';
        popup.style.cssText = 'z-index: 5; position: absolute; overflow: visible; left: ' + rect.left + 'px; top: ' + (rect.bottom - 6) + 'px;';
        var list = document.createElement('div');
        list.className = 'toppanel-dropdown dropDownSubMenu';
        items.forEach(function (item) {
            list.appendChild(menuItemElement(item));
        });
        popup.appendChild(list);
        document.body.appendChild(popup);
        button.classList.add('uxoai-open');
        button.setAttribute('aria-expanded', 'true');
        openPopup = { button: button, popup: popup };
    }

    function buttonElement(id, title, icon) {
        var button = document.createElement('div');
        button.id = id;
        button.className = 'standardButton toppanelButton uxoai-toppanel-button';
        button.tabIndex = 0;
        button.title = title;
        button.setAttribute('role', 'button');
        if (icon) {
            button.classList.add(icon);
        } else {
            button.innerHTML = '<div class="html-face">' + ROBOT_ICON + '</div>';
        }
        return button;
    }

    // Middle section of the top panel: the one between the left and the right sections.
    function middleSection() {
        var left = document.querySelector('.toppanel .toppanelSection.left-section');
        var middle = left && left.nextElementSibling;
        return middle && middle.classList.contains('toppanelSection') ? middle : null;
    }

    function ensureTopPanelElements() {
        var section = middleSection();
        if (!section) {
            return;
        }
        topPanelElements.forEach(function (entry) {
            if (!document.getElementById(entry.id)) {
                section.appendChild(entry.create());
            }
        });
    }

    function addTopPanelElement(create) {
        var id = 'uxoai-toppanel-' + (++elementCount);
        topPanelElements.push({ id: id, create: function () {
            return create(id);
        } });
        ensureTopPanelElements();
    }

    // { title, icon (ARender icon class, robot when omitted), items: [promptItem(...), chatItem(...), { label, icon, run }] }
    function addMenu(menu) {
        addTopPanelElement(function (id) {
            var button = buttonElement(id, menu.title, menu.icon);
            button.classList.add('dropdown-MenuButton');
            button.setAttribute('aria-expanded', 'false');
            onActivate(button, function () {
                var wasOpen = openPopup && openPopup.button === button;
                closePopup();
                if (!wasOpen) {
                    openMenu(button, menu.items);
                }
            });
            return button;
        });
    }

    // { title, icon, run }
    function addButton(definition) {
        addTopPanelElement(function (id) {
            var button = buttonElement(id, definition.title, definition.icon);
            onActivate(button, function () {
                closePopup();
                runSafely(definition.title, definition.run);
            });
            return button;
        });
    }

    // --- Start ---------------------------------------------------------------------------------------------

    function loadConfiguredScripts() {
        return config.scripts.reduce(function (previous, id) {
            return previous.then(function () {
                return loadScript(adminScriptUrl(id)).then(function () {
                    uxoai.loadedScripts.push(id);
                }, function (e) {
                    console.warn('[uxoai] script "' + id + '" skipped (not published, or uxopian-ai unreachable)', e);
                });
            });
        }, Promise.resolve());
    }

    window.arenderjs_init = function (arenderjs) {
        if (chainedInit) {
            runSafely('chained arenderjs_init', chainedInit, arenderjs);
        }
        uxoai.arenderjs = arenderjs;

        document.addEventListener('click', function (event) {
            if (openPopup && !openPopup.popup.contains(event.target)) {
                closePopup();
            }
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closePopup();
            }
        });
        arenderjs.registerTopPanelRefreshedEvent(ensureTopPanelElements);
        arenderjs.registerCurrentDocumentChangeEvent(updateLayoutState);
        // The top panel may not exist yet, and GWT rebuilds it on some configuration changes.
        new MutationObserver(ensureTopPanelElements).observe(document.body, { childList: true, subtree: true });
        updateLayoutState();

        loadStyle(host + '/api/web-components/chat/style');
        loadScript(host + '/api/web-components/chat/script').catch(function (e) {
            console.error('[uxoai] chat web component not loaded', e);
        });
        loadConfiguredScripts().then(function () {
            readyCallbacks.splice(0).forEach(function (callback) {
                runSafely('onReady', callback, arenderjs);
            });
            console.info('[uxoai] scripts loaded: ' + uxoai.loadedScripts.join(', '));
        });
    };
})();
