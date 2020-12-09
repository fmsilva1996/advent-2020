const fs = require("fs");

const followCommands = (commands) => {
  let visitedIndices = new Set()
  let hasCompleted = false
  let accumulator = 0;
  let currIndex = 0 
  
  while (!visitedIndices.has(currIndex)) {
    if (currIndex === commands.length -1) {
      hasCompleted = true
      break
    }

    visitedIndices.add(currIndex)

    const [command, move] = commands[currIndex].split(' ')
    const moveDirection = move[0]
    const moveCount = parseInt(move.slice(1))

    if (command === 'acc') {
      if(moveDirection === '+') accumulator += moveCount
      else accumulator -= moveCount
      currIndex++ 
    } 
    if (command === 'jmp') {
      if(moveDirection === '+') currIndex += moveCount
      else currIndex -= moveCount
    }
    if (command === 'nop') {
      currIndex++
    }
  }

  return [hasCompleted, accumulator]
}

const getAccOnFinalCommand = (commands) => {
  for (let i = 0, len = commands.length - 1; i < len; i++) {
    let mod = [...commands]
    const [command, move] = commands[i].split(' ')

    if (command === 'nop') mod[i] = `jmp ${move}` 
    if (command === 'jmp') mod[i] = `nop ${move}` 

    const [hasCompleted, accumulator] = followCommands(mod)
    if (hasCompleted) return accumulator
  }
}

(function readInputFile(filename) {
  try {
    data = fs.readFileSync(__dirname + filename);
    commands = data.toString().split('\n')

    console.log('Accumulator on an Infinite Loop: ', followCommands(commands)[1])
    console.log('Accumulator on a Complete Execution: ', getAccOnFinalCommand(commands))
  } catch (err) {
    throw err
  }
})('/input_08.txt')
