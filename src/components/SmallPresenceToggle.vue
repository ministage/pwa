<template>
  <v-switch
      v-model="value"
      inset
      color="#6fcf97"
      error-count="0"
      hide-details
  ></v-switch>
</template>

<script>
export default {
  name: "SmallPresenceToggle",
  props: {
    employee: String,
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
        this.onToggle(this.employee, newValue);
      }
    },
  },
}
</script>
