const DarkSky = require('dark-sky');
const darkSky = new DarkSky(process.env.DARK_SKY);

var StatsD = require('hot-shots');
var dogstatsd = new StatsD();

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: '/var/log/weather.log' }),
  ],
});

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

            logger.log('info', `forecast time ${new Date(forecast.time * 1000).toString()}`);
            logger.log('info', `wind speed: ${windSpeed } knots`);
            logger.log('info', `wind gust: ${windGust} knots`);
            logger.log('info', `temperature: ${temperature} degrees celsius`);
            logger.log('info', `pressure: ${pressure} mbar`);

            dogstatsd.gauge('sfBay.forecast.windSpeed', windSpeed);
            dogstatsd.gauge('sfBay.forecast.windGust', windGust);
            dogstatsd.gauge('sfBay.forecast.temperature', temperature);
            dogstatsd.gauge('sfBay.forecast.pressure', pressure);
        });
}

module.exports = {
    forecast: forecast,
    logger: logger
};