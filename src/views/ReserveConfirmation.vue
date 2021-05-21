<template>
  <div class="flex flex-col h-full">
    <PageHeader icon="mdi-party-popper" name="Yeah.. gefeliciteerd!"></PageHeader>
    <v-img v-if="gif" :src="transformUrl(gif.image.id)" max-height="40%"></v-img>
    <div class="flex flex-row flex-wrap justify-evenly align-center">
      <div class="xs:text-2xl text-xl">Uw reservering is geplaatst!</div>
      <div class="flex flex-row max-w-max">
        <div class="flex flex-col ml-2">
          <span v-if="!$apollo.queries.booking.loading" class="xs:text-lg align-center mr-2"><v-icon class="mr-1" medium color="black">mdi-comment-text-outline</v-icon>{{booking.description }}</span>
          <span v-if="!$apollo.queries.booking.loading" class="xs:text-lg align-center mr-2"><v-icon class="mr-1" medium color="black">mdi-calendar-blank-outline</v-icon>{{booking.date }}</span>
        </div>
        <div class="flex flex-col">
          <span v-if="!$apollo.queries.booking.loading" class="xs:text-lg align-center"><v-icon class="mr-1" medium color="black">mdi-clock-time-eight-outline</v-icon>{{booking.from.substr(0, 5) }} - {{ booking.to.substr(0, 5) }}</span>
          <span v-if="!$apollo.queries.booking.loading" class="xs:text-lg align-center"><v-icon class="mr-1" medium color="black">mdi-home-outline</v-icon>{{booking.room.name }}</span>
        </div>
        </div>
    </div>
    <v-btn color="#e0bfbf" class="w-10/12 ml-auto mr-auto mb-4 mt-4" rounded @click="share">Delen</v-btn>
    <v-btn color="primary" class="w-10/12 ml-auto mr-auto mb-10" rounded to="/rooms">Terug naar ruimtes</v-btn>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import gql from "graphql-tag";
import {transformUrl} from "@/utils/image";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat)

export default {
  name: "ReserveConfirmation",
  components: {PageHeader},
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      gif: null
    }
  },
  created() {
    this.$apollo.query({
      query: gql`query {
          gifs {
            image {
              id
            }
          }
        }`,
    }).then(response => {
      this.gif = response.data.gifs[Math.floor(Math.random() * response.data.gifs.length)]
    });
  }
  ,
  methods: {
    transformUrl: transformUrl,
    async share(){
      let response = await this.$apollo.queries.booking.refetch({id: this.id});
      let booking = response.data.bookings_by_id;
      await navigator.share({
        text: `'${booking.description}' op ${dayjs(booking.date, "YYYY-MM-DD").format('DD-MM-YYYY')} van ${booking.from.substring(0,5)} tot ${booking.to.substring(0,5)} in ${booking.room.name}`,
        url: window.location.href
      });
    }
  }
  ,
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
      },
      update: data => data.bookings_by_id
    }
    ,
  }
  ,
}
</script>

<style scoped>

</style>