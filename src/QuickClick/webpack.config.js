const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

//const vendorConfig = require("./webpack.vendor.config");
//const vendors = vendorConfig.entry.vendor;

const distDir = path.resolve(__dirname, './wwwroot/dist/');

module.exports = {
    entry: {
        'app': [
            './ClientApp/Main.ts'
        ]
    },
    output: {
        path: distDir,
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.ts', '.js', '.html'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    externals: {
        //'vue': 'vue',
        'moment': 'moment',
        'numeral': 'numeral'
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
        new VueLoaderPlugin()
    ]
};