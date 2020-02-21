const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: ['./src/index.ts'],
    output: {
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            console: 'console-browserify'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            // beautify: true,
            sourceMap: false,
            extractComments: true,
            terserOptions: {
                mangle: true,
                output: {
                    beautify: false,
                }
            }
        })],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
