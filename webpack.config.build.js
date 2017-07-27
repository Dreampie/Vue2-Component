const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        'component/alert': './src/component/alert.js',
        'component/loading': './src/component/loading.js',
        'component/page': './src/component/page.js',
        'component/back-top': './src/component/back-top.js',
        'component/top-menu': './src/component/top-menu.js',
        'store/session': './src/store/session.js',
        'store/menu': './src/store/menu.js',
        'bus': './src/bus.js',
        'calendar': './src/calendar.js',
        'cookie': './src/cookie.js',
        'filter': './src/filter.js',
        'http': './src/http.js',
        'util': './src/util.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        // publicPath: '/dist/',
        filename: '[name].js'
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
    devtool: '#eval-source-map'
}
