const lasso = require('lasso');

const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test';

function run(useBabelTransform, bundles) {
    let transforms;

    if (useBabelTransform) {
        transforms = {
            transforms: [{
                transform: 'lasso-babel-transform',
                config: {
                    extensions: ['.js']
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
            'lasso-autoprefixer'
        ],
        outputDir: 'static',
        fingerprintsEnabled: isProduction,
        minify: isProduction,
        bundlingEnabled: isProduction,
        bundles,
        bundleReadTimeout: 20000,
        resolveCssUrls: true
    });
}

function createJqueryBundle() {
    return {
        name: 'jquery',
        dependencies: [
            'jquery/dist/jquery.min.js'
        ]
    };
}

module.exports = run;
module.exports.createJqueryBundle = createJqueryBundle;
