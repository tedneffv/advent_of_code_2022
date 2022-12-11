const { readFile } = require("fs");

readFile('data.txt', (err, data) => {
    if (err) throw err;

    // this is at test
    const dataArray = data.toString().split('\n')
    console.log({ dataArray: dataArray[1] });
});

