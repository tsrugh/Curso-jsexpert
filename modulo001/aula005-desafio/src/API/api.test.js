const { beforeEach, describe } = require("mocha")
const assert = require('assert');
const supertest = require("supertest");

describe('API tests', ( ) => {

    let app;

    before((done) => {
        
        app = require('./index')
        app.once('listening', done)
        
    })

    after(done => app.close(done))

    describe('Suite Test', () => {

        it('Returns 404 status for invalid route', async () => {

            const response = await supertest(app)
            .get('/unkownroute')
            .expect(404)

            const expected = {message: 'Not Found!'}

            assert.deepEqual( JSON.parse(response.text).message, expected.message)

        })

    })

})