<template>
  <div>
    <PageHeader icon="mdi-calendar-blank-outline" name="Reserveren"></PageHeader>
    <v-img :transition="false" style="height: 20%" :src="require('../assets/rooms.jpg')">
      <v-btn
          rounded
          elevation="0"
          color="secondary"
          style="color: black;"
          class="text-none font-weight-regula mb-4"
          large
          to="/reserve"
          absolute
          right
          bottom
      >Reserveer ruimte
      </v-btn>
    </v-img>
    <v-list>
      <RoomCard v-for="room in rooms" :key="room.id" :room="room"></RoomCard>
    </v-list>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import RoomCard from "@/components/RoomCard";
import gql from "graphql-tag";

export default {
  name: "Rooms",
  components: {
    PageHeader,
    RoomCard
  },
  apollo: {
    rooms: {
      query: gql`query{
        rooms {
            id
            name
            location
            bookings {
                date
                to
                from
            }
        }
      }`,
      pollInterval: 5000,
      update: data => data.rooms
    }
  }
}
</script>
