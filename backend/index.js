let micro = require('micro');
let Router = require('micro-ex-router');
let Helper = require('./helpers');
let cors = require('cors');
let compression = require('compression');

// Create a new router
let router = Router();

// Add public routes
router
    .use((req, res) => new Promise(next => cors()(req, res, next)))
    .use((req, res) => new Promise(next => compression()(req, res, next)))
    .use(Helper.serveDir('./public'))
;


// Require valyrian and main app
let nodePlugin = require('valyrian.js/plugins/node');
let App = require('../public/js/index.min');
v.use(nodePlugin);
v.request.nodeUrl = 'http://localhost:3000';

// Add Valyrian routes
v.routes.get()
    .forEach(path => router.get(
        path,
        Helper.render(
            async (req) => '<!DOCTYPE html>' + await v.routes.go(App.Pages.Main, req.url),
            {
                'Cache-Control': 'public, max-age=2592000',
                'Expires': new Date(Date.now() + 604800000).toUTCString()
            }
        )
    ));

// Init micro server
micro(router).listen(3000, async () => {
    process.stdout.write('Micro listening on port 3000\n');
});


