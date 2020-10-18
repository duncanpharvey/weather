const DarkSky = require('dark-sky');
const darkSky = new DarkSky(process.env.DARK_SKY);

var StatsD = require('hot-shots');
var dogstatsd = new StatsD();

async function forecast() {
    await darkSky
        .options({
            exclude: ['minutely', 'hourly', 'daily', 'flags'],
            language: 'en',
            latitude: 37.819804, // sf bay at center of golden gate bridge
            longitude: -122.477955,
            units: 'si'
        })
        .get()
        .then(res => {
            const forecast = res.currently;
            const windSpeed = forecast.windSpeed * (900 / 463); // m/s converted to knots
            const windGust = forecast.windGust * (900 / 463); // m/s converted to knots
            const temperature = forecast.temperature;
            const pressure = forecast.pressure;

            console.log('--------------------------------------------');
            console.log(new Date(forecast.time * 1000).toString());
            console.log(`wind speed: ${windSpeed } knots`);
            console.log(`wind gust: ${windGust} knots`);
            console.log(`temperature: ${temperature} degrees celsius`);
            console.log(`pressure: ${pressure} mbar`);

            dogstatsd.gauge('sfBay.forecast.windSpeed', windSpeed);
            dogstatsd.gauge('sfBay.forecast.windGust', windGust);
            dogstatsd.gauge('sfBay.forecast.temperature', temperature);
            dogstatsd.gauge('sfBay.forecast.pressure', pressure);
        });
}

module.exports = {
    forecast: forecast
};