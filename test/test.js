const app = require('../index.js');
const DarkSky = require('../dark-sky.js');

const { assert } = require('chai');
const sinon = require('sinon');

describe('App Start', () => {
    beforeEach(() => {
        sinon.stub(DarkSky);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should call all tasks on app run', async function () {
        await app.main();
        sinon.assert.calledOnce(DarkSky.forecast);
    });
});