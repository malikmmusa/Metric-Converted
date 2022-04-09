function ConvertHandler() {
  
  this.getNum = function(input) {
    const regex = /[a-zA-Z+]/
    const splitInput = input.split("")
    let index = 0;
    for (let i = 0; i < splitInput.length; i++){
      // If the current char is an letter then set index to i
      if (regex.test(splitInput[i])){
        index = i;
        // break becasue only want the index of the FIRST letter
        break;
      }
    }
    // When no number is given, only units
    if (index == 0){
      return 1
    }

    let num;
    // If there is no unit then the entire string is the num
    if (index < 0){
      num = input.slice(0)
    }
    // If there is a unit then splice until the unit
    else {
      num = input.slice(0, index)
    }

    // num can only have / as a operation so this makes it easy to split
    const numArr = num.split("/")

    // if there is NOT operation
    if (numArr.length === 1){
      return numArr[0] == NaN ? "invalid number" : numArr[0] * 1
    }
    // if there is an operation
    if (numArr.length === 2){
      const top = numArr[0]
      const bottom = numArr[1]
      return top == NaN || bottom == NaN ? "invalid number" : top/bottom * 1
    }

    // this will hit if the number contains multiple operations
    return "invalid number"
  };
  
  this.getUnit = function(input) {
    const regex = /[a-zA-Z+]/
    const splitInput = input.split("")
    let index = 0;
    for (let i = 0; i < splitInput.length; i++){
      // If the current char is an letter then set index to i
      if (regex.test(splitInput[i])){
        index = i;
        // break becasue only want the index of the FIRST letter
        break;
      }
    }

    // if there isnt any units
    if (index < 0){
      return "invalid unit"
    }

    let initUnits = input.slice(index).toLowerCase()

    if (initUnits == 'l'){
      initUnits = 'L'
    }

    if (initUnits == 'L' || initUnits == 'gal' || initUnits == 'mi' || initUnits == 'km' || initUnits == 'lbs' || initUnits == 'kg'){
      return initUnits
    }
    
    return "invalid unit"
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit){
      case 'L':
        return 'gal';
      case 'gal':
        return 'L';
      case 'km':
        return 'mi';
      case 'mi':
        return 'km';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      default:
        return null;
    }
  };

  this.spellOutUnit = function(unit) {
    switch(unit){
      case 'L':
        return 'liters';
      case 'gal':
        return 'gallons';
      case 'km':
        return 'kilometers';
      case 'mi':
        return 'miles';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
      default:
        return null;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    switch(initUnit){
      case 'L':
        return initNum / galToL;
      case 'gal':
        return initNum * galToL;
      case 'km':
        return initNum / miToKm;
      case 'mi':
        return initNum * miToKm;
      case 'kg':
        return initNum / lbsToKg;
      case 'lbs':
        return initNum * lbsToKg;
      default:
        return null;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit)
  };
  
}

module.exports = ConvertHandler;
