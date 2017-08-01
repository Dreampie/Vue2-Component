const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        'index': './src/component/index.js',
        'store/index': './src/store/index.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        library: "[name]",
        libraryTarget: "umd",
    },
    externals: {
        'vue': 'Vue',
        'vuex': 'Vuex'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'stylus': 'css-loader!stylus-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '/image/[name].[ext]'
                }
            },
            {
                test: /\.(eot|woff2?|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: '/font/[name].[ext]'
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                options: {
                    name: '/[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        }
    },
    devtool: '#source-map'
}
