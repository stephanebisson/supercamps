<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import UserButton from '@/components/UserButton.vue'

const drawer = ref(false)
const items = [
  { key: 'camps', title: 'Camps', to: '/camps' },
  { key: 'profile', title: 'Profile', to: '/profile' },
  { key: 'about', title: 'About', to: '/about' },
]
</script>

<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>Super Camps</v-app-bar-title>
      </template>
      <template v-slot:append>
        <user-button></user-button>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-list nav>
        <v-list-item
          v-for="item in items"
          :key="item.key"
          :title="item.title"
          :to="item.to"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'none'">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    <v-footer>
      <template v-slot:default> This is the footer </template>
    </v-footer>
  </v-app>
</template>

<style scoped></style>
