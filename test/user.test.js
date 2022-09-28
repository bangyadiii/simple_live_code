const chai = require('chai');
const chaiHttp = require('chai-http');
require('dotenv').config();

const expect = chai.expect;

chai.use(chaiHttp);

const ChaiReq = chai.request(process.env.BASE_URL);

describe('ketika membuat user baru', () => {
  afterEach((done) => {
    ChaiReq
      .delete('/users/all')
      .end(() => {
        done();
      })
  })

  it('harus menampilkan informasi yang ditambahkan', (done) => {
    ChaiReq
      .post('/users')
      .type('json')
      .send({
        user_id: 'ix28x',
        name: 'Shikanoin Heizou',
        email: 'heizou@inazuma.jp',
        password: 'heizouganteng123',
      })
      .end((_, res) => {
        expect(res.body.user.name).to.equal('Shikanoin Heizou');
        expect(res.body.user.email).to.equal('heizou@inazuma.jp');
        expect(res.body.user.password).to.equal('heizouganteng123');
        done();
      })
  })

  it('harus tidak boleh memiliki password kurang dari 8 karakter', (done) => {
    ChaiReq
      .post('/users')
      .type('json')
      .send({
        user_id: 'mj6r8',
        name: 'Kaedehara Kazuha',
        email: 'kazuha@inazuma.jp',
        password: 'kumo',
      })
      .end((_, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('password terlalu pendek');
        done();
      })
  })
})

describe('ketika menampilkan semua user', () => {
  afterEach((done) => {
    ChaiReq
      .delete('/users/all')
      .end(() => {
        done();
      })
  })

  it('harus mengembalikan status 404 apabila tidak ada user sama sekali', (done) => {
    ChaiReq
      .get('/users')
      .end((_, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('tidak ada user');
        done();
      })
  })
})

describe('ketika menampilkan salah satu user', () => {
  afterEach((done) => {
    ChaiReq
      .delete('/users/all')
      .end(() => {
        done();
      })
  })

  it('harus mengembalikan status 200 apabila user ditemukan', (done) => {
    ChaiReq
      .post('/users')
      .type('json')
      .send({
        userId: 'ix28x',
        name: 'Shikanoin Heizou',
        email: 'heizou@inazuma.jp',
        password: 'heizouganteng123',
      })
      .end()

    ChaiReq
      .get(`/users/ix28x`)
      .end((_, res) => {
        expect(res.status).to.equal(200);
        done();
      })
  })

  it('harus mengembalikan status 404 apabila user tidak ditemukan', (done) => {
    ChaiReq
      .get('/users/cobacoba')
      .end((_, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('user tidak ditemukan');
        done();
      })
  })
})