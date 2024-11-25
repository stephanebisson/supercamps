<template>
  <header class="flex flex-row h-12 bg-slate-400">
    <div class="aspect-square">
      <slot name="left"></slot>
    </div>
    <div class="flex-grow text-3xl text-center content-center">{{ title }}</div>
    <div class="aspect-square content-center p-0">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Super Camps' },
})
</script>
