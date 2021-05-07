<template>
  <div>
    <PageHeader icon="mdi-account-outline" name="Meer"></PageHeader>
    <v-card class="h-full">
      <v-list dense>
        <template v-for="part in parts">
          <v-subheader :key="part.name">{{part.name}}</v-subheader>
          <v-list-item-group :key="part.name + '1'" color="primary">
            <v-list-item v-for="button in part.buttons" :key="button.name + '2'" @click="button.method">
              <v-list-item-icon>
                <v-icon color="black">{{button.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{button.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </template>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import gql from "graphql-tag";
import {getRefreshToken, onLogout} from "@/vue-apollo";
import {USER_DATA} from "@/constants/settings";

export default {
  name: "More",
  data() {
    return {
      parts: [
        {
          name: 'Account',
          buttons: [
            {
              name: 'Uitloggen',
              icon: 'mdi-logout',
              method: this.logout
            }
          ]
        }
      ]
    }
  },
  methods: {
    async logout(){
      await this.$apollo.mutate({
        mutation: gql`
            mutation($refresh_token: String!){
                auth_logout(refresh_token: $refresh_token)
            }
        `,
        variables: {
          refresh_token: getRefreshToken()
        },
        client: 'system'
      });
      await onLogout(this.$apollo.getClient());
      localStorage.removeItem(USER_DATA);
      await this.$router.push('/login');
    }
  },
  components: {PageHeader}
}
</script>

<style scoped>

</style>