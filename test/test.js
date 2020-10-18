const app = require('../index.js');
const cron = require('node-cron');

const { assert } = require('chai');
const sinon = require('sinon');

describe('App Start', () => {
    beforeEach(() => {
        sinon.stub(cron);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should call all tasks on app run', async function () {
        await app.main();
        sinon.assert.calledOnce(cron.schedule);
    });
});