<script setup>
import { RouterLink } from 'vue-router'
import { CdxIcon } from '@wikimedia/codex'
import { cdxIconUserAvatar } from '@wikimedia/codex-icons'
import AppHeader from '@/components/AppHeader.vue'
import CampSummary from '@/components/CampSummary.vue'
import useCampsStore from '@/stores/camps'
const { camps } = useCampsStore()
</script>

<template>
  <div class="h-full">
    <app-header>
      <template v-slot:right>
        <router-link to="login">
          <cdx-icon :icon="cdxIconUserAvatar"></cdx-icon>
        </router-link>
      </template>
    </app-header>
    <div class="flex flex-col gap-y-1 mx-1">
      <camp-summary v-for="camp in camps" :key="camp.name" :camp="camp"></camp-summary>
    </div>
  </div>
</template>
