/**
 * webpack product config
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.common');

function getExtractTextConfig(name) {
  const extractTextConfig = {
    filename: (getPath) => {
      return getPath(`css/[name].${name}.css`).replace('css/js', name);
    },
    allChunks: true
  };
  return extractTextConfig;
}

// 创建多个实例
const extractCSS = new ExtractTextPlugin(getExtractTextConfig('css'));
const extractLESS = new ExtractTextPlugin(getExtractTextConfig('less'));

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],
});