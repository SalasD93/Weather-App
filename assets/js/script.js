var body = document.body;

var navBar = document.createElement('nav');
$(navBar).addClass("navbar navbar-expand-lg navbar-dark bg-dark justify-content-center");
$(navBar).html(`<span class="navbar-brand mb-1 h1">What's the Weather Like?</span>`);

var container = document.createElement('div');
$(container).addClass("container");
var rowDiv = document.createElement('div');
$(rowDiv).addClass("row");
var colDiv = document.createElement('div');
$(colDiv).addClass("col-sm-3");
var cityRowDiv = document.createElement('div');
$(cityRowDiv).addClass("row");
var citySearchColDiv = document.createElement('div');
$(citySearchColDiv).addClass("col-sm-12");
// this is for the city input box
var citySearch = document.createElement('div');
$(citySearch).html(`<p id="city-search">Search for a City:</p><input id="city-input" type="text"/><input id="add-city" value="SUBMIT" type="submit"/>`);

// var cityInput = $(`<input id="city-input" type="text"></input>`);
// $(cityInput).attr('id', "city-input");
// $(cityInput).attr('type', "text");
// var citySubmitBtn = document.createElement('button');
// $(citySubmitBtn).attr('id', "add-city");
var cityListColDiv = document.createElement('div');
$(cityListColDiv).addClass("col-sm-12");
var cityList = document.createElement("div");
// $(cityList).addClass("buttons is-centered")
$(cityList).attr('id', "city-list");
$(cityList).attr('style', "border: 5px solid blue;");
var colDivDiv = document.createElement('div');
$(colDivDiv).addClass("col-sm-9");
var displayRowDiv = document.createElement('div');
// $(displayRowDiv).attr('style', `background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Burning_Yellow_Sunset.jpg/320px-Burning_Yellow_Sunset.jpg)`);
$(displayRowDiv).addClass("row");
var displayWeatherColDiv = document.createElement('div');
$(displayWeatherColDiv).addClass("col-sm-12");
$(displayWeatherColDiv).attr('style', "border: 5px solid blue; padding: 20px; font-size: 1.5rem;");
var weatherCardColDiv = document.createElement('div');
$(weatherCardColDiv).addClass("col-sm-12 pic");
$(weatherCardColDiv).attr('style', "border: 5px solid blue;");
// $(weatherCardColDiv).attr('style', `background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Burning_Yellow_Sunset.jpg/320px-Burning_Yellow_Sunset.jpg)`);
var displayCardRowDiv = document.createElement('div');
$(displayCardRowDiv).addClass("row justify-content-between");
// This sections appends the above to the page
body.append(navBar);
body.append(container);
$(container).append(rowDiv);
$(rowDiv).append(colDiv);
$(colDiv).append(cityRowDiv);
$(cityRowDiv).append(citySearchColDiv);
$(citySearchColDiv).append(citySearch);
// $(citySearch).append(cityInput);
// $(citySearch).append(citySubmitBtn);
$(cityRowDiv).append(cityListColDiv);
$(cityListColDiv).append(cityList);
$(rowDiv).append(colDivDiv);
$(colDivDiv).append(displayRowDiv);
$(displayRowDiv).append(displayWeatherColDiv);
$(displayRowDiv).append(weatherCardColDiv);
$(weatherCardColDiv).append(displayCardRowDiv);

// This function accesses the APIs and displays relevant information to the page
var citiesList = [];
$('#add-city').on('click', (event) => {
    var cityValue = $('#city-input').val();
    event.preventDefault();
    console.log(cityValue);
    console.log(citiesList);
    getData(cityValue);
    addCityToHistory(cityValue);
});
// how to add something to front of list

function addCityToHistory(cityValue) {
    citiesList.unshift(cityValue);
    //add city value to city list
    //save to localStorage
    localStorage.setItem("searched", citiesList);
}

function displayHistory(cityValue) {
    // get the list of cities from the history
    const searchedCities = localStorage.getItem("searched").split(",");
    console.log(searchedCities);
        //loop for every city in list
        for (let c = 0; c < searchedCities.length && c < 5; c++) {
            //make button
            document.querySelector("#city-list").innerHTML += `<button type="button" class="btn btn-info" id="cityBtn">${searchedCities[c]}</button>`
        }
        //click is same as submit: getData with city name for button text
        $("#cityBtn").on('click', (cityValue) => {
            cityValue = $("#cityBtn").text()
            getData(cityValue);
        })
}

async function getData(cityValue) {
    // this is for api city
    $(displayWeatherColDiv).html("");
    $(displayCardRowDiv).html("");
    // var nameOfCity = localStorage.getItem(index);
    const api_url2 = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=imperial&exclude=minutely&appid=54e653cb1cf1c02994d2f2adcdfa1673`;
    const response2 = await fetch(api_url2);
    const weather2 = await response2.json();
    console.log(weather2);
    const lat = weather2.coord.lat;
    const lon = weather2.coord.lon;

    
    // var currentDTGet = localStorage.getItem("current");
    const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely&appid=54e653cb1cf1c02994d2f2adcdfa1673`;
    const response = await fetch(api_url);
    const weather = await response.json();
    console.log(weather);
    
    // This section gets info for current weather and displays it
    const city = weather2.name;
    console.log(city);
    const currentDate = moment.unix(weather2.dt).format("MM/DD/YYYY");
    console.log(currentDate);
    const currentIcon = weather.current.weather[0].icon;
    console.log(currentIcon);
    const curIconUrl = `https://openweathermap.org/img/wn/${currentIcon}.png`;
    console.log(curIconUrl);
    const curIconImg = document.createElement('img');
    $(curIconImg).attr('src', curIconUrl);
    const dispCity = document.createElement('h1');
    $(dispCity).text(city + ' (' + currentDate + ')');
    $(dispCity).append(curIconImg);
    $(displayWeatherColDiv).append(dispCity);
    const currentTemp = 'Temp: ' + weather2.main.temp + '°F' + '<br>';
    // $(currentTemp).attr('style', "font-size: 2rem");
    console.log(currentTemp);
    $(displayWeatherColDiv).append(currentTemp);
    const currentWind = 'Wind: ' + weather2.wind.speed + 'MPH' + '<br>';
    // $(currentWind).attr('style', "font-size: 2rem");
    console.log(currentWind);
    $(displayWeatherColDiv).append(currentWind);
    const currentHumidity = 'Humidity: ' + weather2.main.humidity + '%' + '<br>';
    // $(currentHumidity).attr('style', "font-size: 2rem");
    console.log(currentHumidity);
    $(displayWeatherColDiv).append(currentHumidity);
    const currentUV = 'UV Index: ' + `<span id="uvi">${weather.current.uvi}</span>`;
    // $("uvi").css('background-color', "green");
    console.log(currentUV);
    const uviColor = document.getElementById("uvi");
    $(uviColor).attr('style', "background-color: green");
    $(displayWeatherColDiv).append(currentUV);

    // need empty array for cities
        // every time a city is input a button is created and stored in LS
        // need to = button text to input val on click
        // var answers = document.createElement('div');
        // $(answers).attr('id', "cities");
        // $(answers).addClass("buttons is-centered");
        // $(question).text("What are you in the mood for?");
        
        // This loops through daily array for first 5 items / creates weather cards / displays relevant information
        for (var i = 1; i < 6; i++) {
            const daily = weather.daily;
            // This converts unix date to standard date
            const date = moment.unix(daily[i].dt).format("MM/DD/YYYY");
            console.log(date);
            const icon = daily[i].weather[0].icon;
            console.log(icon);
            const temp = daily[i].temp.day;
            console.log(temp);
            const windSpeed = daily[i].wind_speed;
            console.log(windSpeed);
            const humidity = daily[i].humidity;
            console.log(humidity);
            const iconUrl= `https://openweathermap.org/img/wn/${icon}.png`;
            console.log(iconUrl);
            // This section creates the weather cards and adds the content
            var weatherCard = document.createElement('div');
            // $(weatherCard).attr('style', "height: 250px");
            $(weatherCard).addClass("card col-sm-2");
            $(displayCardRowDiv).append(weatherCard);
            var headerDate = document.createElement('h5');
            $(headerDate).text(date);
            $(headerDate).attr('style', "align-self: center");
            $(weatherCard).append(headerDate);
            var iconImg = document.createElement('img');
            $(iconImg).attr('src', iconUrl);
            $(iconImg).attr('width', "50%");
            $(iconImg).attr('height', "50%");
            $(weatherCard).append(iconImg);
            var dispTemp = document.createElement('p');
            $(dispTemp).text('Temp: ' + temp + '°F');
            $(dispTemp).attr('style', "font-size: .9rem");
            $(weatherCard).append(dispTemp);
            var dispWind = document.createElement('p');
            $(dispWind).text('Wind: ' + windSpeed + 'MPH');
            $(dispWind).attr('style', "font-size: .9rem");
            $(weatherCard).append(dispWind);
            var dispHumidity = document.createElement('p');
            $(dispHumidity).text('Humidity: ' + humidity + '%');
            $(dispHumidity).attr('style', "font-size: .9rem");
            $(weatherCard).append(dispHumidity);
        }
    }
    displayHistory();
    // getData();