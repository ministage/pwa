<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>

    <v-bottom-navigation app>
      <v-btn height="100%" width="25%" to="/">
        <span class="text-caption">Start</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn height="100%" width="25%" to="/rooms">
        <span class="text-caption">Aanwezigheid</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>

      <v-btn height="100%" width="25%" to="/reserve">
        <span class="text-caption">Reserveringen</span>

        <v-icon>mdi-calendar-blank-outline</v-icon>
      </v-btn>

      <v-btn height="100%" width="25%" to="/more">
        <span class="text-caption">Meer</span>

        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
