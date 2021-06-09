<template>
  <v-card>
    <v-card-title>{{event.location}}</v-card-title>
    <v-card-text>
      <div class="flex flex-col flex-wrap d-block">
        <span class="xs:text-lg align-center d-block"><v-icon class="mr-1" medium color="black">mdi-comment-text-outline</v-icon>{{event.description }}</span>
        <span class="xs:text-lg align-center d-block"><v-icon class="mr-1" medium color="black">mdi-account</v-icon>{{ event.first_name }} {{ event.last_name }}</span>
        <span class="xs:text-lg align-center d-block"><v-icon class="mr-1" medium color="black">mdi-clock-time-eight-outline</v-icon>{{event.from.substr(0, 5) }} - {{ event.to.substr(0, 5) }}</span>
      </div>
    </v-card-text>
    <v-list-item class="grow">
      <v-list-item-avatar size="30" color="grey darken-3">
        <v-img
            contain
            style="background-color: white"
            alt=""
            :src="transformUrl(event.logo)"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{event.user_created.first_name}} {{event.user_created.last_name}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn
          color="primary"
          @click="close"
          class="text-none"
          large
      >
        Sluiten
      </v-btn>
      <v-btn
          :v-if="canEdit"
          color="secondary"
          @click="edit"
          class="text-none"
          large
      >
        <span class="text-black">Bewerken</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import transformurl from "@/mixins/transformurl";
import {USER_DATA} from "@/constants/settings";

export default {
  name: "BookingCard",
  props: {
    event: Object,
    close: Function,
    edit: Function
  },
  mixins: [transformurl],
  computed: {
    //Of de huidige gebruiker de afspraak mag aanpassen,
    //anders hoeft de bewerken knop niet getoond te worden
    canEdit(){
      let data = JSON.parse(localStorage.getItem(USER_DATA));
      let userId = data.id;
      return this.event.user_id === userId || this.event.created_id === userId;
    }
  }
}
</script>