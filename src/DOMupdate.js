import { format, getDate } from 'date-fns'

let date = new Date()
let currentDay = format(date, 'EEEE')
let currentDate = getDate(date)
let currentMonth = format(date, 'MMMM')
let currentYear = format(date, 'yyyy')

let formatedDate = `${currentDay}, ${currentDate}, ${currentMonth}, ${currentYear}`
let currentTIme = date.toLocaleTimeString()

function updateMainData(location, forcast, unit, cityName = "--") {
    console.log(cityName)

    let unitSymbol;

    if (unit === 'metric') {
        unitSymbol = '°C'
    } if (unit === 'standard') {
        unitSymbol = '°C'
    } if (unit === 'imperial') {
        unitSymbol = 'K'
    }

    let locationName = `${forcast.name},`
    if (location.state) locationName += ` ${location.state},`;
    locationName += ` ${location.country}`;

    let locationTemp = `${forcast.main.temp}${unitSymbol}`;
    let feelstemp = `feels: ${forcast.main.feels_like}${unitSymbol}`;

    let mainLocation = document.querySelector('.location--main')
    let mainDate = document.querySelector('.date--main')
    let mainTime = document.querySelector('.time--main')

    let mainCityName = document.querySelector('.city-name--main')
    let mainTemp = document.querySelector('.temp--main')
    let feelsLike = document.querySelector('.feels-like--main')

    mainLocation.innerText = locationName;
    mainDate.innerText = formatedDate;
    mainTime.innerText = currentTIme;
    mainCityName.innerText = cityName.toUpperCase();
    mainTemp.innerText = locationTemp;
    feelsLike.innerText = feelstemp;
}

export {
    updateMainData
}