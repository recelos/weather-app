var apiKey = config.API_KEY


function getInfo(){
    let city = document.getElementById("input-text").value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey)
    .then(function(resp) {
        return resp.json() 
    })
    .then(function(response) {
        console.log(response)
        actualizePage(response)
    })
    .catch(() => {
        throw new TypeError()
    })
}


function actualizePage(response){
    console.log(changeBackgroundImage(response.weather[0].main))

    var image = changeBackgroundImage(response.weather[0].main)

    document.body.setAttribute("style", "background-image: url(" + image + ");")

    var desc = response.weather[0].description.charAt(0).toUpperCase() + response.weather[0].description.slice(1); 

    document.getElementById('city-name').innerHTML = response.name
    document.getElementById('description').innerHTML = desc
    document.getElementById('temperature').innerHTML = 'Temperature: ' + Math.round(parseFloat(response.main.temp)-273.15) + '&degC'
    document.getElementById('humidity').innerHTML = 'Humidity: ' + response.main.humidity + '%'
    document.getElementById('pressure').innerHTML = 'Pressure: ' + response.main.pressure + 'hPa'

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
        })
    }

}
function sendRequest(latitude, longitude){
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon="+ longitude + "&appid=" + apiKey)
    .then(function(resp) {
        return resp.json() 
    })
    .then(function(response) {
        console.log(response)
        actualizePage(response)
    })
    .catch(() => {
        throw new TypeError()
    })
}