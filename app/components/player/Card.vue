<script setup lang="ts">
import { PLAYER_COLORS } from "~~/config/constants";

defineProps<{
  player: Player;
}>();

const { me } = storeToRefs(useCatanStore());
</script>

<template>
  <div class="player">
    <div
      class="player-name"
      :style="{ backgroundColor: PLAYER_COLORS[player.color] }"
    >
      <div>{{ player.name }}</div>
      <div class="player-indicator" v-if="me?.name === player.name">
        &#9733;
      </div>
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
</template>

<style scoped>
.player {
  border-left: 1px solid black;
  border-bottom: 1px solid black;
}

.player-name {
  padding: 5px 10px;
  color: white;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
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

.player-indicator {
  position: relative;
  top: -1px;
  font-size: 1.3rem;
}
</style>
