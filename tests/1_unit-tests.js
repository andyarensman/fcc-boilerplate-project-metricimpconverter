const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  test('Whole number input', done => {
    var input = '32L'
    assert.equal(convertHandler.getNum(input), 32);
    done();
  })

  test('Decimal input', done => {
    var input = '1.5L'
    assert.equal(convertHandler.getNum(input), 1.5);
    done();
  })

  test('Fraction input', done => {
    var input = '1/2L'
    assert.equal(convertHandler.getNum(input), 1/2);
    done();
  })

  test('Decimal fraction input', done => {
    var input = '1.5/4.5L'
    assert.equal(convertHandler.getNum(input), 1.5/4.5);
    done();
  })

  test('Invalid fraction input', done => {
    var input = '3/2/3L'
    assert.equal(convertHandler.getNum(input),'invalid number');
    done();
  })

  test('Default to one', done => {
    var input = ["gal","mi","km","lbs","kg","GAL","L","MI","KM","LBS","KG","l"];
    input.forEach(ele => {
      assert.equal(convertHandler.getNum(ele), 1);
    });
    done();
  })

  test('For Each Valid Unit Inputs', done => {
    var input = ["gal","mi","km","lbs","kg","GAL","L","MI","KM","LBS","KG","l"];
    input.forEach(ele => {
      var compareValue = ele.toLowerCase();
      if (compareValue === 'l') {
        compareValue = 'L'
      }
      assert.equal(convertHandler.getUnit(32 + ele), compareValue);
    });
    done();
  })

  test('Invalid input unit', done => {
    var input = ['g','min','sec','ml'];
    var unitLabels = ["gal","mi","km","lbs","kg","L"];
    input.forEach(ele => {
      assert.notInclude(unitLabels, convertHandler.getUnit(32 + ele));
    });
    done();
  })

  test('Correct return unit', done => {
    var input = ["gal","mi","km","lbs","kg","GAL","L","MI","KM","LBS","KG","l"];
    var unitLabelsObject = {"gal": "L", "L": "gal", "mi": "km", "km": "mi", "lbs": "kg", "kg": "lbs"};
    input.forEach(ele => {
      var unit = convertHandler.getUnit(32 + ele)
      var returnUnit = convertHandler.getReturnUnit(unit)
      assert.equal(returnUnit, unitLabelsObject[unit]);
    });
    done();
  })

  test('Correct spelled-out unit', done => {
    var input = ["gal","mi","km","lbs","kg","L",];
    var unitSpell = {"gal": "gallons","mi": "miles","km": "kilometers", "lbs": "pounds","kg": "kilograms", "L": "liters"};
    input.forEach(ele => {
      assert.equal(convertHandler.spellOutUnit(ele), unitSpell[ele]);
    });
    done();
  })

  test('Gallons to Liters', done => {
    var input = '1gal'

    var initNum = convertHandler.getNum(input)
    var initUnit = convertHandler.getUnit(input)
    
    assert.equal(convertHandler.convert(initNum, initUnit), 3.78541);
    assert.equal(convertHandler.getReturnUnit(initUnit),'L');
    done();
  })

  test('Liters to Gallons', done => {
    var input = '3.78541l'

    var initNum = convertHandler.getNum(input)
    var initUnit = convertHandler.getUnit(input)
    
    assert.equal(convertHandler.convert(initNum, initUnit), 1);
    assert.equal(convertHandler.getReturnUnit(initUnit),'gal');
    done();
  })

  test('Pounds to Kilograms', done => {
    var input = '1lbs'

    var initNum = convertHandler.getNum(input)
    var initUnit = convertHandler.getUnit(input)
    
    assert.equal(convertHandler.convert(initNum, initUnit), 0.45359);
    assert.equal(convertHandler.getReturnUnit(initUnit),'kg');
    done();
  })

  test(' Kilograms to Pounds', done => {
    var input = '0.45359kg'

    var initNum = convertHandler.getNum(input)
    var initUnit = convertHandler.getUnit(input)
    
    assert.equal(convertHandler.convert(initNum, initUnit), 1);
    assert.equal(convertHandler.getReturnUnit(initUnit),'lbs');
    done();
  })

  test('Miles to Kilometers', done => {
    var input = '1mi'

    var initNum = convertHandler.getNum(input)
    var initUnit = convertHandler.getUnit(input)
    
    assert.equal(convertHandler.convert(initNum, initUnit), 1.60934);
    assert.equal(convertHandler.getReturnUnit(initUnit),'km');
    done();
  })

  test('Kilometers to Miles', done => {
    var input = '1.60934km'

    var initNum = convertHandler.getNum(input)
    var initUnit = convertHandler.getUnit(input)
    
    assert.equal(convertHandler.convert(initNum, initUnit), 1);
    assert.equal(convertHandler.getReturnUnit(initUnit),'mi');
    done();
  })

});

