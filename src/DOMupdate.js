import { format, getDate } from 'date-fns'

let date = new Date()
let currentDay = format(date, 'EEEE')
let currentDate = getDate(date)
let currentMonth = format(date, 'MMMM')
let currentYear = format(date, 'yyyy')
let dayState = format(date, 'B')

let formatedDate = `${currentDay}, ${currentDate}, ${currentMonth}, ${currentYear}`

function updateMainData(location, forcast, unit) {
    let unitSymbol;

    if (unit === 'metric') {
        unitSymbol = '°C'
    } if (unit === 'standard') {
        unitSymbol = '°C'
    } if (unit === 'imperial') {
        unitSymbol = 'K'
    }

    // let locationName = `${forcast.name}, ${location.state}, ${location.country}`

    let locationName = `${forcast.name},`
    if (location.state) locationName += ` ${location.state},`;
    locationName += ` ${location.country}`;

    let locationTemp = `${forcast.main.temp} ${unitSymbol}`;
    let feelstemp = `${forcast.main.feels_like} ${unitSymbol}`;

    let mainLocation = document.querySelector('.location')
    let mainDate = document.querySelector('.date')
    let mainTime = document.querySelector('.time')
    let mainTemp = document.querySelector('.temp--main')
    let feelsLike = document.querySelector('.feels-like--main')

    mainLocation.innerText = locationName;
    mainDate.innerText = formatedDate;
    mainTemp.innerText = locationTemp;
    feelsLike.innerText = feelstemp;
}

export {
    updateMainData
}