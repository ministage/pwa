<template>
  <div>
    <PageHeader icon="mdi-map-marker-outline" name="Aanwezigheid"></PageHeader>
    <div style="color: black; background-color: #f7f0f0; height: 130px" class="flex flex-row w-full justify-center align-center">
      <span class="mr-3 text-2xl font-weight-bold">Aanwezig:</span>
      <PresenceToggle
          :loading="$apollo.queries.users_me.loading"
          :enabled="$apollo.queries.users_me.loading ? false : users_me.is_present"
          :on-toggle="togglePresence"
      ></PresenceToggle>
    </div>
    <div class="text-xl mt-6 ml-5 mb-3">Aanwezig in het pand:</div>
    <v-row
        dense
        class="mx-0.5"
    >
      <v-col
          cols="12"
          v-for="company in companies"
          :key="company.id"
      >
        <PresenceCard
            :in-company="$apollo.queries.users_me.loading ? true : company.id === users_me.company.id"
            :company="company"
            :on-employee-toggle="toggleEmployeePresence"
        ></PresenceCard>
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

const USERS_ME = gql`query {
           users_me {
             is_present
             company {
                id
             }
           }
        }`;

const COMPANIES = gql`query {
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
                phone
            }
      }
    }`;

export default {
  apollo: {
    users_me: {
      query: USERS_ME,
      client: 'system',
      pollInterval: 5000,
    },
    companies: {
      query: COMPANIES,
      update: data => {
        let getPresent = (company) => company.employees.filter(e => e.is_present).length;
        return data.companies.sort((a, b) =>  getPresent(b) - getPresent(a));
      },
      pollInterval: 5000,
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
    async togglePresence(newValue){
      console.log(JSON.parse(localStorage.getItem(USER_DATA)).id);
      let id = JSON.parse(localStorage.getItem(USER_DATA)).id
      await this.$apollo.mutate({
        mutation: PRESENCE_MUTATUTION,
        variables: {
          userid: id,
          presence: newValue
        },
        client: 'system',
        update: (store, { data: update_users_item }) => {
          if(update_users_item.is_present !== null){
            const data = store.readQuery({query: USERS_ME});
            data.users_me.is_present = newValue;
            store.writeQuery({
              query: USERS_ME,
              data
            });
          }
        },
      });
      await this.$apollo.queries.companies.refetch();
    },
    async toggleEmployeePresence(employee_id, newValue){
      console.log(JSON.parse(localStorage.getItem(USER_DATA)).id);
      let id = JSON.parse(localStorage.getItem(USER_DATA)).id
      if(employee_id === id){
        await this.togglePresence(newValue);
      } else {
        await this.$apollo.mutate({
          mutation: PRESENCE_MUTATUTION,
          variables: {
            userid: employee_id,
            presence: newValue
          },
          client: 'system'
        });
        await this.$apollo.queries.companies.refetch();
        await this.$apollo.queries.users_me.refetch();
      }
    },
    getPresent(employees) {
      return employees;
    }
  },
}
</script>
