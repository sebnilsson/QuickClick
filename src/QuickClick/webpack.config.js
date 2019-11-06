const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'vendor': './ClientApp/Vendor.ts',
        'app': './ClientApp/Main.ts'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [path.resolve(__dirname , 'ClientApp'), 'node_modules']
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
                //options: {
                //    loaders: {
                //        'scss': 'vue-style-loader!css-loader!sass-loader',
                //        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                //    }
                //}
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
              test: /\.(svg|png|jpg|gif)$/,
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: './images/'
              }
            },
            {
              test: /\.(eot|ttf|woff|woff2)$/,
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: './fonts/'
              }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin([
            { from: './node_modules/bootstrap/dist/css/bootstrap.min.css', to: './libs/css/' },
            { from: './node_modules/tabler-ui/dist/assets/css/dashboard.css', to: './libs/css/' }
        ])
    ]
};