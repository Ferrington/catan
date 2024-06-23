<script setup lang="ts"></script>

<template>
  <div class="game-wrapper">
    <ActionBanner />
    <ActionLog />
    <CatanBoard />
    <PlayerInfoPanel />
  </div>
</template>

<style scoped>
.game-wrapper {
  height: 100dvh;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr;
}
</style>
