<script setup>
import VideoPlayer from './components/VideoPlayer.vue'
import VideoDetails from './components/VideoDetails.vue'
import Chat from './components/Chat.vue'
</script>

<template>
  <div class="app">
    <VideoPlayer />
    <VideoDetails />
    <Chat />
  </div>
</template>

<style scoped>
  .app {
    display: grid;
    grid-template-columns: 8fr 4fr;
    grid-template-rows: 8fr 1fr;
  }
</style>
