<script setup lang="ts">
const { players, resources } = storeToRefs(useCatanStore());
</script>

<template>
  <div class="player-info-wrapper">
    <div class="player-card-wrapper">
      <template v-for="player in players" :key="player.name">
        <PlayersTurnIndicator :player="player" />
        <PlayersCard :player="player" />
      </template>
      <div></div>
      <div class="bank">
        <div class="bank-header">Bank</div>
        <div class="info">
          <div class="two-columns">
            <div>Brick:</div>
            <div>{{ resources.brick }}</div>
          </div>
          <div class="two-columns">
            <div>Lumber:</div>
            <div>{{ resources.lumber }}</div>
          </div>
          <div class="two-columns">
            <div>Wool:</div>
            <div>{{ resources.wool }}</div>
          </div>
          <div class="two-columns">
            <div>Grain:</div>
            <div>{{ resources.grain }}</div>
          </div>
          <div class="two-columns">
            <div>Ore:</div>
            <div>{{ resources.ore }}</div>
          </div>
        </div>
      </div>
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

.bank {
  border-left: 1px solid black;
  border-bottom: 1px solid black;
}

.bank-header {
  padding: 5px 10px;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  background: rgb(223, 223, 223);
}

.info {
  padding: 10px;
}

.two-columns {
  display: flex;
  justify-content: space-between;
  gap: 3rem;
}
</style>
