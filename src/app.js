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

    let unitswitcherLabel = document.querySelector('.unit-switch-btn')
    let switcherBtn = document.querySelector('.switch-btn')
    let switcherLabel = document.querySelector('.switch-label')

    const updateSwitchBtn = function (unit) {
        if (unit === 'metric') {
            switcherBtn.innerText = '°F'
        } if ((unit === 'imperial')) {
            switcherBtn.innerText = '°C'
        }
        // console.log("sdhfiuh")
    }

    updateSwitchBtn(unit)

    const showUnitbtn = function () {
        switcherLabel.classList.add('show')
    }

    const hideUnitbtn = function () {
        switcherLabel.classList.remove('show')
    }

    unitswitcherLabel.addEventListener('mouseover', showUnitbtn)
    unitswitcherLabel.addEventListener('mouseleave', hideUnitbtn)

    const changeUnit = function () {
        if (unit === "metric") {
            unit = "imperial";
        }
        if (unit === "imperial") {
            unit = "metric";
        }
        console.log(unit)
        clientLocation()
        updateSwitchBtn(unit)
    }

    unitswitcherLabel.addEventListener('click', changeUnit)

    //
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