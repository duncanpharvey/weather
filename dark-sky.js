const DarkSky = require('dark-sky');
const darkSky = new DarkSky(process.env.DARK_SKY);

async function forecast() {
    await darkSky
        .options({
            exclude: ['minutely', 'hourly', 'daily', 'flags'],
            language: 'en',
            latitude: 37.8267,
            longitude: -122.423,
            units: 'si'
        })
        .get()
        .then(res => console.log(res));
}

module.exports = {
    forecast: forecast
};