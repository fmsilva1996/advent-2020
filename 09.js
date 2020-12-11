const fs = require("fs");
function hasPairSum(input, target) {
  let visitedSet = new Set(input);

  return input.some((int) => {
    const diff = target - int;
    return int !== diff && visitedSet.has(target - int);
  });
}

const findFirstNoPairSumInt = (input, preamble = 25) => {
  for (let i = preamble, j = 0; i < input.length; i++, j++) {
    const subArr = input.slice(j, i);

    if (!hasPairSum(subArr, input[i])) return input[i];
  }
};

const findContiguousSum = (input, target) => {
  let compliment = target;
  let currIndx = 0;
  let startIndx = 0;

  while (compliment !== 0) {
    compliment -= input[currIndx];
    currIndx++;

    if (compliment < 0) {
      compliment = target;
      currIndx = startIndx + 1;
      startIndx = currIndx;
    }
  }

  return input.slice(startIndx, currIndx);
};

const findEncryptionWeakness = (input, target) => {
  const contiguousSumArr = findContiguousSum(input, target);
  const maxInt = Math.max(...contiguousSumArr);
  const minInt = Math.min(...contiguousSumArr);

  return maxInt + minInt;
};

(function readInputFile(filename) {
  try {
    data = fs.readFileSync(__dirname + filename);
    input = data
      .toString()
      .split("\n")
      .filter((x) => x)
      .map((x) => parseInt(x));

    firstNoPairSumInt = findFirstNoPairSumInt(input);

    console.log(
      "First number that does not have a pair sum: ",
      firstNoPairSumInt
    );
    console.log(
      "Encryption weakness: ",
      findEncryptionWeakness(input, firstNoPairSumInt)
    );
  } catch (err) {
    throw err;
  }
})("/input_09.txt");
