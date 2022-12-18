const { readFile } = require("fs");

readFile('data.txt', (err, data) => {
  if (err) throw err;

  const moveData = data.toString().split('\n');

  const tailPositionSet = new Set();
  tailPositionSet.add('0,0')
  let headPosition = [0, 0];
  let tailPosition = [0, 0];
  let knotArray = Array(10).fill([0, 0]);
  console.log({ knotArray })

  
  const addToTailPositionSet = () => {
    tailPositionSet.add(`${tailPosition[0]},${tailPosition[1]}`);
  }

  const moveTailIfRequired = () => {
    const headRow = headPosition[0]
    const headCol = headPosition[1]
    const tailRow = tailPosition[0]
    const tailCol = tailPosition[1]

    // Non-diagonal Moves
    if (headRow === tailRow) {
      if (headCol - tailCol === -2) {
        tailPosition[1]--;
        addToTailPositionSet()
      }
      if (headCol - tailCol === 2) {
        tailPosition[1]++;
        addToTailPositionSet()
      }
    }
    else if (headCol === tailCol) {
      if (headRow - tailRow === -2) {
        tailPosition[0]--;
        addToTailPositionSet()
      }
      if (headRow - tailRow === 2) {
        tailPosition[0]++;
        addToTailPositionSet()
      }
    }
    // Diagonal Moves
    else {
      if (headRow - tailRow === 2) {
        if(headCol > tailCol) {
          tailPosition[0]++;
          tailPosition[1]++;
          addToTailPositionSet()
        } else {
          tailPosition[0]++;
          tailPosition[1]--;
          addToTailPositionSet()
        }
      }

      if (headRow - tailRow === -2) {
        if (headCol > tailCol) {
          tailPosition[0]--;
          tailPosition[1]++;
          addToTailPositionSet()
        } else {
          tailPosition[0]--;
          tailPosition[1]--;
          addToTailPositionSet()
        }
      }

      if (headCol - tailCol === 2) {
        if (headRow > tailRow) {
          tailPosition[0]++;
          tailPosition[1]++;
          addToTailPositionSet()
        } else {
          tailPosition[0]--;
          tailPosition[1]++;
          addToTailPositionSet()
        }
      }

      if (headCol - tailCol === -2) {
        if (headRow > tailRow) {
          tailPosition[0]++;
          tailPosition[1]--;
          addToTailPositionSet()
        } else {
          tailPosition[0]--;
          tailPosition[1]--;
          addToTailPositionSet()
        }
      }
    }
  };

  moveData.forEach(move => {
    const moveSplit = move.split(' ');
    for(let i = 0; i < +moveSplit[1]; i++) {
      switch(moveSplit[0]) {
        case 'D':
          headPosition[0]--;
          break;
        case 'U':
          headPosition[0]++;
          break;
        case 'L': 
          headPosition[1]--;
          break;
        case 'R':
          headPosition[1]++;
          break;
      }
      moveTailIfRequired();
    }
  })

  console.log({ headPosition, tailPosition, totalTailMoves: tailPositionSet.size });
});

