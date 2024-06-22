import { beginnerInitialState } from "~~/config/beginnerInitialState";

export let gameState: ServerGameState = initializeGame(4);

function initializeGame(numPlayers: 3 | 4) {
  const gameState = structuredClone(beginnerInitialState);

  gameState.players = gameState.players.slice(-numPlayers);

  gameState.players.forEach((player) => {
    (
      Object.keys(gameState.resources) as (keyof typeof gameState.resources)[]
    ).forEach((resource) => {
      gameState.resources[resource] -= player[resource];
    });
  });

  return gameState;
}

export function stripGameState(socketId: string): ClientGameState {
  const _gameState = structuredClone(gameState);

  const players = _gameState.players.map((player, i): Player => {
    if (_gameState.socketAssignments.indexOf(socketId) === i) {
      return player;
    }

    return {
      visibleResources: false,
      name: player.name,
      color: player.color,
      settlements: player.settlements,
      cities: player.cities,
      roads: player.roads,
      victoryPoints: player.victoryPoints,
    };
  });

  return {
    players,
    board: _gameState.board,
    turn: _gameState.turn,
    turnPhase: _gameState.turnPhase,
    actionLog: _gameState.actionLog,
  };
}
