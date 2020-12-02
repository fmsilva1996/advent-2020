const input = require('./input_02')
let formattedInput

(function formatInput (input) {
  const regx = /([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/
  formattedInput = input.map(string => string.match(regx))
})(input)

const printValidPasswordCount_v1 = (passwordArr) => {
  const filteredPasswordArr = passwordArr.filter(passwordObj => {
    const [, lowerBound, upperBound, targetChar, password] = passwordObj
    const charCount = getTargetCharCount(targetChar, password)

    return charCount >= lowerBound && charCount <= upperBound 
  }) 

  console.log(filteredPasswordArr.length)
}

const getTargetCharCount = (targetChar, password) => {
  const matches = password.match(new RegExp(targetChar, 'g'))
  return matches ? matches.length : 0
}

const printValidPasswordCount_v2 = (passwordArr) => {
  const filteredPasswordArr = passwordArr.filter(passwordObj => {
    const [, position1, position2, targetChar, password] = passwordObj
    const isTargetCharInPos1 = password[position1 - 1] === targetChar
    const isTargetCharInPos2 = password[position2 - 1] === targetChar

    return isTargetCharInPos1 && !isTargetCharInPos2 || !isTargetCharInPos1 && isTargetCharInPos2 
  }) 

  console.log(filteredPasswordArr.length)
}

printValidPasswordCount_v1(formattedInput)
printValidPasswordCount_v2(formattedInput)
