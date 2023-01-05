import { getGeoCoordURL, getGeoCoords } from './fetch'
import './input.css'

function input() {

    const inputField = document.querySelector('.input-field')
    const submitBtn = document.querySelector('.submit-btn')
    const geoSuggestionEl = document.querySelector('.geo-suggestions')

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
            // suggestion.innerHTML.replace(/(<([^>]+)>)/ig, '')
            if (!(text.toLowerCase().includes(val.toLowerCase()))) {
                suggestion.parentElement.remove()
            }
        });
        if (locations.length > 6) {
            suggestionsEl.removeChild(suggestionsEl.lastChild)
        }
    }

    const handleLocationClickEvent = function (e) {
        let locationName = removeHtmlTags(e.target.innerHTML)
        console.log(locationName)
        inputField.value = locationName;
        removeAllSuggestion()
        submitBtn.classList.remove('hidden')
    }

    const createSuggestionEl = function name(val, geoSuggestion) {
        let suggestion = document.createElement('div');
        suggestion.classList.add('suggestion-el')
        let location = document.createElement('div');
        location.classList.add('location-name')
        location.innerHTML = '<strong>' + geoSuggestion.name.substr(0, val.length) + '</strong>';
        location.innerHTML += geoSuggestion.name.substr(val.length);

        location.addEventListener('click', handleLocationClickEvent)

        let country = document.createElement('div');
        country.classList.add('country')
        country.innerText = geoSuggestion.country

        suggestion.append(location, country)
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
        let limit = 5;
        let val = e.target.value
        let urls = getGeoCoordURL(val, limit)
        let coords = await getGeoCoords(urls)
        inputAutoComplete(val, coords)
    }

    inputField.addEventListener('input', handleInput)

}

export default input;