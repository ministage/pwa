<template>
  <v-form
      class="justify-end"
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <v-text-field
        v-model="email"
        :rules="[rules.required, rules.email]"
        label="Emailadres"
        required
        outlined
    ></v-text-field>

    <v-text-field
        v-model="password"
        :rules="[rules.required]"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        label="Wachtwoord"
        required
        outlined
    ></v-text-field>

    <div class="flex flex-col">
      <v-btn
          color="primary"
          class="mr-4 px-10"
          @click="login"
      >
        Log in
      </v-btn>
      <v-btn
          color="normal"
          class="mr-4 mt-4"
          @click="gotoReset"
      >
        Wachtwoord vergeten
      </v-btn>
    </div>


  </v-form>
</template>

<script>
export default {
  name: "LoginForm",
  data: () => ({
    email: '',
    password: '',
    showPassword: false,
    rules: {
      required: value => !!value || 'Verplicht.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Ongeldige e-mail.'
      },
    }
  }),
  methods: {
    login () {
        this.$refs.form.validate()
    },
  }
}
</script>

<style scoped>

</style>