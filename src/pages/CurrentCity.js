import { useEffect, useRef, useState } from "react";
import { getCurrWeather } from "../api";
import Weather from "../components/Weather";
import classes from './CurrentCity.module.css'
const CurrentCity = () => {
  // state to get current city lon and lang
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState({
    weatherType: "",
    desc: "",
    temp: "",
    min_temp: "",
    max_temp: "",
    placeName:'',
    units:'',
    weatherIcon:'',
    windSpeed:''

  });
  const [gotCord, setGotCord] = useState(false);
  const tempUnit=useRef()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition( (position) => {
      setLon(position.coords.longitude);
      setLat(position.coords.latitude);
     
        setGotCord(true);
      
    });
  }, []);


   const  getCurrentWeather=async ()=> {
    const unit=tempUnit.current.value;
    try {
      const response = await getCurrWeather(lon, lat,unit);
    
        if(response===undefined){
            throw new Error("Something went wrong");
        }
       
      setWeather({
        weatherType: response.weather[0].main,
        desc: response.weather[0].description,
        temp: response.main.temp,
        min_temp: response.main.temp_min,
        max_temp: response.main.temp_max,
        placeName:response.name,
        units:unit,
        weatherIcon:response.weather[0].icon,
        windSpeed:response.wind.speed

      });

    } catch (error) {
      setError(error.message);
    }
  }

  let coordinates;
  if (gotCord) {
    coordinates = (
      <div className={classes.coordinates}>
        <p>Latitutde: {lat}</p>
        <p>Longitude: {lon}</p>
      </div>
    );
  } else {
    coordinates = <h3> Loading coordinates....</h3>;
  }

  return (
    <>
      {coordinates}
      <br></br>
     <div className={classes.inputRow}>
      <select 
      className={classes.degree}
         name="unit" id="tempUnit" ref={tempUnit} defaultValue='metric'>
        <option value="metric">Celsius</option>
        <option value="imperial">Fahrenheit</option>
        </select>
        
      <button className={classes.buttons}
        type="button" disabled={!gotCord} onClick={getCurrentWeather}>
        Show weather
      </button>
      </div> 
      {weather.weatherType!='' && !error && (
        <Weather weather={weather}></Weather>
        )
     }

    </>
     )

}


export default CurrentCity;