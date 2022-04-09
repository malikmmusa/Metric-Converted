const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('valid input', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({input: '10L'})
      .end((err, res) => {
        // need to use deep equal because this compares the values the res.body object to the object i created and regular equal would check the refrence while deepequal checks values
        assert.deepEqual(res.body, {
          initNum: 10,
          initUnit: 'L',
          returnNum: 2.64172,
          returnUnit: 'gal',
          string: "10 liters converts to 2.6417217685798895 gallons"
        })
      })
    done()
  })
  test('invalid input', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({input: '32g'})
      .end((err, res) => {
        assert.equal(res.text, 'invalid unit')
      })
    done()
  })
  test('invalid number', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({input: '3/7.2/4kg'})
      .end((err, res) => {
        assert.equal(res.text, 'invalid number')
      })
    done()
  })
  test('invalid number AND unit', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({input: '3/7.2/4kilomegagram'})
      .end((err, res) => {
        assert.equal(res.text, 'invalid number and unit')
      })
    done()
  })
  test('no number', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({input: 'kg'})
      .end((err, res) => {
        assert.deepEqual(res.body, {
          initNum: 1,
          initUnit: 'kg',
          returnNum: 2.20462,
          returnUnit: 'lbs',
          string: "1 kilograms converts to 2.2046244201837775 pounds"
        })
      })
    done()
  })
});
