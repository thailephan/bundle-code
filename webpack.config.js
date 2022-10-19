 const path = require('path');

//  module.exports = {
//      mode: "development",
//      entry: {
//          index: {
//              import: "./app/index.js",
//              dependOn: "shared",
//          },
//          another: {
//              import: "./app/another-module.js",
//              dependOn: "shared",
//          },
//          shared: "lodash",
//      },
//      output: {
//          filename: "[name].bundle.js",
//          path: path.resolve(__dirname, "dist"),
//      },
//      // optimization: {
//      //   runtimeChunk: 'single',
//      // },
//      optimization: {
//          splitChunks: {
//              chunks: "all",
//          },
//      },
//  };
 module.exports = {
     mode: "development",
     entry: {
         index: "./app/index.js",
         another: "./app/another-module.js"
        },
     output: {
         filename: "[name].bundle.js",
         path: path.resolve(__dirname, "dist"),
     },
     optimization: {
         splitChunks: {
             chunks: "all",
         },
     },
 };