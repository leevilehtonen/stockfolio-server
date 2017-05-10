import supertest from'supertest';
import should from 'should';
import app from '../src/app';
const request = supertest.agent(app.listen());

describe("Basic access test", () => {
    it('should return invalid endpoint', (done) => {
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