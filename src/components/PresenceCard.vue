<template>
  <v-card elevation="0">
    <div class="d-flex flex-row">
      <v-avatar size="40" rounded class="my-auto">
        <v-img :src="transformUrl(company.logo.id)" contain></v-img>
      </v-avatar>

      <div style="max-width: 70%;">
        <v-card-title class="font-semibold text-base tracking-tight truncate pr-0 d-block max-w-full">{{
            company.name
          }}
        </v-card-title>
        <v-card-subtitle class="pr-0" :style="company.is_present ? 'color: #87d7a9' :'color: #999999'">
          {{ company.is_present ? "Aanwezig" : "Afwezig" }}
        </v-card-subtitle>
      </div>
      <SmallPresenceToggle
          v-if="inCompany"
          class="ml-auto"
        :company="company.id"
        :enabled="company.is_present"
        :on-toggle="onToggle"
      ></SmallPresenceToggle>
    </div>
  </v-card>
</template>



<script>
import {transformUrl} from "@/utils/image";
import SmallPresenceToggle from "@/components/SmallPresenceToggle";

export default {
  name: 'PresenceCard',
  components: {SmallPresenceToggle},
  data: () => ({
    //Of het is uitgeklapt
    expanded: false
  }),
  props: {
    inCompany: Boolean,
    company: Object,
    inCompany: Boolean,
    onEmployeeToggle: Function,
  },
  methods: {
    //Zorgt voor de goede url voor het logo
    transformUrl: transformUrl,
    // Tellen hoeveel er aanwezig zijn
    countPresent: function (employees) {
      return employees.filter(employee => employee.is_present).length;
    },
    // Kijken of er iemand aanwezig is
    countPresence: function (employees) {
      return this.countPresent(employees) > 0;
    },
    // Tellen hoeveel er niet aanwezig zijn
    countNotPresent: function (employees) {
      return employees.length - this.countPresent(employees);
    },
    //Callback voor de toggle van een medewerker
    onToggle(employee, newValue){
      this.onEmployeeToggle(employee, newValue);
    }
  }
}
</script>

<style scoped>
.font-semibold {
  font-weight: 600 !important;
}

.text-base {
  font-size: 1rem !important;
  line-height: 1.5rem !important;
  letter-spacing: -0.025em;
}
</style>