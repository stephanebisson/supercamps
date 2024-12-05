<template>
  <div>
    <v-alert v-if="alertContent" :type="alertContent.type">{{ alertContent.message }}</v-alert>
    <v-form v-if="showForm" @submit.prevent="login" v-model="form">
      <v-container>
        <v-row>
          <v-col>
            <p>
              To create your account, or log in, enter your email address and we'll sent you a
              personal login link. No need to memorize a password.
            </p>
            <v-text-field
              class="my-8"
              v-model="email"
              label="Email"
              :rules="[rules.required, rules.email]"
            ></v-text-field>
            <v-btn variant="elevated" color="primary" :disabled="!form" @click.prevent="login"
              >submit</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useLogin from '@/composables/useLogin'

const form = ref()
const alertContent = ref(null)
const showForm = ref(true)
const { startLogin } = useLogin()
const email = ref('')
const login = async () => {
  const result = await startLogin(email.value)
  if (result.result) {
    alertContent.value = {
      message: 'Check your email for a login link',
      type: 'info',
    }
    showForm.value = false
  } else {
    alertContent.value = {
      message: 'Something went wrong: ' + result.error,
      type: 'error',
    }
  }
}

const rules = {
  required: (value) => !!value || 'Required.',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid e-mail.'
  },
}
</script>
