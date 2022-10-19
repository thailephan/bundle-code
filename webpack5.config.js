const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
      index: './app/index.js',
      print: './app/lib/print.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Development',
      }),
    ],
    // Out sourcemap for easier to debug by devtools in production code mode
    devtool: "inline-source-map",
    devServer: {
      static: './dist',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      // Cleanup folder before write in new one
      clean: true,
    },
    optimization: {
      runtimeChunk: 'single',
    },
};
