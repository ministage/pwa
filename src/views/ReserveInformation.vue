<template>
  <div>
    <PageHeader icon="mdi-calendar-blank-outline" name="Reserveren"></PageHeader>
    <v-form class="flex flex-col mt-16 align-center" ref="form">
      <v-text-field rounded outlined class="w-10/12" required dense label="Bedrijf"></v-text-field>  <!--:label="company"-->
      <v-text-field rounded outlined class="w-10/12" label="Datum" required type="date" dense></v-text-field>
      <v-text-field rounded outlined class="w-10/12" label="Starttijd" required type="time" dense></v-text-field>
      <v-text-field rounded outlined class="w-10/12" label="Eindtijd" required type="time" dense></v-text-field>
      <v-select rounded outlined class="w-10/12" label="Vergaderruimte" required :items="rooms" dense></v-select>
      <v-text-field rounded outlined class="w-10/12" label="Opmerking" dense></v-text-field>
      <v-btn color="primary" class="w-10/12" rounded to="/reserveconfirmation">
        Reservering plaatsen
      </v-btn>
    </v-form>

  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import gql from "graphql-tag";
import {USER_DATA} from "@/constants/settings";

export default {
  name: "ReserveInformation",
  components: {PageHeader},
  computed : {
    company: () => {
      let json = localStorage.getItem(USER_DATA);
      let user = JSON.parse(json);
      return user.company.name;
    },
  },
  apollo: {
    rooms: {
      query: gql`query{
        rooms {
            name
        }
      }`,
    },
  },
}
</script>
