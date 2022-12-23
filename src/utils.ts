export const getBertieMove = (gameState: string[], difficulty: number) => {
  let bertieSquare = 0;
  if (difficulty === 0)
  {
    let isValidMove = false;
    do {
      bertieSquare = Math.floor(Math.random() * 9);
      if (gameState[bertieSquare] === "")
        isValidMove = true;
    } while (!isValidMove);
  }
  else {

  }
  return bertieSquare;
}

export const getWinner = (gameState: string[]) => {
  const gridSize = 3;

  let computerWin = false;
  let playerWin = false;

  // check rows
  for (let r = 0; r < gridSize; r++) {
    let computerPoints = 0;
    let playerPoints = 0;
    for (let cell = 0; cell < gridSize; cell++)
    {
      if (gameState[r * gridSize + cell] === "X")
        playerPoints++;
      else if (gameState[r * gridSize + cell] === "O")
        computerPoints++;
    }
    if (playerPoints >= 3)
      playerWin = true;
    else if (computerPoints >= 3)
    computerWin = true;
  }

  // check cols
  for (let c = 0; c < gridSize; c++) {
    let computerPoints = 0;
    let playerPoints = 0;
    for (let cell = 0; cell < gridSize; cell++)
    {
      if (gameState[c + gridSize * cell] === "X")
        playerPoints++;
      else if (gameState[c + gridSize * cell] === "O")
        computerPoints++;
    }
    if (playerPoints >= 3)
      playerWin = true;
    else if (computerPoints >= 3)
    computerWin = true;
  }

  // check diag
  if ((gameState[0] === "X" && gameState[4] === "X" && gameState[8] === "X")
    || (gameState[2] === "X" && gameState[4] === "X" && gameState[6] === "X"))
    playerWin = true;
  else if ((gameState[0] === "X" && gameState[4] === "X" && gameState[8] === "X")
    || (gameState[2] === "X" && gameState[4] === "X" && gameState[6] === "X"))
    computerWin = true;

  return playerWin ? 2 : (computerWin ? 1 : 0);
}
