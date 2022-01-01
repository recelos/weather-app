const apiKey = config.API_KEY

const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

function getInfo(){
    var city = document.getElementById("input-text").value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(function(resp) {
        return resp.json() 
    })
    .then(function(response) {
        let latitude = response.coord.lat
        let longitude = response.coord.lon
        console.log(latitude + " " + longitude)
        actualizePage(response)
        getForecast(latitude, longitude)
    })
    .catch(function(error)  {
        console.error(error)
    })
}

function actualizePage(response){
    console.log(changeBackgroundImage(response.weather[0].main))

    var image = changeBackgroundImage(response.weather[0].main)

    document.body.setAttribute("style", `background-image: url(${image});`)

    var desc = response.weather[0].description.charAt(0).toUpperCase() + response.weather[0].description.slice(1); 

    document.getElementById('city-name').innerHTML = response.name
    document.getElementById('description').innerHTML = desc
    document.getElementById('temperature').innerHTML = `Temperature: ${Math.round(parseFloat(response.main.temp) - 273.15)}&degC`
    document.getElementById('humidity').innerHTML = `Humidity: ${response.main.humidity}%`
    document.getElementById('pressure').innerHTML = `Pressure: ${response.main.pressure}hPa`

}
function changeBackgroundImage(weather){
    switch(weather){
        case 'Clouds':
            return "'../images/cloudy.png'";
        case 'Clear':
            return "'../images/sunny.png'";
        case 'Snow':
            return "'../images/snowy.png'";
        case 'Thunderstorm':
            return "'../images/stormy.png'";
        case 'Rain':
        case 'Drizzle':
            return "'../images/rainy.png'";

        default:
            return undefined
    }
}

function onLoad(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            let { latitude, longitude } = position.coords
            console.log(latitude + " " + longitude)
            sendRequest(latitude, longitude)
            getForecast(latitude, longitude)
        }, () => {
            // If user denies localization access app is going to get weather and forecast from London
            let latitude = 51.5085
            let longitude = -0.1257
            sendRequest(latitude, longitude)
            getForecast(latitude, longitude)    
        })
    } else {
        // If geolocalization is not available app is going to get weather and forecast from London
        let latitude = 51.5085
        let longitude = -0.1257
        sendRequest(latitude, longitude)
        getForecast(latitude, longitude)
    }

}
function sendRequest(latitude, longitude){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    .then(function(resp) {
        return resp.json() 
    })
    .then(function(response) {
        console.log(response)
        actualizePage(response)
    })
    .catch(function(error) {
        console.error(error)
    })
}

function getForecast(latitude, longitude) {
    let exclude = "current,hourly,minutely"
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&appid=${apiKey}`)
    .then(function(resp) {
        return resp.json()
    })
    .then(function(response) {
        console.log(response)
        // response.daily.forEach(day => {
        // console.log(weekday[new Date(day.dt*1000).getDay()])
        // });
        actualizeForecast(response)

    })
    .catch(function(error){
        console.error(error)
    })
}

function actualizeForecast(response) {
    // Set variables for first forecast
    var week_name = weekday[new Date(response.daily[1].dt * 1000).getDay()]
    var desc      = response.daily[1].weather[0].description.charAt(0).toUpperCase() + response.daily[1].weather[0].description.slice(1)
    var temp      = `Temperature: ${Math.round(parseFloat(response.daily[1].temp['day']) - 273.15)}&degC`  
    var humi      = `Humidity: ${response.daily[1].humidity}%`
    var press     = `Pressure: ${response.daily[1].pressure}hPa` 
    // Change value for first forecast divs
    document.getElementById('day-name1').innerHTML      = week_name
    document.getElementById('description1').innerHTML   = desc
    document.getElementById('temperature1').innerHTML   = temp
    document.getElementById('humidity1').innerHTML      = humi
    document.getElementById('pressure1').innerHTML      = press

    // Set variables for second forecast
    week_name = weekday[new Date(response.daily[2].dt * 1000).getDay()]
    desc      = response.daily[2].weather[0].description.charAt(0).toUpperCase() + response.daily[2].weather[0].description.slice(1)
    temp      = `Temperature: ${Math.round(parseFloat(response.daily[2].temp['day']) - 273.15)}&degC`  
    humi      = `Humidity: ${response.daily[2].humidity}%`
    press     = `Pressure: ${response.daily[2].pressure}hPa` 
    // Change value for second forecast divs
    document.getElementById('day-name2').innerHTML      = week_name
    document.getElementById('description2').innerHTML   = desc
    document.getElementById('temperature2').innerHTML   = temp
    document.getElementById('humidity2').innerHTML      = humi
    document.getElementById('pressure2').innerHTML      = press

    // Set variables for third forecast
    week_name = weekday[new Date(response.daily[3].dt * 1000).getDay()]
    desc      = response.daily[3].weather[0].description.charAt(0).toUpperCase() + response.daily[3].weather[0].description.slice(1)
    temp      = `Temperature: ${Math.round(parseFloat(response.daily[3].temp['day']) - 273.15)}&degC`  
    humi      = `Humidity: ${response.daily[3].humidity}%`
    press     = `Pressure: ${response.daily[3].pressure}hPa` 
    // Change value for third forecast divs
    document.getElementById('day-name3').innerHTML      = week_name
    document.getElementById('description3').innerHTML   = desc
    document.getElementById('temperature3').innerHTML   = temp
    document.getElementById('humidity3').innerHTML      = humi
    document.getElementById('pressure3').innerHTML      = press

    // Set variables for fourth forecast
    week_name = weekday[new Date(response.daily[4].dt * 1000).getDay()]
    desc      = response.daily[4].weather[0].description.charAt(0).toUpperCase() + response.daily[4].weather[0].description.slice(1)
    temp      = `Temperature: ${Math.round(parseFloat(response.daily[4].temp['day']) - 273.15)}&degC`  
    humi      = `Humidity: ${response.daily[4].humidity}%`
    press     = `Pressure: ${response.daily[4].pressure}hPa` 
    // Change value for fourth forecast divs
    document.getElementById('day-name4').innerHTML      = week_name
    document.getElementById('description4').innerHTML   = desc
    document.getElementById('temperature4').innerHTML   = temp
    document.getElementById('humidity4').innerHTML      = humi
    document.getElementById('pressure4').innerHTML      = press

    // Set variables for fifth forecast
    week_name = weekday[new Date(response.daily[5].dt * 1000).getDay()]
    desc      = response.daily[5].weather[0].description.charAt(0).toUpperCase() + response.daily[5].weather[0].description.slice(1)
    temp      = `Temperature: ${Math.round(parseFloat(response.daily[5].temp['day']) - 273.15)}&degC`  
    humi      = `Humidity: ${response.daily[5].humidity}%`
    press     = `Pressure: ${response.daily[5].pressure}hPa` 
    // Change value for fifth forecast divs
    document.getElementById('day-name5').innerHTML      = week_name
    document.getElementById('description5').innerHTML   = desc
    document.getElementById('temperature5').innerHTML   = temp
    document.getElementById('humidity5').innerHTML      = humi
    document.getElementById('pressure5').innerHTML      = press
}