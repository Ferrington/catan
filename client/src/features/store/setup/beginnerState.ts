import {generateBoard} from "./dataStructure.ts";
import {State} from "../../types/types.ts";
import HexCoordinate from "../../game/HexCoordinate.ts";


const testPlayers = (): Players => {
  return {
    "1": {
      id: "1",
      name: "Christopher",
      color: "Purple",
    },
    "2": {
      id: "2",
      name: "Sam",
      color: "Orange",
    },
    "3": {
      id: "3",
      name: "Emmy",
      color: "Blue",
    },
    "4": {
      id: "4",
      name: "Aaron",
      color: "Red",
    },
  }
};

export const generateBeginnerState = () => {
  const state: State = {
    board: generateBoard(),
    players: testPlayers(),
  };

  // Player 1 - white
  const player1 = Object.values(state.players)[0];

  state.board.vertices[new HexCoordinate(1.5, -.5, -.5).toString()].building = {
    type: "settlement",
    color: player1.color,
  };
  state.board.vertices[new HexCoordinate(-1.5, 1.5, .5).toString()].building = {
    type: "settlement",
    color: player1.color,
  };
  state.board.edges[new HexCoordinate(1.5, -1, -.5).toString()].color = player1.color;
  state.board.edges[new HexCoordinate(-1.5, 1.5, 0).toString()].color = player1.color;

  // Player 2 - orange
  const player2 = Object.values(state.players)[1];

  state.board.vertices[new HexCoordinate(-.5, 1.5, -1.5).toString()].building = {
    type: "settlement",
    color: player2.color,
  };
  state.board.vertices[new HexCoordinate(-.5, -.5, 1.5).toString()].building = {
    type: "settlement",
    color: player2.color,
  };
  state.board.edges[new HexCoordinate(0, 1.5, -1.5).toString()].color = player2.color;
  state.board.edges[new HexCoordinate(-1, -.5, 1.5).toString()].color = player2.color;

  // Player 3 - blue
  const player3 = Object.values(state.players)[2];

  state.board.vertices[new HexCoordinate(.5, -1.5, 1.5).toString()].building = {
    type: "settlement",
    color: player3.color,
  };
  state.board.vertices[new HexCoordinate(-1.5, .5, 1.5).toString()].building = {
    type: "settlement",
    color: player3.color,
  };
  state.board.edges[new HexCoordinate(0, -1.5, 1.5).toString()].color = player3.color;
  state.board.edges[new HexCoordinate(-1.5, .5, 1).toString()].color = player3.color;

  // Player 4 - red
  const player4 = Object.values(state.players)[3];

  state.board.vertices[new HexCoordinate(1.5, .5, -1.5).toString()].building = {
    type: "settlement",
    color: player4.color,
  };
  state.board.vertices[new HexCoordinate(1.5, -1.5, .5).toString()].building = {
    type: "settlement",
    color: player4.color,
  };
  state.board.edges[new HexCoordinate(1, -1.5, .5).toString()].color = player4.color;
  state.board.edges[new HexCoordinate(1, .5, -1.5).toString()].color = player4.color;

  return state;
}
