import getClientLocation from "./clientLocation";
import * as fetch from './fetch'
import * as DOMupdate from './DOMupdate'
import './input'
import './app.css'
import './icons.css'
// import BG_IMG from './img/bg-under-the-cloud.webm'

function app() {

    // let cloudVideo = './img/bg-under-the-cloud.webm'

    // let bg = document.querySelector('.bg-video-src')
    // bg.setAttribute('src', cloudVideo)
    // console.log(bg)

    let netStatus = document.querySelector('.net-status')

    if (!navigator.onLine) {
        console.log("offline")
        netStatus.innerText = 'slow/no internet'
    }

    // standard = kelvin
    // metric = celcius
    // imperial = farenheit
    let unit = 'metric'

    let unitSwitcherBtn = document.querySelector('.switch-btn')
    let unitSwitcherLabel = document.querySelector('.switch-label')

    if (unit === 'metric') {
        unitSwitcherBtn.innerText = '°F'
    } if ((unit === 'imperial')) {
        unitSwitcherBtn.innerText = '°C'
    }

    const showUnitbtn = function (state) {
        unitSwitcherLabel.classList.remove('hidden')
    }

    const hideUnitbtn = function (state) {
        unitSwitcherLabel.classList.add('hidden')
    }

    unitSwitcherBtn.addEventListener('mouseover', showUnitbtn)
    unitSwitcherBtn.addEventListener('mouseleave', hideUnitbtn)

    unitSwitcherLabel.addEventListener('mouseover', showUnitbtn)
    unitSwitcherLabel.addEventListener('mouseleave', hideUnitbtn)

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