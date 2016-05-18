const autoprefixer = require("autoprefixer");

module.exports = {
    entry: {
        main: './src/main',
    },
    output: {
        path: './dist',
        filename: '[name].js',
        chunkFilename: "[id].js",
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ["babel-loader"]
        }, {
            test: /\.scss$/,
            loaders: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
        }, {
            test: /\.css$/,
            loader: ["style-loader", "css-loader!postcss-loader"],
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/octet-stream"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=image/svg+xml"
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
            ]
        }]
    },
    postcss: function () {
        return [autoprefixer({ browsers: [] })];
    },
    plugins: [],
};
