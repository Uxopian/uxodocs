module.exports = function pluginSearchWrapper(context, options) {
    const searchPluginModule = require('@easyops-cn/docusaurus-search-local');
    const searchPlugin = typeof searchPluginModule === 'function'
        ? searchPluginModule
        : searchPluginModule.default || searchPluginModule;

    const originalPluginInstance = searchPlugin(context, options);

    return {
        ...originalPluginInstance,
        name: 'docusaurus-plugin-search-wrapper',

        async postBuild(props) {
            if (originalPluginInstance.postBuild) {
                try {
                    await originalPluginInstance.postBuild(props);
                } catch (error) {
                    if (error.code === 'ENOENT' && error.path && error.path.includes('search-index.json')) {
                        console.warn(`[Search Plugin] Skipping missing version index: ${error.path}`);
                        return;
                    }
                    throw error;
                }
            }
        },
    };
};
