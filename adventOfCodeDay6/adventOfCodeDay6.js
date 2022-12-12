const { readFile } = require("fs");

readFile('data.txt', (err, data) => {
    if (err) throw err;
  
    const dataArray = data.toString().split('');

    const MARKER_LENGTH = [4, 14];

    // PART 1 and PART 2 together
    MARKER_LENGTH.forEach((length, index) => {
      for(let i = 0; i < dataArray.length - length; i++) {
        const dataChunk = dataArray.slice(i, i + length);
        const dataSet = new Set()
        let markerFound = false;
        dataChunk.every((el, index) => { 
          if (dataSet.has(el)) {
            return false;
          }
          if (index === length - 1) {
            markerFound = true
          }
          dataSet.add(el)
          return true;
        })
        if (markerFound) {
          console.log(`${index === 0 ? 'Marker' : 'Message'} ${dataChunk} found at ${i + length}`) 
          break
        }
        dataSet.clear();
      }
    })
    
});

