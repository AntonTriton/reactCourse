
const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:3001', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        "./public/main.js"],
    output: {
        publicPath: "",
        path: __dirname + "/public/build",
        filename: "bundle.js"
    },

    watch: NODE_ENV == "development",

    devtool: NODE_ENV == "development" ? 'source-map' : null,

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    module: {
        loaders:[{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react']
        }]
    }
}

if(NODE_ENV == "production"){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: false,
                drop_console:  true,
                unsafe: true
            }
        })
    )
}
