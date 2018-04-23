import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import './symbol/index.js';
// import './date';
// import './moment/month';
// import './sparrow/utils';
import './promise/index';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// console.log(React);