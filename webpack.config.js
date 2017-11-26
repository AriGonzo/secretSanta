let path = require('path');

module.exports = {
    entry: {
        index: "./app/App.js"
    },
    output: {
      filename: "public/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'app/'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ]
    }
};