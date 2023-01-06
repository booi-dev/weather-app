import { getGeoCoordURL, getGeoCoords } from './fetch'
import * as fetch from './fetch'
import * as DOMupdate from './DOMupdate'
import './input.css'

(function input() {
    const form = document.querySelector('.form');
    const inputField = document.querySelector('.input-field')
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.disabled = true;
    const geoSuggestionEl = document.querySelector('.geo-suggestions')

    let unit = 'metric'

    const removeHtmlTags = function (element) {
        return element.replace(/(<([^>]+)>)/ig, '')
    }

    const removeAllSuggestion = function () {
        let suggestionsEl = document.querySelector('.geo-suggestions');
        suggestionsEl.replaceChildren()
    }

    const removeSuggestionEl = function (val) {
        let suggestionsEl = document.querySelector('.geo-suggestions');
        let locations = document.querySelectorAll('.location-name');
        locations.forEach(suggestion => {
            let text = removeHtmlTags(suggestion.innerHTML)
            if (!(text.toLowerCase().includes(val.toLowerCase()))) {
                suggestion.parentElement.remove()
            }
        });
        if (locations.length > 10) {
            suggestionsEl.removeChild(suggestionsEl.lastChild)
        }
    }

    ////

    const clearInputNDisableSubmit = function () {
        inputField.value = '';
        submitBtn.disabled = true;
        submitBtn.classList.remove('sub')
    }

    ////

    const updateInputDataValues = function (locationId) {
        let locationEl = document.getElementById(locationId)
        inputField.dataset.lat = locationEl.dataset.lat;
        inputField.dataset.lon = locationEl.dataset.lon;
        removeAllSuggestion()
    }

    ////

    const getForcastThroughInput = async function () {
        const inputField = document.querySelector('.input-field');
        let coords = {
            lat: inputField.dataset.lat,
            lon: inputField.dataset.lon
        }
        let cityName = inputField.value;
        let forcast = await fetch.getWeather(coords, unit)
        DOMupdate.updateMainData(forcast.locations, forcast.forcast, forcast.unit, cityName)
        clearInputNDisableSubmit()
        DOMupdate.triggerTempDetailAnim()
    }

    const addFormEventListener = function name(e) {
        e.preventDefault()
        getForcastThroughInput()
    }

    ////

    const createSuggestionEl = function name(val, geoSuggestion) {
        let suggestion = document.createElement('div');
        suggestion.classList.add('suggestion-el')
        let location = document.createElement('div');
        let locationId = `country${geoSuggestion.lat + geoSuggestion.lon}`
        location.setAttribute('id', locationId)
        location.setAttribute('data-lat', geoSuggestion.lat)
        location.setAttribute('data-lon', geoSuggestion.lon)

        location.classList.add('location-name')
        location.innerHTML = '<strong>' + geoSuggestion.name.substr(0, val.length) + '</strong>';
        location.innerHTML += geoSuggestion.name.substr(val.length);

        location.addEventListener('click', (e) => {
            let locationName = removeHtmlTags(e.target.innerHTML)
            inputField.value = locationName;
            updateInputDataValues(locationId)
            submitBtn.disabled = false;
            submitBtn.classList.add('sub')
            form.addEventListener('submit', addFormEventListener)
        })

        let state = document.createElement('div');
        state.classList.add('state')
        state.innerText = `${geoSuggestion.country}, ${geoSuggestion.state}`

        suggestion.append(location, state)
        geoSuggestionEl.prepend(suggestion)
    }

    const inputAutoComplete = async function (val, suggestionsArr) {

        for (let i = 0; i < suggestionsArr.length; i++) {
            if (suggestionsArr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                createSuggestionEl(val, suggestionsArr[i])
                removeSuggestionEl(val)
            }
        }
    }

    const handleInput = async function (e) {
        DOMupdate.removeAnimCls()
        let limit = 10;
        let val = e.target.value
        let urls = getGeoCoordURL(val, limit)
        let coords = await getGeoCoords(urls)
        inputAutoComplete(val, coords)
    }

    inputField.addEventListener('input', handleInput)
})()
