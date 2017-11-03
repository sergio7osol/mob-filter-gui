var debug = true; // to remove

let path = require('path');
let webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // create the index.html file to serve our webpack bundles
 
const extractLess = new ExtractTextPlugin({
    filename:  "css/[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

let DIST_DIR = path.resolve(__dirname, "dist");
let SRC_DIR = path.resolve(__dirname, "src");

let config = {
    entry:  SRC_DIR + "/js/index.js",
    output: {
        path: DIST_DIR, 
        filename: "js/bundle.js",
        publicPath: "/"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: SRC_DIR,
                loader: "babel-loader", 
                query: {
                    presets: ["env"]
                }
            }, {
                test: /\.less$/,
                include: SRC_DIR,
                use: extractLess.extract({
                    use: [{
                            loader: "css-loader",  // translates CSS into CommonJS 
                            options: { 
                                // minimize: false 
                            } 
                        }, {
                            loader: "less-loader" // compiles Less to CSS 
                        }
                    ],
                    // use style-loader in development 
                    fallback: "style-loader" // creates style nodes from JS strings 
                })
            }
        ]
    },
    plugins: [
      //new webpack.optimize.UglifyJsPlugin(),
      new HtmlWebpackPlugin({
            template: 'index.html', // to get the template from - src/...
            filename: 'index.html', // the file to put the generated HTML into - public/...
            inject: 'body',
            hash:  true,
            minify: debug ? false : {
              html5: true,
              minifyCSS: true,
              removeComments: true,
              //removeAttributeQuotes: true,
              //collapseWhitespace: true,
              //removeEmptyAttributes: true,
            }
        }), 
        extractLess
    ]
}

module.exports = config;