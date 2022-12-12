const { readFile } = require("fs");

function charIsNumber(char) {
  if (typeof char !== 'string') {
    return false;
  }

  return !isNaN(char);
}

function charIsLetter(char) {
  if (typeof char !== 'string') {
    return false
  }

  return /^[a-zA-Z]+$/.test(char);
}

readFile('data.txt', (err, data) => {
    if (err) throw err;

    const MOVES_START_INDEX = 10;
    const STACK_ROW_INDEX = 8;
    const NUMBER_OF_STACKS = 9;

    const supplyStackData = data.toString().split('\n')
    const stackIndexes = new Set();
    for(let i = 0; i < supplyStackData[STACK_ROW_INDEX].length; i++) {
      if (charIsNumber(supplyStackData[STACK_ROW_INDEX].charAt(i))) {
        stackIndexes.add(i);
      }
    }

    const stackArray2D = [];
    for (let i = 0; i < NUMBER_OF_STACKS; i++) {
      stackArray2D.push([]);
    }

    for (let i = STACK_ROW_INDEX - 1; i >= 0; i--) {
      for (let j = 0; j < supplyStackData[i].length; j++) {
        const supplyStackChar = supplyStackData[i].charAt(j);
        if (stackIndexes.has(j) && charIsLetter(supplyStackChar)) {
          stackArray2D[supplyStackData[STACK_ROW_INDEX].charAt(j) - 1].push(supplyStackChar);
        }
      }
    }

    /* PART 1 solution. Comment out when running part 2 solution */
    // =======================================================================================================================================
    /*
    for (let i = MOVES_START_INDEX; i < supplyStackData.length; i++) {
      const currentMove = supplyStackData[i].split(' ').filter((char) => charIsNumber(char)).map((el) => +el)
      for (let i = 0; i < currentMove[0]; i++) {
        stackArray2D[currentMove[2] - 1].push(stackArray2D[currentMove[1] - 1].pop())
      }
    }
    // =======================================================================================================================================
  


    /* PART 2 solution, comment out when running PART 1 solution */
    // =======================================================================================================================================
    for (let i = MOVES_START_INDEX; i < supplyStackData.length; i++) {
      const currentMove = supplyStackData[i].split(' ').filter((char) => charIsNumber(char)).map((el) => +el)
      const moveArray = []
      for (let i = 0; i < currentMove[0]; i++) {
        moveArray.push(stackArray2D[currentMove[1] - 1].pop())
      }
      stackArray2D[currentMove[2] - 1].push(...(moveArray.reverse()))
    }
    // =======================================================================================================================================

    const topOfStackArray = []
    for (let i = 0; i < NUMBER_OF_STACKS; i++) {
      topOfStackArray.push(stackArray2D[i][stackArray2D[i].length - 1]);
    }
    console.log(`Crates on the top of the stacks are: ${topOfStackArray.toString()}`);
});

