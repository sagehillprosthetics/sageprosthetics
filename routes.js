const routes = require('next-routes')();

routes.add('/app', 'app');
routes.add('/', 'index');
routes.add('/privacy-policy', 'PrivacyPolicy');
routes.add('/group', 'Group');

module.exports = routes;
