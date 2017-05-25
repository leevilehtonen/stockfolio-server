import supertest from 'supertest';
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

describe("Authorization test in users api", () => {
    it('should respond unauthorized at users/validate', (done) => {
        request
            .get('/api/users/validate')
            .expect(401)
            .end((err, res) => {
                res.status.should.equal(401);
                res.text.should.equal('Unauthorized');
                done();
            })
    })

    it('should respond unauthorized at users/stocks', (done) => {
        request
            .get('/api/users/stocks')
            .expect(401)
            .end((err, res) => {
                res.status.should.equal(401);
                res.text.should.equal('Unauthorized');
                done();
            })
    })

    it('should respond unauthorized at users/stocks/add', (done) => {
        request
            .post('/api/users/stocks/add')
            .expect(401)
            .end((err, res) => {
                res.status.should.equal(401);
                res.text.should.equal('Unauthorized');
                done();
            })
    })
    it('should respond unauthorized at users/stocks/delete', (done) => {
        request
            .post('/api/users/stocks/delete')
            .expect(401)
            .end((err, res) => {
                res.status.should.equal(401);
                res.text.should.equal('Unauthorized');
                done();
            })
    })
    it('should respond unauthorized at users/profile', (done) => {
        request
            .get('/api/users/profile')
            .expect(401)
            .end((err, res) => {
                res.status.should.equal(401);
                res.text.should.equal('Unauthorized');
                done();
            })
    })
})

describe("Authorization test in stocks api", () => {
    it('should respond unauthorized at stocks/find', (done) => {
        request
            .get('/api/stocks/find')
            .expect(401)
            .end((err, res) => {
                res.status.should.equal(401);
                res.text.should.equal('Unauthorized');
                done();
            })
    })

    it('should respond unauthorized at stocks/quote', (done) => {
        request
            .get('/api/stocks/quote')
            .expect(401)
            .end((err, res) => {
                res.status.should.equal(401);
                res.text.should.equal('Unauthorized');
                done();
            })
    })

    it('should respond unauthorized at stocks/quote/history', (done) => {
        request
            .get('/api/stocks/quote/history')
            .expect(401)
            .end((err, res) => {
                res.status.should.equal(401);
                res.text.should.equal('Unauthorized');
                done();
            })
    })

})