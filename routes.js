const routes = require('next-routes')();

routes.add('/app', 'app');
routes.add('/', 'index')

module.exports = routes;
