import * as INPUT from './input'
import * as TEMP from './temp'
import * as LOADING from './loadingAnim'
import * as FETCH from './fetch';
import * as DOMUPDATE from './DOMupdate';

const geoSuggestionEl = document.querySelector('.geo-suggestions')

const removeHtmlTags = function (element) {
    return element.replace(/(<([^>]+)>)/ig, '')
}

const clearSuggestions = function () {
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

const handleSuggestinClickEvent = async function (coords, cityName) {
    removeBackDropNSuggeestions()
    TEMP.updateCoords(coords)
    let unit = TEMP.getUnit();
    let forcast = await FETCH.getWeather(coords, unit)
    DOMUPDATE.updateMainData(forcast.locations, forcast.forcast, forcast.unit, cityName)
    LOADING.triggerTempDetailAnim()
    INPUT.updateInputValue('')
}

const createSuggestionEl = function name(val, geoSuggestion) {
    let suggestion = document.createElement('div');
    suggestion.classList.add('suggestion-el')
    let location = document.createElement('div');
    location.classList.add('location-name')
    location.innerHTML = '<strong>' + geoSuggestion.name.substr(0, val.length) + '</strong>';
    location.innerHTML += geoSuggestion.name.substr(val.length);

    suggestion.addEventListener('click', (e) => {
        let locationName = geoSuggestion.name;
        INPUT.updateInputValue(locationName)
        let coords = {
            lat: geoSuggestion.lat,
            lon: geoSuggestion.lon
        }
        handleSuggestinClickEvent(coords, locationName)
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

// 

const backDrop = document.querySelector('.back-drop')

const showBackDrop = function () {
    backDrop.classList.add('show')
}

const closeBackDrop = function () {
    backDrop.classList.remove('show')
}

const removeBackDropNSuggeestions = function () {
    clearSuggestions()
    closeBackDrop()
}

backDrop.addEventListener('click', () => {
    let inputValue = INPUT.getInputValue()
    INPUT.updateInputValue(inputValue.slice(0, -1))
    removeBackDropNSuggeestions
})

//

export {
    inputAutoComplete,


    showBackDrop,
    closeBackDrop,
}