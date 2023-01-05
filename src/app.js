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
        console.log(clientGeo)
        let coords = {
            lat: clientGeo.coords.latitude,
            lon: clientGeo.coords.longitude
        }

        let forcastURL = fetch.getForcastURL(coords, unit)
        let forcast = await fetch.getForcast(forcastURL)

        DOMupdate.updateTodayData(forcast)
    }

    clientLocation()

    const getForcastThroughInput = async function (params) {
        let forcast = await fetch.getWeather(unit)
        DOMupdate.updateTodayData(forcast)
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        getForcastThroughInput()

        // DOMupdate.updateTodayData(locationName, locationTemp)
    })

}

export default app;