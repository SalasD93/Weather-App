var body = document.body;

var container = document.querySelector('.container');

// This function accesses the APIs and displays relevant information to the page
var citiesList = JSON.parse(localStorage.getItem("searched")) || [];
var cityValue = "New York";
$('#add-city').on('click', (event) => {
    event.preventDefault();
    cityValue = $('#city-input').val();
    console.log(cityValue);
    console.log(citiesList);
    getData(cityValue);
    addCityToHistory(cityValue);
    displayHistory(cityValue);
});
// how to add something to front of list

function addCityToHistory(cityValue) {
    //add city value to city list
    // This prevents duplicates in array for buttons
    if (citiesList.indexOf(cityValue) === -1) {
        citiesList.unshift(cityValue);
    }
    citiesList.splice(5);
    //save to localStorage
    localStorage.setItem("searched", JSON.stringify(citiesList));
}

function displayHistory(cityValue) {
    // get the list of cities from the history
    // const searchedCities = localStorage.getItem("searched").split(",");
    console.log(citiesList);
        //loop for every city in list
        document.querySelector("#city-list").innerHTML = "";
        for (let c = 0; c < citiesList.length && c < 5; c++) {
            if (citiesList[c] !== '') {
                //make button
                document.querySelector("#city-list").innerHTML += `<button type="button" class="btn btn-info mx-1 my-2 cityBtn">${citiesList[c]}</button>`;
            }
        }
        // cityBtn click is same as submit: getData with city name for button text
        $(".cityBtn").on('click', (cityValue) => {
            // cityValue = this.$(".cityBtn").text()
            getData(cityValue.target.innerText);
        });
}
// This function holds the api calls and displays the api information
async function getData(cityValue) {
    // This empties the html to display new html instead of adding more
    $("#current-weather").html("");
    $("#display-cards").html("");
    // This api gets information by city to pass to api for lat lon
    const api_url2 = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=imperial&exclude=minutely&appid=54e653cb1cf1c02994d2f2adcdfa1673`;
    const response2 = await fetch(api_url2);
    const weather2 = await response2.json();
    console.log(weather2);
    const lat = weather2.coord.lat;
    const lon = weather2.coord.lon;

    
    // This api gets information based off lat lon information from city api
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
    $("#current-weather").append(dispCity);
    const currentTemp = 'Temp: ' + weather2.main.temp + '°F' + '<br>';
    // $(currentTemp).attr('style', "font-size: 2rem");
    console.log(currentTemp);
    $("#current-weather").append(currentTemp);
    const currentWind = 'Wind: ' + weather2.wind.speed + 'MPH' + '<br>';
    // $(currentWind).attr('style', "font-size: 2rem");
    console.log(currentWind);
    $("#current-weather").append(currentWind);
    const currentHumidity = 'Humidity: ' + weather2.main.humidity + '%' + '<br>';
    // $(currentHumidity).attr('style', "font-size: 2rem");
    console.log(currentHumidity);
    $("#current-weather").append(currentHumidity);
    var uviId = "";
    if (weather.current.uvi <= 2) {
        uviId = "uviG";
    } else if (weather.current.uvi >= 3 && weather.current.uvi <= 5) {
        uviId = "uviY";
    } else if (weather.current.uvi >= 6 && weather.current.uvi <= 7) {
        uviId = "uviO";
    } else if (weather.current.uvi >= 8 && weather.current.uvi <= 10) {
        uviId = "uviR";
    }
    const UVI = `<span id=${uviId}>${weather.current.uvi}</span>`;
    const currentUV = 'UV Index: ' + UVI;
    console.log(currentUV);
    $("#current-weather").append(currentUV);

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
        $("#display-cards").append(weatherCard);
        var headerDate = document.createElement('h5');
        $(headerDate).text(date);
        $(headerDate).attr('style', "align-self: center");
        $(weatherCard).append(headerDate);
        var iconImg = document.createElement('img');
        $(iconImg).attr('src', iconUrl);
        $(iconImg).attr('width', "50%");
        $(iconImg).attr('height', "30%");
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
    getData(cityValue);