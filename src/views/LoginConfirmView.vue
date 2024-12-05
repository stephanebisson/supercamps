<template>
  <div>
    <v-alert :type="alertContent.type">{{ alertContent.message }}</v-alert>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useLogin from '@/composables/useLogin'

const alertContent = ref({
  message: 'Logging in... please wait',
  type: 'info',
})

const router = useRouter()
const { confirmLogin } = useLogin()
// todo: ask for email if not in storage
const email = window.localStorage.getItem('emailForSignIn')
if (email) {
  const result = await confirmLogin(email)
  if (result.result) {
    alertContent.value = {
      message: 'Welcome',
      type: 'success',
    }
    if (result.info.isNewUser) {
      router.push('/profile?new=1')
    } else {
      // todo: go back where you where before login in
      router.push('/camps')
    }
  } else {
    alertContent.value = {
      message: 'Something went wrong: ' + result.error,
      type: 'error',
    }
  }
} else {
  alertContent.value = {
    message: 'Wrong device',
    type: 'error',
  }
}
</script>
