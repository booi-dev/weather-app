import { getGeoCoordURL, getGeoCoords } from './fetch'
import './input.css'

function input() {

    const inputField = document.querySelector('.input-field')
    const geoSuggestionEl = document.querySelector('.geo-suggestions')

    const removeSuggestionEl = function (val) {
        let suggestionsEl = document.querySelector('.geo-suggestions');
        let locations = document.querySelectorAll('.location-name');

        console.log(locations)
        locations.forEach(suggestion => {
            let text = suggestion.innerHTML.replace(/(<([^>]+)>)/ig, '')
            if (!(text.toLowerCase().includes(val.toLowerCase()))) {
                suggestion.remove()
            }
        });
        if (locations.length > 6) {
            suggestionsEl.removeChild(suggestionsEl.lastChild)
        }
    }

    const createSuggestionEl = function name(val, geoSuggestion) {
        let suggestion = document.createElement('div');
        let location = document.createElement('div');
        location.classList.add('location-name')
        location.innerHTML = '<strong>' + geoSuggestion.name.substr(0, val.length) + '</strong>';
        location.innerHTML += geoSuggestion.name.substr(val.length);

        let country = document.createElement('div');
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