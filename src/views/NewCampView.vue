<template>
  <form v-on:submit.prevent="send">
    Name: <input type="text" v-model="name" />

    <input type="submit" />
  </form>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const send = async () => {
  const url =
    'https://script.google.com/macros/s/AKfycby97HVHIBqx3LEol1tPQ7SSG6QL6vEOQJR7zwstqKDI4idzGCQdmaB7o8qe704KcXSpUA/exec'
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ name: name.value }),
    headers: {
      'Content-Type': 'text/plain',
    },
  })
  const text = await response.json()
  console.log('oh yeah!', name.value, text)
}
</script>
