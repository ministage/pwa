<template>
  <v-app>
    <v-main>
      <v-container fluid class="h-full p-0">
        <router-view/>
      </v-container>
    </v-main>

    <v-bottom-navigation v-if="this.$route.name !== 'Login'" app>
      <v-btn
          v-for="button in buttons"
          :key="button.location"
          height="100%"
          width="25%"
          :to="button.location"
          :retain-focus-on-click="false"
      >
        <span class="text-caption" style="color: black;">{{button.name}}</span>
        <v-icon :color="button.routes.includes(path) ? '#ecd660' : 'black'">{{button.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  computed: {
    path(){
      return this.$route.path
    }
  },
  data: () => ({
    buttons: [
      {
        location: '/',
        name: 'Home',
        icon: 'mdi-home',
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
            "/reserve"
        ]
      },
      {
        location: '/availability',
        name: 'Aanwezigheid',
        icon: 'mdi-map-marker',
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
