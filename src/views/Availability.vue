<template>
  <div>
    <PageHeader icon="mdi-map-marker" name="Aanwezigheid"></PageHeader>
    <div style="color: black; background-color: #f7f0f0" class="flex flex-row w-full justify-center">
      <span class="mt-auto mb-auto mr-3 text-h5 font-weight-bold">Ik ben:</span>
      <PresenceToggle class="mt-2 mb-2 " :enabled="present" :on-toggle="togglePresence"></PresenceToggle>
    </div>
    <h2>Klik hierboven om je afwezig te melden</h2>
    <v-row dense>
      <v-col cols="12" v-for="company in companies" :key="company.id">
        <PresenceCard :company="company"></PresenceCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import PresenceCard from '../components/PresenceCard'

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
