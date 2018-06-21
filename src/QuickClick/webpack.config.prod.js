const merge = require('extendify')({ isDeep: true, arrays: 'concat' });
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const baseConfig = require("./webpack.config");

const distDir = path.resolve(__dirname, './wwwroot/dist/');

const config = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: distDir,
        filename: '[name].js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        }),
        new webpack.LoaderOptionsPlugin({
          minimize: true
        })
    ]
};

module.exports = merge(baseConfig, config);