var request = require('request');

const getLocation = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FuamF5c2hhaHUiLCJhIjoiY2p3aGV1cXpxMDF6bDRhb2F4ZjdxamVpOCJ9.5FzpcGWRMUR0l2zLqITGSA&limit=1';
    request({
        url,
        json: true
    }, (error, {body}={}) => {
        if (error) {
            callback("lower level error related to os like no net connection", undefined);
        } else if (body.features.length === 0) {
            callback("error froms server like if url is wrong no data fetched", undefined);
        } else {


            callback(undefined, {
                lat: body.features[0].center[1],
                lang: body.features[0].center[0],
                location:body.features[0].place_name
            });
        }

    })
}
module.exports = {
    getLocation: getLocation
}
