// import React, { Component } from 'react';
// import logo from '../logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;
import React from 'react';
import {
  Route,
  Link,
} from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
};

const Topic = ({ match }) => {
  console.log(match);
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
};

const Topics = ({ match }) => {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li><Link to={`${match.url}/rending`}>Rending with React</Link></li>
        <li><Link to={`${match.url}/component`}>component</Link></li>
        <li><Link to={`${match.url}/props-v-state`}>Props v. state</Link></li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route exact path={match.path} render={() => {
        return (<h3>Please select a topic.</h3>);
      }} />
    </div>
  );
};

const BasicExample = () => {
  return (
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>about</Link></li>
        <li><Link to='/topics'>topics</Link></li>
      </ul>

      <hr />

      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/topics' component={Topics} />
    </div>
  );
};

export default BasicExample;
