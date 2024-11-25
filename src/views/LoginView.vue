<template>
  <div>
    <app-header></app-header>
    <form class="p-4">
      <cdx-field>
        <cdx-text-input v-model="email" />
        <template #label>Email</template>
        <template #description
          >Start by entering your email address and we'll send you a pin</template
        >
      </cdx-field>
      <cdx-button action="progressive" weight="primary" size="large" @click="login"
        >SEND</cdx-button
      >
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CdxField, CdxTextInput, CdxButton } from '@wikimedia/codex'
import AppHeader from '@/components/AppHeader.vue'
const email = ref('')
const login = async (e) => {
  e.preventDefault()
  const baseUrl =
    'https://script.google.com/macros/s/AKfycby97HVHIBqx3LEol1tPQ7SSG6QL6vEOQJR7zwstqKDI4idzGCQdmaB7o8qe704KcXSpUA/exec'
  const url = baseUrl + '?action=loginWithEmail'
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ email: email.value }),
    headers: {
      'Content-Type': 'text/plain',
    },
  })
  const text = await response.json()
  console.log('oh yeah!', email.value, text)
}
</script>
