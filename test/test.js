const supertest = require('supertest');
const should = require('should');
const app = require('../app');
const request = supertest.agent(app.listen());

describe("Basic unit test", () => {
    it('should return home', (done) => {
        request
        .get('/')
        .expect('Content-type',/json/)
        .expect(200)
        .end((err, res) => {
            res.status.should.equal(200);
            done();
        });
    });
});