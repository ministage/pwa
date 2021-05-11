<template>
  <div class="h-full">
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
import {onLogout} from "@/vue-apollo";
import {API_URL, USER_DATA} from "@/constants/settings";
import {directus} from "@/main";

export default {
  name: "More",
  data() {
    return {
      parts: [
        {
          name: 'Beheer',
          buttons: [
            {
              name: 'Naar beheer-pagina',
              icon: 'mdi-account-supervisor',
              method: this.gotoAdmin
            }
          ]
        },
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
    async logout() {
      await directus.auth.logout();
        await onLogout(this.$apollo.getClient());
        localStorage.removeItem(USER_DATA);
        await this.$router.push('/login');
    },
    gotoAdmin(){
      window.open(API_URL);
    }
  },
  components: {PageHeader}
}
</script>

<style scoped>

</style>