import React from 'react';
import {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherIcon from './components/WeatherIcon';
import WeatherDetails from './components/WeatherDetails';


class App extends Component{
  constructor(props) {
    super(props);
      this.state = {
          icon: "",
          time: 1,
          city: "",
          temperature: "",
          weatherCode: "",
          fetching: true
      };
    }
    
    componentDidMount(){
      this.fetchIP();
    }

    fetchWeatherData = (city,country_code) => {
      const baseUrl = `https://api.openweathermap.org`;
      const path = `/data/2.5/forecast`;
      const appId = `8b0adf300230b85143e4c8cadc742f56`;
      const query = `units=metric&APPID=${appId}`;
      fetch(`${baseUrl}${path}?q=${city},${country_code}&${query}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const date = new Date();
          const time = date.getHours();

          console.log(data.list[0].main.temp);
          this.setState({
            time,
            city,
            temperature: Math.round(data.list[0].main.temp),
            weatherCode: data.list[0].weather[0].id,
            fetching: false
          });
        })
        .catch(err => console.error(err));
    }


     fetchIP = () =>{
      fetch("http://api.ipstack.com/213.174.1.220?access_key=82f0a3d9e5b252124f9a23824ab8a97e")
        .then(response => response.json())
        .then( ({ city,country_code }) => this.fetchWeatherData(city,country_code))
        .catch(error => console.log(error));
    }




    render (){
        const {fetching, icon, time, city, temperature, weatherCode} = this.state;
        return fetching ?
          <div className="App">Loading...</div>
          :
          <div className="App" data-hour={time}>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <WeatherIcon 
                icon = {icon}
                weatherCode={weatherCode}
                time={time} />

              <WeatherDetails
                city={city}
                temperature={temperature} />
            </header>
          </div>;
     }
}

export default App;
