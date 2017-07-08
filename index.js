'use strict';

var lasso = require('lasso');

var isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test';

function run(hasJqueryBundle, useBabelTransform) {
    var bundles;
    var transforms;

    if (hasJqueryBundle) {
        bundles = [
            {
                name: 'jquery',
                dependencies: [
                    'jquery/dist/jquery.min.js'
                ]
            }
        ];
    }

    if (useBabelTransform) {
        transforms = {
            transforms: [{
                transform: 'lasso-babel-transform',
                config: {
                    extensions: [
                        '.js'
                    ]
                }
            }]
        };
    }

    lasso.configure({
        require: transforms,
        plugins: [
            'lasso-marko',
            {
                plugin: 'lasso-less',
                config: {
                    lessConfig: {
                        strictMath: true,
                        strictUnits: true
                    }
                }
            },
            {
                plugin: 'lasso-clean-css',
                config: {
                    enabled: isProduction
                }
            },
            {
                plugin: 'lasso-autoprefixer',
                config: {
                    browsers: '> 1%'
                }
            }
        ],
        outputDir: 'static',
        fingerprintsEnabled: isProduction,
        minify: isProduction,
        resolveCssUrls: true,
        bundlingEnabled: isProduction,
        bundles: bundles
    });
}

module.exports = run;
