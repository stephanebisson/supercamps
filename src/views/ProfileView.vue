<template>
  <v-container>
    <v-alert v-show="isNew" type="info"
      >Welcome to Super Camps!<br />Take a moment to complete your profile or go directly to the
      <router-link to="/camps">camps</router-link></v-alert
    >
    <v-card title="Personal info" :subtitle="email">
      <v-card-text>
        <v-form @submit.prevent="updatePersonalInfo">
          <v-text-field
            class="mb-4"
            v-model="displayName"
            label="Display name"
            hint="Friends will search for you by name"
            persistent-hint
          ></v-text-field>
          <v-text-field
            class="mb-4"
            v-model="postalCode"
            label="Postal code"
            hint="This will be used to calculate the distance between your home and the camps"
            persistent-hint
          ></v-text-field>
          <v-btn
            color="primary"
            @click.prevent="updatePersonalInfo"
            :disabled="!canUpdatePersonalInfo"
            >update personal info</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
    <v-card class="mt-4" title="Kids">
      <v-card-text>
        <v-form>
          <v-row v-for="(kid, index) in kids" :key="kid.name">
            <v-col cols="5">
              <v-text-field label="Name"></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field label="Date of birth" hint="Format: yyyy-mm-dd"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn icon="mdi-minus-circle" color="red" @click.prevent="removeKid(index)"></v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12"
              ><v-btn icon="mdi-plus-circle" color="green" @click="addKidsLine"></v-btn
            ></v-col>
          </v-row>
          <v-row>
            <v-col cols="12"><v-btn color="primary">update kids info</v-btn></v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card class="mt-4" title="Friends" subtitle="You don't have any friends yet"> </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getCurrentUser, updateCurrentUserProfile } from 'vuefire'
import useProfile from '@/composables/useProfile'

const route = useRoute()

// ----- Personal info
const user = await getCurrentUser()
const postalCode = ref('')
const { profile, updateProfile } = useProfile(user.email, () => {
  postalCode.value = profile.value.postalCode
})
const isNew = route.query.new === '1'
const email = user.email
const displayName = ref(user.displayName)

const canUpdatePersonalInfo = computed(() => {
  return (
    (displayName.value || '') !== (user.displayName || '') ||
    postalCode.value !== profile.value.postalCode
  )
})

const updatePersonalInfo = async () => {
  // update name in auth system
  if (displayName.value !== user.displayName) {
    const result = await updateCurrentUserProfile({ displayName: displayName.value })
    console.log('update displayName', result)
  }
  // update profile doc
  const formattedPostalCode = postalCode.value
    ? postalCode.value.replace(/\s/g, '').toUpperCase()
    : ''
  updateProfile({ name: displayName.value, postalCode: formattedPostalCode })
}

// ------ kids
const kids = ref([{ name: 'Stella', dob: '2017-05-17' }])
const addKidsLine = () => kids.value.push({ name: '', dob: '' })
const removeKid = (index) => kids.value.splice(index, 1)
</script>
