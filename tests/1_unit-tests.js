const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Basics', function(){
    // #1
    test("whole number input", function(done){
      var input = '10mi'
      assert.equal(convertHandler.getNum(input), '10', 'whole number input passed');
      done();
    })
    // #2
    test("decimal number input", function(done){
      var input = '10.5mi'
      assert.equal(convertHandler.getNum(input), '10.5', 'decimal number input passed');
      done();
    })
    // #3
    test("fractional input", function(done){
      var input = '10/2mi'
      assert.equal(convertHandler.getNum(input), '5', 'fractional input passed');
      done();
    })
    // #4
    test("fractional input with a decimal", function(done){
      var input = '10.8/2mi'
      assert.equal(convertHandler.getNum(input), '5.4', 'fractional input with a decimal passed');
      done();
    })
    // #5
    test("error on a double-fraction", function(done){
      var input = '10/2/2mi'
      assert.equal(convertHandler.getNum(input), 'invalid number', 'error on a double-fraction passed');
      done();
    })
    // #6
    test("default to input of 1", function(done){
      var input = 'mi'
      assert.equal(convertHandler.getNum(input), '1', 'default to input of 1 passed');
      done();
    })
    // #7
    test("read each valid input unit", function(done){
      var input = '10mi'
      assert.equal(convertHandler.getUnit(input), 'mi', 'read each valid input unit passed');
      done();
    })
    // #8
    test("error for an invalid input unit", function(done){
      var input = '10cmi'
      assert.equal(convertHandler.getUnit(input), 'invalid unit', 'error for an invalid input unit passed');
      done();
    })
    // #9
    test("return unit for each valid input unit", function(done){
      var input = 'mi'
      assert.equal(convertHandler.getReturnUnit(input), 'km'), 'return unit for each valid input unit';
      done();
    })
    // #10
    test("return the spelled-out string unit", function(done){
      var input = 'mi'
      assert.equal(convertHandler.spellOutUnit(input), 'miles', 'return the spelled-out string unit passed');
      done();
    })
  })

  suite("Units", function(){
    // #11
    test("gal to L", function(done){
      var num = 1
      var unit = 'gal'
      assert.equal(convertHandler.convert(num, unit), 3.78541, 'gal to L passed');
      done();
    })
    // #12
    test("L to gal", function(done){
      var num = 3.78541
      var unit = 'L'
      assert.equal(convertHandler.convert(num, unit), 1, 'L to gal passed');
      done();
    })
    // #13
    test("mi to km", function(done){
      var num = 1
      var unit = 'mi'
      assert.equal(convertHandler.convert(num, unit), 1.60934, 'mi to km passed');
      done();
    })
    // #14
    test("km to mi", function(done){
      var num = 1.60934
      var unit = 'km'
      assert.equal(convertHandler.convert(num, unit), 1, 'km to mi passed');
      done();
    })
    // #15
    test("lbs to kg", function(done){
      var num = 1
      var unit = 'lbs'
      assert.equal(convertHandler.convert(num, unit), 0.453592, 'lbs to kg passed');
      done();
    })
    // #16
    test("kg to lbs", function(done){
      var num = 0.453592
      var unit = 'kg'
      assert.equal(convertHandler.convert(num, unit), 1, 'kg to lbs passed');
      done();
    })
  })
});