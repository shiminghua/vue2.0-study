import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import App from './App/App';
import Basic from './Basic';
import UrlParams from './UrlParams';
import Authorize from './Authorize';


const router = () => {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to='/'>首页</Link></li>
          <li><Link to='/basic'>基本使用</Link></li>
          <li><Link to='/url-params'>URL参数</Link></li>
          <li><Link to='/authorize'>认证</Link></li>
        </ul>

        <Route exact path='/' component={App} />
        <Route exact path='/basic' component={Basic} />
        <Route exact path='/url-params' component={UrlParams} />
        <Route exact path='/authorize' component={Authorize} />

      </div>
    </Router>
  );
};

export default router;