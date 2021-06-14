<template>
  <v-switch
      v-model="value"
      inset
      color="#6fcf97"
      error-count="0"
      hide-details
      :ripple="false"
  ></v-switch>
</template>

<script>
export default {
  name: "SmallPresenceToggle",
  props: {
    company: String,
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
        this.onToggle(newValue, this.company);
      }
    },
  },
}
</script>