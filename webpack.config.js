const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    // providing named entry points for practice, for SPAs it should just be one
    // and specified as a string directly
    entry: {
        index: './src/index.js'
    },
    output: {
        // [name] will resolve to each entry field, name is a predefined field in webpack
        // For an SPA the filename can be specified directly
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // clean the output folder on
        // assetModuleFilename:'assets/[hash][ext]' // option to output the images/assets in a 
        // specific folder especially for applications having many images
    },
    devServer: {
        static: './dist'
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
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource'
            }
        ]

    },
    plugins: [
        // always specified with new keyword i.e. class instances/ objects
        // This plugin copies over a templte html file and adds
        // script tags as chunks. The entries in chunks should
        // match the keys in entry object, and is an array. Additionally,
        // a filename can be provided with multiple chunks/entry points
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['index'], // references the key in entry object
            filename: 'index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    // ideally posix is not required to be called, but resolve 
                    // causes issues in windows, where it
                    // returns a path with backslash. In order for the glob pattern
                    // to work correctly, it is required to have forward slash
                    // , posix helps with that and converts the path i.e. replaces
                    // back slashes with forward slashes.
                    from: path.posix.join(
                        path.resolve(__dirname, "src/assets/images/*").replace(/\\/g, "/")),
                    to: path.resolve(__dirname, "dist"),
                    context: "src"
                }
            ]
        })
    ]

}