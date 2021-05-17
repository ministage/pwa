<template>
  <v-app style="padding-bottom: env(safe-area-inset-bottom)">
    <v-main>
      <v-container fluid class="h-full p-0" style="max-width: 100%;">
        <router-view/>
      </v-container>
    </v-main>

    <v-snackbar
        bottom
        light
        :value="updateExists"
        :timeout="-1"
        color="secondary"
        width="80%"
        class="pl-2"
    >
      Er is een update beschikbaar
      <v-btn class="text-none" color="primary" @click="refreshApp">
        Update
      </v-btn>
    </v-snackbar>

    <v-bottom-navigation app v-if="!this.$route.meta.guest">
      <v-btn
          plain
          :ripple="false"
          v-for="button in buttons"
          :key="button.location"
          height="100%"
          width="25%"
          :to="button.location"
          :retain-focus-on-click="false"
      >
        <span class="text-caption" style="color: black;">{{button.name}}</span>
        <v-icon :color="button.routes.includes(path) ? 'black' : '#a0a0a0'">{{button.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import update from './mixins/update'

export default {
  name: 'App',
  computed: {
    path(){
      return this.$route.path
    }
  },
  mixins: [update],
  data: () => ({
    buttons: [
      {
        location: '/',
        name: 'Start',
        icon: 'mdi-home-outline',
        routes: [
            "/"
        ]
      },
      {
        location: '/rooms',
        name: 'Reserveren',
        icon: 'mdi-calendar-blank-outline',
        routes: [
            "/rooms",
            "/reserve",
            "/reserveinformation",
            "/reserveconfirmation"
        ]
      },
      {
        location: '/availability',
        name: 'Aanwezigheid',
        icon: 'mdi-map-marker-outline',
        routes: [
            "/availability"
        ]
      },
      {
        location: '/more',
        name: 'Meer',
        icon: 'mdi-dots-horizontal',
        routes: [
            "/more"
        ]
      }
    ]
  }),
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;700&display=swap');

$font-family: Poppins;

.v-application {
  font-family: $font-family, sans-serif !important;
}
</style>
