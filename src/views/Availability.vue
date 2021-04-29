<template>
  <div class="flex flex-col justify-center">
    <h1 class="text-4xl">Aanwezigheid</h1>
    <h2>Welkom naam</h2>

    <!-- zorgen dat het groen/rood is en dat dit aangepast wordt {{1+2 === 3 ? 'bg-green-200' : 'bg-red-200'}} -->
    <div class="text-left">
      <v-btn id="button1" class="m-2" fab dark large color="green" @click="changeColor">
        <v-icon dark>
          mdi-check
        </v-icon>
      </v-btn>
    </div>
    <h2>Klik hierboven om je afwezig te melden</h2>
    <v-row dense>
      <v-col cols="6" v-for="company in companies" :key="company.id">
        <PresenceCard :company="company"></PresenceCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import PresenceCard from '../components/PresenceCard'

export default {
  apollo: {
    companies: gql`query {
  companies{
    id
    name
    description
    logo{
      url
    }
    employees{
      id
      username
      presence{
        is_present
      }
    }
  }
}`
  },
  name: 'Home',
  components: {
    PresenceCard,
  },
  methods: {
    gotoReserve() {
      this.$router.push('/reserve');
    },
    changeColor(){
      let count = 0;
      if (count === 0) {
        document.getElementById("button1").style.backgroundColor = "red";
        count = 1;
      }
      else if(count === 1) {
        document.getElementById("button1").style.backgroundColor = "green";
        count = 0;
      }
    }
  }
}
</script>
