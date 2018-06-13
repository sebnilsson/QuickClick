const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const distDir = path.resolve(__dirname, './wwwroot/dist/');

module.exports = {
    entry: {
        'vendor': [
            'vue',
            'vue-property-decorator',
            'moment',
            'numeral'
        ]
    },
    output: {
        filename: '[name].js',
        path: distDir,
        publicPath: '/dist/'
    },
    //resolve: {
    //    extensions: ['.ts', '.js', '.html'],
    //    alias: {
    //        'vue$': 'vue/dist/vue.esm.js'
    //    }
    //},
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'async'
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './node_modules/moment/min/moment.min.js', to: './libs/js/' },
            { from: './node_modules/numeral/min/numeral.min.js', to: './libs/js/' },
            { from: './node_modules/bootstrap/dist/css/bootstrap.min.css', to: './libs/css/' },
            { from: './node_modules/tabler-ui/dist/assets/css/dashboard.css', to: './libs/css/' }
        ])
    ]
};