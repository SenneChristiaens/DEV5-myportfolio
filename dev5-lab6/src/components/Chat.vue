<script setup>
import { onMounted, reactive } from "vue";

let comments = reactive([{ messages: "" }]);

onMounted(() => {
  const apiUrl = "https://lab5-p379.onrender.com/api/v1/messages/";
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      comments.messages = data;
      console.log(data);
    });
});
</script>

<template>
  <div class="chat">
    <h1>Comments</h1>
    <ul>
      <ul>
        <li v-for="comment in comments.messages" :key="comment">
          <h3>{{ comment.user }}</h3>
          <p>{{ comment.text }}</p>
        </li>
      </ul>
    </ul>
  </div>
</template>

<style scoped>
div {
  padding: 0 2em;
}
li {
  list-style: none;
}

.chat {
  margin-top: 6em;
  padding-bottom: 2em;
  background-color: #f1f1f1;
  height: 60vh;
  overflow: scroll;
}
</style>
