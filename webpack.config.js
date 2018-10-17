const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.join(__dirname, 'views/index.js')
    },
    output: {
        path: path.join(__dirname, 'public/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                'babel-loader',
                'eslint-loader'
            ]
        },
        {
            test: /\.sss$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        parser: 'sugarss',
                        plugins: loader => [
                            require('postcss-import')({
                                root: loader.resourcePath
                            }),
                            require('autoprefixer')({
                                stage: 2,
                                browsers: ['ie >= 10', 'last 2 version']
                            }),
                            require('precss')(),
                            require('postcss-assets')({
                                basePath: path.join(__dirname, 'public'),
                                loadPaths: ['images/']
                            }),
                            require('postcss-preset-env')({
                                stage: 2,
                                browsers: ['ie >= 10', 'last 2 version']
                            })
                        ]
                    }
                }
            ]
        }
        ]
    }
};