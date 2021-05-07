<template>
  <div class="flex flex-col">
    <PageHeader icon="mdi-party-popper" name="Yeah.. gefeliciteerd"></PageHeader>
    <v-img src="https://media.giphy.com/media/7rj2ZgttvgomY/giphy.gif"></v-img>
    <div class="flex flex-row">
      <div class="text-2xl ml-4 mt-4">Uw reservering is geplaatst!</div>
      <div class="flex flex-col mt-3 mr-4">
        <div class="flex flex-row mr-20 m-3">
          <v-icon class="mr-2">mdi-calendar-blank-outline</v-icon>
          <v-skeleton-loader
              v-if="$apollo.queries.booking.loading"
              type="text@3"
              loading
          ></v-skeleton-loader>
          <span v-else>{{ booking.date }}</span>
        </div>
        <div class="flex flex-row m-3">
          <v-icon class="mr-2">mdi-clock-time-eight-outline</v-icon>
          <v-skeleton-loader
              v-if="$apollo.queries.booking.loading"
              type="text@3"
              loading
          ></v-skeleton-loader>
          <span v-else>{{ booking.from }} - {{ booking.to }}</span>
        </div>
        <div class="flex flex-row m-3">
          <v-icon class="mr-2">mdi-home-outline</v-icon>
          <v-skeleton-loader
              v-if="$apollo.queries.booking.loading"
              type="text@3"
              loading
          ></v-skeleton-loader>
          <span v-else>{{ booking.room.name }}</span>
        </div>
      </div>
    </div>
    <v-btn color="secondary" class="w-10/12 ml-auto mr-auto mb-4" rounded>Delen</v-btn>
    <v-btn color="primary" class="w-10/12 ml-auto mr-auto" rounded to="/rooms">Terug naar ruimtes</v-btn>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import gql from "graphql-tag";

export default {
  name: "ReserveConfirmation",
  components: {PageHeader},
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  apollo: {
    booking: {
      query: gql`
        query($id: ID!){
          bookings_by_id(id: $id){
            date
            from
            to
            room {
              name
            }
          }
        }`,
      variables() {
        return {
          id: this.$route.params.id
        }
      },
      update: data => data.bookings_by_id
    }
  }
}
</script>

<style scoped>

</style>