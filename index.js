const darkSky = require('./dark-sky.js');
const cron = require('node-cron');

async function main() {
    cron.schedule('*/3 * * * *', async () => {
        await darkSky.forecast();
    });
}

main();

module.exports = {
    main: main
}