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
      <transition-group name="list" tag="div" class="w-full">
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
      </transition-group>
    </v-row>
  </div>
</template>

<style scoped>
/*
Deze css wordt gebruikt voor de animaties van de lijst met bedrijven
*/

.list-enter, .list-leave-to {
  opacity: 0;
}
.list-enter-active, .list-leave-active {
  transition: opacity 0.3s ease;
}
.list-move {
  transition: transform 0.3s ease-out;
}
</style>

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
    //Deze query haalt informatie over de gebruiker op
    users_me: {
      query: USERS_ME,
      client: 'system',
      pollInterval: 5000,
    },
    //Deze query haalt de beschikbaarheid van de bedrijven op
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
    //Deze functie wordt aangeroepen door de grote presence toggle bovenaan
    //en moet de aanwezigheid aanpassen
    async togglePresence(newValue){
      console.log(JSON.parse(localStorage.getItem(USER_DATA)).id);
      //Haal het userid uit de localstorage
      let id = JSON.parse(localStorage.getItem(USER_DATA)).id

      //Stuur de mutation naar de server om de aanwezigheid aan te passen
      await this.$apollo.mutate({
        mutation: PRESENCE_MUTATUTION,
        variables: {
          userid: id,
          presence: newValue
        },
        client: 'system',
        //Update de cache van users_me wanneer er een response van de server is
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
      //Haal opnieuw de gegevens van de beschikbaarheid van bedrijven op
      await this.$apollo.queries.companies.refetch();
    },
    //Deze functie wordt aangeroepen wanneer er op de toggle's van een medewerker wordt geklikt
    //Het past de aanwezigheid aan van een medewerker
    async toggleEmployeePresence(employee_id, newValue){
      console.log(JSON.parse(localStorage.getItem(USER_DATA)).id);
      //Haal het userid uit de localstorage
      let id = JSON.parse(localStorage.getItem(USER_DATA)).id

      //Controleer of het de gebruiker zelf is
      if(employee_id === id){
        //Pas het van de gebruiker zelf aan
        await this.togglePresence(newValue);
      } else {
        //Pas het voor een andere medewerker aan
        await this.$apollo.mutate({
          mutation: PRESENCE_MUTATUTION,
          variables: {
            userid: employee_id,
            presence: newValue
          },
          client: 'system'
        });
        //Haal de aanwezigheid van de bedrijven op
        await this.$apollo.queries.companies.refetch();
        //Haal de aanwezigheid van de gebruiker op
        await this.$apollo.queries.users_me.refetch();
      }
    }
  },
}
</script>
