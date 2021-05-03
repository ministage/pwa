<template>
  <div>
    <PageHeader icon="mdi-calendar-blank-outline" name="Reserveren"></PageHeader>
    <v-img :transition="false" style="height: 20%" :src="require('../assets/rooms.jpg')"></v-img>
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
        rooms{
            name
            location
            bookings {
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
