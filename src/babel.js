import {map} from 'lodash'
import {addBabelPlugin, addBabelPreset, addExternalBabelPlugin} from 'customize-cra'

export const addBabelPlugins = plugins => config => map(plugins, v => addBabelPlugin(v)(config))
export const addBabelPresets = presets => config => map(presets, v => addBabelPreset(v)(config))
export const addExternalBabelPlugins = plugins => config => map(plugins, v => addExternalBabelPlugin(v)(config))

export const addDefaultBabel = () => config => {
    addBabelPresets([
        '@emotion/babel-preset-css-prop'
    ])(config)

    addBabelPlugins([
        'babel-plugin-lodash',
        'date-fns',
        ['babel-plugin-styled-components']
    ])(config)

    addExternalBabelPlugin (['@babel/plugin-transform-react-jsx'])(config)
}
