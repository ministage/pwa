<template>
  <div>
    <PageHeader icon="mdi-map-marker-outline" name="Aanwezigheid"></PageHeader>
    <div style="color: black; background-color: #f7f0f0; height: 130px" class="flex flex-row w-full justify-center">
      <span class="mt-auto mb-auto mr-3 text-h5 font-weight-bold">Ik ben:</span>
      <PresenceToggle class="mt-auto mb-auto " :enabled="present" :on-toggle="togglePresence"></PresenceToggle>
    </div>
    <div class="text-body-1 mt-6 ml-5 mb-3">Aanwezig in het pand:</div>
    <v-row
        dense
        class="mx-0.5"
    >
      <v-col
          cols="12"
          v-for="company in companies"
          :key="company.id"
      >
        <PresenceCard :company="company"></PresenceCard>
        <VDivider></VDivider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import PresenceCard from '../components/PresenceCard'
import PageHeader from "@/components/PageHeader";
import PresenceToggle from "@/components/PresenceToggle";

export default {
  apollo: {
    companies: {
      query: gql`query {
        companies {
            id
            name
            description
                logo {
                    url
                }
            employees{
                id
                username
                presence{
                    is_present
                }
            }
      }
    }`,
      update: data => {
        let getPresent = (company) => company.employees.filter(e => e.presence.is_present).length;
        return data.companies.sort((a, b) =>  getPresent(b) - getPresent(a));
      },
      pollInterval: 1000,
    },
  },
  name: 'Home',
  components: {
    PresenceToggle,
    PageHeader,
    PresenceCard,
  },
  data: () => ({
    present: true,
  }),
  methods: {
    gotoReserve() {
      this.$router.push('/reserve');
    },
    togglePresence(){
      this.present = !this.present;
    },
    getPresent(employees) {
      return employees;
    }
  }
}
</script>
