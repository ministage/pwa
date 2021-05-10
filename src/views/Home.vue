<template>
  <div style="background-color: #e0bfbf;" class="h-full p-4 flex flex-col justify-between">
    <header>
      <v-img :transition="false" width="40%" :aspect-ratio="125/62" class="self-center mt-2 ml-2"
             :src="require('../assets/California_Logo.svg')"></v-img>
    </header>

    <section class="mt-auto mb-auto">
      <v-img :transition="false" class="ml-auto mr-auto mt-5" max-height="200" :src="require('../assets/hoofd.png')"
             contain></v-img>
      <div class="text-4xl sm:text-3xl mt-3 font-extrabold">
        {{ time }},
      </div>

      <div class="text-4xl mt-3">{{ firstname }}</div>
    </section>
      <div class="flex flex-row  flex-grow-0 flex-wrap justify-space-around align-end" style="max-height: max-content">
        <v-btn
            rounded
            color="#ebd2d2"
            elevation="2"
            class="text-none tracking-tight text-2xl font-medium"
            large
            to="/rooms"
        >
          Reserveer een ruimte
        </v-btn>

        <v-btn
            rounded
            elevation="2"
            color="#ebd2d2"
            class="text-none tracking-tight text-2xl font-medium mt-2"
            large
            to="/availability"
        >
          Aanwezigheid
        </v-btn>
      </div>





  </div>

</template>

<script>
import {USER_DATA} from "@/constants/settings";

export default {
  name: 'Home',
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
}
</script>

<style>
a:link {
  color: gray;
}
</style>