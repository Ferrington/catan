<script setup lang="ts">
import { PLAYER_COLORS } from "~~/config/constants";

const { me } = storeToRefs(useCatanStore());

const color = computed(() => PLAYER_COLORS[me.value?.color ?? "red"]);
</script>

<template>
  <div class="player-info-wrapper">
    <div class="resource-card">
      <div class="resource-name">Brick</div>
      <div class="resource-count">{{ me?.brick }}</div>
    </div>
    <div class="resource-card">
      <div class="resource-name">Lumber</div>
      <div class="resource-count">{{ me?.lumber }}</div>
    </div>
    <div class="resource-card">
      <div class="resource-name">Wool</div>
      <div class="resource-count">{{ me?.wool }}</div>
    </div>
    <div class="resource-card">
      <div class="resource-name">Grain</div>
      <div class="resource-count">{{ me?.grain }}</div>
    </div>
    <div class="resource-card">
      <div class="resource-name">Ore</div>
      <div class="resource-count">{{ me?.ore }}</div>
    </div>
  </div>
</template>

<style scoped>
.player-info-wrapper {
  justify-self: center;
  background: v-bind(color);
  color: white;
  display: flex;
  gap: 50px;
  padding: 10px 50px;
}

.resource-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.resource-name {
  font-size: 1.2rem;
}

.resource-count {
  font-size: 1.5rem;
}
</style>
