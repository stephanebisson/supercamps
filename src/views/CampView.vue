<script setup>
import useCampsStore from '../stores/camps'
const { findById } = useCampsStore()
const props = defineProps({
  campId: String,
})

const camp = findById(props.campId)
</script>

<template>
  <v-container>
    <v-btn
      prepend-icon="mdi-arrow-left-bold-outline"
      variant="outlined"
      class="mb-4"
      @click="$router.go(-1)"
      >back</v-btn
    >
    <v-card>
      <v-img height="200px" :src="camp.logo" cover></v-img>
      <v-card-title>{{ camp.name }}</v-card-title>
      <v-card-subtitle>Short desc</v-card-subtitle>
    </v-card>
  </v-container>
</template>
