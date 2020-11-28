export const addProgressBar = (options = {}) => config => {
    const ProgressBarPlugin = require('progress-bar-webpack-plugin');

    config.plugins.push(new ProgressBarPlugin(options));

    return config;
};

export const addDuplicatePackageChecker = (options = {}) => config => {
    const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

    config.plugins.push(new DuplicatePackageCheckerPlugin(options));

    return config;
};

export const addBuildNotifier = (options = {
    title: "Your Project",
    suppressSuccess: true,
}) => config => {
    const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

    config.plugins = (config.plugins || []).concat([new WebpackBuildNotifierPlugin(options)])

    return config;
};

export const disableMinify = (options = {}) => config => {
    const {minifyJS = true, minifyCSS = true, minifyHTML = true} = options

    if(!minifyCSS) {
        config.optimization.minimizer = config.optimization.minimizer.filter(
            p => p.constructor.name !== "OptimizeCssAssetsWebpackPlugin"
        )
    }

    if(!minifyJS) {
        config.optimization.minimizer = config.optimization.minimizer.filter(
            p => p.constructor.name !== "TerserPlugin"
        )
    }


    if(!minifyHTML) {
        config.plugins.map((p, k) => {
            if(p.constructor.name === 'HtmlWebpackPlugin'){
                config.plugins[k].options.minify = minifyHTML
            }
        })
    }

    return config
}

export const disableFileHashes = () => config => {
    const walk = obj => {
        const paths = {
            object: k => walk(obj[k]),
            string: k => {
                obj[k] = obj[k].replace(/\[\w*?hash:\d+\]\./, '');
            },
        };
        if (obj != null) {
            Object.keys(obj)
                .filter(k => paths[typeof obj[k]])
                .forEach(k => paths[typeof obj[k]](k));
        }
    };

    walk(config)

    return config
}
