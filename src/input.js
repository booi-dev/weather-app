import { getGeoCoordURL, getGeoCoords } from './fetch'
import * as fetch from './fetch';
import * as TEMP from "./temp";
import * as DOMupdate from './DOMupdate';
import * as SUGGESTION from './autoSuggestion'

const inputField = document.querySelector('.input-field')

const getInputValue = function (params) {
    return inputField.value;
}

const updateInputValue = function (val) {
    inputField.value = val;
}


const handleInput = async function (e) {
    DOMupdate.removeAnimCls()
    DOMupdate.updateConditionCls('condition--ad')
    let limit = 10;
    let val = e.target.value
    let urls = getGeoCoordURL(val, limit)
    let coords = await getGeoCoords(urls)
    SUGGESTION.inputAutoComplete(val, coords)
    SUGGESTION.showBackDrop()
}

const setInputEventListener = function () {
    inputField.addEventListener('input', handleInput)

}

export {
    setInputEventListener,
    getInputValue,
    updateInputValue
}
