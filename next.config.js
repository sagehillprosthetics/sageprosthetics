// const { PHASE_PRODUCTION_SERVER } =
//     process.env.NODE_ENV === 'development'
//         ? {}
//         : !process.env.NOW_REGION
//         ? require('next/constants')
//         : require('next-server/constants');

// module.exports = (phase, { defaultConfig }) => {
//     if (phase === PHASE_PRODUCTION_SERVER) {
//         // Config used to run in production.
//         return {};
//     }

//     const withSass = require('@zeit/next-sass');

//     return withSass({
//         sassLoaderOptions: {
//             includePaths: ['./node_modules']
//         }
//     });
// };

const withSass = require('@zeit/next-sass');

module.exports = withSass({
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

// const withCSS = require('@zeit/next-css');

// module.exports = withCSS();
