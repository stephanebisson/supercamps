<template>
  <div>
    <v-btn @click="importCamps">inport camps into db</v-btn>
    <v-btn @click="createProfiles">create a bunch of profiles</v-btn>
  </div>
</template>
<script setup>
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'
import camps from '@/data/camps.json'

const db = getFirestore()

const importCamps = () => {
  const colRef = collection(db, 'camps')
  camps.forEach((c) => {
    const id = c.id
    delete c.id
    setDoc(doc(colRef, id), c)
  })
}

const createProfiles = () => {
  const colRef = collection(db, 'profiles')
  const profiles = [
    { name: 'Alice A', email: 'alice@test.com' },
    { name: 'Bob B', email: 'dod@test.com' },
    { name: 'Carl C', email: 'carl@test.com' },
    { name: 'Dwayne D', email: 'dwayne@test.com' },
    { name: 'Etienne E', email: 'etienne@test.com' },
  ]
  profiles.forEach((p) => {
    const id = p.email
    const data = { name: p.name, postalCode: 'H4B1K9' }
    setDoc(doc(colRef, id), data)
  })
}
</script>
