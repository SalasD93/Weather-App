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
// $(displayRowDiv).attr('style', `background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Burning_Yellow_Sunset.jpg/320px-Burning_Yellow_Sunset.jpg)`);
$(displayRowDiv).addClass("row");
var displayWeatherColDiv = document.createElement('div');
$(displayWeatherColDiv).addClass("col-sm-12");
$(displayWeatherColDiv).attr('style', "border: 5px solid blue; padding: 20px;");
var weatherCardColDiv = document.createElement('div');
$(weatherCardColDiv).addClass("col-sm-12 pic");
$(weatherCardColDiv).attr('style', "border: 5px solid blue;");
// $(weatherCardColDiv).attr('style', `background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Burning_Yellow_Sunset.jpg/320px-Burning_Yellow_Sunset.jpg)`);
var displayCardRowDiv = document.createElement('div');
$(displayCardRowDiv).addClass("row justify-content-between");
// $(displayWeatherRowDiv).attr('style', `background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Burning_Yellow_Sunset.jpg/320px-Burning_Yellow_Sunset.jpg)`);
// var weatherCardA = document.createElement('div');
// $(weatherCardA).attr('style', "height: 250px");
// $(weatherCardA).attr('id', "card1");
// $(weatherCardA).addClass("card col-sm-2");
// var weatherCardB = document.createElement('div');
// $(weatherCardB).attr('style', "height: 250px");
// $(weatherCardB).attr('id', "card2");
// $(weatherCardB).addClass("card col-sm-2");
// var weatherCardC = document.createElement('div');
// $(weatherCardC).attr('style', "height: 250px");
// $(weatherCardC).attr('id', "card3");
// $(weatherCardC).addClass("card col-sm-2");
// var weatherCardD = document.createElement('div');
// $(weatherCardD).attr('style', "height: 250px");
// $(weatherCardD).attr('id', "card4");
// $(weatherCardD).addClass("card col-sm-2");
// var weatherCardE = document.createElement('div');
// $(weatherCardE).attr('style', "height: 250px");
// $(weatherCardE).attr('id', "card5");
// $(weatherCardE).addClass("card col-sm-2");

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
$(weatherCardColDiv).append(displayCardRowDiv);
// $(displayCardRowDiv).append(weatherCardA);
// $(displayCardRowDiv).append(weatherCardB);
// $(displayCardRowDiv).append(weatherCardC);
// $(displayCardRowDiv).append(weatherCardD);
// $(displayCardRowDiv).append(weatherCardE);

// var API_key = '54e653cb1cf1c02994d2f2adcdfa1673';
// fetch(`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={b0baeba9d3cacf1f845794a43c8d706b}`);
// fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={b0baeba9d3cacf1f845794a43c8d706b}`);
async function getData() {
    const api_url2 = `https://api.openweathermap.org/data/2.5/weather?q=Tampa&units=imperial&exclude=minutely&appid=54e653cb1cf1c02994d2f2adcdfa1673`;
    const response2 = await fetch(api_url2);
    const weather2 = await response2.json();
    console.log(weather2);
    // var currentDTGet = localStorage.getItem("current");
    const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${weather2.coord.lat}&lon=${weather2.coord.lon}&units=imperial&exclude=minutely&appid=54e653cb1cf1c02994d2f2adcdfa1673`;
    const response = await fetch(api_url);
    const weather = await response.json();
    console.log(weather);
    // const currentDT = weather.current.dt;
    // const currentDTSet = localStorage.setItem("current", currentDT);

    // need an array that stores 5 day forecast info and creates each weather card
        //date, icon, temp, wind, humidity
        // need to convert dt to date format
        for (var i = 0; i < 5; i++) {
            const daily = weather.daily;
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

            var weatherCard = document.createElement('div');
            // $(weatherCard).attr('style', "height: 250px");
            $(weatherCard).addClass("card col-sm-2");
            $(displayCardRowDiv).append(weatherCard);
            var headerDate = document.createElement('h6');
            $(headerDate).text(date);
            $(weatherCard).append(headerDate);
            var iconImg = document.createElement('img');
            $(iconImg).attr('src', iconUrl);
            // use similar attr for height and for width
            $(weatherCard).append(iconImg);
            var dispTemp = document.createElement('p');
            $(dispTemp).text(temp + '°F');
            $(weatherCard).append(dispTemp);
            var dispWind = document.createElement('p');
            $(dispWind).text(windSpeed + 'MPH');
            $(weatherCard).append(dispWind);
            var dispHumidity = document.createElement('p');
            $(dispHumidity).text(humidity + '%');
            $(weatherCard).append(dispHumidity);
        }
    // const cardArray = [daily[0].dt, daily[0].weather.icon, daily[0].temp.daily, daily[0].wind_speed, daily[0].humidity];
}
getData();