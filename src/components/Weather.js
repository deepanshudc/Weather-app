import classes from './Weather.module.css'

const Weather=(props)=>{

    const unitType=props.weather.units==='imperial'?'\u00B0'+"F":'\u00B0'+"C"
return (
    <div className={classes.container}>
    <ul style={{listStyleType: "none"}}>
        
            <div className={classes.row1}>
            <h1>{props.weather.placeName}</h1>
            <h1>{props.weather.temp} {unitType}</h1>
            </div>

            <div className={classes.row2}>
            <img src={`http://openweathermap.org/img/wn/${props.weather.weatherIcon}@2x.png`} /> 
            <h2>{props.weather.desc}</h2>
            </div>
            <div className={classes.row3}>
            <li> Wind speed: &nbsp;  &nbsp; {props.weather.windSpeed} m/sec</li>
            <li> Temperature min:  &nbsp; {props.weather.min_temp} {unitType}</li>
            <li> Temperature max:  &nbsp; {props.weather.max_temp} {unitType}</li>
            </div>
        </ul>
    </div>
)
}

export default Weather;
