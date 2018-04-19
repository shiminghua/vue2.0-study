import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App/App';
// import Authorize from './Authorize';
import registerServiceWorker from './registerServiceWorker';

import router from './router';

function App() {
  return router();
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();
