<template>
  <v-card elevation="2">
    <div class="d-flex flex-no-wrap">
      <v-avatar size="125" rounded>
        <v-img :src="transformUrl(company.logo.url)"></v-img>
      </v-avatar>

      <div>
        <v-card-title>{{ company.name }} - {{ countPresent(company.employees)}} aanwezig</v-card-title>
        <v-card-text>{{company.description}}</v-card-text>
      </div>
      <v-btn
          icon
          class="ml-auto mt-5 mr-3"
          @click="show = !show"
          large
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </div>
    <v-expand-transition>
      <v-list v-show="show">
        <div class="ml-6 mr-6" v-for="employee in company.employees" :key="employee.id">

          <div class="flex flex-row justify-space-between">
            <div class="flex flex-col ml-2.5">
              <span class="text-xl font-weight-medium black--text">{{ employee.username }}</span>
              <span
                  :style="'color: ' + (employee.presence.is_present ? '#9fdfba' : '#f26464')">
          {{ employee.presence.is_present ? "aanwezig" : "afwezig" }}</span>

            </div>
            <div class="flex flex-row justify-end">
              <v-btn
                  tile
                  icon
                  style="background-color: #efe2e2;"
                  class="rounded mr-2"
                  large
              >
                <v-icon color="black" large>mdi-whatsapp</v-icon>
              </v-btn>
              <v-btn
                  tile
                  icon
                  style="background-color: #efe2e2;"
                  class="rounded mr-2"
                  large
              >
                <v-icon color="black" large>mdi-cellphone</v-icon>
              </v-btn>
            </div>
          </div>
          <v-divider class="my-2 ml-3"></v-divider>
        </div>


      </v-list>
    </v-expand-transition>
  </v-card>
</template>


<script>
import {STRAPI_URL} from "@/constants/settings";

export default {
  name: 'PresenceCard',
  data: () => ({
    show: false
  }),
  props: {
    company: Object,
  },
  methods: {
    transformUrl: function (url) {
      return STRAPI_URL + url;
    },
    countPresent: function (employees) {
      return employees.filter(employee => employee.presence.is_present).length;
    }
  }
}
</script>