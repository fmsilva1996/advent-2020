const fs = require("fs")
let tobboganMap

(function readInputFile(filename) {
  try {
    const data = fs.readFileSync(__dirname + filename);
    tobboganMap = data.toString().split('\n')
  } catch (err) {
    throw err
  }
})('/input_03.txt')

const getTreeCount = ([rightMove, downMove]) => {
  let treeCount = 0
  let column = 0 
  
  for (let row = 0, len = tobboganMap.length; row < len; row += downMove) {
    if (tobboganMap[row][column] === '#') {
      treeCount += 1
    }
    column = (column + rightMove) % tobboganMap[row].length
  }

  return treeCount
}

const getTreeCountProduct =  () => {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]
  
  return slopes.reduce((acc, slope) => acc * getTreeCount(slope), 1)
}

console.log(getTreeCountProduct())
