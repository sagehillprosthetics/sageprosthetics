module.exports = {
    target: 'serverless',
    sassOptions: {
        includePaths: ['./node_modules'],
    },

    webpack(config, options) {
        // Further custom configuration here
        return {
            ...config,
            node: {
                fs: 'empty',
                child_process: 'empty',
            },
        };
    },
};