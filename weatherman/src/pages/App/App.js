import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import Page1 from '../Page1/page1';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <nav>
        <Switch>
          <Route path='/' render={(props) => (
            <Page1 {...props}/>
          )} />
        </Switch>
        </nav>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
