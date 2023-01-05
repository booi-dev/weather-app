import { getGeoCoordURL, getForcastURL, getGeoCoords, getForcast } from './fetch'
import input from './input'

function app() {

    let clientGeoLocation;

    const successCallback = (position) => {
        clientGeoLocation = position;
        // console.log(position);
    };

    const errorCallback = (error) => {
        console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    if (navigator.geolocation) {
        console.log(clientGeoLocation)
    }


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

    getWeather()

}

export default app;