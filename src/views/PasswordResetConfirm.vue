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
    token(){
      return this.$route.query.token;
    }
  },
  data(){
    return {
      password: '',
      loading: false,
      rules: [
        value => !!value || 'Required.',
      ]
    }
  },
  methods: {
    async resetPassword(){
      this.loading = true;
      if(!this.$refs["password-field"].validate()){
        this.password = null;
        this.loading = false;
        return;
      }
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
        client: 'system',
        errorPolicy: "all"
      });
      this.loading = false;
      if(data.data.auth_password_reset === true){
        await Swal.fire({
          title: "Wachtwoord gewijzigd!",
          text: "Probeer opnieuw in te loggen",
          icon: "success",
        });
        await this.$router.push("/login");
      } else {
        await Swal.fire({
          title: "Wachtwoord kon niet gewijzigd worden",
          text: "Het wachtwoord is nog niet aangepast",
          icon: "error",
          confirmButtonText: "Opnieuw proberen"
        });
        await this.$router.push("/password-reset");
      }
    }
  }
}
</script>