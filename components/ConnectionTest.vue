<script setup lang="ts">
const isConnected = ref(false);
const transport = ref("N/A");

const message = ref("");
const messages = ref<string[]>([]);

if (socket.connected) {
  onConnect();
}

function onConnect() {
  isConnected.value = true;
  transport.value = socket.io.engine.transport.name;

  socket.io.engine.on("upgrade", (rawTransport) => {
    transport.value = rawTransport.name;
  });
}

function onDisconnect() {
  isConnected.value = false;
  transport.value = "N/A";
}

socket.on("connect", onConnect);
socket.on("disconnect", onDisconnect);

onBeforeUnmount(() => {
  socket.off("connect", onConnect);
  socket.off("disconnect", onDisconnect);
});

function sendMessage() {
  console.log(message.value);
  socket.emit("message", message.value);
}

socket.on("message", (msg: string) => {
  messages.value.push(msg);
});
</script>

<template>
  <div>
    <p>Status: {{ isConnected ? "connected" : "disconnected" }}</p>
    <p>Transport: {{ transport }}</p>
    <form @submit.prevent="sendMessage">
      <input type="text" v-model="message" />
      <button>Send</button>
    </form>
    <div>
      <p v-for="msg in messages" :key="msg">{{ msg }}</p>
    </div>
  </div>
</template>
