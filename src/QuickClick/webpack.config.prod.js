const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require("extendify")({ isDeep: true, arrays: "concat" });
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require('webpack');

const baseConfig = require("./webpack.config");

const config = {
    mode: "production",
    output: {
        filename: "[name]-bundle.js"
    },
    plugins: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("production")
        }),
        new CopyWebpackPlugin([
            { from: './node_modules/moment/min/moment.min.js', to: './libs/js/' },
            { from: './node_modules/numeral/min/numeral.min.js', to: './libs/js/' },
            { from: './node_modules/bootstrap/dist/css/bootstrap.min.css', to: './libs/css/' },
            { from: './node_modules/tabler-ui/dist/assets/css/dashboard.css', to: './libs/css/' }
        ])
    ]
};

module.exports = merge(baseConfig, config);