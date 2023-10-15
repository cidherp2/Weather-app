var apiKey = "6f71eafd4d3a0cba318fb3ddf1f87ed1";
var ciudad = document.getElementById('cityNames');
var city2 = "New York"
const myButton = document.getElementById('botonCiudad');
var iconoTituloValidar = document.getElementById('icon-0');
var iconoTituloValidar2 = iconoTituloValidar.querySelector('img');
var iconoTituloValidar3 = document.getElementById('icon-5');
var iconoTituloValidar4 = iconoTituloValidar3.querySelector('img');
let nombreCity = ' ';
var index = 0;
var flag = 0;
//var indexHistorial = 0;

function removeIcons() {

  if (!iconoTituloValidar3.querySelector('img')) {
    console.log("somos 5");
    for (var j = 0; j < 5; j++) {
      var iconoTitulo = document.getElementById('icon-' + [j]);
      const iconoRemover = iconoTitulo.querySelector('img');
      iconoTitulo.removeChild(iconoRemover);
    }
  }

  else  {
    for (var j = 0; j < 6; j++) {
      var iconoTitulo = document.getElementById('icon-' + [j]);
      const iconoRemover = iconoTitulo.querySelector('img');
      iconoTitulo.removeChild(iconoRemover);
    }
  }
}

function createSearchHistory(cityName){
  if (flag < 15){
   
    
    if (nombreCity!=cityName){
    
  cityValue=ciudad.value;
  var botonCiudad = document.getElementById('search-History-List');
  var listElement = document.createElement('li');
  var buttonElement = document.createElement('button');
  buttonElement.appendChild(document.createTextNode(cityName));
  buttonElement.classList.add('botonHistorial');
buttonElement.setAttribute("id","historial"+[index]);
  listElement.classList.add('listFormat');
  listElement.appendChild(buttonElement);
  botonCiudad.appendChild(listElement);
  nombreCity = cityName;
  index++;
    }
else if (document.querySelector('.botonHistorial').textContent){
}
}

  
  else{
    window.alert("Ya no se pueden agregar más ciudades al historial de búsqueda");
  }
  flag++;
 // searchHistory();
}

// function searchHistory(){

//   const botonHistorial2 = document.querySelector('.botonHistorial');
//   const botonArray = Array.from(botonHistorial2);

//   if( botonArray){
//     console.log("HOLAAAAAESTOYQQHG");
//   botonArray.forEach(function(button) {
//     button.addEventListener('click', function (event) {
//      const clickedButton = event.target;
//     console.log(`Button "${clickedButton.textContent}" was clicked.`);
//     })
//   })
//   }
//   else {

//   }
// }

function saveLocalStorage (){
  var cityIds = [];
  var getClass = document.querySelectorAll('.listFormat');
  getClass.forEach((listFormat,index) =>{
    cityIds.push('historial'+index);
    console.log(cityIds);
    index++;
  });

  
 
}

async function executeOnClick() {
  var cityValue = ciudad.value;
  var dataFromApi = await fetchWeather(cityValue, apiKey);
   nombreCiudad =  dataFromApi.city.name;
  if (cityValue){
  fetchWeather2(cityValue, apiKey);
  if (document.getElementById('icon-0').querySelector('img')){
  removeIcons();
  }
  createSearchHistory(nombreCiudad);

  globalThis.botonHistorial2 =   document.querySelector('.botonHistorial');
  // if ( globalThis.botonHistorial2){
  //   searchHistory();
  // }
  
  }
  else{
    window.alert("Escribe el nombre de una ciudad");
   
  }
  
 
  //saveLocalStorage();
  
}
// async function searchHistory(){
//   console.log(globalThis.botonHistorial2);
//   const botonArray = Array.from(globalThis.botonHistorial2);
//   console.log("HOLAAAAAESTOYQQHG");
// botonArray.forEach(function(button) {
//   console.log(button.textContent);
//   button.addEventListener('click', function (event) {
//    const clickedButton = event.target;
//   console.log(`Button "${clickedButton.textContent}" was clicked.`);
//   })
// })
// }

  setupSearchHistoryListeners();



function setupSearchHistoryListeners() {
  const botonArray = Array.from(globalThis.botonHistorial2);
  if (globalThis.botonHistorial2) {
    botonArray.forEach(function (button) {
      console.log(button.textContent);
      button.addEventListener('click', function (event) {
        const clickedButton = event.target;
        console.log(`Button "${clickedButton.textContent}" was clicked.`);
        // Add any additional functionality you need when a history button is clicked
      });
    });
  }
}







async function fetchWeather(cityName, apiKey) {

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error fetching data:", error);
    return null;
  }
}

async function fetchWeather2(cityName, apiKey) {
  var data = await fetchWeather(cityName, apiKey);
  var titulo = document.getElementById('sectionTitle');
  var nombreCiudad = data.city.name;
  titulo.textContent = nombreCiudad;




  if (data) {
    var diaDeHoy = data.list[0].dt_txt.split(" ")[0];
    var fechaTituloPrimero = document.getElementById('fecha0');
    fechaTituloPrimero.textContent = diaDeHoy;
    let currentDay = null;
    let currentDayData = null;
    var j = 0;
    for (i = 0; i < ((data.list.length) - 1); i++) {
      var date = data.list[i].dt_txt.split(" ")[0];

      if (date !== currentDay) {

        currentDay = date;
        var fechaTitulo = document.getElementById('fecha' + j);
        var temperaturaTitulo = document.getElementById('temp-' + [j]);
        var vientoTitulo = document.getElementById('wind-' + [j]);
        var humedadTitulo = document.getElementById('humidity-' + [j]);
        var iconoTitulo = document.getElementById('icon-' + [j]);
        const iconElement = document.createElement('img');

        fechaTitulo.textContent = date;

        var tempCentigrados = ((data.list[i].main.temp) - 273.15).toFixed(1);
        temperaturaTitulo.textContent = ("Temp: " + tempCentigrados + "°");
        var iconoClima = data.list[i].weather[0].icon;
        var iconSrc = (`http://openweathermap.org/img/w/${iconoClima}.png`);
        iconElement.src = iconSrc;
        iconoTitulo.appendChild(iconElement);
        var clima = data.list[i].weather[0].description;
        var velocidadViento = ((data.list[i].wind.speed) * 3.6).toFixed(1);
        vientoTitulo.textContent = ("Vel: " + velocidadViento + " Km/h");
        var porcentajeHumedad = data.list[i].main.humidity;
        humedadTitulo.textContent = ("Humidity: " + porcentajeHumedad + "%");
        j++;
       
      }
    }
  }


  else {
    console.log("data not available");
  }


}





