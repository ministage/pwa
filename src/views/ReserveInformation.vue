<template>
  <div class="flex flex-col">
    <PageHeader icon="mdi-calendar-blank-outline" name="Reserveren"></PageHeader>
    <v-form class="flex flex-col align-center mt-3" ref="form">
      <v-text-field
          rounded
          outlined
          class="w-10/12"
          dense
          :loading="$apollo.queries.users_me.loading"
          :value="$apollo.queries.users_me.loading ? '' : users_me.company.name"
          readonly
          label="Bedrijf"
      ></v-text-field>
      <v-text-field v-model="date" rounded outlined class="w-10/12" label="Datum" required type="date"
                    dense></v-text-field>
      <v-text-field v-model="from" rounded outlined class="w-10/12" label="Starttijd" required type="time"
                    dense></v-text-field>
      <v-text-field v-model="to" rounded outlined class="w-10/12" label="Eindtijd" required type="time"
                    dense></v-text-field>
      <v-select v-model="room" rounded outlined class="w-10/12" label="Vergaderruimte" required :items="rooms"
                item-text="name" item-value="id" dense></v-select>
      <v-text-field v-model="description" rounded outlined class="w-10/12" label="Opmerking" required
                    dense></v-text-field>
      <v-btn color="primary" class="w-10/12" rounded @click="makeBooking">
        Reservering plaatsen
      </v-btn>
    </v-form>

  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import gql from "graphql-tag";
import {CREATE_BOOKING_MUTATION} from "@/constants/graphql";
import ErrorService from "@/services/ErrorService";


export default {
  name: "ReserveInformation",
  components: {PageHeader},
  apollo: {
    rooms: {
      query: gql`query{
        rooms {
            id
            name
        }
      }`,
    },
    users_me: {
      query: gql`query{
        users_me {
           id
           company{
               id
               name
           }
        }
      }`,
      client: 'system',
    },
  },
  data: function () {

    return {
      date: '',
      from: '',
      to: '',
      room: '',
      description: '',
    }
  },
  methods: {
    makeBooking: async function () {
      let user_id = (await this.$apollo.queries.users_me.refetch()).data.users_me.id;
      console.log(user_id);
      let data = await this.$apollo.mutate({
        mutation: CREATE_BOOKING_MUTATION,
        variables: {
          date: this.date,
          from: this.from,
          to: this.to,
          description: this.description,
          user: user_id,
          room: this.room,
        }
      });
      if(data.data.create_bookings_item === null){
        ErrorService.displayErrorAlert("Kan geen afspraak maken");
      } else {
        let booking_id = data.data.create_bookings_item.id;
        await this.$router.push('/reserveconfirmation/' + booking_id);
      }
    }
  }
}
</script>
