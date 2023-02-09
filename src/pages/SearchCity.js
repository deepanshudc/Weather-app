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
         <h1>this is search city page</h1>
         <form onSubmit={submitHandler}>
            <label type='cityName'>Enter City:</label>
            <input id='cityName' type='text' ref={cityname} />
            <br></br>
            <select name="unit" id="tempUnit" ref={tempUnit} defaultValue='metric'>
            <option value="metric">Celsius</option>
            <option value="imperial">Fahrenheit</option>
            </select>
            <button style={{
                width:"5rem",
                display:"flex",
                margin:'0 auto',
                alignItems:"center"
                }}
                type="submit">Show Weather
            </button>
         </form>
         {error&&<p>{error}</p>}
         {weather.weatherType!='' &&!error &&(
            // <>
            //  <h2>Weather:</h2>
            //  <ul style={{listStyleType: "none"}}>
            //     <h2>{weather.placeName}</h2>
            //    <li>Weather Type:{weather.weatherType}</li>
            //    <li>Weather desc:{weather.desc}</li>
            //    <li>temp :{weather.temp} {tempUnit.current.value==='imperial'?'\u00B0'+"F":'\u00B0'+"C"}</li>
            //    <li>temp min:{weather.min_temp}</li>
            //     <li>temp max:{weather.max_temp}</li>
            //     </ul>
            // </> 
            <Weather weather={weather}></Weather>
             )
            }
         </>
         )
    }
export default SearchCity;

