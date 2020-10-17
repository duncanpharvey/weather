const DarkSky = require('dark-sky');
const darkSky = new DarkSky(process.env.DARK_SKY);

async function forecast() {
    console.log('forecast function call');
}

module.exports = {
    forecast: forecast
};