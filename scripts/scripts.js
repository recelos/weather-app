const apiKey = config.API_KEY

const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

document.body.addEventListener('keyup', (e) => {
    e.preventDefault()
    if(e.key === 'Enter'){
        document.getElementById('input-btn').click();
    }
})

function actualizePage(){
    let city = document.getElementById("input-text").value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(resp => resp.json())
    .then(response => {
        let latitude = response.coord.lat
        let longitude = response.coord.lon
        console.log(response.weather[0].main)
        getCurrentWeather(response)
        getForecast(latitude, longitude)
    })
    .catch((error) => {
        console.error(error)
    })
}

function getCurrentWeather(response){
    let image = changeBackgroundImage(response.weather[0].main)

    document.body.setAttribute("style", `background-image: url(${image});`)

    let desc = response.weather[0].description.charAt(0).toUpperCase() + response.weather[0].description.slice(1); 


    document.getElementById('display-info').style.opacity = '0'

    setTimeout(() => {
            document.getElementById('city-name').innerHTML      = response.name
            document.getElementById('description').innerHTML    = desc
            document.getElementById('temperature').innerHTML    = `${Math.round(parseFloat(response.main.temp) - 273.15)}&degC`
            document.getElementById('humidity').innerHTML       = `Humidity: ${response.main.humidity}%`
            document.getElementById('pressure').innerHTML       = `Pressure: ${response.main.pressure}hPa`

            document.getElementById('display-info').style.opacity = '1'

        }, 500)
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
        case 'Mist':
        case 'Haze':
        case 'Fog':
            return "'../images/misty.png'";
        case 'Smoke':
            return "'../images/smoke.png'";
        case 'Dust':
        case 'Sand':
            return "'../images/dusty.png'";
        case 'Tornado':
            return "'../images/tornado.png'";
        case 'Squall':
            return "'../images/squall.png'";
        case 'Ash':
            return "'../images/ash.png'";
        default:
            return undefined
    }
}

function onLoad(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
                let { latitude, longitude } = position.coords
                console.log(latitude + " " + longitude)
                sendRequest(latitude, longitude)
                getForecast(latitude, longitude)
            }, () => {
            // If user denies localization access app is going to get weather and forecast from London
            let latitude    = 51.5085
            let longitude   = -0.1257
            sendRequest(latitude, longitude)
            getForecast(latitude, longitude)    
        })
    } else {
        // If geolocalization is not available app is going to get weather and forecast from London
        let latitude    = 51.5085
        let longitude   = -0.1257
        sendRequest(latitude, longitude)
        getForecast(latitude, longitude)
    }
}
function sendRequest(latitude, longitude){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    .then((resp) => resp.json())
    .then((response) => {
            console.log(response)
            getCurrentWeather(response)
        })
    .catch((error) => {
            console.error(error);
        })
}

function getForecast(latitude, longitude) {
    const exclude = "current,hourly,minutely"
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&appid=${apiKey}`)
    .then((resp) => resp.json())
    .then((response) => {
            console.log(response)
            // response.daily.forEach(day => {
            // console.log(weekday[new Date(day.dt*1000).getDay()])
            // });
            actualizeForecast(response)

        })
    .catch((error) => {
            console.error(error);
        })
}

function actualizeForecast(response) {
    for(let i = 1; i <= 5 ; i++){
        document.getElementById(`day${i}`).style.opacity = '0'
    }    

    setTimeout(() => {
        for(let i = 1; i <= 5 ; i++){
            document.getElementById(`day-name${i}`).innerHTML       = weekday[new Date(response.daily[i].dt * 1000).getDay()]
            document.getElementById(`description${i}`).innerHTML    = response.daily[i].weather[0].description.charAt(0).toUpperCase() + response.daily[i].weather[0].description.slice(1)
            document.getElementById(`temperature${i}`).innerHTML    = `${Math.round(parseFloat(response.daily[i].temp['day']) - 273.15)}&degC` 
            document.getElementById(`humidity${i}`).innerHTML       = `Humidity: ${response.daily[i].humidity}%` 
            document.getElementById(`pressure${i}`).innerHTML       = `Pressure: ${response.daily[i].pressure}hPa`
            document.getElementById(`day${i}`).style.opacity        = '1'    
        }
    },500)
}