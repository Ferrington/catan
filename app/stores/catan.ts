import { drawBoard } from "~~/lib/board/drawBoard";
import { generateBoard } from "~~/lib/board/generateBoard";

export const useCatanStore = defineStore("catan", () => {
  const { socket, connect } = useSocketStore();
  const route = useRoute();
  connect(Number(route.query.id));

  const canvas = ref<HTMLCanvasElement>();

  const gameState = ref<ClientGameState>({
    players: [],
    board: generateBoard(),
    turn: 0,
    turnPhase: { main: "roll", sub: null },
    actionLog: [],
    resources: {
      wool: 0,
      brick: 0,
      lumber: 0,
      grain: 0,
      ore: 0,
    },
  });

  const players = computed<Player[]>(() => gameState.value.players);
  const board = computed<CatanBoard>(() => gameState.value.board);
  const activePlayer = computed<Player | undefined>(
    () => players.value[gameState.value.turn]
  );
  const me = computed(
    () =>
      players.value.find((p) => p.visibleResources) as VisiblePlayer | undefined
  );
  const isMyTurn = computed(() => activePlayer.value?.name === me.value?.name);
  const turnPhase = computed(() => gameState.value.turnPhase);
  const actionLog = computed<LogEntry[]>(() =>
    [...gameState.value.actionLog].reverse()
  );
  const resources = computed(() => gameState.value.resources);

  const highlightedObject = ref<HighlightedObject | null>(null);
  const interaction = computed<InteractionControls>(() => {
    if (activePlayer.value?.name !== me.value?.name) return null;
    else if (
      turnPhase.value.main === "roll" &&
      turnPhase.value.sub === "robber"
    )
      return {
        type: "tile",
        highlight: "number",
        color: "black",
      };
    else return null;
  });

  socket.on("gameState", (_gameState) => {
    gameState.value = _gameState;
    drawBoard();
  });

  socket.on("action:new", (action) => {
    gameState.value.actionLog.push(action);
  });

  socket.on("action:all", (actions) => {
    gameState.value.actionLog = actions;
  });

  socket.on("turn:advance", (turn, turnPhase) => {
    gameState.value.turn = turn;
    gameState.value.turnPhase = turnPhase;
  });

  socket.on("resources:update", (bankResources, playerResources) => {
    gameState.value.resources = bankResources;
    playerResources.forEach(({ playerColor, resources, resourceCount }) => {
      const player = gameState.value.players.find(
        (player) => player.color === playerColor
      );
      if (!player) return;

      if (player.visibleResources) {
        player.wool = resources?.wool ?? 0;
        player.brick = resources?.brick ?? 0;
        player.lumber = resources?.lumber ?? 0;
        player.grain = resources?.grain ?? 0;
        player.ore = resources?.ore ?? 0;
      }
      player.resourceCount = resourceCount;
    });
  });

  function rollDice() {
    socket.emit("roll");
  }

  function setCanvas(_canvas: HTMLCanvasElement) {
    canvas.value = _canvas;
  }

  return {
    players,
    board,
    resources,
    activePlayer,
    turnPhase,
    actionLog,
    setCanvas,
    canvas,
    interaction,
    highlightedObject,
    rollDice,
    me,
    isMyTurn,
  };
});
