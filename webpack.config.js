module.exports = {
    entry: ['./src/app.js'],
    context: __dirname,
    resolve: {
    },
    output: {
        filename: './build/bundle.js'
    },
    devtool: 'cheap-module-source-map',
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ],
    },
};