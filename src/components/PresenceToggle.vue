<template>
  <div class="rounded-pill flex flex-row flex-grow-0 align-center" :class="button_style" @click="onClick">
    <v-fade-transition hide-on-leave>
    <span v-if="enabled" class="ml-3 mr-2">Aanwezig</span>
    </v-fade-transition>
    <div :class="'h-12 w-12 mt-1 mb-1 ' + (enabled ? 'mr-1' : 'ml-1')"
         style="background-color: white; border-radius: 50%"></div>
    <v-fade-transition hide-on-leave>
      <span v-if="!enabled" class="mr-6 ml-2">Afwezig</span>
    </v-fade-transition>
  </div>
</template>

<script>
export default {
  name: "PresenceToggle",
  props: {
    enabled: Boolean,
    onToggle: Function
  },
  computed: {
    button_style() {
      return this.enabled ? "on" : "off";
    }
  },
  methods: {
    onClick(){
      this.onToggle(this.enabled);
    }
  }
}
</script>

<style scoped>
.on {
  background-color: #6fcf97;
}

.off {
  background-color: #f26262;
}
</style>