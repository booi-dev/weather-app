
// function fetch() {

const API_KEY = 'c613a13b184358c24caf13e21b9f03f0'

const getGeoCoordURL = function (city, limit) {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${API_KEY}`
}

const getForcastURL = function (coords, unit) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=${unit}`
}

const getGeoCoords = async function (url) {
    // let coordinate;
    try {
        const response = await fetch(url);
        const cityData = await response.json();
        const { ...data } = cityData;
        // coordinate = data[0];
        // console.log(data)
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
        forcast.weather = weatherData.weather;
        // console.log(weatherData)
        return forcast;
    } catch (error) {
        console.log(error)
    }


}

// standard = kelvin
// metric = celcius
// imperial = farenheit

// buildGeoCoordURL(coordinateURL)
// let corshfsdh = { lat: 51.5073219, lon: -0.1276474 }
// let forCastURL = buildForcastURL(corshfsdh, 'imperial')
// getForcast(forCastURL)

// return { buildGeoCoordURL, buildForcastURL, getGeoCoords, getForcast }

// }

export { getGeoCoordURL, getForcastURL, getGeoCoords, getForcast }