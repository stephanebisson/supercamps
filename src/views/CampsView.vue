<script setup>
import { getCurrentUser } from 'vuefire'
import useCamps from '@/composables/useCamps'

const user = await getCurrentUser()
const { camps, updateCamp } = useCamps()

const isRegistrationOpen = (camp) => {
  return !!camp.registration
}

const isLiked = (camp) => {
  if (!user) {
    return false
  }
  const likes = camp.likes || []
  return likes.indexOf(user.email) !== -1
}

const toggleLike = (camp) => {
  if (!user) {
    return
  }
  const currentLikes = camp.likes || []
  const index = currentLikes.indexOf(user.email)
  if (index === -1) {
    currentLikes.push(user.email)
  } else {
    currentLikes.splice(index, 1)
  }
  return updateCamp(camp.id, { likes: currentLikes })
}
</script>

<template>
  <v-container>
    <v-row align-items="stretch">
      <v-col v-for="camp in camps" :key="camp.id" cols="12" md="6" lg="4">
        <v-card :title="camp.name" :subtitle="camp.location || camp.address" height="100%">
          <v-card-text>More details here...</v-card-text>
          <v-card-actions>
            <v-container class="pa-0">
              <v-row align="baseline">
                <v-col cols="auto"><v-btn :to="'/camp/' + camp.id">details</v-btn></v-col>
                <v-col cols="auto"
                  ><v-btn
                    v-if="isRegistrationOpen(camp)"
                    :href="camp.website"
                    target="_blank"
                    variant="elevated"
                    append-icon="mdi-open-in-new"
                    color="primary"
                    >register</v-btn
                  >
                  <v-btn v-else :disabled="true" variant="tonal">Registration coming soon</v-btn>
                </v-col>
                <v-col cols="auto" style="margin-left: auto"
                  ><v-btn
                    :icon="isLiked(camp) ? 'mdi-heart' : 'mdi-heart-outline'"
                    @click="toggleLike(camp)"
                  ></v-btn
                ></v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- <camp-summary v-for="camp in camps" :key="camp.id" :camp="camp"></camp-summary> -->
</template>
