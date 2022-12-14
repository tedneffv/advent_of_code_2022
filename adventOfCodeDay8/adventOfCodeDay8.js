const { readFile } = require("fs");

readFile('data.txt', (err, data) => {
    if (err) throw err;

    let hiddenTreeCount = 0;
    let maxScenicTreeScore = 0;
    const treeRowData = data.toString().split('\n');

    const treeData = treeRowData.map((row) => row.split('').map((el) => +el));

    const checkNorth = (i, j, treeHeight) => {
      let treeCount = 0;
      i--
      while (i >= 0) {
        treeCount++;
        if (treeData[i][j] >= treeHeight) {
          // Part 1
          // return true;

          // Part 2
          return treeCount;
        }
        i--
      }
      // Part 1
      // return false;

      // Part 2
      return treeCount;
    }

    const checkWest = (i, j, treeHeight) => {
      let treeCount = 0;
      j--
      while (j >= 0) {
        treeCount++;
        if (treeData[i][j] >= treeHeight) {
          // Part 1
          // return true

          // Part 2
          return treeCount;
        }
        j--
      }
      // Part 1
      // return false

      // Part 2
      return treeCount
    }

    const checkSouth = (i, j, treeHeight) => {
      let treeCount = 0;
      i++
      while (i < treeData.length) {
        treeCount++;
        if (treeData[i][j] >= treeHeight) {
          // Part 1 
          // return true

          // Part 2
          return treeCount
        }
        i++
      }
      // Part 1
      // return false

      // Part 2
      return treeCount
    }

    const checkEast = (i, j, treeHeight) => {
      let treeCount = 0;
      j++
      while (j < treeRowData[0].length) {
        treeCount++;
        if (treeData[i][j] >= treeHeight) {
          // Part 1
          // return true;

          // Part 2
          return treeCount
        }
        j++
      }
      // Part 1
      // return false;

      // Part 2
      return treeCount
    }

    for (let i = 0; i < treeData.length; i++) {
      for (let j = 0; j < treeData[0].length; j++) {
        /* Part 1 */
        // checkNorth(i, j, treeData[i][j]) && checkSouth(i, j, treeData[i][j]) && checkWest(i, j, treeData[i][j]) && checkEast(i, j, treeData[i][j]) && hiddenTreeCount++

        /* Part 2 */
        const scenicTreeScore = checkNorth(i, j, treeData[i][j]) * checkSouth(i, j, treeData[i][j]) * checkWest(i, j, treeData[i][j]) * checkEast(i, j, treeData[i][j])
        if (scenicTreeScore > maxScenicTreeScore)  {
          maxScenicTreeScore = scenicTreeScore
        }
      }
    }

    /* Part 1 */
    // console.log({ visibleTrees: (treeData[0].length * treeData.length) - hiddenTreeCount }) ;

    /* Part 2 */
    console.log(`The maximum scenic score is ${maxScenicTreeScore}`)
});

