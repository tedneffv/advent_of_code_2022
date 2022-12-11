const { readFile } = require("fs");

readFile('data.txt', (err, data) => {
    if (err) throw err;

    const elfGroupArray = data.toString().split('\n')
    let completeOverlapCount = 0;
    let completeOverlapCount2 = 0;
    elfGroupArray.forEach((group) => {
        const elfGroup = group.split(',');
        const firstGroup = elfGroup[0].split('-').map((el) => +el);
        const secondGroup = elfGroup[1].split('-').map((el) => +el);
        /* Part 1 */
        if ((firstGroup[0] <= secondGroup[0] && firstGroup[1] >= secondGroup[1]) || 
        (+secondGroup[0] <= firstGroup[0] && secondGroup[1] >= firstGroup[1])) {
            completeOverlapCount++
        }
        /* Part 2 */
        const maxIndex = Math.max(firstGroup[0], firstGroup[1], secondGroup[0], secondGroup[1]);
        for (let i = 0; i <= maxIndex; i++) {
            if (i >= firstGroup[0] && i <= firstGroup[1] && i >= secondGroup[0] && i <= secondGroup[1]) {
                completeOverlapCount2++
                break
            }
        }
    })
    
    console.log({ completeOverlapCount });
    console.log({ completeOverlapCount2 });
});

