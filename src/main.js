import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const vueApp = createApp(App)
vueApp.use(createPinia())
vueApp.use(router)
vueApp.mount('#app')

// ----------

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
