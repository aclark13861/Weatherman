import React, { Component } from 'react';
import Form from '../../components/form/form';
import Weather from '../../components/weather/weather';
import userService from '../../utils/userService';
import './profilePage.style.css';

export default class ProfilePage extends Component {
  constructor() {
    super()
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
}
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
      this.weatherIcon = {
        ThunderStorm: 'wi-Thunderstorm',
        Drizzle: 'wi-sleet',
        Rain: 'wi-storm-showers',
        Snow: 'wi-snow',
        Atmosphere: 'wi-fog',
        Clear: 'wi-day-sunny',
        Clouds: 'wi-day-fog'
      }
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

  render() {
    return (
      <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>My Profile</h1>
              <hr />
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
            </div>
          </div>
          <div className="row">
          </div>
        </div>
    );
  }
}