import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { VueFire, VueFireAuth } from 'vuefire'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import App from './App.vue'
import router from './router'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAhxpZKfIkFD55DS53o2jr-7BWWHLTKFBY',
  authDomain: 'supercamps-9c280.firebaseapp.com',
  projectId: 'supercamps-9c280',
  storageBucket: 'supercamps-9c280.firebasestorage.app',
  messagingSenderId: '532096867774',
  appId: '1:532096867774:web:d8b4d0c4c26e21cc94adef',
  measurementId: 'G-6Y10NYN30S',
}

const firebaseApp = initializeApp(firebaseConfig)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

const vueApp = createApp(App)
vueApp.use(createPinia())
vueApp.use(router)
vueApp.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})
vueApp.use(vuetify)

const auth = getAuth()
auth.useDeviceLanguage()
if (location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099')
  const db = getFirestore()
  connectFirestoreEmulator(db, '127.0.0.1', 8088)
}

vueApp.mount('#app')
