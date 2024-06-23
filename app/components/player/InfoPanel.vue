<script setup lang="ts">
const { players } = storeToRefs(useCatanStore());
</script>

<template>
  <div class="player-info-wrapper">
    <div class="player-card-wrapper">
      <template v-for="player in players" :key="player.name">
        <PlayerTurnIndicator :player="player" />
        <PlayerCard :player="player" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.player-info-wrapper {
  display: flex;
  flex-direction: column;
}

.player-card-wrapper {
  display: grid;
  grid-template-columns: auto auto;
}
</style>
