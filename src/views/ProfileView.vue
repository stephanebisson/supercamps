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
      <v-alert v-show="!kids" type="info">You know camps are for kids right? </v-alert>
      <v-card-text>
        <v-row v-for="(kid, index) in kids" :key="kid.id">
          <v-col cols="5">
            {{ kid.name }}
          </v-col>
          <v-col cols="5">
            {{ kid.dob }}
          </v-col>
          <v-col cols="2">
            <v-dialog v-model="dialog" max-width="600">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  class="text-none font-weight-regular"
                  icon="mdi-pencil"
                  variant="tonal"
                  @click="beginEditEdistingKid(index)"
                  v-bind="activatorProps"
                ></v-btn>
              </template>

              <v-card prepend-icon="mdi-account" title="Kid">
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        label="Name*"
                        hint="We recommend using first name and initial, or only initials, to preserve privacy while minimizing ambiguity. Ex: Adam B or AB"
                        persistent-hint
                        required
                        v-model="editKidName"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        hint="Format: yyyy-mm-dd"
                        persistent-hint
                        label="Date of birth"
                        v-model="editKidDob"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

                  <v-btn color="primary" text="Save" variant="tonal" @click="saveEditKid"></v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-dialog v-model="dialog" max-width="600">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  class="text-none font-weight-regular"
                  icon="mdi-plus-circle"
                  color="green"
                  @click="beginEditNewKid"
                  v-bind="activatorProps"
                ></v-btn>
              </template>

              <v-card prepend-icon="mdi-account" title="Kid">
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        label="Name*"
                        hint="We recommend using first name and initial, or only initials, to preserve privacy while minimizing ambiguity. Ex: Adam B or AB"
                        persistent-hint
                        required
                        v-model="editKidName"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        hint="Format: yyyy-mm-dd"
                        persistent-hint
                        label="Date of birth"
                        v-model="editKidDob"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

                  <v-btn color="primary" text="Save" variant="tonal" @click="saveEditKid"></v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <friends class="my-4"></friends>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getCurrentUser, updateCurrentUserProfile } from 'vuefire'
import useProfile from '@/composables/useProfile'
import useKids from '@/composables/useKids'
import Friends from '@/components/Friends.vue'

const route = useRoute()

// ----- Personal info
const user = await getCurrentUser()
const { profile, updateProfile } = await useProfile(user.email)
const isNew = route.query.new === '1'
const email = user.email
const displayName = ref(user.displayName)
const postalCode = ref(profile.value.postalCode)

const canUpdatePersonalInfo = computed(() => {
  return (
    (displayName.value || '') !== (user.displayName || '') ||
    postalCode.value !== profile.value.postalCode
  )
})

const updatePersonalInfo = async () => {
  // update name in auth system
  if (displayName.value !== user.displayName) {
    await updateCurrentUserProfile({ displayName: displayName.value })
  }
  // update profile doc
  const formattedPostalCode = postalCode.value
    ? postalCode.value.replace(/\s/g, '').toUpperCase()
    : ''
  updateProfile({ name: displayName.value, postalCode: formattedPostalCode })
}

// ------ kids
const dialog = ref(false)
const { kids, addKid, updateKid } = useKids(user.email)
const editKidId = ref(null)
const editKidName = ref(null)
const editKidDob = ref(null)

const beginEditNewKid = () => {
  editKidId.value = null
  editKidName.value = ''
  editKidDob.value = ''
  dialog.value = true
}

const beginEditEdistingKid = (index) => {
  const kid = kids.value[index]
  editKidId.value = kid.id
  editKidName.value = kid.name
  editKidDob.value = kid.dob
  dialog.value = true
}

const saveEditKid = () => {
  if (editKidId.value) {
    updateKid(editKidId.value, editKidName.value, editKidDob.value)
  } else {
    addKid(editKidName.value, editKidDob.value)
  }
  dialog.value = false
}

// ----- Friends
const friendsTabs = ref('friends')
</script>
