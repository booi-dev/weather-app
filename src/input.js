import { getGeoCoordURL, getGeoCoords } from './fetch'

function input() {

    const inputField = document.querySelector('.input-field')
    const geoSuggestionEl = document.querySelector('.geo-suggestions')
    // console.log(inputField)


    const removeSuggestionEl = function (val) {
        let suggestions = document.querySelector('.geo-suggestions')
        suggestions.childNodes.forEach(suggestion => {
            let text = suggestion.innerHTML.replace(/(<([^>]+)>)/ig, '')
            if (!(text.toLowerCase().includes(val.toLowerCase()))) {
                console.log(suggestion)
                suggestion.remove()
            }
        });
        console.log(suggestions.childElementCount)
        if (suggestions.childElementCount > 6) {
            suggestions.removeChild(suggestions.lastChild)
        }
    }

    const createSuggestionEl = function name(val, geoSuggestion) {
        let suggestion = document.createElement('div')
        suggestion.classList.add()
        // console.log(geoSuggestion.name)
        suggestion.innerHTML = '<strong>' + geoSuggestion.name.substr(0, val.length) + '</strong>'
        suggestion.innerHTML += geoSuggestion.name.substr(val.length)
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
        // console.log(coords)
        inputAutoComplete(val, coords)
    }

    inputField.addEventListener('input', handleInput)

}

export default input;