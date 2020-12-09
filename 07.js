const fs = require("fs");
let numberOfBagsContained = 0

const formatInput1 = (input) => {
  const data = input.toString().split('\n').filter(x => x)
  const obj = {}
  
  data.forEach(row => {
    const rule = row.split("bags contain")
    obj[rule[0].trim()] = rule[1]
    .split(",")
    .map(bag => bag
      .replace(/bags? ?|contains? ?|[0-9] ?|\./g, '')
      .trim()
      )
  })
  
  return obj
}

const formatInput2 = (input) => {
  const data = input.toString().split('\n').filter(x => x)
  const map = new Map()
  data.forEach(row => {
    let chunk = row.replace(/ bag[s]?/g, "").split("contain")
    let holder = chunk[0].trim()
    let contains = chunk[1]
      .trim()
      .substr(0, chunk[1].trim().length - 1)
      .split(", ")
    let containsMap = {}

    contains.forEach(c => {
      let a = c.split(" ")
      let n = a.shift()
      if (!isNaN(parseInt(n, 10))) {
        containsMap[a.join(" ").trim()] = parseInt(n, 10);
      }
    })

    map[holder] = containsMap
  })

  return map
}

const getShinyGoldContainerCount = (bagData, color) => {
  const bagSet = new Set([color])
  let prevSetLength, currSetLength = bagSet.size

  while (prevSetLength !== currSetLength) {
    prevSetLength = currSetLength

    Object.entries(bagData).forEach(([motherBag, childBags]) => {
      if (bagSet.has(motherBag)) return 
      for (let value of bagSet.values()) {
        if (childBags.includes(value)) { 
          bagSet.add(motherBag)
          break
        }
      }
    })

    currSetLength = bagSet.size
  }

  return bagSet.size - 1
}

const getChildCount = (bagData, parentBag) => {
  Object.entries(bagData[parentBag]).forEach(([childBag, childBagCount]) => {
    numberOfBagsContained += childBagCount
    for (let i = 0; i < childBagCount; i++) {
      getChildCount(bagData, childBag)
    }
  })
}

(function readInputFile(filename) {
  try {
    data = fs.readFileSync(__dirname + filename);
    formattedData = formatInput1(data)
    console.log(
      'Bags Containing Shiny Gold: ', 
      getShinyGoldContainerCount(formattedData, 'shiny gold')
    )

    formattedData = formatInput2(data)
    getChildCount(formattedData, 'shiny gold')
    console.log('Shiny Gold Child Count: ', numberOfBagsContained)
  } catch (err) {
    throw err
  }
})('/input_07.txt')



