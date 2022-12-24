export enum GameResultType {
  inProgress = "inProgress",
  playerWin = "playerWin",
  bertieWin = "bertieWin",
  tie = "tie"
}

const kGridSize = 3;

const getRandomSquare = (gameState: string[]) => {
  let bertieSquare = -1;
  let isValidMove = false;
  do {
    bertieSquare = Math.floor(Math.random() * 9);
    if (gameState[bertieSquare] === "")
      isValidMove = true;
  } while (!isValidMove);
  return bertieSquare;
}

export const getBertieMove = (gameState: string[], difficulty: number) => {
  let bertieSquare = -1;
  if (difficulty === 0) {
    bertieSquare = getRandomSquare(gameState);
  } else {
    const winPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let computerPoints = 0;
    let playerPoints = 0;
    // check rows
    for (let r = 0; r < kGridSize; r++) {
      computerPoints = 0;
      playerPoints = 0;
      for (let cell = 0; cell < kGridSize; cell++)
      {
        if (gameState[r * kGridSize + cell] === "X")
          playerPoints++;
        else if (gameState[r * kGridSize + cell] === "O")
          computerPoints++;
      }
      for (let cell = 0; cell < kGridSize; cell++)
      {
        if (gameState[r * kGridSize + cell] !== "")
          winPoints[r * kGridSize + cell] = -1;
        else if (computerPoints === 2) // can win
          winPoints[r * kGridSize + cell] = 6;
        else if (playerPoints === 2) // must block
          winPoints[r * kGridSize + cell] = 5;
        else if (playerPoints === 0) // can still win this row
          winPoints[r * kGridSize + cell] =  Math.max(winPoints[r * kGridSize + cell], winPoints[r * kGridSize + cell] + 1);
      }
    }
    // check cols
    for (let c = 0; c < kGridSize; c++) {
      computerPoints = 0;
      playerPoints = 0;
      for (let cell = 0; cell < kGridSize; cell++)
      {
        if (gameState[c + kGridSize * cell] === "X")
          playerPoints++;
        else if (gameState[c + kGridSize * cell] === "O")
          computerPoints++;
      }
      for (let cell = 0; cell < kGridSize; cell++)
      {
        if (gameState[c + kGridSize * cell] !== "")
          winPoints[c + kGridSize * cell] = -1;
        else if (computerPoints === 2) // can win
          winPoints[c + kGridSize * cell] = 6;
        else if (playerPoints === 2) // must block
          winPoints[c + kGridSize * cell] = 5;
        else if (playerPoints === 0) // can still win this col
          winPoints[c + kGridSize * cell] = Math.max(winPoints[c + kGridSize * cell], winPoints[c + kGridSize * cell] + 1);
      }
    }
    // check diags
    computerPoints = 0;
    playerPoints = 0;
    for (let c = 0; c <= 8; c+=4)
    {
      if (gameState[c] === "X")
        playerPoints++;
      else if (gameState[c] === "O")
        computerPoints++;
    }
    for (let cell = 0; cell < 8; cell+=4)
    {
      if (gameState[cell] !== "")
        winPoints[cell] = -1;
      else if (computerPoints === 2) // can win
        winPoints[cell] = 6;
      else if (playerPoints === 2) // must block
        winPoints[cell] = 5;
      else if (playerPoints === 0) // can still win this row
        winPoints[cell] = Math.max(winPoints[cell], winPoints[cell] + 1);
    }

    computerPoints = 0;
    playerPoints = 0;
    for (let c = 2; c <= 6; c+=2)
    {
      if (gameState[c] === "X")
        playerPoints++;
      else if (gameState[c] === "O")
        computerPoints++;
    }
    for (let cell = 2; cell <= 6; cell+=2)
    {
      if (gameState[cell] !== "")
        winPoints[cell] = -1;
      else if (computerPoints === 2) // can win
        winPoints[cell] = 6;
      else if (playerPoints === 2) // must block
        winPoints[cell] = 5;
      else if (playerPoints === 0) // can still win this row
        winPoints[cell] = Math.max(winPoints[cell], winPoints[cell] + 1);
    }

    // find best cell
    let highVal = -1;
    for (let c = 0; c < winPoints.length; c++)
    {
      if (winPoints[c] > highVal && (difficulty == 2 || highVal < 0 || (difficulty == 1 && Math.random() < .5))) {
        highVal = winPoints[c];
        bertieSquare = c;
      }
    }
  }
  return bertieSquare;
}

export const getGameResult = (gameState: string[]) => {
  let gameResult = GameResultType.inProgress;

  // check rows
  for (let r = 0; r < kGridSize; r++) {
    let computerPoints = 0;
    let playerPoints = 0;
    for (let cell = 0; cell < kGridSize; cell++)
    {
      if (gameState[r * kGridSize + cell] === "X")
        playerPoints++;
      else if (gameState[r * kGridSize + cell] === "O")
        computerPoints++;
    }
    if (playerPoints >= 3)
      gameResult = GameResultType.playerWin;
    else if (computerPoints >= 3)
      gameResult = GameResultType.bertieWin;
  }

  // check cols
  for (let c = 0; c < kGridSize; c++) {
    let computerPoints = 0;
    let playerPoints = 0;
    for (let cell = 0; cell < kGridSize; cell++)
    {
      if (gameState[c + kGridSize * cell] === "X")
        playerPoints++;
      else if (gameState[c + kGridSize * cell] === "O")
        computerPoints++;
    }
    if (playerPoints >= 3)
      gameResult = GameResultType.playerWin;
    else if (computerPoints >= 3)
      gameResult = GameResultType.bertieWin;
  }

  // check diag
  if ((gameState[0] === "X" && gameState[4] === "X" && gameState[8] === "X")
    || (gameState[2] === "X" && gameState[4] === "X" && gameState[6] === "X"))
    gameResult = GameResultType.playerWin;
  else if ((gameState[0] === "O" && gameState[4] === "O" && gameState[8] === "O")
    || (gameState[2] === "O" && gameState[4] === "O" && gameState[6] === "O"))
    gameResult = GameResultType.bertieWin;

  // check for draw
  if (gameResult === GameResultType.inProgress)
  {
    let isDraw = true;
    for (let c = 0; c < gameState.length; c++)
    {
      if (gameState[c] === "")
        isDraw = false;
    }
    if (isDraw)
      gameResult = GameResultType.tie;
  }

  return gameResult;
}
