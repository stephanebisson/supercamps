<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="max-w-md mx-auto box-border p-0 h-full">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped></style>
