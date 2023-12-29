const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = merge(commonConfig, {
    mode: 'development',
    devServer: {
        static: './dist',
        port: 8080
    },
    module: {
        // defining css and image loaders
        rules: [
            {
                test: /\.css$/,
                use: [
                    // can directly use string array, but using the object array approach
                    // for clarity and understanding. Using latter approach, we can specify
                    // additional options e.g. providing css-module support, add option 
                    // modules: true for css-loader
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: {} }
                ]
            }
        ]

    },
    plugins: [new BundleAnalyzerPlugin()]
}) 