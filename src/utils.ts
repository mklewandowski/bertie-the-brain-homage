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
