const darkSky = require('./dark-sky.js');

async function main() {
    await darkSky.forecast();
}

module.exports = {
    main: main
};