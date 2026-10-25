// Constants of the ARender integration (Scripts > arender-config). Values only: no logic here.
// Read by arender-core, which ARender runs as its startup script.
window.uxoaiConfig = {
    // uxopian-ai as seen by the browser: absolute, or relative to ARender when both share an origin.
    // Serves the scripts and the chat.
    host: 'http://localhost:8085/uxopian-ai',

    // Startup script ARender had before arender-core, relative to ARender ('' when there is none).
    // FlowerDocs: 'scripts/menus.js'.
    chainedStartupScript: '',

    // Scripts loaded once ARender is ready, in this order.
    scripts: ['arender-buttons'],

    // true: load the drafts (/draft) instead of the published versions, to try a change before publishing.
    useDrafts: false,

    // Look of what arender-core adds to the top panel.
    accentColor: '#6d28d9'
};
