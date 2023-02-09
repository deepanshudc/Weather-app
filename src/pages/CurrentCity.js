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
    //   if (!response.ok) {
    //     throw new Error("Something went wrong");
    //   }
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
      console.log(response)
    console.log(weather)



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
      <h2>this is current city page</h2>
      {coordinates}
      <br></br>
      <select style={{
                width:"5rem",
                display:"flex",
                margin:'0 auto',
                alignItems:"center"
                }}
         name="unit" id="tempUnit" ref={tempUnit} defaultValue='metric'>
        <option value="metric">Celsius</option>
        <option value="imperial">Fahrenheit</option>
        </select>
        
      <button style={{
         width:"5rem",
        display:"flex",
        margin:'0 auto',
        alignItems:"center"
       }} 
        type="button" disabled={!gotCord} onClick={getCurrentWeather}>
        Get Weather Update
      </button>
      {weather.weatherType!='' && !error && (
        <Weather weather={weather}></Weather>
        )
     }

    </>
     )

}


export default CurrentCity;