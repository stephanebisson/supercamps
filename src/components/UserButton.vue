<template>
  <v-menu v-if="user">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-account" v-bind="props"></v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-btn to="/profile">profile</v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn @click="logoutBtnClick">logout</v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
  <v-btn v-else icon="mdi-account-outline" to="/login"></v-btn>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser, useFirebaseAuth } from 'vuefire'
import { onAuthStateChanged } from 'firebase/auth'

const router = useRouter()
const user = ref(null)
user.value = await getCurrentUser()
const auth = useFirebaseAuth()
onAuthStateChanged(auth, (u) => {
  user.value = u
})

const logoutBtnClick = async () => {
  await auth.signOut()
  if (router.currentRoute.value.meta.auth) {
    router.push('/login')
  }
}
</script>
