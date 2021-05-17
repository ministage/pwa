<template>
  <label class="mt-0 mb-0" style="height: 60px;">
    <input type="checkbox" class='toggle' :value="enabled" @click="onClick">
    <div class="toggleSwitch">
      <div class='toggleLabel isChecked'>Aanwezig</div>
      <div class='toggleLabel isUnchecked'>Afwezig</div>
    </div>
  </label>
</template>

<script>
export default {
  name: "PresenceToggle",
  props: {
    enabled: Boolean,
    onToggle: Function
  },
  methods: {
    onClick(){
      this.onToggle(this.enabled);
    }
  }
}
</script>

<style scoped lang="scss">
INPUT.toggle {
  display: none;
}

.toggleSwitch {
  cursor: pointer;
  min-width: 100px;
  height: 60px;
  background: #b7b7b7;
  display: inline-block;
  border-radius: 100px;
  position: relative;
}

INPUT:checked + .toggleSwitch {
  background: #6fcf97;
}

.toggleLabel {
  display: flex;
  height: 100%;
  align-items: center;
  color: #FFF;
}

.isUnchecked {
  justify-content: flex-end;
  padding-right: 20px;
  padding-left: 60px
}
.isChecked {
  padding-left: 20px;
  padding-right: 60px
}
/* Hide labels that don't apply. Using visibility so that in case one label is longer than another, long hidden labels still stretch the container. */
INPUT:checked + .toggleSwitch > .isUnchecked {
  visibility: hidden;
  height: 0;
}
INPUT:not(:checked) + .toggleSwitch > .isChecked {
  visibility: hidden;
  height: 0;
}

INPUT:checked + .toggleSwitch:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

.toggleSwitch:after {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 90px;
  transition: 0.3s;
}

.toggleSwitch:active:after {
  width: 50px;
}
</style>