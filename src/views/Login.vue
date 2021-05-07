<template>
  <div class="p-4 d-flex flex-col xl:flex-row justify-between h-full" style="background-color: #e0bfbf;">
    <div>
        <v-img width="40%" :aspect-ratio="125/62" class="self-center ml-1" :src="require('../assets/California_Logo.svg')"></v-img>
    </div>
    <v-img class="ml-auto mr-auto max-h-32 xs:max-h-60" :src="require('../assets/hoofd.png')" contain></v-img>
    <div class="xl:ml-auto xl:mr-auto">
      <h4 class="text-xl mb-3">Om te beginnen, <br>log in met je account</h4>
      <LoginForm :login-callback="login"></LoginForm>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import {API_URL, USER_DATA} from "@/constants/settings";
import {onLogin} from "@/vue-apollo";

export default {
  name: "Login",
  components: {
    LoginForm
  },
  methods: {
    async login(email, password) {
      try{
        let response = await fetch(API_URL + "/auth/login", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });
        if(!response.ok) {
          throw(await response.text());
        }

          let json = await response.json();
          const { access_token, refresh_token } = json.data;
          await onLogin(this.$apollo.getClient(), access_token, refresh_token);
          response = await fetch(API_URL + "/users/me", {
            headers: {
              "Authorization": `Bearer ${access_token}`
            }
          });
          if(!response.ok){
            throw(await response.text());
          }
          let user = await response.json();
          localStorage.setItem(USER_DATA, JSON.stringify(user.data));
          await this.$router.push({path: '/'})

      } catch(error) {
        console.error(error);
      }
    },
  }
}
</script>