import supertest from'supertest';
import should from 'should';
import app from '../src/app';
const request = supertest.agent(app.listen());

describe("Basic access test", () => {
    it('should redirect to github', (done) => {
        request
        .get('/')
        .expect(302)
        .end((err, res) => {
            res.status.should.equal(302);
            done();
        });
    });
});