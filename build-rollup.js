const path = require('path');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const { rollup } = require('rollup');
const { terser } = require('rollup-plugin-terser');
const filesize = require('rollup-plugin-filesize');

function build(format, filename, { min = false } = {}) {
    const plugins = [
        babel({
            runtimeHelpers: true,
        }),
        resolve({
            mainFields: ['module', 'main'],
        }),
        commonjs(),
    ];

    if (min) {
        plugins.push(
            terser()
        );
    }
    plugins.push(filesize());

    return rollup({
        input: 'src/index.js',
        external: ['preact', 'mobx'],
        plugins: plugins,
    }).then(bundle => {
        const options = {
            file: path.resolve(process.cwd(), 'lib', filename),
            format,
            name: 'mobxPreact',
            exports: 'named',
            globals: {
                preact: 'preact',
                mobx: 'mobx',
            },
        };
        return bundle.write(options);
    }).catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
        process.exit(1);
    });
}

Promise.all([
    build('umd', 'index.js'),
    build('umd', 'index.min.js', { min: true }),
    build('es', 'index.module.js'),
]);