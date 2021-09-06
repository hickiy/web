const path = require('path');

module.exports = {
    mode: 'development',
    entry: './webpack/require-context/index.js',
    output: {
        path: path.resolve(__dirname, 'require-context'),
        filename: 'index.bundle.js',
    },
};