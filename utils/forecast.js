const request = require('request');
const weather = (lat, lang, callback) => {
    const url = 'https://api.darksky.net/forecast/f8d14e3b1502256ae9872caa7b723ed8/' + lat + ',' + lang + '?units=si';
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback("lower level error related to os like no net connection", undefined);
        } else if (!body.currently) {
            callback("error froms server like if url is wrong no data fetched", undefined);
        } else {
            callback(undefined, body.currently);
        }


    })
}
module.exports = {
    weather: weather
}