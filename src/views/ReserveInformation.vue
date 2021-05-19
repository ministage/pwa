<template>
  <div class="h-full flex flex-col">
    <PageHeader class="justify-self-start" icon="mdi-calendar-blank-outline" name="Reserveren"></PageHeader>
    <v-alert
        absolute
        type="error"
        v-if="error"
    >
      {{error}}
    </v-alert>

    <v-form class="w-10/12 ml-auto mr-auto mt-auto mb-auto" ref="form">
      <v-text-field
          rounded
          outlined
          class="w-full"
          dense
          :loading="$apollo.queries.users_me.loading"
          :value="$apollo.queries.users_me.loading ? '' : users_me.company.name"
          readonly
          label="Bedrijf"
      ></v-text-field>
      <v-select
          :loading="$apollo.queries.users_me.loading"
          v-model="person"
          rounded
          outlined
          class="w-full"
          label="Persoon"
          required
          :items="$apollo.queries.users_me.loading ? [] : users_me.company.employees"
          item-value="id"
          dense
          :rules="[rules.required]"
      >
        <template slot="item" slot-scope="data">
          {{ data.item.first_name }} {{ data.item.last_name }}
        </template>
        <template slot="selection" slot-scope="data">
          {{ data.item.first_name }} {{ data.item.last_name }}
        </template>
      </v-select>
      <v-text-field
          v-model="date"
          rounded
          outlined
          class="w-full"
          label="Datum"
          required
          type="date"
          dense
          :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
          v-model="from"
          rounded
          outlined
          class="w-full"
          label="Starttijd"
          required
          type="time"
          dense
          :rules="[rules.required, rules.min]"
      ></v-text-field>
      <v-text-field
          v-model="to"
          rounded
          outlined
          class="w-full"
          label="Eindtijd"
          required
          type="time"
          dense
          :rules="[rules.required, rules.max]"
      ></v-text-field>
      <v-select
          v-model="room"
          rounded
          outlined
          class="w-full"
          label="Vergaderruimte"
          required
          :items="rooms"
          item-text="name"
          item-value="id"
          dense
          :rules="[rules.required]"
      ></v-select>
      <v-text-field
          v-model="description"
          rounded
          outlined
          class="w-full"
          label="Opmerking"
          required
          dense
          :rules="[rules.required]"
      ></v-text-field>
      <v-btn
          color="primary"
          class="w-full"
          rounded
          large
          @click="makeBooking"
      >Reservering plaatsen</v-btn>

    </v-form>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import gql from "graphql-tag";
import {CREATE_BOOKING_MUTATION} from "@/constants/graphql";
import ErrorService from "@/services/ErrorService";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat)


export default {
  name: "ReserveInformation",
  components: {PageHeader},
  apollo: {
    rooms: {
      query: gql`query{
        rooms {
            id
            name
            bookings {
              date
              from
              to
            }
        }
      }`,
      update(data){
        this.allRooms = data.rooms;
        return data.rooms;
      },
      pollInterval: 5000
    },
    users_me: {
      query: gql`query{
        users_me {
           id
           company{
               id
               name
               employees {
                 id
                 first_name
                 last_name
               }
           }
        }
      }`,
      update(data){
        this.person = data.users_me.id;
        return data.users_me;
      },
      client: 'system',
    },
  },
  data: function () {

    return {
      date: '',
      person: '',
      from: '',
      to: '',
      room: '',
      description: '',
      allRooms: null,
      error: '',
      rules: {
        required: value => !!value || 'Verplicht.',
        max: value => dayjs(value, "HH:mm") <= dayjs("19:00", "H:mm") || 'Kan geen afspraak maken na 19:00',
        min: value => dayjs(value, "HH:mm") >= dayjs("8:30", "H:mm") || 'Kan geen afpsraak maken voor 8:30',
      }
    }
  },
  methods: {
    makeBooking: async function () {
      this.error = '';
      if(!this.$refs.form.validate()){
        this.error = 'Niet alle velden zijn ingevuld';
        return;
      }
      if(!this.canBeBooked()){
        this.error = "Er kunnen geen boekingen over elkaar worden geplaatst";
        return;
      }
      let user_id = (await this.$apollo.queries.users_me.refetch()).data.users_me.id;
      console.log(user_id);
      let data = await this.$apollo.mutate({
        mutation: CREATE_BOOKING_MUTATION,
        variables: {
          date: this.date,
          from: this.from,
          to: this.to,
          description: this.description,
          user: this.person,
          room: this.room,
        }
      });
      if(data.data.create_bookings_item === null){
        ErrorService.displayErrorAlert("Kan geen afspraak maken");
      } else {
        let booking_id = data.data.create_bookings_item.id;
        await this.$router.push('/reserveconfirmation/' + booking_id);
      }
    },
    createDate(date, time){
      return dayjs(date + "T" + time);
    },
    canBeBooked(){
      if(this.allRooms === null)
        return false
      if(this.date === '' || this.room === '' || this.from === '' || this.to === '' || this.description === '')
        return false

      let potential_conflicts = this.allRooms.find(room => room.id === this.room).bookings;
      let conflicts = potential_conflicts.filter(conflict => {
        let from = this.createDate(conflict.date, conflict.from);
        let to = this.createDate(conflict.date, conflict.to);
        if(this.createDate(this.date,this.from) > from && this.createDate(this.date, this.from) < to){
          return true;
        }
        if(this.createDate(this.date,this.to) > from && this.createDate(this.date,this.from) < to){
          return true;
        }
        return false;
      });
      return conflicts.length <= 0;
    }
  },
  computed: {

  }
}
</script>
