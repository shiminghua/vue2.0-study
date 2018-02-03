import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './symbol/index.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

console.log(React);