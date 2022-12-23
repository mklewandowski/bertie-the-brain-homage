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
    const gridSize = 3;
    const winPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let computerPoints = 0;
    let playerPoints = 0;
    // check rows
    for (let r = 0; r < gridSize; r++) {
      computerPoints = 0;
      playerPoints = 0;
      for (let cell = 0; cell < gridSize; cell++)
      {
        if (gameState[r * gridSize + cell] === "X")
          playerPoints++;
        else if (gameState[r * gridSize + cell] === "O")
          computerPoints++;
      }
      for (let cell = 0; cell < gridSize; cell++)
      {
        if (gameState[r * gridSize + cell] !== "")
          winPoints[r * gridSize + cell] = -1;
        else if (computerPoints === 2) // can win
          winPoints[r * gridSize + cell] = 6;
        else if (playerPoints === 2) // must block
          winPoints[r * gridSize + cell] = 5;
        else if (playerPoints === 0) // can still win this row
          winPoints[r * gridSize + cell] =  Math.max(winPoints[r * gridSize + cell], winPoints[r * gridSize + cell] + 1);
      }
    }
    // check cols
    for (let c = 0; c < gridSize; c++) {
      computerPoints = 0;
      playerPoints = 0;
      for (let cell = 0; cell < gridSize; cell++)
      {
        if (gameState[c + gridSize * cell] === "X")
          playerPoints++;
        else if (gameState[c + gridSize * cell] === "O")
          computerPoints++;
      }
      for (let cell = 0; cell < gridSize; cell++)
      {
        if (gameState[c + gridSize * cell] !== "")
          winPoints[c + gridSize * cell] = -1;
        else if (computerPoints === 2) // can win
          winPoints[c + gridSize * cell] = 6;
        else if (playerPoints === 2) // must block
          winPoints[c + gridSize * cell] = 5;
        else if (playerPoints === 0) // can still win this col
          winPoints[c + gridSize * cell] = Math.max(winPoints[c + gridSize * cell], winPoints[c + gridSize * cell] + 1);
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
      if (winPoints[c] > highVal)
      {
        highVal = winPoints[c];
        bertieSquare = c;
      }
    }
  }
  return bertieSquare;
}

export const getWinner = (gameState: string[]) => {
  const gridSize = 3;

  let winState = 0;

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
      winState = 2;
    else if (computerPoints >= 3)
      winState = 1;
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
      winState = 2;
    else if (computerPoints >= 3)
      winState = 1;
  }

  // check diag
  if ((gameState[0] === "X" && gameState[4] === "X" && gameState[8] === "X")
    || (gameState[2] === "X" && gameState[4] === "X" && gameState[6] === "X"))
    winState = 2;
  else if ((gameState[0] === "O" && gameState[4] === "O" && gameState[8] === "O")
    || (gameState[2] === "O" && gameState[4] === "O" && gameState[6] === "O"))
    winState = 1;

  // check for draw
  if (winState === 0)
  {
    let isDraw = true;
    for (let c = 0; c < gameState.length; c++)
    {
      if (gameState[c] === "")
        isDraw = false;
    }
    if (isDraw)
      winState = 3;
  }

  return winState;
}
