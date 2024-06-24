import { Socket } from "socket.io";
import { beginnerInitialState } from "~~/config/beginnerInitialState";
import {
  ClientToServerEvents,
  PlayerResources,
  ServerToClientEvents,
} from "~~/types/socket";

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

export function resetGame() {
  const socketAssignments = gameState.socketAssignments;
  initializeGame(4);
  gameState.socketAssignments = socketAssignments;
  broadcastGameState();
}

export function broadcastResources() {
  gameState.socketAssignments.forEach((socketId) => {
    const player = getPlayerBySocketId(socketId);

    const playerResources: PlayerResources = gameState.players.map(
      (_player) => {
        const resourceCount =
          _player.wool +
          _player.brick +
          _player.lumber +
          _player.grain +
          _player.ore;

        if (player.color === _player.color) {
          return {
            playerColor: _player.color,
            resources: {
              wool: _player.wool,
              brick: _player.brick,
              lumber: _player.lumber,
              grain: _player.grain,
              ore: _player.ore,
            },
            resourceCount,
          };
        } else {
          return {
            playerColor: _player.color,
            resourceCount,
          };
        }
      }
    );

    const socket = io.sockets.sockets.get(socketId);
    socket?.emit("resources:update", gameState.resources, playerResources);
  });
}

export function broadcastGameState(
  socket?: Socket<ClientToServerEvents, ServerToClientEvents>
) {
  if (gameState == null) throw new Error("Game state not initialized");

  if (socket == null) {
    gameState.socketAssignments.forEach((socketId) => {
      const socket = io.sockets.sockets.get(socketId);
      socket?.emit("gameState", stripGameState(gameState, socketId));
    });
  } else {
    socket.emit("gameState", stripGameState(gameState, socket.id));
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

    const resourceCount =
      player.wool + player.brick + player.lumber + player.grain + player.ore;

    return {
      visibleResources: false,
      name: player.name,
      color: player.color,
      settlements: player.settlements,
      cities: player.cities,
      roads: player.roads,
      victoryPoints: player.victoryPoints,
      resourceCount,
    };
  });

  return {
    players,
    board: _gameState.board,
    turn: _gameState.turn,
    turnPhase: _gameState.turnPhase,
    actionLog: _gameState.actionLog,
    resources: _gameState.resources,
  };
}
