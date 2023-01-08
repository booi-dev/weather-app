import { getGeoCoordURL, getGeoCoords } from './fetch'
import * as SUGGESTION from './autoSuggestion'
import * as LOADING from './loadingAnim'
import './input.css'

const inputField = document.querySelector('.input-field')

const getInputValue = function (params) {
    return inputField.value;
}

const updateInputValue = function (val) {
    inputField.value = val;
}

const handleInput = async function (e) {
    LOADING.removeAnimCls()
    let limit = 6;
    let val = e.target.value
    let urls = getGeoCoordURL(val, limit)
    let coords = await getGeoCoords(urls)
    SUGGESTION.inputAutoComplete(val, coords)
    SUGGESTION.showBackDrop()
}

const setInputEventListener = function () {
    inputField.addEventListener('input', handleInput)
}


// drag down input in mobile mode

const moveInputToMiddle = function () {
    const additionalDataEl = document.querySelector('.additional-data')
    const form = document.querySelector('.form')
    additionalDataEl.before(form)
}

const moveInputToBottom = function () {
    const additionalDataEl = document.querySelector('.additional-data')
    const form = document.querySelector('.form')
    additionalDataEl.after(form)
}

export {
    setInputEventListener,
    getInputValue,
    updateInputValue,
    moveInputToMiddle,
    moveInputToBottom
}
