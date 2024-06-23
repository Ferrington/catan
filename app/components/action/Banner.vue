<script setup lang="ts">
const { activePlayer, turnPhase } = storeToRefs(useCatanStore());
</script>

<template>
  <div class="action-banner-wrapper"></div>
</template>

<style scoped>
.action-banner-wrapper {
  border-bottom: 1px solid black;
  padding: 10px;
  text-align: center;
  grid-column: span 3;
}
</style>
