const { readFile } = require("fs");

readFile('puzzle_data/rockPaperScissorsStrategyGuide.txt', (err, data) => {
  if (err) throw err;

  const rock = 'ROCK'
  const paper = 'PAPER'
  const scissors = 'SCISSORS'
  const draw = 'Y'
  const win = 'Z'
  const lose = 'X'

  const moves = {
    A: { value: rock, win: scissors, lose: paper },
    B: { value: paper, win: rock, lose: scissors },
    C: { value: scissors, win: paper, lose: rock },
  };

  const values = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3,
  }

  const computeRoundScore = (opponentMove, winLoseStrategy) => {
    // Draw
    if (winLoseStrategy === draw) return 3 + values[moves[opponentMove].value];
    // You Lose
    if (winLoseStrategy === lose) return values[moves[opponentMove].win];
    // You Win
    return 6 + values[moves[opponentMove].lose]
  }

  const splitStrategyData = data.toString().split('\n');
  const totalScore = splitStrategyData.reduce((acc, current) => {
    const roundSplit = current.split(' ');
    return acc + computeRoundScore(roundSplit[0], roundSplit[1])
  }, 0);

  console.log(totalScore);
});

