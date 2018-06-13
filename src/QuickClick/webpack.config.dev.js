const merge = require('extendify')({ isDeep: true, arrays: 'concat' });
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require('webpack');

const baseConfig = require('./webpack.config');

const config = {
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: '[name].js'
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        })
    ]
};

module.exports = merge(baseConfig, config);