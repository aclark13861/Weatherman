import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import NavBar from '../../components/NavBar/NavBar';
import Form from '../../components/form/form';
import Weather from '../../components/weather/weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: undefined,
      min: undefined,
      max: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined,
      user: userService.getUser(),
  };
  this.weatherIcon = {
    ThunderStorm: 'wi-Thunderstorm',
    Drizzle: 'wi-sleet',
    Rain: 'wi-storm-showers',
    Snow: 'wi-snow',
    Atmosphere: 'wi-fog',
    Clear: 'wi-day-sunny',
    Clouds: 'wi-day-fog'
  }
}

handleLogout = () => {
  userService.logout();
  this.setState({ user: null });
}

handleSignupOrLogin = () => {
  this.setState({user: userService.getUser()});
}

get_WeatherIcon(icons, rangeId) {
  switch(true){
    case rangeId >= 200 && rangeId <= 232:
    this.setState({icon:this.weatherIcon.ThunderStorm});
    break;
  case rangeId >= 300 && rangeId <= 321:
    this.setState({icon:this.weatherIcon.Drizzle});
    break;
  case rangeId >= 500 && rangeId <= 531:
    this.setState({icon:this.weatherIcon.Rain});
    break;
  case rangeId >= 600 && rangeId <= 622:
    this.setState({icon:this.weatherIcon.Snow});
    break;
  case rangeId >= 700 && rangeId <= 781:
    this.setState({icon:this.weatherIcon.Atmosphere});
    break;
  case rangeId === 800:
    this.setState({icon:this.weatherIcon.Clear});
    break;
  case rangeId >= 801 && rangeId <= 804:
    this.setState({icon:this.weatherIcon.Clouds});
    break;
  default:
    this.setState({ icon: this.weatherIcon.Clouds });
  }
};

getWeather = async (e) => {
  e.preventDefault();
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;
  const api_call =  await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appidid=524901&APPID=e24a337d0df8daa5d6d6d703af26b792&units=imperial`);
  const data = await api_call.json();
  console.log(data);
    if(city && country) {
    this.setState({
      temperature: data.main.temp,
      min: data.main.temp_min,
      max: data.main.temp_max,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: '',
      icon: this.weatherIcon
    });
    this.get_WeatherIcon(this.weatherIcon, data.weather[0].id)
  } else {
    this.setState({
      temperature: undefined,
      min: undefined,
      max: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: 'please enter values for city and country',
    });
  }
}

//*fake* getWeather => pass props from here to form
//inside this function make a call to the function inside weatherAPI.js
//update state after


render() {
  return (
    <div className="App">
      <header className="App-header">
      <nav>
          <Route path='/' render={(props) => (
            <NavBar 
            handleLogout={this.handleLogout}
            user={this.state.user}
            />
          )} />
          <Switch>
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
      </header>
      <body>
      <Form getWeather={this.getWeather}/>
        <Weather 
        temperature={this.state.temperature}
        min={this.state.min}
        max={this.state.max}
        city={this.state.city}
        country={this.state.country}
        humidity={this.state.humidity}
        description={this.state.description}
        error={this.state.error}
        weatherIcon={this.state.icon}
        />
      </body>
    </div>
    );
  }
}

export default App;
