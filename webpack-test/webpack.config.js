var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js?[hash]-[chunkhash]",
    chunkFilename: "[name].js?[hash]-[chunkhash]",
    path: __dirname + "/assets",
    publicPath: "/assets/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      { test: /\.png$/, loader: "file-loader" }
    ]
  },
  devtool: "source-map",
  plugins: [
    new ExtractTextPlugin("styles.css"),
    // new webpack.optimize.CommonsChunkPlugin({ name: "c", filename: "c.js" })
    // new webpack.SplitChunksPlugin(),
  ]
};