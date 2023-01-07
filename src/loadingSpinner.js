
const loadingSpinner = document.querySelector('.loading-ripple')

const startLoadingAnim = function () {
    loadingSpinner.classList.add('anim')
}

const stopLoadingAnim = function () {
    loadingSpinner.classList.remove('anim')
}

export {
    startLoadingAnim,
    stopLoadingAnim
}