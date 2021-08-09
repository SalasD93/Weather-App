var body = document.body;

var navBar = document.createElement('nav');
$(navBar).addClass("navbar navbar-expand-lg navbar-dark bg-dark justify-content-center");
$(navBar).html(`<span class="navbar-brand mb-1 h1">What's the Weather Like?</span>`);

var container = document.createElement('div');
$(container).addClass("container");
var rowDiv = document.createElement('div');
$(rowDiv).addClass("row");
var colDiv = document.createElement('div');
$(colDiv).addClass("col-sm-4");
var cityRowDiv = document.createElement('div');
$(cityRowDiv).addClass("row");
var citySearchColDiv = document.createElement('div');
$(citySearchColDiv).addClass("col-sm-12");
var citySearch = document.createElement('form');
$(citySearch).html(`<span id="city-search">Search for a City: <input id="city-input" type="text"/><input id="add-city" value="Add Item" type="submit"/></span>`);
var cityListColDiv = document.createElement('div');
$(cityListColDiv).addClass("col-sm-12");
var cityList = document.createElement("div");
$(cityList).attr('id', "cities");
$(cityList).attr('style', "border: 5px solid blue; padding: 20px;");
var colDivDiv = document.createElement('div');
$(colDivDiv).addClass("col-sm-8");
var displayRowDiv = document.createElement('div');
$(displayRowDiv).addClass("row");
var displayWeatherColDiv = document.createElement('div');
$(displayWeatherColDiv).addClass("col-sm-12");
$(displayWeatherColDiv).attr('style', "border: 5px solid blue; padding: 20px;");
var weatherCardColDiv = document.createElement('div');
$(weatherCardColDiv).addClass("col-sm-12");
$(weatherCardColDiv).attr('style', "border: 5px solid blue; padding: 20px;");

body.append(navBar);
body.append(container);
$(container).append(rowDiv);
$(rowDiv).append(colDiv);
$(colDiv).append(cityRowDiv);
$(cityRowDiv).append(citySearchColDiv);
$(citySearchColDiv).append(citySearch);
$(cityRowDiv).append(cityListColDiv);
$(cityListColDiv).append(cityList);
$(rowDiv).append(colDivDiv);
$(colDivDiv).append(displayRowDiv);
$(displayRowDiv).append(displayWeatherColDiv);
$(displayRowDiv).append(weatherCardColDiv);

// var API_key = '54e653cb1cf1c02994d2f2adcdfa1673';
// fetch(`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={b0baeba9d3cacf1f845794a43c8d706b}`);
// fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={b0baeba9d3cacf1f845794a43c8d706b}`);
async function getData() {
    // var currentDTGet = localStorage.getItem("current");
    const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=imperial&exclude=minutely&appid=54e653cb1cf1c02994d2f2adcdfa1673`;
    const response = await fetch(api_url);
    const weather = await response.json();
    console.log(weather);
    // const currentDT = weather.current.dt;
    // const currentDTSet = localStorage.setItem("current", currentDT);
}
getData();