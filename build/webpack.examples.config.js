var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: ['../examples/js/app.js']
    },
    output: {
        path: path.join(__dirname, '../examples/build'),
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.vue'],
        modules: [path.join(__dirname, '../node_modules')]
    },
    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.md/,
                loader: 'vue-markdown-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                [
                                    'babel-plugin-import',
                                    {
                                        libraryName: 'mumble-ui',
                                        libraryDirectory:
                                            '../../../../src/components',
                                        style: true
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader?sourceMap-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new HtmlPlugin({
            template: path.resolve(__dirname, '../examples/index.html'),
            filename: 'index.html',
            chunks: ['app'],
            hash: true
        })
    ]
};