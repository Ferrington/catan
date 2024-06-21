import { drawBoard } from "~/utils/board/drawBoard";

export const useCatanStore = defineStore("catan", () => {
  const canvas = ref<HTMLCanvasElement>();
  const highlightedObject = ref<HighlightedObject | null>(null);

  const dice = ref<Dice>([1, 1]);
  const gameState = ref<ClientGameState>();

  const players = computed(() => gameState.value?.players || []);
  const board = computed(() => gameState.value?.board);
  const activePlayer = computed<Player | undefined>(() =>
    gameState.value ? players.value?.[gameState.value.turn] : undefined
  );
  const me = computed(() => players.value?.find((p) => p.visibleResources));
  const isMyTurn = computed(() => activePlayer.value?.name === me.value?.name);
  const turnPhase = computed(() => gameState.value?.turnPhase);
  const actionLog = computed(() => gameState.value?.actionLog ?? []);

  socket.on("gameState", (_gameState) => {
    gameState.value = _gameState;
    drawBoard();
  });

  socket.on("roll", (roll) => (dice.value = roll));

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
    dice,
    setCanvas,
    canvas,
    highlightedObject,
    rollDice,
    me,
    isMyTurn,
  };
});
