<script setup>
import { ref, onMounted, reactive } from "vue";

let comments = reactive([{ messages: "" }]);
let message = ref("");

onMounted(() => {
  const apiUrl = "https://lab5-p379.onrender.com/api/v1/messages/";
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      comments.messages = data;
      // reverse the comments
      comments.messages.reverse();
      // console.log(data);
    });
});

// create function to add messages
const addMessage = () => {
  console.log(message.value);
  let data = {
    user: "Senne Christmas",
    text: message.value,
  };
  fetch("https://lab5-p379.onrender.com/api/v1/messages/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      comments.messages.unshift({
        user: data.data.user,
        text: data.data.text,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
</script>

<template>
  <div class="chat">
    <h1>Comments</h1>
    <ul>
      <li v-for="comment in comments.messages" :key="comments">
        <h3>{{ comment.user }}</h3>
        <p>{{ comment.text }}</p>
      </li>
    </ul>
  </div>

  <div class="input">
    <input type="text" placeholder="Add comment..." v-model="message" />
    <button @click="addMessage">Add Message</button>
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

.input {
  display: flex;
  gap: 1em;
  margin-top: 2em;
}
</style>
