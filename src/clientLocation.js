
const getClientLocation = new Promise((resolve, reject) => {
    const successCallback = (position) => {
        resolve(position)
    };
    const errorCallback = (error) => {
        reject(error)
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
})

export default getClientLocation;