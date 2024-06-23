<script setup lang="ts">
import { PLAYER_COLORS } from "~~/config/constants";

defineProps<{
  player: Player;
}>();

const { activePlayer, turnPhase } = storeToRefs(useCatanStore());
</script>

<template>
  <div class="turn-indicator-wrapper">
    <div class="turn-indicator" v-if="activePlayer?.name === player.name">
      <div class="roll" :class="{ highlight: turnPhase.main === 'roll' }">
        Roll
      </div>
      <div class="build" :class="{ highlight: turnPhase.main === 'build' }">
        Build
      </div>
    </div>
  </div>
</template>

<style scoped>
.turn-indicator {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
}

.roll,
.build {
  border-left: 1px solid black;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.roll {
  border-top: 1px solid black;
}

.build {
  border-bottom: 1px solid black;
}

.highlight {
  background-color: v-bind("PLAYER_COLORS[player.color]");
  color: white;
}
</style>
