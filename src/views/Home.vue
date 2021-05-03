<template>
  <div style="background-color: #e0bfbf;" class="h-full p-4 flex flex-col justify-between">
    <header>
      <v-img :transition="false" width="40%" :aspect-ratio="125/62" class="self-center mt-2 ml-2" :src="require('../assets/California_Logo.svg')"></v-img>
      <v-img :transition="false" height="300" class="ml-auto mr-auto mt-5" :src="require('../assets/hoofd.png')" contain></v-img>
    </header>

    <section class="mt-6 ml-4">

      <div class="text-5xl font-extrabold" >
      Goedemorgen,
      </div>

      <div class="text-5xl mt-3">{{username}}</div>
    </section>

    <div class="mt-auto mb-10 flex flex-row flex-grow-0 justify-space-around">
    <v-btn
      rounded
      color="#ebd2d2"
      elevation="2"
      class="text-none text-subtitle-1"
      large
      to="/rooms"
    >
      Reserveer een ruimte
    </v-btn>

    <v-btn
    rounded
    elevation="2"
    color="#ebd2d2"
    class="text-none text-subtitle-1"
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
      username: () => {
        let json = localStorage.getItem(USER_DATA);
        let user = JSON.parse(json);
        return user.username;
      }
    },
  }
</script>

<style>
a:link {
  color: gray;
}
</style>