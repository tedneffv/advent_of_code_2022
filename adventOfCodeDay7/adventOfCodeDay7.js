const { readFile } = require("fs");

readFile('data.txt', (err, data) => {
    if (err) throw err;

    const commandArray = data.toString().split('\n');
    
    let fileTree = { '/' : {} }
    let currentDirectory = [];
    let totalLessThanThreshold = 0;
    const LARGE_FILE_THRESHOLD = 100000;
    const DELETE_SPACE_THRESHOLD = 3629016;
    let maxDirectorySizeUnderThreshold = Infinity;

    const changeDirectory = (newDir) => {
      newDir === '..' ? currentDirectory.pop() : currentDirectory.push(newDir);
    }

    const addToCurrentDirectory = (command) => {
      let tempDir = fileTree;
      currentDirectory.forEach((dir) => { 
        tempDir = tempDir[dir] 
      })
      command[0] === 'dir' ? tempDir[command[1]] = {} : tempDir[command[1]] = command[0]
    }

    const computeDirectoryTotals = ({ obj, total }) => {
      let newTotal = total;
      for (var key in obj) {
        if (typeof obj[key] === 'object') {
          newTotal += computeDirectoryTotals({ obj: obj[key], total});
        } else {
          newTotal += Number(obj[key])
        }
      }
      if (newTotal < LARGE_FILE_THRESHOLD) totalLessThanThreshold += newTotal
      if (DELETE_SPACE_THRESHOLD <= newTotal && newTotal < maxDirectorySizeUnderThreshold) maxDirectorySizeUnderThreshold = newTotal 
      return newTotal
    }

    commandArray.forEach((command) => {
      const commandSplit = command.split(' ')
      if (commandSplit[0] === '$') {
        if (commandSplit[1] === 'cd') {
          changeDirectory(commandSplit[2])
        }
        return
      } else {
        addToCurrentDirectory(commandSplit);
      }
    })

    computeDirectoryTotals({ obj: fileTree['/'], total: 0 })
    /* Answer to Part 1 */
    console.log({ totalLessThanThreshold });
    /* Answer to Part 2 */
    console.log({ maxDirectorySizeUnderThreshold });
});

