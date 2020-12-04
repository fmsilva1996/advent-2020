const fs = require("fs")
let passportData

(function readInputFile(filename) {
  try {
    const data = fs.readFileSync(__dirname + filename);
    const passportStrings = data.toString().split('\n\n')
    passportData = passportStrings.map(str  => str.split(/[\s]/))
  } catch (err) {
    throw err
  }
})('/input_04.txt')


const getValidPassportCount = (passportData) => {
  let validPassportCount = 0 

  passportData.map(passport => {
    if(passport.length === 8 && hasValidData(passport)) validPassportCount++
    if(passport.length === 7 && isMissingCID(passport) && hasValidData(passport)) validPassportCount++
  })

  console.log('Valid Passport Count: ', validPassportCount)
}

const isMissingCID = (passport) => {
  return passport.every(field => field.slice(0,3) !== 'cid')
}

const hasValidData = (passport) => {
  return passport.every(field => validateField(field))
}

const validateField = (field) => {
  const fieldData = field.split(':')
  switch (fieldData[0]) {
    case 'byr': 
      return isValidBYR(fieldData[1])
    case 'iyr':
      return isValidIYR(fieldData[1])
    case 'eyr':
      return isValidEYR(fieldData[1])
    case 'hgt':
      return isValidHGT(fieldData[1])
    case 'hcl':
      return isValidHCL(fieldData[1])
    case 'ecl':
      return isValidECL(fieldData[1])
    case 'pid':
      return isValidPID(fieldData[1])
    default:
      return true
  }
} 

const isValidBYR = (byr) => {
  return byr.length === 4 && byr >= 1920 && byr <= 2002
}

const isValidIYR = (iyr) => {
  return iyr.length === 4 && iyr >= 2010 && iyr <= 2020
}

const isValidEYR = (eyr) => {
  return eyr.length === 4 && eyr >= 2020 && eyr <= 2030
}

const isValidHGT = (hgt) => {
  if (hgt.endsWith('cm')) {
    hgt = hgt.slice(0, 3)
    return hgt >= 150 && hgt <= 193
  }
  if (hgt.endsWith('in')) {
    hgt = hgt.slice(0, 2)
    return hgt >= 59 && hgt <= 76
  }
}

const isValidHCL = (hcl) => {
  const regx = /(#[\d\w]{6})/
  return regx.test(hcl)
}

const isValidECL = (ecl) => {
  const eyeColours = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
  return eyeColours.includes(ecl)
}

const isValidPID = (pid) => {
  return pid.length === 9
}

getValidPassportCount(passportData)
