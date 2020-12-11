const fs = require("fs");

const productOfJoltDifferences = (adapters) => {
  let oneDiffCount = 0;
  let threeDiffCount = 0;
  let myAdapters = [...adapters];

  myAdapters.sort((a, b) => a - b);
  myAdapters.unshift(0);
  myAdapters.push(myAdapters[myAdapters.length - 1] + 3);

  for (let i = 0; i < myAdapters.length - 1; i++) {
    const joltDiff = myAdapters[i + 1] - myAdapters[i];
    joltDiff === 1 ? oneDiffCount++ : threeDiffCount++;
  }

  return oneDiffCount * threeDiffCount;
};

const getAdapterArrangementCount = (adapters) => {
  let myAdapters = [...adapters];

  myAdapters.sort((a, b) => a - b);
  myAdapters.unshift("0");
  myAdapters.push(`${Number(myAdapters[myAdapters.length - 1]) + 3}`);

  let countArr = [1];

  const iterate = (index, joltDiff) =>
    myAdapters[index - joltDiff] >= myAdapters[index] - 3
      ? Number(countArr[index - joltDiff])
      : 0;

  for (let i = 1; i < myAdapters.length; i++) {
    let count = iterate(i, 1) + iterate(i, 2) + iterate(i, 3);
    countArr.push(count);
  }

  return countArr[countArr.length - 1];
};

(function readInputFile(filename) {
  try {
    data = fs.readFileSync(__dirname + filename);
    input = data
      .toString()
      .split("\n")
      .filter((x) => x);

    console.log(
      "Product of the number of 1-jolt differences and 3-jolt differences: ",
      productOfJoltDifferences(input)
    );
    console.log(
      "Number of different adapter arrangements: ",
      getAdapterArrangementCount(input)
    );
  } catch (err) {
    throw err;
  }
})("/input_10.txt");
