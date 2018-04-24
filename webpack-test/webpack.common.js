/**
 * webpack common
 */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function getExtractTextConfig(name) {
  const extractTextConfig = {
    filename: (getPath) => {
      if (name === 'less') {
        return getPath(`css/less.[name].[chunkhash].css`);
      }
      return getPath(`css/[name].[chunkhash].css`);
    },
    allChunks: true
  };
  return extractTextConfig;
}

// 创建多个实例
const extractCSS = new ExtractTextPlugin(getExtractTextConfig('css'));
const extractLESS = new ExtractTextPlugin(getExtractTextConfig('less'));

module.exports = {
  entry: {
    app: './src/index.js',
  },

  // target: 'web',

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, './dist'),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        // use: ['style-loader', 'css-loader'],
        use: extractCSS.extract(['css-loader'])
      },
      {
        test: /\.less$/i,
        include: path.resolve(__dirname, 'src'),
        use: extractLESS.extract(['css-loader', 'less-loader'])
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'production',
    }),
    extractCSS,
    extractLESS,
  ],
};