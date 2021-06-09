<template>
  <div>
    <PageHeader icon="mdi-calendar-blank-outline" name="Reserveren"></PageHeader>
    <v-img style="height: 20%" max-height="150" min-height="150" :src="$apollo.queries.page.loading ? '' : transformUrl(page.banner.id)">
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
    //Zorgt voor de goede url voor het logo
    transformUrl: transformUrl
  },
  apollo: {
    //Haalt de ruimtes op met de boekingen ervan
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
    //Haalt informatie op over de pagina (tot nu toe alleen de banner)
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
