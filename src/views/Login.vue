<template>
  <div class="p-4 d-flex flex-col xl:flex-row justify-between h-full" style="background-color: #e0bfbf;">
    <div>
        <v-img width="40%" :aspect-ratio="125/62" class="self-center ml-1" :src="require('../assets/California_Logo.svg')"></v-img>
        <v-img width="55%" class="ml-auto mr-auto" :src="require('../assets/hoofd.png')"></v-img>
    </div>
    <div class="mt-auto xl:ml-auto xl:mr-auto">
      <h4 class="text-h5 mb-3">Om te beginnen, <br>log in met je account</h4>
      <LoginForm :login-callback="login"></LoginForm>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import {LOGIN_MUTATION} from "@/constants/graphql";
import {AUTH_TOKEN, USER_DATA} from "@/constants/settings";

export default {
  name: "Login",
  components: {
    LoginForm
  },
  methods: {
    login(email, password) {
      this.$apollo.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email,
          password
        }
      }).then((result) => {
        const user = result.data.login.user;
        const token = result.data.login.jwt;
        localStorage.setItem(USER_DATA, JSON.stringify(user));
        localStorage.setItem(AUTH_TOKEN, token);
        this.$router.push({path: '/'})
      }).catch((error) => {
        console.error(error);
      });
    },
  }
}
</script>