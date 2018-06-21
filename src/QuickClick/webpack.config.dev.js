const merge = require('extendify')({ isDeep: true, arrays: 'concat' });
const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./webpack.config');

const devDir = path.resolve(__dirname, './wwwroot/dev/');

const config = {
    mode: 'development',
    output: {
        path: devDir,
        filename: '[name].js',
        publicPath: '/dev/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = merge(baseConfig, config);