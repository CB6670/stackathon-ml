const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

// module.exports = {
//     entry: [
//     '@babel/polyfill', './client/index.js'
// ]
// }

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    path.join(__dirname, 'client', 'index.js')
], //react-dom's render of <App>
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  watchOptions: {
    ignored: /node_module/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_module/,
        loader: 'babel-loader'
      }
    ]
  }
}

// module.exports = {
// 	entry: [
// 		'./client/index'
// 	]
// };
