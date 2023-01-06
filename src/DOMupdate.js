import { format, getDate, fromUnixTime } from 'date-fns'

let date = new Date()
let currentDay = format(date, 'EEEE')
let currentDate = getDate(date)
let currentMonth = format(date, 'MMMM')
let currentYear = format(date, 'yyyy')

let formatedDate = `${currentDay}, ${currentDate}, ${currentMonth}, ${currentYear}`
// let currentTIme = date.toLocaleTimeString()

// UTC in milliseconds
let UTC = new Date(Date.now() + (new Date().getTimezoneOffset() * 60000)).getTime()

function updateMainData(location, forcast, unit, cityName = "--") {

    // timezone is in second. to milliseconds, multiple by 1000
    let time = UTC + (forcast.timezone * 1000);
    let timeOfTheLocation = new Date(time)
    let timeToLocaleTime = timeOfTheLocation.toLocaleTimeString()

    let unitSymbol;

    if (unit === 'metric') {
        unitSymbol = '°C'
    } if (unit === 'standard') {
        unitSymbol = 'K'
    } if (unit === 'imperial') {
        unitSymbol = '°F'
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

    let condition = document.querySelector('.condition.data--ad')
    let conditionDesc = document.querySelector('.condition-desc.desc--ad')
    let humidity = document.querySelector('.humidity.data--ad')
    let windspeed = document.querySelector('.windspeed.data--ad')

    mainLocation.innerText = locationName;
    mainDate.innerText = formatedDate;
    mainTime.innerText = timeToLocaleTime;

    mainCityName.innerText = cityName.toUpperCase();
    mainTemp.innerText = locationTemp;
    feelsLike.innerText = feelstemp;

    condition.innerText = forcast.weather.main;
    conditionDesc.innerText = forcast.weather.description;
    humidity.innerText = forcast.main.humidity;
    windspeed.innerText = forcast.windspeed;

}

const triggerTempDetailAnim = function () {
    const tempDetailEl = document.querySelector('.temp-detail--main')
    tempDetailEl.classList.add('anim')
}

const removeAnimCls = function () {
    const tempDetailEl = document.querySelector('.temp-detail--main')
    tempDetailEl.classList.remove('anim')
}


export {
    updateMainData,
    triggerTempDetailAnim,
    removeAnimCls
}