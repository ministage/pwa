<template>
  <v-switch
      class="big-toggle ml-3 pt-0"
      v-model="value"
      inset
      color="#6fcf97"
      error-count="0"
      hide-details
      :loading="loading"
  ></v-switch>
</template>

<script>
export default {
  name: "PresenceToggle",
  props: {
    enabled: Boolean,
    loading: Boolean,
    onToggle: Function
  },
  computed: {
    value: {
      get: function(){
        return this.enabled;
      },
      set: function(newValue){
        this.onToggle(newValue);
      }
    },
  },
}
</script>

<style lang="scss">
.big-toggle {
  margin-top: 0 !important;
  transform: scale(2);
  transform-origin: left;
}
</style>