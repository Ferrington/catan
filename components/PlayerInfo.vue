<script setup lang="ts">
import { PLAYER_COLORS } from "~/config/constants";

const { players } = storeToRefs(useCatanStore());
</script>

<template>
  <div class="player-info-wrapper">
    <div v-for="player in players" :key="player.name" class="player">
      <div
        class="player-name"
        :style="{ backgroundColor: PLAYER_COLORS[player.color] }"
      >
        {{ player.name }}
      </div>
      <div class="info">
        <div class="two-columns victory-points">
          <div>VP:</div>
          <div>{{ player.victoryPoints }}</div>
        </div>
        <div class="two-columns">
          <div>Roads:</div>
          <div>{{ player.roads }}</div>
        </div>
        <div class="two-columns">
          <div>Settlements:</div>
          <div>{{ player.settlements }}</div>
        </div>
        <div class="two-columns">
          <div>Cities:</div>
          <div>{{ player.cities }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player-info-wrapper {
  border-left: 1px solid black;
  display: flex;
  flex-direction: column;
  grid-row: span 2;
}

.player {
  border-bottom: 1px solid black;
}

.player-name {
  padding: 5px 10px;
  color: white;
  font-size: 1.5rem;
}

.info {
  padding: 10px;
}

.two-columns {
  display: flex;
  justify-content: space-between;
  gap: 3rem;
}

.victory-points {
  margin-bottom: 20px;
}
</style>
