<template>
  <v-card elevation="0">
    <div class="d-flex flex-row" @click="show = !show" v-ripple>
      <v-avatar size="40" rounded class="my-auto">
        <v-img :src="transformUrl(company.logo.id)" contain></v-img>
      </v-avatar>

      <div class="max-w-full">
        <v-card-title class="font-semibold text-base tracking-tight truncate max-w-prose">{{ company.name }}</v-card-title>
        <v-card-subtitle :style="'color: ' + (countPresence(company.employees) ? '#87d7a9' :'#999999')">
          {{ countPresence(company.employees) ? countPresent(company.employees) + " aanwezig" : countNotPresent(company.employees) + " afwezig" }}
        </v-card-subtitle>
      </div>
      <v-icon large class="ml-auto mt-5 mb-5">{{ show ? 'mdi-chevron-down' : 'mdi-chevron-right' }}</v-icon>
    </div>
    <v-expand-transition>
      <v-list v-show="show">
        <div class="ml-6 mr-6" v-for="employee in company.employees" :key="employee.id">
          <div class="flex flex-row justify-space-between">
            <SmallPresenceToggle v-if="inCompany" :enabled="employee.is_present" :employee="employee.id" :on-toggle="onToggle"></SmallPresenceToggle>
            <div class="flex flex-col ml-2.5">
              <span class="text-sm font-semibold black--text">{{
                  employee.first_name + " " + employee.last_name
                }}</span>
              <span
                  :style="'color: ' + (employee.is_present ? '#9fdfba' : '#999999')">
          {{ (employee.is_present) ? "aanwezig" : "afwezig" }}</span>

            </div>
            <div class="flex flex-row justify-end">
              <v-btn
                  tile
                  icon
                  style="background-color: #efe2e2;  border-radius: 30%"
                  class="mr-2"
                  medium
                  :disabled="!employee.phone"
                  :href="'https://api.whatsapp.com/send?phone=+31' + employee.phone"
              >
                <v-icon color="black" medium>mdi-whatsapp</v-icon>
              </v-btn>
              <v-btn
                  tile
                  icon
                  style="background-color: #efe2e2; border-radius: 30%"
                  medium
                  class="mr-2"
                  :disabled="!employee.phone"
                  :href="'tel:' + employee.phone"
              >
                <v-icon color="black" medium>mdi-cellphone</v-icon>
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
import {transformUrl} from "@/utils/image";
import SmallPresenceToggle from "@/components/SmallPresenceToggle";

export default {
  name: 'PresenceCard',
  components: {SmallPresenceToggle},
  data: () => ({
    show: false
  }),
  props: {
    company: Object,
    inCompany: Boolean,
    onEmployeeToggle: Function,
  },
  methods: {
    transformUrl: transformUrl,
    countPresent: function (employees) {
      return employees.filter(employee => employee.is_present).length;
    },
    countPresence: function (employees) {
      return this.countPresent(employees) > 0;
    },
    countNotPresent: function (employees) {
      return employees.length - this.countPresent(employees);
    },
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