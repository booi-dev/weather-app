import { format, getDate } from 'date-fns'

let date = new Date()
let currentDay = format(date, 'EEEE')
let currentDate = getDate(date)
let currentMonth = format(date, 'MMMM')
let currentYear = format(date, 'yyyy')
let dayState = format(date, 'B')

let formatedDate = `${currentDay}, ${currentDate}, ${currentMonth}, ${currentYear}`

function updateTodayData(forcast) {
    let locationName = forcast.name;
    let locationTemp = forcast.main.temp;

    let mainLocation = document.querySelector('.location')
    let mainDate = document.querySelector('.date')
    let mainTime = document.querySelector('.time')
    let mainTemp = document.querySelector('.temp')

    mainLocation.innerText = locationName;
    mainDate.innerText = formatedDate;
    mainTemp.innerText = locationTemp;
}

export {
    updateTodayData
}