<script setup lang="ts">
const { actionLog } = storeToRefs(useCatanStore());
</script>

<template>
  <div class="action-log-wrapper">
    <div class="header">Action Log</div>
    <div class="actions">
      <ActionEntry
        v-for="action in actionLog"
        :key="action.id"
        :action="action"
      />
    </div>
  </div>
</template>

<style scoped>
.action-log-wrapper {
  border-right: 1px solid black;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
}

.header {
  text-align: center;
  background: rgb(183, 183, 183);
  padding: 10px;
  border-bottom: 1px solid black;
}

.actions {
  width: 200px;
  box-sizing: border-box;
  padding-bottom: 20px;
  overflow-y: auto;
}
</style>
