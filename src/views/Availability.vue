<template>
  <div>
    <PageHeader icon="mdi-map-marker-outline" name="Aanwezigheid"></PageHeader>
    <div style="color: black; background-color: #f7f0f0; height: 130px" class="flex flex-row w-full align-center ml-0">
      <span class="mr-3 ml-6 text-xl font-weight-bold">Bedrijf aanwezig:</span>
      <PresenceToggle
          class="d-block"
          :loading="$apollo.queries.users_me.loading"
          :enabled="$apollo.queries.users_me.loading ? false : users_me.company.is_present"
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
            :in-company="$apollo.queries.users_me.loading ? false : users_me.role.name === 'Admin'"
            :company="company"
            :on-toggle="togglePresence"

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

export const PRESENCE_MUTATUTION = gql`
    mutation($companyid: ID!, $presence: Boolean!){
        update_companies_item(id: $companyid, data: { is_present: $presence }){
            is_present
        }
    }
`;

const USERS_ME = gql`query {
           users_me {
             company {
                is_present
                id
             }
             role {
                name
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
            is_present
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
        let getPresent = (company) => company.is_present;
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
  data() {
    return {
      company_id: JSON.parse(localStorage.getItem(USER_DATA)).company,
      user_data: JSON.parse(localStorage.getItem(USER_DATA))
    }
  },
  methods: {
    //Deze functie wordt aangeroepen door de grote presence toggle bovenaan
    //en moet de aanwezigheid aanpassen
    async togglePresence(newValue, company_id){
      console.log('TOGGLING');
      let id = '';
      if(company_id === undefined) {
        //Haal het userid uit de localstorage
        id = JSON.parse(localStorage.getItem(USER_DATA)).company;
        console.log(id);
      } else {
        id = company_id;
      }
      console.log(id);

      //Stuur de mutation naar de server om de aanwezigheid aan te passen
      await this.$apollo.mutate({
        mutation: PRESENCE_MUTATUTION,
        variables: {
          companyid: id,
          presence: newValue
        },
        //Update de cache van users_me wanneer er een response van de server is
        update: (store, { data: update_companies_item }) => {
          if(company_id === this.company_id) {
            if (update_companies_item.is_present !== null) {
              const data = store.readQuery({query: USERS_ME});
              data.users_me.company.is_present = newValue;
              store.writeQuery({
                query: USERS_ME,
                data
              });
            }
          }
        },
      });
      //Haal opnieuw de gegevens van de beschikbaarheid van bedrijven op
      await this.$apollo.queries.companies.refetch();
    },
  },
}
</script>
