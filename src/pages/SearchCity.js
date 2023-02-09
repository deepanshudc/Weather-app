import { useRef,useState } from "react";
import Weather from "../components/Weather";
import { getCityWeather } from "../api";
import classes from './SearchCity.module.css'
const SearchCity=()=>{

    const [error, setError] = useState(undefined);
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

    const cityname=useRef()
    const tempUnit= useRef()
 

    const submitHandler=async (event)=>{
        event.preventDefault();
        console.log(cityname.current.value)
        let city=cityname.current.value
        city=city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
        let unit=tempUnit.current.value
        try{
            const response=await getCityWeather(city,unit)
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
        
            })
            setError(undefined)
            console.log(weather)
            cityname.current.value=''
        }
        catch(error){
            setError(error.message);
        }

     }


    return(
         <>
         <form onSubmit={submitHandler}>
         < div  className={classes.city}>
            <label type='cityName'>Enter City : </label>
           <input  id='cityName' type='text' ref={cityname} />
          </div>
            <br></br>
            <div className={classes.inputRow}>
                <select
            className={classes.degree}
             name="unit" id="tempUnit" ref={tempUnit} defaultValue='metric'>
            <option value="metric">Celsius</option>
            <option value="imperial">Fahrenheit</option>
            </select>
            <button className={classes.buttons}
                type="submit">Show Weather
            </button>
            </div>
         </form>
         {error&&<p>{error}</p>}
         {weather.weatherType!='' &&!error &&(
            <Weather weather={weather}></Weather>
             )
            }
         </>
         )
    }
export default SearchCity;

