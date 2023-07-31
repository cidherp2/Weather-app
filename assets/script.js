var apiKey = "6f71eafd4d3a0cba318fb3ddf1f87ed1";
var city = "Guadalajara";

async function fetchWeatherData(city,apiKey){
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    try{
     const response = await fetch(apiUrl); 
      const data = await response.json();
      console.log(data);
    }catch (error){
        console.error("error fetching data:", error);
    }

}

async function fetchCoordinatesByName(cityName,stateCode = '', countryCode = '', limit = 1,apiKey){
    console.log("its working");
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`;
    try{
     const response = await fetch(apiUrl); 
      const data = await response.json();
      console.log(data);
      return data;
    }catch (error){
        console.error("error fetching data:", error);
        return null;
    }
}

async function fetchWeather(cityName,apiKey){
    console.log("its working");
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
    try{
     const response = await fetch(apiUrl); 
      const data = await response.json();
      console.log(data);
      console.log("regresando data");
      return data;
    }catch (error){
        console.error("error fetching data:", error);
        return null;
    }
}

async function fetchWeather2(cityName,apiKey) {
    var data = await fetchWeather(cityName,apiKey);

    if (data){
        let currentDay = null;
        let currentDayData = null;
      for ( i=0 ; i < data.list.length-1; i++){
        var date = data.list[i].dt_txt.split(" ")[0];
        if (date !== currentDay){
        currentDay = date;
        console.log("la temperatura en kelvin es " + data.list[i].main.temp);
        console.log("El clima es " + data.list[i].weather[0].description);
        console.log("La velocidad del viento es de " + data.list[i].wind.speed);
        console.log("La humedad es de " + data.list[i].main.humidity+"%");
        console.log("La fecha es  " + data.list[i].dt_txt.split(" ")[0]);
        }
      }
       
    }
    else{
        console.log("data not available");
    }

}

fetchWeather2(city,apiKey);
//fetchWeather(city);
//fetchWeatherData(city,apiKey);
//fetchCoordinatesByName(city,"","",1,apiKey);