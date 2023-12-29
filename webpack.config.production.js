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
    // plugin to extract css in to separate bundle/chunk (without this css is bundled alongside html)
    // This is a useful optimization technique to only serve relevant html/css that has changed. The browser 
    // only fetches the updated files and serves the unchanged files from cache.
    plugins:[new MiniCssExtractPlugin({
        filename:'[name].[contenthash].css'
    })]
});