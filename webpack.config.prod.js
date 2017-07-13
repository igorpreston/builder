const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const srcPath = resolve(__dirname, 'src');
const distPath = resolve(__dirname, 'dist');

module.exports = {
  entry: {
    app: resolve(srcPath, 'index.js'),
    vendor: [
      'classnames',
      'cuid',
      'immutable',
      'material-design-icons',
      'react',
      'react-custom-scrollbars',
      'react-dom',
      'react-event-listener',
      'react-redux',
      'redux',
      'redux-immutable',
      'redux-saga',
      'reselect',
      'webfontloader',
    ],
  },

  output: {
    filename: '[name].bundle.js',
    path: distPath,
    publicPath: '/',
  },

  context: srcPath,

  devtool: 'cheap-module-source-map',

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
        exclude: /node_modules/,
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
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        }),
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
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest',
      inlineManifest: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new HtmlWebpackPlugin({
      template: resolve(srcPath, 'index.html'),
      chunksSortMode: 'dependency',
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  ],
};
