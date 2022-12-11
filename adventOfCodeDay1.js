const { readFile } = require("fs");

readFile('puzzle_data/elfCalorieData.txt', (err, data) => {
  if (err) throw err;

  const splitCalorieData = data.toString().split('\n');
  var maxCalArray = [0, 0, 0]
  var currentCalTotal = 0

  splitCalorieData.forEach((cal, index) => {
    if (cal === '' || index === splitCalorieData.length -1) {
      const minimumMaxCal = Math.min(maxCalArray[0], maxCalArray[1], maxCalArray[2]);
      const minimumMaxCalIndex =  maxCalArray.findIndex((maxCal) => maxCal === minimumMaxCal);
      
      if (+maxCalArray[minimumMaxCalIndex] < +currentCalTotal) {
        maxCalArray[minimumMaxCalIndex] = currentCalTotal
      }
      currentCalTotal = 0
      return
    }
    currentCalTotal += +cal
  })
  console.log({ sd: splitCalorieData[splitCalorieData.length - 1]})
  console.log(`Top three individual calories = ${maxCalArray}`);
  console.log(`Total of top 3 calories = ${maxCalArray.reduce((acc, cv) => acc + cv, 0)}`)
});

