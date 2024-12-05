<template>
  <div>
    <h2>All profiles</h2>
    <div v-for="profile in profiles" :key="profile.key">
      <pre>{{ profile }}</pre>
    </div>
    <h2>MY profile</h2>
    <h3>{{ myProfile?.id }}</h3>
    <pre>{{ myProfile }}</pre>
  </div>
</template>
<script setup>
import { collection } from 'firebase/firestore'
import { useCollection, useFirestore } from 'vuefire'
import useProfile from '@/composables/useProfile'

const db = useFirestore()
const colRef = collection(db, 'profiles')
const profiles = useCollection(colRef)

const { profile: myProfile } = useProfile('stephane1@test.com')
</script>
