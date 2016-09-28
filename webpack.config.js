'use strict';
let webpack = require('webpack');
let path = require('path');

let WebpackConfig = {
    // entry: './src/index',
    // output: {
    //     filename: './dist/vue.js'
    // },
    /**
     * datastructure
     */
    // entry: './datastructure/list/list.js',
    // output: { filename: './datastructure/dist/datastructure.js' },
    /**
     * jquery
     */
    entry: './jquery/src/core.js',
    output: { filename: './jquery/dist/jquery3.1.0.js' },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.css', '.html', '.less', '.jsx']
    }
};

module.exports = WebpackConfig;