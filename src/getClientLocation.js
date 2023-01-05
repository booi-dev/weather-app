let clientGeoLocation;

const successCallback = (position) => {
    clientGeoLocation = position;
    // console.log(position);
};

const errorCallback = (error) => {
    console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

if (navigator.geolocation) {
    // console.log(clientGeoLocation)
}