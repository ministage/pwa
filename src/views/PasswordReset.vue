<template>
  <div class="h-full flex flex-col" style="background-color: #e0bfbf;">
    <PageHeader class="max-h-16" icon="mdi-lock-reset" name="Wachtwoord resetten"></PageHeader>
    <v-card class="mt-auto mb-auto">
      <v-card-title class="text-xl">Stuur een wachtwoord reset link</v-card-title>
      <v-card-text>
        <v-text-field
          label="Email"
          placeholder="test@gmail.com"
          v-model="email"
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
        Stuur mij een link
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
  data(){
    return {
      email: '',
      loading: false
    }
  },
  methods: {
    async sendLink(){
      this.loading = true;
      let data = await this.$apollo.mutate({
        mutation: gql`
            mutation($email: String!){
                auth_password_request(email: $email)
            }
        `,
        variables: {
          email: this.email
        },
        client: 'system'
      });
      this.loading = false;
      if(data.data.auth_password_request){
        await Swal.fire({
          title: "Link verstuurd!",
          text: "Check je email om je wachtwoord te resetten",
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