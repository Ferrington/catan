<script setup lang="ts">
import { PLAYER_COLORS } from "~/config/constants";

const { activePlayer, turnPhase } = storeToRefs(useCatanStore());
</script>

<template>
  <div class="action-banner-wrapper">
    <div
      class="turn-info"
      :style="{ color: PLAYER_COLORS[activePlayer.color] }"
    >
      It is currently {{ activePlayer.name }}'s turn. Phase: {{ turnPhase }}
    </div>
  </div>
</template>

<style scoped>
.action-banner-wrapper {
  border-bottom: 1px solid black;
  padding: 10px;
  text-align: center;
}
</style>
