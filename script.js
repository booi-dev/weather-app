const API_KEY = 'c613a13b184358c24caf13e21b9f03f0'

const url = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}'

const getCoor = function () {

}

const getCoordinate = async function (url) {
    const response = await fetch(url);
    console.log(response)

}

