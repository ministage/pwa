<template>
  <div class="d-flex flex-col xl:flex-row justify-between xl:mt-36 h-full">
    <div>
        <v-img width="70%" :aspect-ratio="125/62" class="self-center" :src="require('../assets/California_Logo.svg')"></v-img>
        <h1 class="text-h2 font-weight-medium pt-5">Welkom bij California!</h1>
    </div>
    <div class="mt-auto xl:ml-auto xl:mr-auto mb-10">
      <h4 class="text-h5 mb-3">Om te beginnen, log in met je account</h4>
      <LoginForm></LoginForm>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
export default {
  name: "Login",
  components: {
    LoginForm
  }
}
</script>