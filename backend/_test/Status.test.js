const supertest = require('supertest');
const config =  require("./config.js");

describe('Status (model)', function() {
    it('Should return valid response for get status', function (done) {
        supertest(`${config.HOST_URL}`)
            .get('/status')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.data).toBeDefined();
                done()
            })
    });
});