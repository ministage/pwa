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
  props: {
    inCompany: Boolean,
    company: Object,
    onToggle: Function
  },
  methods: {
    //Zorgt voor de goede url voor het logo
    transformUrl: transformUrl,

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