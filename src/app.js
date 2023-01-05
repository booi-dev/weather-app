import { getGeoCoordURL, getForcastURL, getGeoCoords, getForcast } from './fetch'
import input from './input'
import './app.css'

function app() {


    input()

    let geo = 'delhi';
    let limit = 3;
    let metric = 'imperial'

    const getWeather = async function (params) {
        let geoULR = getGeoCoordURL(geo, limit)
        let coords = await getGeoCoords(geoULR)
        let forcastURL = getForcastURL(coords, metric)
        let forcast = await getForcast(forcastURL)
        // console.log(geoULR)
        // console.log(coords)
        // console.log(forcastURL)
        // console.log(forcast)
    }

    // getWeather()

}

export default app;