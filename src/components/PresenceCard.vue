<template>
  <v-card elevation="0">
    <div class="d-flex flex-row ml-3" @click="show = !show" v-ripple>
      <v-avatar size="60" round class="my-auto">
        <v-img :src="transformUrl(company.logo.id)" contain></v-img>
      </v-avatar>

      <div>
        <v-card-title>{{ company.name }}</v-card-title>
        <v-card-subtitle :style="'color: ' + (countPresence(company.employees) ? '#87d7a9' :'#f26262')">
          {{ countPresent(company.employees) }} aanwezig
        </v-card-subtitle>
      </div>
        <v-icon large class="ml-auto mt-5 mr-3 mb-5">{{ show ? 'mdi-chevron-down' : 'mdi-chevron-right' }}</v-icon>
    </div>
    <v-expand-transition>
      <v-list v-show="show">
        <div class="ml-6 mr-6" v-for="employee in company.employees" :key="employee.id">

          <div class="flex flex-row justify-space-between">
            <div class="flex flex-col ml-2.5">
              <span class="text-xl font-weight-medium black--text">{{ employee.first_name + " " + employee.last_name }}</span>
              <span
                  :style="'color: ' + (employee.is_present ? '#9fdfba' : '#f26464')">
          {{ (employee.is_present) ? "aanwezig" : "afwezig" }}</span>

            </div>
            <div class="flex flex-row justify-end">
              <v-btn
                  tile
                  icon
                  style="background-color: #efe2e2;  border-radius: 30%"
                  class="mr-2"
                  large
              >
                <v-icon color="black" large>mdi-whatsapp</v-icon>
              </v-btn>
              <v-btn
                  tile
                  icon
                  style="background-color: #efe2e2; border-radius: 30%"
                  large
                  class="mr-2"
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
import {API_URL} from "@/constants/settings";

export default {
  name: 'PresenceCard',
  data: () => ({
    show: false
  }),
  props: {
    company: Object,
  },
  methods: {
    transformUrl: function (id) {
      return API_URL + '/assets/' + id;
    },
    countPresent: function (employees) {
      return employees.filter(employee => employee.is_present).length;
    },
    countPresence: function (employees) {
      return this.countPresent(employees) > 0;
    }
  }
}
</script>