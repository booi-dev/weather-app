import { format, getDate } from 'date-fns'
import * as TEMP from './temp'

let date = new Date()
let currentDay = format(date, 'EEEE')
let currentDate = getDate(date)
let currentMonth = format(date, 'MMMM')
let currentYear = format(date, 'yyyy')

let formatedDate = `${currentDay}, ${currentDate}, ${currentMonth}, ${currentYear}`
// UTC in milliseconds
let UTC = new Date(Date.now() + (new Date().getTimezoneOffset() * 60000)).getTime()


let mainLocation = document.querySelector('.location--main')
let mainDate = document.querySelector('.date--main')
let mainTime = document.querySelector('.time--main')

let mainCityName = document.querySelector('.city-name--main')
let mainTemp = document.querySelector('.temp--main')
let feelsLike = document.querySelector('.feels-like--main')

let conditionEl = document.querySelector('.condition--ad')
let condition = document.querySelector('.condition.data--ad')
let conditionDesc = document.querySelector('.condition-desc.desc--ad')
let humidity = document.querySelector('.humidity.data--ad')
let windspeed = document.querySelector('.windspeed.data--ad')

let unitSymbol;

const setUnitSym = function (unit) {
    if (unit === 'metric') {
        unitSymbol = '°C'
    } if (unit === 'standard') {
        unitSymbol = 'K'
    } if (unit === 'imperial') {
        unitSymbol = '°F'
    }
}

function updateMainData(location, forcast, unit, cityName = "--") {

    // timezone is in second. to milliseconds, multiple by 1000
    let time = UTC + (forcast.timezone * 1000);
    let timeOfTheLocation = new Date(time)
    let timeToLocaleTime = timeOfTheLocation.toLocaleTimeString()

    setUnitSym(unit)

    let locationName = `${forcast.name},`
    if (location.state) locationName += ` ${location.state},`;
    locationName += ` ${location.country}`;

    mainLocation.innerText = locationName;
    mainDate.innerText = formatedDate;
    mainTime.innerText = timeToLocaleTime;

    mainCityName.innerText = cityName.toUpperCase();
    mainTemp.innerText = `${forcast.main.temp}${unitSymbol}`;
    feelsLike.innerText = `feels: ${forcast.main.feels_like} ${unitSymbol}`;

    condition.innerText = forcast.weather.main;
    conditionDesc.innerText = forcast.weather.description;
    humidity.innerText = `${forcast.main.humidity}`;
    windspeed.innerText = `${forcast.windspeed}`;

    conditionEl.className = `condition--ad ${(forcast.weather.main).toLowerCase()}`;
}

const convertTempDOM = function () {
    let temps = TEMP.getTemp()
    let unit = TEMP.getUnit()
    let convertedMainTemp;
    let convertedFeelsTemp;
    setUnitSym(unit)

    if (unit === "metric") {
        convertedMainTemp = TEMP.convertToCelsius(temps.mainTemp);
        convertedFeelsTemp = TEMP.convertToCelsius(temps.feelsTemp);
    } else {
        convertedMainTemp = TEMP.convertToFahrenheit(temps.mainTemp);
        convertedFeelsTemp = TEMP.convertToFahrenheit(temps.feelsTemp);
    }

    mainTemp.innerText = `${convertedMainTemp}${unitSymbol}`;
    feelsLike.innerText = `feels: ${convertedFeelsTemp} ${unitSymbol}`;

    TEMP.updateTemp({
        mainTemp: convertedMainTemp,
        feelsTemp: convertedFeelsTemp
    })
}

export {
    updateMainData,
    convertTempDOM
}
