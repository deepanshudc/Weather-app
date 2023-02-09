const API_KEY= process.env.REACT_APP_API_KEY_WEATHER

export  async function getCurrWeather(lon,lat,unit){

    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&APPID=${API_KEY}`);
   if(!response.ok){
  throw { message: 'Failed to get temp.', status: 500 };

   }
    return response.json()
    }


    export  async function getCityWeather(cityName,unit){

        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&APPID=43787cd95d052d4c8e35e1b99cab3e01`);
       if(!response.ok){
      throw { message: 'Failed to get temp.', status: 500 };
    
       }
        return response.json()
        }
    

