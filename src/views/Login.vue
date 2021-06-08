<template>
  <div class="p-4 d-flex flex-col xl:flex-row justify-between h-full" style="background-color: #e0bfbf;">
    <div>
      <v-img width="40%" :aspect-ratio="125/62" class="self-center ml-1"
             :src="require('../assets/California_Logo.svg')"></v-img>
    </div>
    <v-alert
        absolute
        type="error"
        v-if="error"
    >{{ error }}
    </v-alert>
    <v-img class="ml-auto mr-auto max-h-32 xs:max-h-60" :src="require('../assets/hoofd.png')" contain></v-img>
    <div class="xl:ml-auto xl:mr-auto">

      <h4 class="text-xl mb-3">Om te beginnen, <br>log in met je account</h4>
      <LoginForm :login-callback="login"></LoginForm>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import {USER_DATA} from "@/constants/settings";
import {onLogin} from "@/vue-apollo";
import {directus} from "@/main";

export default {
  name: "Login",
  components: {
    LoginForm
  },
  data() {
    return {
      // De foutmelding, wanneer deze leeg is wordt de foutmelding niet getoond
      error: ""
    }
  },
  methods: {
    //Logt de gebruiker in en redirect naar Home,
    // bij een error wordt de foutmelding gezet
    async login(email, password) {
      try {
        //Haal de foutmelding weg
        this.error = "";

        //Log in bij Directus
        await directus.auth.login(
            {
              email: email,
              password: password,
            },
            // Ververs de token 2 minuten voordat hij afloopt
            {
              refresh: {
                time: 2 * 60 * 1000,
              },
            }
        );
        //Leeg de cache van apollo
        await onLogin(this.$apollo.getClient());

        //Haal informatie over de gebruiker op
        let me = await directus.users.me.read();
        //Sla de informatie op in de localStorage
        localStorage.setItem(USER_DATA, JSON.stringify(me));
        //Stuur de gebruiker door naar de homepagina
        await this.$router.push({path: '/'})
      } catch (error) {
        switch (error.errors[0].extensions.code) {
          case "INVALID_CREDENTIALS":
            this.error = "Verkeerde email of wachtwoord";
            break;
          case "REQUESTS_EXCEEDED":
            this.error = "Te veel geprobeerd in te loggen, probeer later nog een keer";
            break;
          case "INVALID_IP":
            this.error = "Het is niet toegestaan om in te loggen op dit IP-adres";
            break;
          default:
            this.error = error.errors[0].extensions.code;
        }
      }
    },
  }
}
</script>