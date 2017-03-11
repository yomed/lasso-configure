'use strict';

var isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test';

require('lasso').configure({
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
    bundlingEnabled: isProduction
});
