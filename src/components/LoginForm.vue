<template>
  <v-form
      class="justify-end"
      ref="form"
      lazy-validation
  >
    <v-text-field
        v-model="email"
        :rules="[rules.required, rules.email]"
        label="Emailadres"
        required
        outlined
        rounded
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
        rounded
    ></v-text-field>

    <div class="flex flex-col">
      <v-btn
          color="#29415d"
          class="px-10 white--text font-weight-regular"
          @click="login"
          rounded
      >
        Log in
      </v-btn>
      <v-btn
          color="normal"
          class="mt-4"
          @click="gotoReset"
          rounded
      >
        Wachtwoord vergeten
      </v-btn>
    </div>


  </v-form>
</template>

<script>
export default {
  name: "LoginForm",
  props: {
    loginCallback: Function,
  },
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
        if(this.$refs.form.validate()){
          this.$props.loginCallback(this.email, this.password);
        }
    },
  }
}
</script>

<style scoped>

</style>