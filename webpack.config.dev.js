const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = resolve(__dirname, 'src');
const distPath = resolve(__dirname, 'dist');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    resolve(srcPath, 'index.js'),
  ],

  output: {
    filename: '[name].bundle.js',
    path: distPath,
    publicPath: '/',
  },

  context: srcPath,

  devtool: 'inline-source-map',

  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: distPath,
    publicPath: '/',
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  },

  module: {
    rules: [
      {
        test: require.resolve(srcPath, 'app', 'index.js'),
        use: {
          loader: 'expose-loader',
          options: 'Canvas'
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules(?!\/quill)/,
        use: 'babel-loader',
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader',
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, 
        use: 'url-loader?limit=100000',
      },
      {
        test: /\\.(ttf|woff2|woff|eot|svg)$/,
        use: 'file-loader',
      },
      {
        test: /\.(css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: 'nb-[local]',
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [
      srcPath,
      resolve(__dirname, 'node_modules'),
    ],
    alias: {
      'ui-kit': resolve(srcPath, 'components', 'UIKit'),
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new HtmlWebpackPlugin({
      template: resolve(srcPath, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
