import * as DOMupdate from './DOMupdate'
import "./temp.css";

let switchBtn = document.querySelector('.switch-btn')

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

// 

let mainTemp;
let feelsTemp;

const getTemp = function () {
    return { mainTemp, feelsTemp };
}

const updateTemp = function (temp) {
    mainTemp = temp.mainTemp;
    feelsTemp = temp.feelsTemp;
}

//

let coords;

const getCoords = function () {
    return coords;
}

const updateCoords = function (toCoords) {
    coords = {
        lat: toCoords.lat,
        lon: toCoords.lon
    };
}

//

const updateSwitchBtn = function (unit) {
    // console.log(unit, "sdhffoi")
    if (unit === 'imperial') {
        switchBtn.innerText = '°C'
    } else {
        switchBtn.innerText = '°F'
    }
}

// 

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

switchBtn.addEventListener('click', changeUnit)

//

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
    getCoords,
    updateCoords,
    convertToCelsius,
    convertToFahrenheit
}