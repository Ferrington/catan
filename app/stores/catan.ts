import { drawBoard } from "~~/lib/board/drawBoard";
import { generateBoard } from "~~/lib/board/generateBoard";

export const useCatanStore = defineStore("catan", () => {
  const { socket, connect } = useSocketStore();
  const route = useRoute();
  connect(Number(route.query.id));

  const canvas = ref<HTMLCanvasElement>();
  const highlightedObject = ref<HighlightedObject | null>(null);

  const gameState = ref<ClientGameState>({
    players: [],
    board: generateBoard(),
    turn: 0,
    turnPhase: { main: "roll", sub: null },
    actionLog: [],
  });

  const players = computed<Player[]>(() => gameState.value.players);
  const board = computed<CatanBoard>(() => gameState.value.board);
  const activePlayer = computed<Player | undefined>(
    () => players.value[gameState.value.turn]
  );
  const me = computed<Player | undefined>(() =>
    players.value.find((p) => p.visibleResources)
  );
  const isMyTurn = computed(() => activePlayer.value?.name === me.value?.name);
  const turnPhase = computed(() => gameState.value.turnPhase);
  const actionLog = computed<LogEntry[]>(() =>
    [...gameState.value.actionLog].reverse()
  );

  socket.on("gameState", (_gameState) => {
    gameState.value = _gameState;
    drawBoard();
  });

  socket.on("action:new", (action: LogEntry) => {
    gameState.value.actionLog.push(action);
  });

  socket.on("action:all", (actions: LogEntry[]) => {
    gameState.value.actionLog = actions;
  });

  socket.on("turn:advance", (turn: number, turnPhase: TurnPhase) => {
    gameState.value.turn = turn;
    gameState.value.turnPhase = turnPhase;
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
    activePlayer,
    turnPhase,
    actionLog,
    setCanvas,
    canvas,
    highlightedObject,
    rollDice,
    me,
    isMyTurn,
  };
});
