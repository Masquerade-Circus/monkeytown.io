let rollup = require('rollup');
let commonjs = require('rollup-plugin-commonjs');
let nodeResolve = require('rollup-plugin-node-resolve');
let includepaths = require('rollup-plugin-includepaths');
let filesize = require('rollup-plugin-filesize');
let progress = require('rollup-plugin-progress');
let {uglify} = require('rollup-plugin-uglify');
let buble = require('rollup-plugin-buble');
let string = require('rollup-plugin-string');
let json = require('rollup-plugin-json');
let async = require('rollup-plugin-async');
let butternut = require('rollup-plugin-butternut');

console.log(uglify);

let uglifyOptions = {
    mangle: true,
    compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true
    },
    output: {
        comments: false
    }
};

let inputOptions = {
    input: './app/ui/index.js',
    plugins: [
        progress({ clearLine: false }),
        includepaths({ paths: ['./app', './node_modules'] }),
        nodeResolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        string({include: '**/*.svg'}),
        commonjs({
            include: [
                './node_modules/**',
                './app/server/**',
                './app/entities/**',
                './app/shared/**'
            ],
            sourceMap: true
        }),
        json(),
        async(),
        buble({
            jsx: 'v',
            transforms: {
                generator: false
            }
        })
    ],
    cache: undefined
};

let outputOptions = {
    file: './public/js/index.min.js',
    format: 'umd',
    sourcemap: true,
    name: 'App'
};

if (process.env.NODE_ENV === 'production') {
    outputOptions.sourcemap = false;
    // inputOptions.plugins.push(uglify(uglifyOptions));
    inputOptions.plugins.push(butternut({check: true, sourcemap: false}));
    inputOptions.plugins.push(filesize());
    rollup.rollup(inputOptions)
        .then(bundle => bundle.write(outputOptions))
        .then(() => console.log('Bundle finished.'));
}

if (process.env.NODE_ENV !== 'production') {
    inputOptions.plugins.push(filesize());

    inputOptions.output = outputOptions;
    inputOptions.watch = {
        include: [
            './app/ui/**',
            './app/client/**',
            './app/entities/**',
            './app/shared/**'
        ],
        chokidar: false
    };

    const watch = rollup.watch(inputOptions);
    const stderr = console.error.bind(console);

    watch.on('event', (event) => {
        switch (event.code) {
            case 'START':
                stderr('checking rollup-watch version...');
                break;
            case 'BUNDLE_START':
                stderr(`bundling ${outputOptions.file}...`);
                break;
            case 'BUNDLE_END':
                stderr(`${outputOptions.file} bundled in ${event.duration}ms.`);
                break;
            case 'ERROR':
                stderr(`error: ${event.error}`);
                break;
            case 'FATAL':
                stderr(`error: ${event.error}`);
                break;
            case 'END':
                stderr(`Watching for changes...`);
                break;
            default:
                stderr(`unknown event: ${event}`);
        }
    });
}
