var customizeCra = require('customize-cra');
var lodash = require('lodash');
var customizeCraReactRefresh = require('customize-cra-react-refresh');
var reactAppRewireAlias = require('react-app-rewire-alias');

var addBabelPlugins = function addBabelPlugins(plugins) {
  return function (config) {
    return lodash.map(plugins, function (v) {
      return customizeCra.addBabelPlugin(v)(config);
    });
  };
};
var addBabelPresets = function addBabelPresets(presets) {
  return function (config) {
    return lodash.map(presets, function (v) {
      return customizeCra.addBabelPreset(v)(config);
    });
  };
};
var addExternalBabelPlugins = function addExternalBabelPlugins(plugins) {
  return function (config) {
    return lodash.map(plugins, function (v) {
      return customizeCra.addExternalBabelPlugin(v)(config);
    });
  };
};
var addDefaultBabel = function addDefaultBabel() {
  return function (config) {
    addBabelPresets(['@emotion/babel-preset-css-prop'])(config);
    addBabelPlugins(['date-fns', ['babel-plugin-styled-components']])(config);
    customizeCra.addExternalBabelPlugin(['@babel/plugin-transform-react-jsx'])(config);
  };
};

var addProgressBar = function addProgressBar(options) {
  if (options === void 0) {
    options = {};
  }

  return function (config) {
    var ProgressBarPlugin = require('progress-bar-webpack-plugin');

    config.plugins.push(new ProgressBarPlugin(options));
    return config;
  };
};
var addDuplicatePackageChecker = function addDuplicatePackageChecker(options) {
  if (options === void 0) {
    options = {};
  }

  return function (config) {
    var DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

    config.plugins.push(new DuplicatePackageCheckerPlugin(options));
    return config;
  };
};
var addBuildNotifier = function addBuildNotifier(options) {
  if (options === void 0) {
    options = {
      title: "Your Project",
      suppressSuccess: true
    };
  }

  return function (config) {
    var WebpackBuildNotifierPlugin = require('webpack-build-notifier');

    config.plugins = (config.plugins || []).concat([new WebpackBuildNotifierPlugin(options)]);
    return config;
  };
};
var disableMinify = function disableMinify(options) {
  if (options === void 0) {
    options = {};
  }

  return function (config) {
    var _options = options,
        _options$minifyJS = _options.minifyJS,
        minifyJS = _options$minifyJS === void 0 ? true : _options$minifyJS,
        _options$minifyCSS = _options.minifyCSS,
        minifyCSS = _options$minifyCSS === void 0 ? true : _options$minifyCSS,
        _options$minifyHTML = _options.minifyHTML,
        minifyHTML = _options$minifyHTML === void 0 ? true : _options$minifyHTML;

    if (!minifyCSS) {
      config.optimization.minimizer = config.optimization.minimizer.filter(function (p) {
        return p.constructor.name !== "OptimizeCssAssetsWebpackPlugin";
      });
    }

    if (!minifyJS) {
      config.optimization.minimizer = config.optimization.minimizer.filter(function (p) {
        return p.constructor.name !== "TerserPlugin";
      });
    }

    if (!minifyHTML) {
      config.plugins.map(function (p, k) {
        if (p.constructor.name === 'HtmlWebpackPlugin') {
          config.plugins[k].options.minify = minifyHTML;
        }
      });
    }

    return config;
  };
};
var disableFileHashes = function disableFileHashes() {
  return function (config) {
    var walk = function walk(obj) {
      var paths = {
        object: function object(k) {
          return walk(obj[k]);
        },
        string: function string(k) {
          obj[k] = obj[k].replace(/\[\w*?hash:\d+\]\./, '');
        }
      };

      if (obj != null) {
        Object.keys(obj).filter(function (k) {
          return paths[typeof obj[k]];
        }).forEach(function (k) {
          return paths[typeof obj[k]](k);
        });
      }
    };

    walk(config);
    return config;
  };
};

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
var rewireBuildBase = options = function options(config, env) {
  addDefaultBabel()(config);
  addProgressBar()(config);
  if (env === 'development') customizeCraReactRefresh.addReactRefresh()(config);

  if (env === 'production') {
    customizeCra.addBundleVisualizer()(config);
    disableMinify({
      minifyHTML: false
    })(config);
  }
};

Object.defineProperty(exports, 'addBabelPlugin', {
    enumerable: true,
    get: function () {
        return customizeCra.addBabelPlugin;
    }
});
Object.defineProperty(exports, 'addBabelPreset', {
    enumerable: true,
    get: function () {
        return customizeCra.addBabelPreset;
    }
});
Object.defineProperty(exports, 'addBundleVisualizer', {
    enumerable: true,
    get: function () {
        return customizeCra.addBundleVisualizer;
    }
});
Object.defineProperty(exports, 'addDecoratorsLegacy', {
    enumerable: true,
    get: function () {
        return customizeCra.addDecoratorsLegacy;
    }
});
Object.defineProperty(exports, 'addExternalBabelPlugin', {
    enumerable: true,
    get: function () {
        return customizeCra.addExternalBabelPlugin;
    }
});
Object.defineProperty(exports, 'addLessLoader', {
    enumerable: true,
    get: function () {
        return customizeCra.addLessLoader;
    }
});
Object.defineProperty(exports, 'addPostcssPlugins', {
    enumerable: true,
    get: function () {
        return customizeCra.addPostcssPlugins;
    }
});
Object.defineProperty(exports, 'addTslintLoader', {
    enumerable: true,
    get: function () {
        return customizeCra.addTslintLoader;
    }
});
Object.defineProperty(exports, 'addWebpackAlias', {
    enumerable: true,
    get: function () {
        return customizeCra.addWebpackAlias;
    }
});
Object.defineProperty(exports, 'addWebpackExternals', {
    enumerable: true,
    get: function () {
        return customizeCra.addWebpackExternals;
    }
});
Object.defineProperty(exports, 'addWebpackModuleRule', {
    enumerable: true,
    get: function () {
        return customizeCra.addWebpackModuleRule;
    }
});
Object.defineProperty(exports, 'addWebpackPlugin', {
    enumerable: true,
    get: function () {
        return customizeCra.addWebpackPlugin;
    }
});
Object.defineProperty(exports, 'addWebpackResolve', {
    enumerable: true,
    get: function () {
        return customizeCra.addWebpackResolve;
    }
});
Object.defineProperty(exports, 'adjustStyleLoaders', {
    enumerable: true,
    get: function () {
        return customizeCra.adjustStyleLoaders;
    }
});
Object.defineProperty(exports, 'adjustWorkbox', {
    enumerable: true,
    get: function () {
        return customizeCra.adjustWorkbox;
    }
});
Object.defineProperty(exports, 'babelExclude', {
    enumerable: true,
    get: function () {
        return customizeCra.babelExclude;
    }
});
Object.defineProperty(exports, 'babelInclude', {
    enumerable: true,
    get: function () {
        return customizeCra.babelInclude;
    }
});
Object.defineProperty(exports, 'disableChunk', {
    enumerable: true,
    get: function () {
        return customizeCra.disableChunk;
    }
});
Object.defineProperty(exports, 'disableEsLint', {
    enumerable: true,
    get: function () {
        return customizeCra.disableEsLint;
    }
});
Object.defineProperty(exports, 'enableEslintTypescript', {
    enumerable: true,
    get: function () {
        return customizeCra.enableEslintTypescript;
    }
});
Object.defineProperty(exports, 'fixBabelImports', {
    enumerable: true,
    get: function () {
        return customizeCra.fixBabelImports;
    }
});
Object.defineProperty(exports, 'getBabelLoader', {
    enumerable: true,
    get: function () {
        return customizeCra.getBabelLoader;
    }
});
Object.defineProperty(exports, 'override', {
    enumerable: true,
    get: function () {
        return customizeCra.override;
    }
});
Object.defineProperty(exports, 'overrideDevServer', {
    enumerable: true,
    get: function () {
        return customizeCra.overrideDevServer;
    }
});
Object.defineProperty(exports, 'removeInternalBabelPlugin', {
    enumerable: true,
    get: function () {
        return customizeCra.removeInternalBabelPlugin;
    }
});
Object.defineProperty(exports, 'removeModuleScopePlugin', {
    enumerable: true,
    get: function () {
        return customizeCra.removeModuleScopePlugin;
    }
});
Object.defineProperty(exports, 'setWebpackOptimizationSplitChunks', {
    enumerable: true,
    get: function () {
        return customizeCra.setWebpackOptimizationSplitChunks;
    }
});
Object.defineProperty(exports, 'setWebpackPublicPath', {
    enumerable: true,
    get: function () {
        return customizeCra.setWebpackPublicPath;
    }
});
Object.defineProperty(exports, 'setWebpackStats', {
    enumerable: true,
    get: function () {
        return customizeCra.setWebpackStats;
    }
});
Object.defineProperty(exports, 'setWebpackTarget', {
    enumerable: true,
    get: function () {
        return customizeCra.setWebpackTarget;
    }
});
Object.defineProperty(exports, 'tap', {
    enumerable: true,
    get: function () {
        return customizeCra.tap;
    }
});
Object.defineProperty(exports, 'useBabelRc', {
    enumerable: true,
    get: function () {
        return customizeCra.useBabelRc;
    }
});
Object.defineProperty(exports, 'useEslintRc', {
    enumerable: true,
    get: function () {
        return customizeCra.useEslintRc;
    }
});
Object.defineProperty(exports, 'watchAll', {
    enumerable: true,
    get: function () {
        return customizeCra.watchAll;
    }
});
Object.defineProperty(exports, 'addReactRefresh', {
    enumerable: true,
    get: function () {
        return customizeCraReactRefresh.addReactRefresh;
    }
});
Object.defineProperty(exports, 'alias', {
    enumerable: true,
    get: function () {
        return reactAppRewireAlias.alias;
    }
});
exports.addBabelPlugins = addBabelPlugins;
exports.addBabelPresets = addBabelPresets;
exports.addBuildNotifier = addBuildNotifier;
exports.addDefaultBabel = addDefaultBabel;
exports.addDuplicatePackageChecker = addDuplicatePackageChecker;
exports.addExternalBabelPlugins = addExternalBabelPlugins;
exports.addProgressBar = addProgressBar;
exports.disableFileHashes = disableFileHashes;
exports.disableMinify = disableMinify;
exports.rewireBuildBase = rewireBuildBase;
//# sourceMappingURL=index.js.map
