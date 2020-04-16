import React, { Component } from 'react';
import './App.css';
import { Route, Switch, NavLink } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import ProfilePage from '../../pages/profilePage/profilePage'
import userService from '../../utils/userService';
import NavBar from '../../components/NavBar/NavBar';
import Form from '../../components/form/form';
import Weather from '../../components/weather/weather';
import Home from '../../components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: userService.getUser(),
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
      <NavBar 
            handleLogout={this.handleLogout}
            user={this.state.user}
            />
        </nav>
        </header>
        <Switch>
        <Route exact path='/profile' render={props => 
            <ProfilePage
          {...props}
          getWeather = { this.getWeather }
            />
          }/>
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
          <Route exact path='/' render={props => 
            <Home
          {...props}
          />
        }/>
        </Switch>
    </div>
    );
  }
}

export default App;
