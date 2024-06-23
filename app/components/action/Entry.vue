<script setup lang="ts">
import { PLAYER_COLORS } from "~~/config/constants";

const props = defineProps<{
  action: LogEntry;
}>();

const playerColor = computed(() => PLAYER_COLORS[props.action.player]);
</script>

<template>
  <div
    class="action"
    :class="{
      'background-highlight': action.color === 'background',
      'text-highlight': action.color === 'text',
    }"
  >
    {{ action.text }}
  </div>
</template>

<style scoped>
.action {
  padding: 5px;
  border-bottom: 1px solid black;
}

.background-highlight {
  background: v-bind(playerColor);
  color: white;
}

.text-highlight {
  color: v-bind(playerColor);
}
</style>
