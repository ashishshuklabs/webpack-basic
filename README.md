# Webpack basic project

### Basic webpack config concepts and notes

- `entry`: Entry point (`.js` file only) for the bundler. Normally it's just a single entry defined as `string`. However, you can specify it as an array of objects for multiple entry points.
  - The object will have `key` as the field and `value` as the entry point e.g. `{index: './index.js'}`
- `output`: Bundler output details. It's an object with the following fields that can be specified
  - `filename`: It's a string. You can additionally specify/use webpack `name` variable here, if there are multiple entry points specific to each `key` specified. Examples:
    - SPA / single entry point: `filename: 'index.bundle.js'`
    - MPA / Multiple entry points: `filename: [name].bundle.js`
  - `path`: Output destination folder. Generally resolved using `path` resolvers
  - `clean`: `boolean` value to let webpack know if the output folder needs to be cleaned up before every build.
  - `assetModuleFilename`: Optional field specifying the folder where all the assets need to be copied to. Generally used for images.
  - Usage:
  ```
   output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      assetModuleFilename:'images/[hash][ext]'
  },
  ```
- **Loaders**: By default webpack only understand how to handle `.js` or `.json` files i.e. javascript files. In order for it to handle or process any other file type, a loader needs to be specified.

  - Loader is specified as a `module` object containing `rules` array of object. The object in `rules` array has the following fields
    - `test`: `RegEx` for the file extension
    - `use` : Either array or string corresponding to each loader required to process the file.Last entry defining the first processing step and so on. Or an object with fields `loader` specifying the loader and `options` parameter corresponding to the options supported by the loader
    - `type`: Generally used for built-in loaders for webpack. e.g. image files
  - Usage:

  ```
   module: {
      // defining css and image loaders
      rules: [
          {
              test: /\.css$/,
              use: [
                  { loader: 'style-loader' },
                  { loader: 'css-loader', options: { modules: true } } // enable css-module
              ]
          },
          {
              test: /\.(png|jpg|jpeg|gif|svg)$/,
              type: 'asset/resource'
          }
      ]

  }
  ```

- **Plugins** : Code required to further enhance what was returned from the loaders. For example, loaders do the hard work of loading css files and parsing the styles etc. whereas `HtmlWebpackPlugin` inserts them in the actual template. This is an array of typically objects extending/instantiating a plugin class.
  - These are implemented as class instances, and start witht the `new` keyword
  - Usage:
  ```
   plugins: [
      // This plugin copies over a templte html file and adds
      // script tags as chunks. The entries in chunks should
      // match the keys in entry object, and is an array. Additionally,
      // a filename can be provided with multiple chunks/entry points
    new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['index'], // references the key in entry object
            filename: 'index.html'
        }),
   ]
  ```
- `optimization`: Object with field `splitChunks` where `chunks` field could be specified to create explicit bundles. Especially, for extracting out the external libraries as a separate chunk, that could be shared across multiple bundles.
    - Usage:
    ```
    optimization:{
        splitChunks: {
            // extract out external libraries in vendor chunk, leaving only
            // the source in current project in the main chunk
            chunks: "all"
        }
    }
    ```

### Appendix - Plugins and Loaders
- `mini-css-extract-plugin`: Used for extracting `css` in to separate files
- `html-webpack-plugin`: Used for inserting main/entry/index file as `script` in to the `html` template
- `css-loader`: Used for reading/loading `css` files
- `style-loader`: Used for reading `css` styles
- `dev-server`: Used for running the `webpack` server
- `copy-webpack-plugin`: Used for copying files from source to destination during build process
- `webpack-bundle-analyzer`: Used for analysing source bundle sizes
