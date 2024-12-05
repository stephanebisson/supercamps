<script setup>
import useCampsStore from '@/stores/camps'
const { camps } = useCampsStore()

const isRegistrationOpen = (camp) => {
  return !!camp.registration
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
                  ><v-btn icon="mdi-heart-outline"></v-btn
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
