const darkSky = require('./dark-sky.js');

async function main() {
    await darkSky.forecast();
}

main();

module.exports = {
    main: main
};