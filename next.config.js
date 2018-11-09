const withSass = require('@zeit/next-sass');

module.exports = withSass({
    sassLoaderOptions: {
        includePaths: ['./node_modules']
    },
    webpack(config, options) {
        // Further custom configuration here
        return config;
    }
});

// const withCSS = require('@zeit/next-css');

// module.exports = withCSS();
