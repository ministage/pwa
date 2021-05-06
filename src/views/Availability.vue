<template>
  <div>
    <PageHeader icon="mdi-map-marker-outline" name="Aanwezigheid"></PageHeader>
    <div style="color: black; background-color: #f7f0f0; height: 130px" class="flex flex-row w-full justify-center">
      <span class="mt-auto mb-auto mr-3 text-h5 font-weight-bold">Ik ben:</span>
      <PresenceToggle class="mt-auto mb-auto " :enabled="$apollo.queries.users_me.loading ? true : users_me.is_present" :on-toggle="togglePresence"></PresenceToggle>
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
import {USER_DATA} from "@/constants/settings";
import {PRESENCE_MUTATUTION} from "@/constants/graphql";

export default {
  apollo: {
    users_me: {
      query: gql`query {
           users_me {
             is_present
           }
        }`,
      client: 'system',
      pollInterval: 1000,
    },
    companies: {
      query: gql`query {
        companies {
            id
            name
            description
                logo {
                   id
                }
            employees{
                id
                first_name
                last_name
                is_present
            }
      }
    }`,
      update: data => {
        let getPresent = (company) => company.employees.filter(e => e.is_present).length;
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
  methods: {
    gotoReserve() {
      this.$router.push('/reserve');
    },
    async togglePresence(current){
      console.log(current);
      console.log(!current);
      console.log(JSON.parse(localStorage.getItem(USER_DATA)).id);
      await this.$apollo.mutate({
        mutation: PRESENCE_MUTATUTION,
        variables: {
          userid: JSON.parse(localStorage.getItem(USER_DATA)).id,
          presence: !current
        },
        client: 'system'
      });
    },
    getPresent(employees) {
      return employees;
    }
  },
}
</script>
