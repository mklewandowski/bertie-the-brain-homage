export enum GameResultType {
  inProgress = "inProgress",
  playerWin = "playerWin",
  bertieWin = "bertieWin",
  tie = "tie"
}

interface LinePoints {
  computerPoints: number,
  playerPoints: number,
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

const calculateWinPoints = (cellState: string, cellWinPoints: number, linePoints: LinePoints) => {
  let newCellWinPoints = cellWinPoints;
  if (cellState !== "")
    newCellWinPoints = -1;
  else if (linePoints.computerPoints === 2) // can win
    newCellWinPoints = 6;
  else if (linePoints.playerPoints === 2) // must block
    newCellWinPoints = 5;
  else if (linePoints.playerPoints === 0) // can still win this row
    newCellWinPoints = Math.max(newCellWinPoints, newCellWinPoints + 1);
  return newCellWinPoints;
}

const calculateLinePoints = (cellState: string, linePoints: LinePoints) => {
  let newLinePoints: LinePoints = { ...linePoints };
  if (cellState === "X")
    newLinePoints.playerPoints++;
  else if (cellState === "O")
    newLinePoints.computerPoints++;
  return newLinePoints;
}

export const getBertieMove = (gameState: string[], difficulty: number) => {
  let bertieSquare = -1;
  let linePoints: LinePoints = { computerPoints: 0, playerPoints: 0 };
  if (difficulty === 0) {
    bertieSquare = getRandomSquare(gameState);
  } else {
    const winPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    // check rows
    for (let r = 0; r < kGridSize; r++) {
      linePoints = { computerPoints: 0, playerPoints: 0 };
      for (let cell = 0; cell < kGridSize; cell++)
      {
        linePoints = calculateLinePoints(gameState[r * kGridSize + cell], linePoints);
      }
      for (let cell = 0; cell < kGridSize; cell++)
      {
        winPoints[r * kGridSize + cell] = calculateWinPoints(gameState[r * kGridSize + cell], winPoints[r * kGridSize + cell], linePoints);
      }
    }
    // check cols
    for (let c = 0; c < kGridSize; c++) {
      linePoints = { computerPoints: 0, playerPoints: 0 };
      for (let cell = 0; cell < kGridSize; cell++)
      {
        linePoints = calculateLinePoints(gameState[c + kGridSize * cell], linePoints);
      }
      for (let cell = 0; cell < kGridSize; cell++)
      {
        winPoints[c + kGridSize * cell] = calculateWinPoints(gameState[c + kGridSize * cell], winPoints[c + kGridSize * cell], linePoints);
      }
    }
    // check diags
    linePoints = { computerPoints: 0, playerPoints: 0 };
    for (let c = 0; c <= 8; c+=4)
    {
      linePoints = calculateLinePoints(gameState[c], linePoints);
      console.log(linePoints);
    }
    for (let cell = 0; cell <= 8; cell+=4)
    {
      winPoints[cell] = calculateWinPoints(gameState[cell], winPoints[cell], linePoints);
    }

    linePoints = { computerPoints: 0, playerPoints: 0 };
    for (let c = 2; c <= 6; c+=2)
    {
      console.log(linePoints);
      linePoints = calculateLinePoints(gameState[c], linePoints);
    }
    for (let cell = 2; cell <= 6; cell+=2)
    {
      winPoints[cell] = calculateWinPoints(gameState[cell], winPoints[cell], linePoints);
    }

    // find best cell
    let highVal = -1;
    for (let c = 0; c < winPoints.length; c++)
    {
      console.log(c + ":" + winPoints[c]);
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
