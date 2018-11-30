// Require valyrian and main app
require('valyrian.js');
let nodePlugin = require('valyrian.js/plugins/node');
v.use(nodePlugin);

// Require package json to obtain the version
let packageJson = require('./package.json');

console.log('Generating service worker...');
v.sw('./public/sw.js', {
    name: 'MonkeyTown.io',
    version: packageJson.version,
    urls: ['/']
})
    .then(() => {
        console.log('Generating service worker finished.');
        console.log('Generating app icons and manifest...');
        let favicons = {
            iconsPath: './public/icons/', // Path to the generated icons
            linksViewPath: './app/ui/pages', // Path to the generated links file

            // favicons options
            path: '/icons/', // Path for overriding default icons path. `string`
            appName: 'MonkeyTown.io', // Your application's name. `string`
            appDescription: 'Awesome hybrid 3d/2d Survival IO game', // Your application's description. `string`
            developerName: 'Christian César Robledo López (Masquerade Circus)', // Your (or your developer's) name. `string`
            developerURL: 'http://masquerade-circus.net',
            dir: 'auto',
            lang: 'en-US',
            background: '#4CAF50', // Background colour for flattened icons. `string`
            theme_color: '#5D4037',
            display: "standalone", // Android display: "browser" or "standalone". `string`
            orientation: "landscape", // Android orientation: "any" "portrait" or "landscape". `string`
            start_url: "/", // Android start application's URL. `string`
            version: packageJson.version, // Your application's version number. `number`
            logging: false, // Print logs to console? `boolean`
            icons: {
                android: true, // Create Android homescreen icon. `boolean`
                appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset: offsetInPercentage }`
                appleStartup: true, // Create Apple startup images. `boolean`
                coast: false, // Create Opera Coast icon with offset 25%. `boolean` or `{ offset: offsetInPercentage }`
                favicons: true, // Create regular favicons. `boolean`
                firefox: true, // Create Firefox OS icons. `boolean` or `{ offset: offsetInPercentage }`
                windows: true, // Create Windows 8 tile icons. `boolean`
                yandex: false // Create Yandex browser icon. `boolean`
            }
        };

        return v.icons('./public/imgs/icon.png', favicons);
    })
    .then(() => console.log('Generating app icons and manifest finished.'));
