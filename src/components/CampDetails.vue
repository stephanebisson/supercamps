<script setup>
defineProps({
  camp: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <div class="drop-shadow-md rounded-md flex flex-col h-full">
    <div
      class="h-1/4"
      :style="{
        backgroundImage: 'url(' + camp.logo + ')',
        backgroundSize: camp['logo-bg-size'] || 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }"
    ></div>
    <div class="m-2 p-2 z-10">
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
</template>
