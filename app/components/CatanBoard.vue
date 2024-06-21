<script lang="ts" setup>
import { DEBUG_MODE } from "~~/config/constants";

const canvas = ref<HTMLCanvasElement | null>(null);
const boardWrapper = ref<HTMLDivElement | null>(null);

const { mouseCoords, handleMouseMove, highlightedObject } = useCatanBoard(
  canvas,
  boardWrapper
);

const { rollDice } = useCatanStore();
const { isMyTurn } = storeToRefs(useCatanStore());
</script>

<template>
  <div class="exterior-board-wrapper">
    <div class="debug-info" v-if="DEBUG_MODE">
      <div>Mouse coords: {{ mouseCoords }}</div>
      <div>Object Type: {{ highlightedObject?.type }}</div>
      <div>Hex Coords: {{ highlightedObject?.coords }}</div>
    </div>
    <div ref="boardWrapper" class="board-wrapper">
      <canvas
        ref="canvas"
        class="board"
        width="1125"
        height="975"
        @mousemove="handleMouseMove"
        @mouseleave="mouseCoords = null"
      ></canvas>
    </div>
    <div class="dice-roller">
      <button v-if="isMyTurn" class="roll-dice-button" @click="rollDice">
        Roll Dice
      </button>
    </div>
  </div>
</template>

<style scoped>
.exterior-board-wrapper {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 30px;
  overflow: hidden;
}

.board-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  height: 100%;
}

.debug-info {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
  background: white;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}

.dice-roller {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
}

.roll-dice-button {
  padding: 10px;
  font-size: 1.5rem;
  background: yellow;
  border: 1px solid black;
  color: red;
  cursor: pointer;
}
</style>
