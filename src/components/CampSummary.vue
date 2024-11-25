<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
  camp: {
    type: Object,
    required: true,
  },
})
const imgStyle = {}
if (props.camp.logo) {
  imgStyle.backgroundImage = 'url(' + props.camp.logo + ')'
  imgStyle.backgroundSize = props.camp['logo-bg-size'] || 'cover'
}
</script>
<template>
  <router-link :to="{ name: 'camp', params: { campName: camp.name } }">
    <div class="drop-shadow-md rounded-md bg-gray-300 flex flex-row gap-3 h-20 cursor-pointer">
      <div class="w-1/4 h-full aspect-square rounded-l-md bg-soleil" :style="imgStyle"></div>
      <div class="justify-items-start">
        <div class="text-2xl">{{ camp.name }}</div>
        <div class="text-sm overflow-hidden line-clamp-1">{{ camp.address || camp.location }}</div>
        <div class="text-red-600">{{ camp.registration }}</div>
      </div>
      <!-- 
        <div
          v-if="camp.registration"
          class="bg-white absolute -right-1 top-2 p-1 w-1/2 pl-6 text-center rounded-r-sm"
          :style="{ clipPath: 'polygon(0 0,100% 0,100% 100%, 20px 100%)' }"
        >
          {{ camp.registration }}
        </div>
      </div>
      <div class="p-1">
        <div class="text-2xl">
          <a :href="camp.website" target="_blank">{{ camp.name }}</a>
        </div>
        <h3 v-if="camp.location">{{ camp.location }}</h3>
        <h3 v-if="camp.address">
          <a :href="'https://www.google.com/maps/place/' + camp.address" target="_blank">{{
            camp.address
          }}</a>
        </h3>
        <div></div>
      </div> -->
    </div>
  </router-link>
</template>
