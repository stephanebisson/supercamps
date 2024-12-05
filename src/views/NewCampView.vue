<template>
  <form v-on:submit.prevent="send">
    Name: <input type="text" v-model="name" />

    <input type="submit" />
  </form>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const send = async () => {}
</script>
