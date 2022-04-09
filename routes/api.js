'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    var input = req.query.input
    var initNum = convertHandler.getNum(input)
    var initUnit = convertHandler.getUnit(input)
    var returnNum = convertHandler.convert(initNum, initUnit)
    var returnUnit = convertHandler.getReturnUnit(initUnit)
    var string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    if (initNum == 'invalid number' && initUnit == "invalid unit"){
      res.send("invalid number and unit")
    }
    else if (initNum == "invalid number"){
      res.send("invalid number")
    }
    else if (initUnit == "invalid unit"){
      res.send("invalid unit")
    }
    else {
      res.json({initNum: initNum, initUnit: initUnit, returnNum: returnNum.toFixed(5) * 1, returnUnit: returnUnit, string: string})
    }
  })
};
