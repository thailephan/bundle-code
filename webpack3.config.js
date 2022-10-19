// Asset management: https://webpack.js.org/guides/asset-management/
// Loader help webpack to `transpile` code for unsupported file format of webpack
const yaml = require('yamljs');

module.exports = {
    entry: {
        main: "./app/index.js",
        vendor: "./app/vendor.js",
    },
    module: {
        rules: [
            // Css loader
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            // images loader
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: 'asset/resource',
            },
            // Fonts loader
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: 'asset/resource',
            },
            // Data loader (csv)
            {
              test: /\.(csv|tsv)$/i,
              use: ['csv-loader'],
            },
            // Data loader (xml)
            {
              test: /\.xml$/i,
              use: ['xml-loader'],
            },
            {
              test: /\.yaml$/i,
              type: 'json',
              parser: {
                parse: yaml.parse,
              },
            },
        ],
    },
};
