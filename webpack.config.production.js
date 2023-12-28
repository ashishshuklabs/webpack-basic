const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(commonConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // Using MiniCssExtractPlugin loader to load and extract
                    // styles in a separate chunk. 
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader', options: {} }
                ]
            }
        ]
    },
    // plugin to extract css in to separate bundle/chunk
    plugins:[new MiniCssExtractPlugin({
        filename:'[name].[contenthash].css'
    })]
});