<template>
  <v-theme-provider>
  <v-app-bar
      color="secondary"
      elevation="0"
      class="flex-grow-0"
      height="64"
  >
    <v-icon
        color="black"
        large
    >{{icon}}</v-icon>
    <span class="ml-3 text-2xl">{{name}}</span>
  </v-app-bar>
  </v-theme-provider>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    name: String,
    icon: String
  }
}
</script>