
// function fetch() {

const API_KEY = 'c613a13b184358c24caf13e21b9f03f0'

const getGeoCoordURL = function (city, limit) {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${API_KEY}`
}

const getForcastURL = function (coords, unit) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=${unit}&appid=${API_KEY}`


    // return `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely&units=${unit}&appid=${API_KEY}`
}

const getReverseGeoCodingURL = function (coords) {
    return `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.lon}&limit=1&appid=${API_KEY}`
}

const getGeoCoords = async function (url) {
    try {
        const response = await fetch(url);
        const cityData = await response.json();
        return cityData;
    } catch (error) {
        console.log(error)
    }
}

const getForcast = async function (url) {
    let forcast = {}
    try {
        const response = await fetch(url);
        const weatherData = await response.json();
        forcast.name = weatherData.name;
        forcast.main = weatherData.main;
        forcast.weather = weatherData.weather[0];
        forcast.windspeed = weatherData.wind.speed;
        forcast.date = weatherData.dt;
        forcast.timezone = weatherData.timezone;
        // console.log(weatherData)
        // console.log(forcast)
        return forcast;
    } catch (error) {
        console.log(error)
    }
}

const reverseGeoCoding = async function (url) {
    const response = await fetch(url);
    const geoLocation = await response.json();
    const location = geoLocation[0]
    return location;
}


const getWeather = async function (coords, unit) {
    // console.log("getting weather")

    let reverseGeoURl = getReverseGeoCodingURL(coords)
    let locations = await reverseGeoCoding(reverseGeoURl)

    let forcastURL = getForcastURL(coords, unit)
    let forcast = await getForcast(forcastURL)

    return { locations, forcast, unit };
}

export {
    getGeoCoordURL,
    getForcastURL,
    getReverseGeoCodingURL,
    getGeoCoords,
    getForcast,
    reverseGeoCoding,
    getWeather
}