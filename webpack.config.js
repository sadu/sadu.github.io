/**
 * Created by Hari on 07-12-2016.
 */
var path = require('path');

var webpack = require('webpack');

var dir_js = path.resolve(__dirname, 'src');
var dir_build = path.resolve(__dirname, 'compiled');

module.exports = {
    entry: path.resolve(dir_js, 'core.es6'),
    output: {
        path: dir_build,
        filename: 'coin.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: dir_js
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};