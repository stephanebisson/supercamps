<script setup>
import AppHeader from '@/components/AppHeader.vue'
import BackButton from '@/components/BackButton.vue'
import CampDetails from '@/components/CampDetails.vue'
import useCampsStore from '../stores/camps'
const { findByName } = useCampsStore()
const props = defineProps({
  campName: String,
})

const camp = findByName(props.campName)
</script>

<template>
  <div class="h-full">
    <app-header>
      <template v-slot:left>
        <back-button></back-button>
      </template>
    </app-header>
    <camp-details :camp="camp"></camp-details>
  </div>
</template>
