import getClientLocation from "./clientLocation";
import * as fetch from './fetch'
import * as DOMupdate from './DOMupdate'
import './input'
import './app.css'
import './icons.css'
// import BG_IMG from './img/bg-under-the-cloud.webm'

function app() {

    let bg = document.querySelector('.bg-img')


    let unit = 'metric'

    const clientLocation = async function () {
        let clientGeo = await getClientLocation;
        let coords = {
            lat: clientGeo.coords.latitude,
            lon: clientGeo.coords.longitude
        }

        let forcast = await fetch.getWeather(coords, unit)
        DOMupdate.updateMainData(forcast.locations, forcast.forcast, forcast.unit, forcast.forcast.name)
    }

    clientLocation()
}

export default app;