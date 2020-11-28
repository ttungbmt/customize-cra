/*
* https://github.com/osdevisnot/react-app-rewire-contrib/blob/master/packages/react-app-rewire-emotion/index.js
* https://github.com/withspectrum/react-app-rewire-styled-components
* https://github.com/stk-dmitry/react-app-rewire-date-fns
* https://github.com/lwd-technology/react-app-rewire-provide-plugin
* https://github.com/byzyk/react-app-rewire-webpack-bundle-analyzer
* https://github.com/hsz/react-app-rewire-yaml
* https://github.com/osdevisnot/react-app-rewire-contrib/tree/master/packages/react-app-rewire-react-library
* https://github.com/andriijas/react-app-rewire-vendor-splitting
* https://github.com/cdharris/react-app-rewire-hot-loader
* https://github.com/oklas/react-app-rewire-alias
* */


/*
* https://github.com/webpack/webpack/tree/master/examples
* https://github.com/1337programming/webpack-shell-plugin
* https://github.com/webpack-contrib/npm-install-webpack-plugin
* https://github.com/survivejs/webpack-merge
*/

import {addBabelPlugin, addBabelPreset, addBundleVisualizer, addExternalBabelPlugin} from 'customize-cra'
import {addDefaultBabel} from './babel';
import {addReactRefresh} from 'customize-cra-react-refresh'
import {addProgressBar, disableMinify} from './webpack'

export const rewireBuildBase = (options) = (config, env) => {
    addDefaultBabel()(config)

    addProgressBar()(config)

    if(env === 'development') addReactRefresh()(config)
    if(env === 'production') {
        addBundleVisualizer()(config)
        disableMinify({
            minifyHTML: false,
        })(config)
    }
}

export * from './babel'
export * from './webpack'

export {
    addReactRefresh
}

export {alias} from 'react-app-rewire-alias'

export {
    addBabelPlugin,
    addBabelPreset,
    addBundleVisualizer,
    addDecoratorsLegacy,
    addExternalBabelPlugin,
    addLessLoader,
    addPostcssPlugins,
    addTslintLoader,
    addWebpackAlias,
    addWebpackExternals,
    addWebpackModuleRule,
    addWebpackPlugin,
    addWebpackResolve,
    adjustStyleLoaders,
    adjustWorkbox,
    babelExclude,
    babelInclude,
    disableChunk,
    disableEsLint,
    enableEslintTypescript,
    fixBabelImports,
    getBabelLoader,
    override,
    overrideDevServer,
    removeInternalBabelPlugin,
    removeModuleScopePlugin,
    setWebpackOptimizationSplitChunks,
    setWebpackPublicPath,
    setWebpackStats,
    setWebpackTarget,
    tap,
    useBabelRc,
    useEslintRc,
    watchAll,
} from 'customize-cra'



