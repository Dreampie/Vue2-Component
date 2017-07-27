const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const properties = require("./application.json")


module.exports = require('./webpack.config.build.js');

module.exports.entry = {
    'common': ['jquery', 'vue', 'vue-router', 'vuex', 'vue-cookie', 'axios', '@dreampie/semantic-ui'],
    'js/main': './src/main.js',
}
module.exports.output.path = path.resolve(__dirname, './example');
module.exports.devServer = {
    historyApiFallback: true,
    noInfo: true,
    // contentBase: './dist',
    disableHostCheck: true
}

module.exports.devtool = '#eval-source-map'
module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({filename: 'js/common.js', name: 'common'}),
    new ExtractTextPlugin('css/common.css'),
    new HtmlWebpackPlugin({
        title: properties.title,
        filename: 'index.html',
        template: './src/index.html',
        inject: true,
        hash: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin([
        {from: './favicon.ico'},
        {from: './server.js'},
        {from: './application.json'},
    ]), new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"' + process.env.NODE_ENV + '"',
        }
    })
])
