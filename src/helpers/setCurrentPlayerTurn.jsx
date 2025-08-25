export default function setCurrentPlayerTurn(currentPlayerTurn, numberOfPlayers) {
  return(currentPlayerTurn < numberOfPlayers-1 ? currentPlayerTurn+1 : 0)
};