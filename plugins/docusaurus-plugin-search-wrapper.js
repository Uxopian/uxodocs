module.exports = function pluginSearchWrapper(context, options) {
    const searchPlugin = require('@easyops-cn/docusaurus-search-local');

    return {
        ...searchPlugin(context, options),
        name: 'docusaurus-plugin-search-wrapper',

        async postBuild(props) {
            const originalPlugin = searchPlugin(context, options);

            if (originalPlugin.postBuild) {
                try {
                    await originalPlugin.postBuild(props);
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
