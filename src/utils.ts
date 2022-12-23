export const getBertieMove = (gameState: string[]) => {
  let isValidMove = false;
  let bertieSquare = 0;
  do {
    bertieSquare = Math.floor(Math.random() * 9);
    if (gameState[bertieSquare] === "")
      isValidMove = true;
  } while (!isValidMove);
  return bertieSquare;
}
