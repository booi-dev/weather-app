import { getGeoCoordURL, getGeoCoords } from './fetch'

function input() {

    let geo = 'delhi';
    let limit = 5;

    const inputField = document.querySelector('.input-field')
    const geoSuggestionEl = document.querySelector('.geo-suggestions')
    // console.log(inputField)

    inputField.addEventListener('input', async (e) => {
        let urls = getGeoCoordURL(e.target.value, limit)
        let coords = await getGeoCoords(urls)
        // console.log(coords)
        coords.forEach(coord => {
            let suggestion = document.createElement('div')
            suggestion.innerText = coord.name
            geoSuggestionEl.prepend(suggestion)
            if (geoSuggestionEl.childElementCount > 6) {
                geoSuggestionEl.removeChild(geoSuggestionEl.lastChild)
            }

            console.log(geoSuggestionEl.childElementCount)
        });
    })


    const inputAutoComplete = function (inp, arr) {

    }

}

export default input;