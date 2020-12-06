const fs = require("fs")
let encodedSeats

(function readInputFile(filename) {
  try {
    const data = fs.readFileSync(__dirname + filename);
    encodedSeats = data.toString().split('\n')
  } catch (err) {
    throw err
  }
})('/input_05.txt')

const printHighestSeatIDAndMySeatID = (encodedSeats) => {
  const seatIDs = []
  
  encodedSeats.map(encodedSeat => {
    if (!encodedSeat) return null 
    const binarySeat = convertToBinary(encodedSeat)
    const [row, column] = convertToDecimal(binarySeat)
    seatIDs.push(row * 8 + column)
  })
   
  seatIDs.sort((a, b) => a - b)
  const mySeat = findMySeat(seatIDs)
  
  console.log('Highest Seat ID: ', Math.max(...seatIDs))
  console.log('My Seat ID: ', mySeat)
} 

const convertToBinary = (encodedSeat) => {
  const regexBR = /[B, R]/g
  const regexFL = /[F, L]/g
  
  return encodedSeat.replace(regexBR, '1').replace(regexFL, '0')
}

const convertToDecimal = (binarySeat) => {
  const row = parseInt(binarySeat.slice(0,7), 2)
  const column = parseInt(binarySeat.slice(7), 2)
  
  return [row, column]
}

const findMySeat = (sortedSeats) => {
  let mySeat

  for (let i = 0; i < sortedSeats.length; i++) {
    const currentSeat = sortedSeats[i] + 1
    if (currentSeat !== sortedSeats[i + 1]) {
      mySeat = currentSeat
      break
    }
  }

  return mySeat
}

printHighestSeatIDAndMySeatID(encodedSeats)
