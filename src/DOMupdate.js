import { format, getDate, fromUnixTime } from 'date-fns'

let date = new Date()
let currentDay = format(date, 'EEEE')
let currentDate = getDate(date)
let currentMonth = format(date, 'MMMM')
let currentYear = format(date, 'yyyy')

let formatedDate = `${currentDay}, ${currentDate}, ${currentMonth}, ${currentYear}`
let currentTIme = date.toLocaleTimeString()

function updateMainData(location, forcast, unit, cityName = "--") {

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

    let condition = document.querySelector('.condition.data--ad')
    let conditionDesc = document.querySelector('.condition-desc.desc--ad')
    let humidity = document.querySelector('.humidity.data--ad')
    let windspeed = document.querySelector('.windspeed.data--ad')

    mainLocation.innerText = locationName;
    mainDate.innerText = formatedDate;
    mainTime.innerText = currentTIme;

    mainCityName.innerText = cityName.toUpperCase();
    mainTemp.innerText = locationTemp;
    feelsLike.innerText = feelstemp;

    condition.innerText = forcast.weather.main;
    conditionDesc.innerText = forcast.weather.description;
    humidity.innerText = forcast.main.humidity;
    windspeed.innerText = forcast.windspeed;

    console.log((forcast.date))
    console.log(fromUnixTime(forcast.date))

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