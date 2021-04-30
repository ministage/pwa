<template>

  <section>
    <v-system-bar color="white">
      <v-spacer></v-spacer>
      <v-icon>mdi-map-marker</v-icon>
      <div class="mr-3">Deventerweg 2a</div>
      <v-icon>mdi-email</v-icon>
      <div><a href="mailto:info@californiaharderwijk.nl">info@californiaharderwijk.nl</a></div>
      <v-spacer></v-spacer>
    </v-system-bar>
    <div v-for="room in rooms" :key="room.id">
      <v-img :src="'http://localhost:1337'+room.images[0].url"></v-img>
      {{room.name}}
    </div>
  </section>
</template>

<script>
  import gql from 'graphql-tag';

  export default {
    name: 'Home',
    apollo: {
      rooms: gql`query {
        rooms {
          id
          name
          description
          space
          images {
            url
          }
        }
      }`
    }
  }
</script>

<style>
a:link {
  color: gray;
}
</style>