<template>
  <div class="h-full flex flex-col" style="background-color: #e0bfbf;">
    <PageHeader class="max-h-16" icon="mdi-lock-reset" name="Wachtwoord resetten"></PageHeader>
    <v-card class="mt-auto mb-auto">
      <v-card-title class="text-xl">Voer hier uw email in waarnaar de link gestuurd moet worden</v-card-title>
      <v-card-text>
        <v-text-field
            ref="email-field"
          label="Email"
          placeholder="test@gmail.com"
          v-model="email"
          :rules="rules"
          aria-required="true"
          outlined
          rounded
        ></v-text-field>
        <v-btn
          block
          color="primary"
          @click="sendLink"
          :loading="loading"
          rounded
          class="text-none"
        >
        Stuur mij een wachtwoord reset link
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import gql from "graphql-tag";
import Swal from "sweetalert2";
import {API_URL} from "@/constants/settings";
export default {
  name: "PasswordReset",
  components: {PageHeader},
  data(){
    return {
      // Het ingevoerde emailadres
      email: '',
      // Of er wordt ingelogd
      loading: false,
      // Validatie regels voor het email veld
      rules: [
        value => !!value || 'Required.',
      ]
    }
  },
  methods: {
    // Stuurt een link naar het ingevoerde emailadres
    async sendLink(){
      //Zet de loading naar true
      this.loading = true;

      //Checkt of het email veld door de validatie regels komt
      if(!this.$refs["email-field"].validate()){
        // Haal het email veld leeg om de error te laten zien
        this.email = null;
        this.loading = false;
        return;
      }

      //Stuur het verzoek
      let data = await this.$apollo.mutate({
        mutation: gql`
            mutation($email: String!, $reset_url: String!){
                auth_password_request(email: $email, reset_url: $reset_url)
            }
        `,
        variables: {
          email: this.email,
          reset_url: API_URL + '/password-reset-confirm'
        },
        // Gebruik de system client omdat deze mutation
        // een andere GraphQL url nodig heeft
        client: 'system'
      });

      // Zet loading naar false omdat het verzoek klaar is
      this.loading = false;

      //Check of het link sturen is gelukt
      if(data.data.auth_password_request){
        await Swal.fire({
          title: "Link verstuurd!",
          text: "Bekijk je mailbox voor de link!",
          icon: "success",
        });
      } else {
        await Swal.fire({
          title: "Link kon niet verstuurd worden",
          text: "Klopt het emailadres?",
          icon: "error",
        });
      }
    }
  }
}
</script>