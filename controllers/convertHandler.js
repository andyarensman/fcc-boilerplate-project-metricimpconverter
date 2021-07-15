function ConvertHandler() {
  
  var inputRegex = /[a-z]+|[^a-z]+/gi
  var fractionRegex = /[-]?[0-9]+[,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)/gi
  var unitOptions = ["gal","mi","km","lbs","kg","GAL","L","MI","KM","LBS","KG","l"];

  //done
  this.getNum = function(input) {
    var result;
    console.log("//////////")
    console.log("Input: " + input)
    console.log("First part: " + input.match(inputRegex)[0])
    console.log("Is not a number: " + isNaN(input.match(inputRegex)[0]))
    //console.log("Eval equation: " + eval(input.match(inputRegex)[0]))
    console.log("Fraction: " + /^([-]?[0-9]+[,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*))$/.test(input.match(inputRegex)[0]))
    console.log("Includes just unit: " + unitOptions.includes(input))

    

    if (unitOptions.includes(input)) {
      result = 1
      console.log("no num result is: " + result)
      return result
    } else if (/^([-]?[0-9]+[,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*))$/.test(input.match(inputRegex)[0]) == true) {
      result = eval(input.match(inputRegex)[0]) //input.match(inputRegex)[0] which one?
      console.log("fraction result is: " + result)
      if (result == 'Infinity') {
        result = 'invalid number'
      }
      return result
    } else if (isNaN(input.match(inputRegex)[0])) {
      result = 'invalid number'
      console.log(result)
      return result
    } else {
      result = input.match(inputRegex)[0]
      console.log("normal result is: " + result)
      return result
    }

  };
  
  //done
  this.getUnit = function(input) {
    var result;

    if (unitOptions.includes(input)) {
      result = input.toLowerCase()
    } else {
      result = input.match(inputRegex)[1].toLowerCase()
    }

    if (result === 'l') {
      result = 'L'
    }
    
    return result;
  };
  
  //done
  this.getReturnUnit = function(initUnit) {
    var result;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result ='L'
        break;
      case 'l':
        result = 'gal'
        break;
      case 'mi':
        result = 'km'
        break;
      case 'km':
        result = 'mi'
        break;
      case 'lbs':
        result = 'kg'
        break;
      case 'kg':
        result = 'lbs'
        break;
      default:
        console.log('Incorrect unit Input')
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    switch (unit) {
      case 'gal':
        result ='gallons'
        break;
      case 'L':
        result = 'liters'
        break;
      case 'mi':
        result = 'miles'
        break;
      case 'km':
        result = 'kilometers'
        break;
      case 'lbs':
        result = 'pounds'
        break;
      case 'kg':
        result = 'kilograms'
        break;
      default:
        console.log('Incorrect unit Input')
    }
    return result;
  };
  
  //done
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;

    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = (eval(initNum) * galToL).toFixed(5)
        break;
      case 'l':
        result = (eval(initNum) / galToL).toFixed(5)
        break;
      case 'mi':
        result = (eval(initNum) * miToKm).toFixed(5)
        break;
      case 'km':
        result = (eval(initNum) / miToKm).toFixed(5)
        break;
      case 'lbs':
        result = (eval(initNum) * lbsToKg).toFixed(5)
        break;
      case 'kg':
        result = (eval(initNum) / lbsToKg).toFixed(5)
        break;
      default:
        console.log('Incorrect number Input')
    }
    
    return parseFloat(result);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    
    result = initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit)

    console.log(result)

    return result;
  };
  
}

module.exports = ConvertHandler;
