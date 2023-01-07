
let tempDetailEl = document.querySelector('.temp-detail--main')
let loadingSpinner = document.querySelector('.loading-ripple')

const triggerTempDetailAnim = function () {
    tempDetailEl.classList.add('anim')
}

const removeAnimCls = function () {
    tempDetailEl.classList.remove('anim')
}

const startLoadingAnim = function () {
    loadingSpinner.classList.add('anim')
}

const stopLoadingAnim = function () {
    loadingSpinner.classList.remove('anim')
}

export {
    startLoadingAnim,
    stopLoadingAnim,
    triggerTempDetailAnim,
    removeAnimCls
}