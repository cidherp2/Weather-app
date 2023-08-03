var apiKey = "6f71eafd4d3a0cba318fb3ddf1f87ed1";
var city = document.getElementById('cityNames');
var city2 = "New York"
const myButton = document.getElementById('botonCiudad');
var flag = 0;

function removeIcons (){
  var iconoTituloValidar = document.getElementById('icon-0');
  var iconoTituloValidar2 = iconoTituloValidar.querySelector('img');
  if (iconoTituloValidar2){
  for (var j = 0; j<6; j++){
var iconoTitulo = document.getElementById('icon-'+[j]);
const iconoRemover = iconoTitulo.querySelector('img');
iconoTitulo.removeChild(iconoRemover);
}
  }
else{
  console.log("que mira perro");
}

}

function executeOnClick () { 
cityValue = city.value;
console.log(cityValue);
removeIcons();
fetchWeather(cityValue,apiKey);
fetchWeather2(cityValue,apiKey);
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
    var titulo = document.getElementById('sectionTitle');
    var nombreCiudad = data.city.name;
    titulo.textContent = nombreCiudad;
   
    


    if (data){
      var diaDeHoy = data.list[0].dt_txt.split(" ")[0];
        let currentDay = null;
        let currentDayData = null;
        var j = 0;
      for ( i=0 ; i < (data.list.length)-1; i++){
        console.log("hola vuelta "+ j);
        var date = data.list[i].dt_txt.split(" ")[0];
      
        if (date !== currentDay){
        var fechaTitulo = document.getElementById('fecha'+j);
        var temperaturaTitulo = document.getElementById('temp-'+[j]);
        var vientoTitulo = document.getElementById('wind-'+[j]);
        var humedadTitulo = document.getElementById('humidity-'+[j]);
        var iconoTitulo = document.getElementById('icon-'+[j]);
        const iconElement = document.createElement('img');
        currentDay = date;
        
        fechaTitulo.textContent = date;
        var tempCentigrados = ((data.list[i].main.temp)-273.15).toFixed(1);
        temperaturaTitulo.textContent = ("Temp: " + tempCentigrados+"°");
        console.log("El icono es " + data.list[i].weather[0].icon);
        var iconoClima =data.list[i].weather[0].icon;
         var iconSrc = (`http://openweathermap.org/img/w/${iconoClima}.png`);
         iconElement.src = iconSrc;
         iconoTitulo.appendChild(iconElement);
        var clima = data.list[i].weather[0].description;
        var velocidadViento =  ((data.list[i].wind.speed)*3.6).toFixed(1);
        vientoTitulo.textContent = ("Vel: "+velocidadViento+" Km/h");
        var porcentajeHumedad = data.list[i].main.humidity;
        humedadTitulo.textContent = ("Humidity: "+porcentajeHumedad + "%");
        console.log("La fecha es  " + data.list[i].dt_txt.split(" ")[0]);
         j++;
        }

       
      }
     
        
  

       
    }

   
    else{
        console.log("data not available");
    }



}





