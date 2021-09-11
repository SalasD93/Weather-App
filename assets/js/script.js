var body = document.body;
var container = document.querySelector('.container');

// This function accesses the APIs and displays relevant information to the page
var citiesList = JSON.parse(localStorage.getItem("searched")) || [];
// This sets the value for page revisit to last city searched or NY on first visit
var cityValue = citiesList[0] || "New York";
$('#add-city').on('click', (event) => {
    event.preventDefault();
    cityValue = $('#city-input').val();
    console.log(cityValue);
    console.log(citiesList);
    getData(cityValue);
    addCityToHistory(cityValue);
    displayHistory(cityValue);
});

function addCityToHistory(cityValue) {
    // Add city value to city list
    // This prevents duplicates in array for buttons
    if (citiesList.indexOf(cityValue) === -1) {
        citiesList.unshift(cityValue);
    }
    // Added to prevent inifinite array / limit button ouputs / readd city to recent searches due to indexOf preventing addition of dupicates
    citiesList.splice(5);
    // Save to localStorage
    localStorage.setItem("searched", JSON.stringify(citiesList));
}

function displayHistory(cityValue) {
    // Get the list of cities from the history
    // Loop for every city in list
    document.querySelector("#city-list").innerHTML = "";
    for (let c = 0; c < citiesList.length; c++) {
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
    const lat = weather2.coord.lat;
    const lon = weather2.coord.lon;

    // This api gets information based off lat lon information from city api
    const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely&appid=54e653cb1cf1c02994d2f2adcdfa1673`;
    const response = await fetch(api_url);
    const weather = await response.json();
    
    // This section gets info for current weather and displays it
    const city = weather2.name;
    const currentDate = moment.unix(weather2.dt).format("MM/DD/YYYY");
    const currentIcon = weather.current.weather[0].icon;
    const curIconUrl = `https://openweathermap.org/img/wn/${currentIcon}.png`;
    const curIconImg = document.createElement('img');
    $(curIconImg).attr('src', curIconUrl);
    const dispCity = document.createElement('h1');
    $(dispCity).text(city + ' (' + currentDate + ')');
    $(dispCity).append(curIconImg);
    $("#current-weather").append(dispCity);
    const currentTemp = 'Temp: ' + weather2.main.temp + '°F' + '<br>';
    $("#current-weather").append(currentTemp);
    const currentWind = 'Wind: ' + weather2.wind.speed + 'MPH' + '<br>';
    $("#current-weather").append(currentWind);
    const currentHumidity = 'Humidity: ' + weather2.main.humidity + '%' + '<br>';
    $("#current-weather").append(currentHumidity);
    // This changes the color for the index
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
    $("#current-weather").append(currentUV);

    // This loops through daily array for first 5 items / creates weather cards / displays relevant information
    for (var i = 1; i < 6; i++) {
        const daily = weather.daily;
        // This converts unix date to standard date
        const date = moment.unix(daily[i].dt).format("MM/DD/YYYY");
        const icon = daily[i].weather[0].icon;
        const temp = daily[i].temp.day;
        const windSpeed = daily[i].wind_speed;
        const humidity = daily[i].humidity;
        const iconUrl= `https://openweathermap.org/img/wn/${icon}.png`;

        // This section creates the weather cards and adds the content
        var weatherCard = document.createElement('div');
        $(weatherCard).attr('style', "opacity: 0.65");
        $(weatherCard).addClass("card col-sm-2");
        $("#display-cards").append(weatherCard);
        var headerDate = document.createElement('h5');
        $(headerDate).text(date);
        $(headerDate).attr('style', "align-self: center");
        $(weatherCard).append(headerDate);
        var iconImg = document.createElement('img');
        $(iconImg).attr('id', "iconImg")
        $(iconImg).attr('src', iconUrl);
        $(iconImg).attr('width', "50%");
        $(iconImg).attr('height', "25%");
        $(iconImg).attr('style', "align-self: center");
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