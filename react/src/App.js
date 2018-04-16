import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className='box-img'>
          <img src='http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg' alt='' />
        </p>
        <p className='box-img'>
          <img src='http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg' alt='' />
        </p>
      </div>
    );
  }
}

export default App;
