<template>
  <div>
    <div class="flex flex-row w-full justify-center">
      <button @click="previousMonth" class="text-4xl text-center ml-auto">
        <svg-icon type="mdi" :size="48" :path="chevron_left"></svg-icon>
      </button>
      <h2 class="text-3xl w-full text-center">{{ monthName }}</h2>
      <button @click="nextMonth" class="text-4xl text-center ml-auto">
        <svg-icon type="mdi" :size="48" :path="chevron_right"></svg-icon>
      </button>
    </div>
    <ul class="flex flex-row overflow-x-auto overflow-y-hidden h-auto">
      <li @click="selectDate(date.number)" v-for="date in dates" :key="date.number"
          class="pb-3 text-center border-2 min-w-1/3 md:min-w-1/6">
        <div v-if="date.number === numberSelected" class="h-5 bg-blue-900 w-full"></div>
        <div v-if="date.number !== numberSelected" class="h-5 w-full"></div>
        <h3 class="text-2xl px-3">{{ date.dag }}</h3>
        <h1 class="text-5xl px-3">{{ date.number }}</h1>
      </li>
    </ul>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js';

export default {
  components: { SvgIcon },
  data() {
    return {
      chevron_right: mdiChevronRight,
      chevron_left: mdiChevronLeft,
    }
  }
}
</script>