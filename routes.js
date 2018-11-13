const routes = require('next-routes')();

routes.add('/app', 'app');
routes.add('/', 'index');
routes.add('/privacy-policy', 'PrivacyPolicy');
routes.add('/group', 'Group');
routes.add('/gallery', 'Gallery');
routes.add('/contact', 'Contact');
routes.add('/hand-designs', 'Hand');
routes.add('/recipient/:id', 'Recipient');

module.exports = routes;
