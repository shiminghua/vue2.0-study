/**
 * basic
 */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';


const Basic = ({ match }) => {
  return (
    <Router>
      <div>
        <h2>主题列表</h2>
        <ul>
          <li>
            <Link to={`${match.url}/rendering`}>使用 React 渲染</Link>
          </li>
          <li>
            <Link to={`${match.url}/components`}>组件</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>属性 v. 状态</Link>
          </li>
        </ul>

        <Route exact path={match.url} render={() => (
          <h3>请选择一个主题。</h3>
        )} />
        <Route path={`${match.url}/:topicId`} component={Topic} />

      </div>
    </Router>
  );
};

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default Basic;