<template>
  <div class="flex flex-col h-full">
    <PageHeader icon="mdi-party-popper" name="Yeah.. gefeliciteerd!"></PageHeader>
    <v-img src="https://media.giphy.com/media/7rj2ZgttvgomY/giphy.gif"></v-img>
    <div class="flex flex-row flex-wrap justify-evenly align-center">
      <div class="xs:text-2xl text-xl">Uw reservering is geplaatst!</div>
      <div class="flex flex-col max-w-max">
        <div class="flex flex-row max-w-max">
          <v-icon class="mr-2" large color="black">mdi-calendar-blank-outline</v-icon>
          <v-skeleton-loader
              v-if="$apollo.queries.booking.loading"
              type="text@3"
              loading
          ></v-skeleton-loader>
          <span v-else class="xs:text-xl">{{ booking.date }}</span>
        </div>
        <div class="flex flex-row max-w-max">
          <v-icon class="mr-2" large color="black">mdi-clock-time-eight-outline</v-icon>
          <v-skeleton-loader
              v-if="$apollo.queries.booking.loading"
              type="text@3"
              loading
          ></v-skeleton-loader>
          <span v-else class="xs:text-xl">{{ booking.from }} - {{ booking.to }}</span>
        </div>
        <div class="flex flex-row max-w-max">
          <v-icon class="mr-2" large color="black">mdi-home-outline</v-icon>
          <v-skeleton-loader
              v-if="$apollo.queries.booking.loading"
              type="text@3"
              loading
          ></v-skeleton-loader>
          <span v-else class="xs:text-xl">{{ booking.room.name }}</span>
        </div>
      </div>
    </div>
    <v-btn color="secondary" class="w-10/12 ml-auto mr-auto mb-4" rounded>Delen</v-btn>
    <v-btn color="primary" class="w-10/12 ml-auto mr-auto mb-2" rounded to="/rooms">Terug naar ruimtes</v-btn>
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
            description
            room {
              name
            }
          }
        }`,
      variables() {
        return {
          id: this.$route.params.id
        }
      }
      ,
      update: data => data.bookings_by_id
    }
    ,
  }
  ,
}
</script>

<style scoped>

</style>