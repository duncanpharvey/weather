const DarkSky = require('dark-sky');
const darkSky = new DarkSky(process.env.DARK_SKY);

var StatsD = require('hot-shots');
var dogstatsd = new StatsD();

async function forecast() {
    await darkSky
        .options({
            exclude: ['minutely', 'hourly', 'daily', 'flags'],
            language: 'en',
            latitude: 37.819804,
            longitude: -122.477955,
            units: 'si'
        })
        .get()
        .then(res => {
            console.log(res.currently.windSpeed * (900 / 463));
            dogstatsd.gauge('forecast.windSpeed', res.currently.windSpeed * (900 / 463)); // m/s converted to knots
            console.log('complete');
        });
}

module.exports = {
    forecast: forecast
};