import getClientLocation from "./clientLocation";
import * as fetch from './fetch'
import * as INPUT from './input'
import * as TEMP from "./temp";
import * as DOMupdate from './DOMupdate'
// import './input'
import './app.css'
// import './img.css'
import './icons.css'
import './loadingAnim.css'

function app() {

    // CHECK INTERNET STATUS AND INFORM

    let netStatus = document.querySelector('.net-status')

    if (!navigator.onLine) {
        console.log("offline")
        netStatus.innerText = 'slow/no internet'
    }

    // APP BG IMG 

    DOMupdate.updateBgImg()


    // GET CLIENT LOCATION AND FETCH WEATHER DATA

    const clientLocation = async function () {
        let unit = TEMP.getUnit();
        let clientGeo = await getClientLocation;
        let coords = {
            lat: clientGeo.coords.latitude,
            lon: clientGeo.coords.longitude
        }
        let forcast = await fetch.getWeather(coords, unit)
        DOMupdate.updateMainData(forcast.locations, forcast.forcast, forcast.unit, forcast.forcast.name)
    }

    clientLocation()

    // INPUT HANDLING

    INPUT.setInputEventListener()
    INPUT.changeInputPosition()

    var mediaQuery = window.matchMedia("(max-width: 500px)")
    mediaQuery.addEventListener('change', INPUT.changeInputPosition)
}

export default app;
