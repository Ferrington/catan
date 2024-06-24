<script setup lang="ts">
import { PLAYER_COLORS } from "~~/config/constants";

const { activePlayer, me, turnPhase } = storeToRefs(useCatanStore());

const actionBanner = computed(() => {
  if (activePlayer.value?.name !== me.value?.name) {
    return `It's ${activePlayer.value?.name}'s turn.`;
  } else if (turnPhase.value.main === "roll") {
    if (turnPhase.value.sub == null) return "Roll the dice to start your turn!";
    else if (turnPhase.value.sub === "robber") return "Move the robber!";
  }

  return "";
});

const color = computed(() => PLAYER_COLORS[activePlayer.value?.color ?? "red"]);
</script>

<template>
  <div class="action-banner-wrapper">{{ actionBanner }}</div>
</template>

<style scoped>
.action-banner-wrapper {
  border-bottom: 1px solid black;
  padding: 5px;
  text-align: center;
  grid-column: span 3;
  font-size: 1.5rem;
  color: v-bind(color);
}
</style>
