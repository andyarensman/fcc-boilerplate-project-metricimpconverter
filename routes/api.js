'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

const unitLabels = [
        "gal",
        "mi",
        "km",
        "lbs",
        "kg",
        "L",
      ];

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      var input = req.query.input;

      //this isn't working correct - the test for valid number
      if(convertHandler.getNum(input) === 'invalid number' && !unitLabels.includes(convertHandler.getUnit(input))) {
        res.json('invalid number and unit')
      } else if (convertHandler.getNum(input) === 'invalid number') {
        res.json('invalid number')
      } else if (!unitLabels.includes(convertHandler.getUnit(input))) {
        res.json('invalid unit')
      }



      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);


      var responseObject = {};
      responseObject['initNum'] = initNum;
      responseObject['initUnit'] = initUnit;
      responseObject['returnNum'] = returnNum;
      responseObject['returnUnit'] = returnUnit;
      responseObject['string'] = toString;

      
    res.json(responseObject)
      
    });

};
