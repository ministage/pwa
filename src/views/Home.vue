<template>
  <section>
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
