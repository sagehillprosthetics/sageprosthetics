const admin = require('firebase-admin');

const serviceAccount = require('./firebasekeys.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sage-prosthetics.firebaseio.com' //https://docs-examples.firebaseio.com'
});

//Make this available to components without them having to import this
// (which can't work in the browser due to missing node libs)
global.serverFirebase = admin;
