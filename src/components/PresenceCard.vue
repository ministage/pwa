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
          class="ml-auto mt-3 mr-3"
          @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </div>
    <v-expand-transition>
      <v-list v-show="show">
        <v-subheader v-for="employee in company.employees" :key="employee.id" :class="employee.presence.is_present ? 'bg-green-200' : 'bg-red-200'">{{ employee.username }} -
          {{ employee.presence.is_present ? "Aanwezig" : "Afwezig" }}
        </v-subheader>
      </v-list>
    </v-expand-transition>
  </v-card>
</template>


<script>
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
      return "http://localhost:1337" + url;
    },
    countPresent: function (employees) {
      return employees.filter(employee => employee.presence.is_present).length;
    }
  }
}
</script>