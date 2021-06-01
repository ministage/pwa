<template>
  <div style="background-color: #e0bfbf;" class="h-full p-3 flex flex-col justify-between">
    <header class="flex flex-row justify-between align-start w-full" style="max-height: 25%">
      <v-img :transition="false" :aspect-ratio="125/62" class="mt-5 ml-5" max-width="35%"
             :src="require('../assets/California_Logo.svg')" contain></v-img>
      <v-btn
          class="mt-3 mr-5"
          color="black"
          icon
          @click="logout"
          :loading="loading"
      >
        <v-icon size="200%" color="black">mdi-logout</v-icon>
      </v-btn>
    </header>

    <section class="mb-auto">
      <v-img :transition="false" class="ml-auto mr-auto mt-2" max-width="60%" :src="require('../assets/hoofd.png')"
             contain></v-img>
      <div class="text-3xl sm:text-3xl mt-5 ml-3 font-extrabold">
        {{ time }},
      </div>

      <div class="text-3xl mt-1 ml-3">{{ firstname }}</div>
    </section>

    <div class="flex flex-row flex-grow-0 flex-wrap justify-space-around align-end mb-5 mt-6"
         style="max-height: max-content">
      <v-btn
          rounded
          color="#ebd2d2"
          elevation="0"
          class="text-none tracking-tight button-padding"
          to="/rooms"
          data-cy="reserve-button"
      >
        Reserveer een ruimte
      </v-btn>

      <v-btn
          rounded
          elevation="0"
          color="#ebd2d2"
          class="text-none tracking-tight mt-2 button-padding"
          to="/availability"
          data-cy="presence-button"
      >
        Aanwezigheid
      </v-btn>
    </div>


  </div>

</template>

<style>
.button-padding {
  padding-left: 12px !important;
  padding-right: 12px !important;
}

a:link {
  color: gray;
}
</style>

<script>
import {USER_DATA} from "@/constants/settings";
import {directus} from "@/main";
import {onLogout} from "@/vue-apollo";

export default {
  name: 'Home',
  data() {
    return {
      loading: false
    }
  },
  computed: {
    firstname: () => {
      let json = localStorage.getItem(USER_DATA);
      let user = JSON.parse(json);
      return user.first_name;
    },
    time: () => {
      let hour = Number.parseInt(new Date().toLocaleTimeString('nl').substr(0, 2));
      if (hour > 6 && hour < 12) {
        return "Goedemorgen";
      } else if (hour >= 12 && hour < 18) {
        return "Goedemiddag";
      } else if ((hour >= 18 && hour < 24) || (hour >= 0 && hour <= 6)) {
        return "Goedenavond";
      }
    }
  },
  methods: {
    async logout() {
      this.loading = true;
      await directus.auth.logout();
      await onLogout(this.$apollo.getClient());
      localStorage.removeItem(USER_DATA);
      await this.$router.push('/login');
    },
  }
}
</script>
