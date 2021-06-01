<template>
  <div>
    <PageHeader icon="mdi-calendar-blank-outline" name="Reserveren"></PageHeader>
    <v-img style="height: 20%" max-height="150" min-height="150" :src="transformUrl(page.banner.id)">
      <v-btn
          rounded
          elevation="0"
          color="secondary"
          style="color: black;"
          class="text-none font-weight-regula tracking-tight mb-4"
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
import {transformUrl} from "@/utils/image";

export default {
  name: "Rooms",
  components: {
    PageHeader,
    RoomCard
  },
  methods: {
    transformUrl: transformUrl
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
    },
    page: {
      query: gql`query{
        ruimteoverzicht{
            banner {
                id
            }
        }
      }`,
      update: data => data.ruimteoverzicht,
      fetchPolicy: 'cache-and-network'
    }
  }
}
</script>
