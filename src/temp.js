import * as DOMupdate from './DOMupdate'

let unitswitcherLabel = document.querySelector('.unit-switch-btn')
let switcherBtn = document.querySelector('.switch-btn')
let switcherLabel = document.querySelector('.switch-label')

// standard = kelvin
// metric = celcius
// imperial = farenheit

let unit = 'metric';

const getUnit = function () {
    return unit;
}

const updateUnit = function (toUnit) {
    unit = toUnit;
}

let mainTemp;
let feelsTemp;

const getTemp = function () {
    return { mainTemp, feelsTemp };
}

const updateTemp = function (temp) {
    mainTemp = temp.mainTemp;
    feelsTemp = temp.feelsTemp;
}

const updateSwitchBtn = function (unit) {
    // console.log(unit)
    if (unit === 'imperial') {
        switcherBtn.innerText = '°C'
    } else {
        switcherBtn.innerText = '°F'
    }
}

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
    } else {
        unit = "metric";
    }
    // console.log(mainTemp, feelsTemp, unit)
    DOMupdate.convertTempDOM()
    updateSwitchBtn(unit)
}

unitswitcherLabel.addEventListener('click', changeUnit)


const convertToCelsius = function (degree) {
    let converted = round((degree - 32) * 5 / 9, 2);
    return converted;
};

const convertToFahrenheit = function (degree) {
    let converted = round((degree * (9 / 5)) + 32, 2);
    return converted;
};

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export {
    getUnit,
    updateUnit,
    getTemp,
    updateTemp,
    convertToCelsius,
    convertToFahrenheit
}