import { generateBoard } from "~/utils/board/generateBoard";

export const useCatanStore = defineStore("catan", () => {
  const board = ref<CatanBoard>(generateBoard());

  const players = ref<Players>({
    red: {
      visibleResources: true,
      name: "Red",
      color: "red",
      settlements: 5,
      cities: 4,
      roads: 15,
      victoryPoints: 0,
      wool: 1,
      brick: 1,
      lumber: 2,
      grain: 1,
      ore: 1,
    },
    blue: {
      visibleResources: false,
      name: "Blue",
      color: "blue",
      settlements: 5,
      cities: 4,
      roads: 15,
      victoryPoints: 0,
    },
    green: {
      visibleResources: false,
      name: "Green",
      color: "green",
      settlements: 5,
      cities: 4,
      roads: 15,
      victoryPoints: 0,
    },
    purple: {
      visibleResources: false,
      name: "Purple",
      color: "purple",
      settlements: 5,
      cities: 4,
      roads: 15,
      victoryPoints: 0,
    },
  });
  const turnOrder = ref<PlayerColor[]>(["red", "blue", "green", "purple"]);
  const turn = ref<number>(0);
  const turnPhase = ref<TurnPhase>("Roll");
  const activePlayer = computed<Player>(() => {
    return players.value[turnOrder.value[turn.value]];
  });

  const actionLog = ref<Action[]>([]);

  return {
    players,
    board,
    activePlayer,
    turnPhase,
    actionLog,
  };
});
