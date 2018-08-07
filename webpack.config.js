const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  resolve: {
    extensions: [
      ".js"
    ],
    modules: [
      // path.resolve(__dirname, "src/js"),
      "node_modules"
    ],
    alias: {
      jquery: path.resolve(__dirname, 'src/js/jquery.min.js'),
    }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(s?)css$/,
        include: [
          path.resolve(__dirname, 'src/scss'),
          path.resolve(__dirname, 'src/fonts'),
        ],
        use: [ 
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              plugins: () => [
                autoprefixer
              ]
            },
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|gif)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true, // webpack@2.x and newer
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
            },
          }
        ],
      },
      {
        test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'CS+Social Good',
      template: 'src/index.html',
      favicon: 'src/favicon.ico',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
      Button: 'exports-loader?Button!bootstrap/js/dist/button',
      Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
      Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: 'exports-loader?Util!bootstrap/js/dist/util'
    }),
    // new ExtractTextPlugin("style.css")
  ]
};