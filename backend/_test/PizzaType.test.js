const supertest = require('supertest');
const config =  require("./config.js");

describe('Pizza Type (model)', function() {
    it('Should return valid response for get pizza types', function (done) {
        supertest(`${config.HOST_URL}`)
            .get('/pizza-sizes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.data).toBeDefined();
                done()
            })
    });
});