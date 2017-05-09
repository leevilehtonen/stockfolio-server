const supertest = require('supertest');
const should = require('should');

const server = supertest.agent('http://localhost:3000');

describe("Basic unit test", () => {
    it('should return home', (done) => {
        server
        .get('/')
        .expect('Content-type',/json/)
        .expect(200)
        .end((err, res) => {
            res.status.should.equal(200);
            done();
        });
    });
});