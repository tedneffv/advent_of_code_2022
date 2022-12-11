const { readFile } = require("fs");

readFile('data.txt', (err, data) => {
  if (err) throw err;

  const lowerCaseSubtractor = 96
  const upperCaseSubtractor = 38

  const splitRucksackData = data.toString().split('\n');

  let ruckSackTotal = 0;
  let setArray = [];
  splitRucksackData.forEach((ruckSack, index) => {

    const tempSet = new Set();
    ruckSack.split('').forEach((char) => {
      const ascii = char.charCodeAt(0)
      tempSet.add(ascii > 96 ? ascii - lowerCaseSubtractor : ascii - upperCaseSubtractor)
    });
    setArray.push(tempSet)

    if (index % 3 === 2) {
      const commonElement = Array.from(setArray[0]).find((element) => setArray[1].has(element) && setArray[2].has(element))
      ruckSackTotal += commonElement;
      setArray = [];
    }
  })
  console.log({ ruckSackTotal });
});

