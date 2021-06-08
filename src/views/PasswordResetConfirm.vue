<template>
  <div class="h-full flex flex-col" style="background-color: #e0bfbf;">
    <PageHeader class="max-h-16" icon="mdi-lock-reset" name="Wachtwoord resetten"></PageHeader>
    <v-card class="mt-auto mb-auto">
      <v-card-title class="text-xl">Wijzig je wachtwoord</v-card-title>
      <v-card-text>
        <v-text-field
            ref="password-field"
          label="Nieuw wachtwoord"
          v-model="password"
          aria-required="true"
          :rules="rules"
          type="password"
          outlined
          rounded
        ></v-text-field>
        <v-btn
          block
          color="primary"
          @click="resetPassword"
          :loading="loading"
          rounded
          class="text-none"
        >
        Wachtwoord wijzigen
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import gql from "graphql-tag";
import Swal from "sweetalert2";
export default {
  name: "PasswordReset",
  components: {PageHeader},
  computed: {
    // Haal de token op uit de URL
    token(){
      return this.$route.query.token;
    }
  },
  data(){
    return {
      //Het nieuwe wachtwoord dat is ingevuld
      password: '',
      //Of er wordt gewacht op de server
      loading: false,
      //Validatie regels voor het wachtwoordveld
      //TODO: Mag strenger, zoals het in Directus is ingesteld
      rules: [
        value => !!value || 'Required.',
      ]
    }
  },
  methods: {
    //Verander het wachtwoord
    async resetPassword(){
      this.loading = true;

      //Valideer het ingevoerde wachtwoord
      if(!this.$refs["password-field"].validate()){
        //Zet het wachtwoord naar null zodat de error wordt getoond
        this.password = null;
        this.loading = false;
        return;
      }

      //Verstuur de mutation naar Directus
      let data = await this.$apollo.mutate({
        mutation: gql`
            mutation($token: String!, $password: String!) {
                auth_password_reset(token: $token, password: $password)
            }
        `,
        variables: {
          token: this.token,
          password: this.password
        },
        // Gebruik de system client omdat er een andere GraphQL url wordt gebruiker
        client: 'system',
        errorPolicy: "all"
      });

      this.loading = false;

      //Check of het aanpassen goed is gegaan
      if(data.data.auth_password_reset === true){
        //Als het goed ging,
        // laat een bevestiging zien

        await Swal.fire({
          title: "Wachtwoord gewijzigd!",
          text: "Probeer opnieuw in te loggen",
          icon: "success",
        });
        // en stuur door naar de login pagina
        await this.$router.push("/login");
      } else {
        //Als het niet goed ging,
        //Laat een foutmelding zien
        await Swal.fire({
          title: "Wachtwoord kon niet gewijzigd worden",
          text: "Het wachtwoord is nog niet aangepast",
          icon: "error",
          confirmButtonText: "Opnieuw proberen"
        });
        //En stuur door naar de pagina
        // om nog een keer een link aan te vragen
        await this.$router.push("/password-reset");
      }
    }
  }
}
</script>