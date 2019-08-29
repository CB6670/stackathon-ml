// if (!global._babelPolyfill) {
//   require('babel-polyfill');
// }

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';


const root = document.querySelector('#root');

ReactDOM.render(
    <App />, root
    );
