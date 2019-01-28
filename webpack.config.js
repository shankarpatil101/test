const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ['./src/main.ts', './src/styles.scss'],
    plugins: [
        new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        // chunkFilename: '[name].js'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            // maxInitialRequests: 100,
            // minSize: 20240,
            // maxSize: 22800,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    }
                },
                styles: {
                    test: /\.scss$/,
                    name: 'styles',
                    chunks: 'all'
                    // enforce: true
                }
            }
        }
    }
};
