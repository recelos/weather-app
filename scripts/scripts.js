var apiKey = '6f2b628794734822e42c8fec95bbfeba';


function getInfo(){
    let city = document.getElementById("input-text").value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey)
    .then(function(resp) { return resp.json() })
    .then(function(response) {
        console.log(response)
        actualizePage(response)
    })
    .catch()
}

function actualizePage(response){
    document.getElementById('city-name').innerHTML = response.name
    document.getElementById('description').innerHTML = response.weather[0].description
    document.getElementById('temperature').innerHTML = 'Temperature: ' + Math.round(parseFloat(response.main.temp)-273.15) + '&degC'
    document.getElementById('humidity').innerHTML = 'Humidity: ' + response.main.humidity + '%'
}


