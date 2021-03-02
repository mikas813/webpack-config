const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const isDev = !isProd;

  const filename = (ext) => isProd ?
	  `[name].[contenthash].bundle.${ext}` :
	  `[name].bundle.${ext}`;

  const plugins = () => {
    const base = [
      new HtmlWebPackPlugin({
        template: './index.html',
      }),
      // new CopyWebpackPlugin({
      //   patterns: [
      //     {
      //       from: path.resolve(__dirname, 'src', 'favicon.ico'),
      //       to: path.resolve(__dirname, 'dist'),
      //     },
      //   ],
      // }),
      new MiniCssExtractPlugin({
        filename: filename('css'),
      }),
      new CleanWebpackPlugin(),
      new ESLintPlugin(),
    ];

    if (isDev) {
      base.push(new ESLintPlugin());
    }

    return base;
  };


  return {
    target: 'web',
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: ['@babel/polyfill', './index.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: filename('js'),
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'core': path.resolve(__dirname, 'core'),
      },
    },
    devServer: {
      port: '5000',
      open: true,
      hot: true,
    },
    plugins: plugins(),

    devtool: isDev ? 'source-map' : false,

    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            // Translate CSS to CommonJS
            'css-loader',
            // Translate SCSS to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
