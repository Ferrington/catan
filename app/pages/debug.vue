<script setup lang="ts">
const { socket } = useSocketStore();
socket.connect();

function setTurnPhase(phase: TurnPhase) {
  socket.emit("setTurnPhase", phase);
}

function setPlayerTurn(playerColor: PlayerColor) {
  socket.emit("setPlayerTurn", playerColor);
}
</script>

<template>
  <div class="debug-page">
    <div class="card">
      <div class="title">Player Turn</div>
      <div class="flex-row">
        <button @click="setPlayerTurn('red')">Red</button>
        <button @click="setPlayerTurn('blue')">Blue</button>
        <button @click="setPlayerTurn('green')">Green</button>
        <button @click="setPlayerTurn('purple')">Purple</button>
      </div>
    </div>
    <div class="card">
      <div class="title">Turn Phase</div>
      <div class="flex-column">
        <button @click="setTurnPhase({ main: 'roll', sub: null })">Roll</button>
        <button @click="setTurnPhase({ main: 'build', sub: null })">
          Build
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.debug-page {
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
}

.card {
  padding: 15px 25px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title {
  font-weight: bold;
  border-bottom: 1px solid black;
  padding-bottom: 2px;
  margin-bottom: 5px;
}

.flex-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.flex-row {
  display: flex;
  gap: 10px;
}
</style>
