const withSass = require('@zeit/next-sass');

module.exports = withSass({
    target: 'serverless',
    sassLoaderOptions: {
        includePaths: ['./node_modules']
    },
    webpack(config, options) {
        // Further custom configuration here
        return {
            ...config,
            node: {
                fs: 'empty',
                child_process: 'empty'
            }
        };
    }
});
