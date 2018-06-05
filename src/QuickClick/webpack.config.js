const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const distDir = path.resolve(__dirname, './wwwroot/dist/');

module.exports = {
    entry: { 'vue-app': ['./ClientApp/Main.ts'] },
    output: {
        path: distDir,
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.html'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'moment': 'moment/min/moment.min.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                }
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            { from: './node_modules/moment/min/moment.min.js', to: './libs/' },
            { from: './node_modules/bootstrap/dist/css/bootstrap.min.css', to: './libs/' }
        ])
    ]
};