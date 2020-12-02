const input = require('./input_01')

function printTwinProduct(input) {
  const targetSum = new Date().getFullYear()
  const [int1, int2] = findTwinSum(input, targetSum)
  
  console.log('***Twin Product***')
  console.log('Int1: ', int1)
  console.log('Int2: ', int2)
  console.log('Product: ', int1 * int2)
  console.log('\n')
}

function printTripletProduct(input) {
  const targetSum = new Date().getFullYear()
  const [int1, int2, int3] = findTripletSum(input, targetSum)
  
  console.log('***Triplet Product***')
  console.log('Int1: ', int1)
  console.log('Int2: ', int2)
  console.log('Int3: ', int3)
  console.log('Product: ', int1 * int2 * int3)
  console.log('\n')
}

function findTwinSum(input, target) {
  let visitedSet = new Set()
  
  for (let i = 0, len = input.length; i < len; i++) {
    visitedSet.add(input[i])

    const diff = target - input[i]

    if (visitedSet.has(diff)) return [diff, input[i]]
    
    visitedSet.add(input[i]) 
  }
}

function findTripletSum(input, target) {
  let visitedSet = new Set()
  
  for (let i = 0, len = input.length; i < len; i++) {
    let currTargetSum = target - input[i]

    for (let j = i + 1, len = input.length; j <= len; j++) {
      const diff = currTargetSum - input[j]

      if (visitedSet.has(diff)) return [diff, input[i], input[j]]
      
      visitedSet.add(input[j]) 
    }
  }
}

printTwinProduct(input)
printTripletProduct(input)
