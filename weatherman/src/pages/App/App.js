import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import Page1 from '../Page1/page1';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import tokenService from '../../utils/tokenService';
import NavBar from '../../components/NavBar/NavBar';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser()
  };
}

handleLogout = () => {
  userService.logout();
  this.setState({ user: null });
}

handleSignupOrLogin = () => {
  this.setState({user: userService.getUser()});
}


render() {
  return (
    <div className="App">
      <header className="App-header">
      <nav>
        <Switch>
          <Route path='/' render={(props) => (
            <NavBar 
            handleLogout={this.handleLogout}
            user={this.state.user}
            />
          )} />
          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
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
}

export default App;
