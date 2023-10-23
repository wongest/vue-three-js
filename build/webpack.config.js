const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const DeleteBuildFile = require('./plugins/deleteBuildFile')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { babelLoaderConf } = require('./utils.js')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: {
    // 配置入口文件
    main: ["@babel/polyfill", path.resolve(__dirname, '../src/main.js')],
  },
  output: {
    // 配置打包输出目录
    path: path.resolve(__dirname, '../dist'),
    // 生成的js 文件名称
    filename: 'js/[name].[hash:8].js',
    // 生成的chunk 文件名称
    chunkFilename: 'js/[name].[hash:8].js',
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  devServer: {
    static: './dist',
    port: 9000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(ts|js)x?$/,
        use: [babelLoaderConf],
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    // new DeleteBuildFile(),
    new CleanWebpackPlugin(), // 每次打包的时候，都会把 dist 目录清空，和自定义的DeleteBuildFile作用差不多
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html', // 打包后输出的文件名
      title: 'three.js demo'  // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量
    }),
    new VueLoaderPlugin(),
    // new ProgressBarPlugin({
    //   format: '[:percent] [:bar]',
    //   clear: true,
    //   total: 1000,
    // }),
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 9999,
    // }),
  ]
}