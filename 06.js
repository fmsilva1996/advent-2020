const fs = require("fs")
let groupData

(function readInputFile(filename) {
  try {
    const data = fs.readFileSync(__dirname + filename);
    groupData = data.toString().split('\n\n')
    groupData = groupData.map((group, index) => {
      if (index !== groupData.length - 1) return group.split('\n')
      // Remove empty string included in the last group
      const lastEl = group.split('\n')
      lastEl.splice(lastEl.length - 1)
      return lastEl
    })
  } catch (err) {
    throw err
  }
})('/input_06.txt')

const printYesCount = (groupData) => {
  const groupsYesCountArr = []

  groupData.forEach(group => {
    let groupYesCount = 0

    group[0].split('').forEach(answer => {
      if (group.every(member => member.includes(answer))) {
        groupYesCount++
      }
    })

    groupsYesCountArr.push(groupYesCount)
  })

  const finalCount = groupsYesCountArr.reduce((acc, curr) => acc + curr, 0)
  console.log('Final Yes Count: ', finalCount)
}

printYesCount(groupData)
