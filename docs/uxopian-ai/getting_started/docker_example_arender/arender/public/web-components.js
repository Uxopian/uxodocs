const UXOPIAN_AI_HOST = 'http://localhost:8085/uxopian-ai';

const COMPARISON_BUTTON_IDS = ['detailedComparisonButton', 'genericComparisonButton'];

function onCurrentDocumentChange(id, metadata) {
    updateTopPanel(metadata);
}

function updateTopPanel(metadata) {
    getARenderJS().getDocumentLayout().getDocumentLayout(
        getARenderJS().getMasterDocumentId(),
        function (layout) {
            COMPARISON_BUTTON_IDS.forEach(function (buttonId) {
                getARenderJS().changeConfigurableElement(buttonId, layout.isDocumentContainer());
            });
        }
    );
}

function loadAssets(jsUrl, cssUrl) {
    if (!document.querySelector('link[href="' + cssUrl + '"]')) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssUrl;
        document.head.appendChild(link);
    }
    var existing = document.querySelector('script[src="' + jsUrl + '"]');
    if (existing) return Promise.resolve();
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = jsUrl;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function arenderjs_init(arenderjs_) {
    arenderjs_.registerCurrentDocumentChangeEvent(function (id, title, metadata) {
        onCurrentDocumentChange(id, metadata);
    });

    loadAssets(
        UXOPIAN_AI_HOST + '/api/web-components/chat/script',
        UXOPIAN_AI_HOST + '/api/web-components/chat/style'
    );
}
