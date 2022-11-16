<script setup>
import { ref, onMounted } from 'vue';

let user = ref("");
let message = ref("");

onMounted(() => {
    const apiUrl = "https://dev5-lab5.onrender.com/api/v1/messages/";
    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          user.value = (data.data.messages[0].user);
          message.value = (data.data.messages[0].message);
        });
});


</script>

<template>
  <div>
    <h1>fcekfc,mlefcjl</h1>
    <h1>{{ user }}</h1>
    <p>{{ message }}</p>
  </div>

</template>

<style scoped>
div {
    padding: 0 2em;
}
</style>
