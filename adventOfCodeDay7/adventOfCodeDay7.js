const { readFile } = require("fs");

readFile('data.txt', (err, data) => {
    if (err) throw err;

    const commandArray = data.toString().split('\n');
    
    let fileTree = { '/' : {} }
    let currentDirectory = [];
    let currentMode;
    const directorySet = new Set();

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

    const getAllDirectories = (obj) => {
      for (var key in obj) {
        if (typeof obj[key] === 'object') {
          directorySet.add(key)
          getAllDirectories(obj[key])
        }
      }
    }

    const computeDirectoryTotals = ({ obj, total }) => {
      let newTotal = total;
      for (var key in obj) {
        if (typeof obj[key] === 'object') {
          newTotal += computeDirectoryTotals({ obj: obj[key], total});
        } else {
          console.log({key: key})
          newTotal += Number(obj[key])
        }
      }
      return newTotal
    }

    commandArray.forEach((command) => {
      const commandSplit = command.split(' ')
      if (commandSplit[0] === '$') {
        currentMode = commandSplit[1]
        if (currentMode === 'cd') {
          changeDirectory(commandSplit[2])
        }
        return
      } else {
        addToCurrentDirectory(commandSplit);
      }
    })

    getAllDirectories(fileTree);
    console.log(`total = ${computeDirectoryTotals({ obj: fileTree['/']['d'], total: 0 })}`);
    
    console.log({ fileTree: JSON.stringify(fileTree, null, 2) })
    
});

