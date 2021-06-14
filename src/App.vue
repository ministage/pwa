<template>
  <v-app>
    <v-main>
      <v-dialog
          width="600"
          v-model="promptOpen"
      >
        <v-card width="100%">
          <v-card-title style="background-color: #e0bfbf">
            Install the app
          </v-card-title>

          <v-card-text class="pl-3 pt-2">
            To install the app<br>
            1. Press <v-icon>mdi-export-variant</v-icon> Share button<br>
            2. Press <v-icon>mdi-plus-box</v-icon> Add to Homescreen
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="dontPrompt"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
    <v-bottom-navigation app v-if="!this.$route.meta.guest" height="76px" style="padding-bottom: 20px;">
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
        <v-icon :color="button.routes.some(route => route.startsWith(path)) ? 'black' : '#a0a0a0'" size="32px">{{button.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
<script>
import update from './mixins/update'

export default {
  name: 'App',
  mounted(){
    let shown = JSON.parse(localStorage.getItem("promptShown"));
    // we pass in the result of our query-param to this method
    if (navigator.standalone || shown) {
      console.log("dont show prompt")
      return false;
    }
    if(['iPhone', 'iPad', 'iPod'].includes(navigator.platform)){
      this.promptOpen = true;
    }
  },
  computed: {
    path(){
      return this.$route.path
    },
  },
  methods: {
    dontPrompt(){
      localStorage.setItem("promptShown", "true");
      this.promptOpen = false;
    }
  },
  mixins: [update],
  data: () => ({
    promptOpen: false,
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
