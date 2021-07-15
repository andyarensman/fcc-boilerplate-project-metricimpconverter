const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test("Convert valid input", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=10l")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, "10");
          assert.equal(res.body.initUnit, "L");
          assert.equal(res.body.returnNum, 2.64172);
          assert.equal(res.body.returnUnit, "gal");
          assert.equal(res.body.string, "10 liters converts to 2.64172 gallons");
          done();
        });
    });

  test("Convert invalid unit input", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=32g")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body, "invalid unit");
          done();
        });
    });

  test("Convert invalid number input", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=3/7.2/4kg")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body, "invalid number");
          done();
        });
    });

  test("Convert invalid number & unit input", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=3/7.2/4kilomegagram")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body, "invalid number and unit");
          done();
        });
    });

  test("Convert with no number", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=kg")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, "1");
          assert.equal(res.body.initUnit, "kg");
          assert.equal(res.body.returnNum, 2.20462);
          assert.equal(res.body.returnUnit, "lbs");
          assert.equal(res.body.string, "1 kilograms converts to 2.20462 pounds");
          done();
        });
    });
});
