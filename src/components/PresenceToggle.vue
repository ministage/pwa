<template>
  <v-switch
      class="big-toggle ml-3 pt-0"
      v-model="value"
      inset
      color="#6fcf97"
      error-count="0"
      hide-details
      :loading="loading"
      :ripple="false"
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
    //De waarde van de toggle zelf
    value: {
      get: function(){
        return this.enabled;
      },
      set: function(newValue){
        //Stuur geen callback wanneer de knop aan het laden is
        if(!this.loading)
          this.onToggle(newValue);
      }
    },
  },
}
</script>

<style lang="scss">
.v-application--is-ltr .v-input--selection-controls__input {
  margin-right: 0px !important;
}
.big-toggle {
  margin-top: 0 !important;
  transform: scale(2);
  transform-origin: left;
}
</style>