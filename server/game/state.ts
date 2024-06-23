import { Socket } from "socket.io";
import { beginnerInitialState } from "~~/config/beginnerInitialState";
import { ClientToServerEvents, ServerToClientEvents } from "~~/types/socket";

export let gameState: ServerGameState;

export function getPlayerBySocketId(socketId: string) {
  const playerIndex = gameState.socketAssignments.indexOf(socketId);

  if (playerIndex === -1) throw new Error("Player not found");

  return gameState.players[playerIndex];
}

export function setSocketAssignment(clientId: number, socketId: string) {
  gameState.socketAssignments[clientId - 1] = socketId;
}

export function setPlayerTurn(playerColor: PlayerColor) {
  gameState.turn = gameState.players.findIndex(
    (player) => player.color === playerColor
  );
  io.emit("turn:advance", gameState.turn, gameState.turnPhase);
}

export function setTurnPhase(turnPhase: TurnPhase) {
  gameState.turnPhase = turnPhase;
  io.emit("turn:advance", gameState.turn, gameState.turnPhase);
}

export function advanceTurn() {
  if (gameState.turnPhase.main === "build")
    gameState.turn = (gameState.turn + 1) % gameState.players.length;

  gameState.turnPhase.main =
    gameState.turnPhase.main === "roll" ? "build" : "roll";
  gameState.turnPhase.sub = null;
  io.emit("turn:advance", gameState.turn, gameState.turnPhase);
}

export function addActionLogEntry(action: LogEntry) {
  gameState.actionLog.push(action);
  io.emit("action:new", action);
}

// ONLY FOR BEGINNER GAME
export function initializeGame(numPlayers: 3 | 4) {
  const _gameState = structuredClone(beginnerInitialState);

  _gameState.players = _gameState.players.slice(-numPlayers);

  _gameState.players.forEach((player) => {
    (
      Object.keys(_gameState.resources) as (keyof typeof _gameState.resources)[]
    ).forEach((resource) => {
      _gameState.resources[resource] -= player[resource];
    });

    player.roads -= 2;
    player.settlements -= 2;
  });

  gameState = _gameState;
}

export function broadcastGameState(
  socket?: Socket<ClientToServerEvents, ServerToClientEvents>
) {
  if (gameState == null) throw new Error("Game state not initialized");

  if (socket == null) {
    gameState.socketAssignments.forEach((socketId) => {
      broadcast("gameState", [stripGameState(gameState, socketId)], socket);
    });
  } else {
    broadcast("gameState", [stripGameState(gameState, socket?.id)], socket);
  }
}

type EventName = keyof ServerToClientEvents;
export function broadcast(
  event: EventName,
  data: Parameters<ServerToClientEvents[EventName]>,
  socket?: Socket<ClientToServerEvents, ServerToClientEvents>
) {
  if (gameState == null) throw new Error("Game state not initialized");

  if (socket == null) {
    io.emit(event, ...data);
  } else {
    socket.emit(event, ...data);
  }
}

function stripGameState(
  gameState: ServerGameState,
  socketId: string
): ClientGameState {
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
