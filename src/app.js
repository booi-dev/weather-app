import getClientLocation from "./clientLocation";
import * as fetch from './fetch'
import * as DOMupdate from './DOMupdate'
import './input'
import './app.css'

function app() {

    const form = document.querySelector('.form');

    let unit = 'metric'

    // DOMupdate.updateTodayData()

    const clientLocation = async function () {
        let clientGeo = await getClientLocation;
        let coords = {
            lat: clientGeo.coords.latitude,
            lon: clientGeo.coords.longitude
        }

        let forcast = await fetch.getWeather(coords, unit)
        DOMupdate.updateMainData(forcast.locations, forcast.forcast, forcast.unit)
    }

    clientLocation()

    const getForcastThroughInput = async function () {
        const inputField = document.querySelector('.input-field');
        let coords = {
            lat: inputField.dataset.lat,
            lon: inputField.dataset.lon
        }
        let forcast = await fetch.getWeather(coords, unit)
        DOMupdate.updateMainData(forcast.locations, forcast.forcast, forcast.unit)
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        getForcastThroughInput()
    })

}

export default app;