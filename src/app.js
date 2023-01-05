import { getGeoCoordURL, getForcastURL, getGeoCoords, getForcast } from './fetch'
import './input'
import './app.css'

function app() {

    const submitBtn = document.querySelector('.submit-btn');
    const form = document.querySelector('.form');

    let unit = 'metric'

    const getWeather = async function (e) {
        e.preventDefault()
        const inputField = document.querySelector('.input-field');

        let coords = {
            lat: inputField.dataset.lat,
            lon: inputField.dataset.lon
        }

        let forcastURL = getForcastURL(coords, unit)
        let forcast = await getForcast(forcastURL)
        console.log(forcast)
    }

    form.addEventListener('submit', getWeather)
}

export default app;