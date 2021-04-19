<template>
  <div class="flex flex-col">
    <header class="text-4xl text-white bg-blue-900 p-6">Reservering plaatsen</header>
    <div class="flex flex-row w-full justify-center">
      <h2 class="text-3xl w-full text-center">April</h2>
      <button class="text-4xl text-center ml-auto"><svg-icon type="mdi" :size="48" :path="chevron_right"></svg-icon></button>
    </div>
    <ul class="flex flex-row overflow-scroll">
      <li v-for="date in dates" :key="date.number">
        {{ date.dag }} ({{date.number}})
      </li>
    </ul>

    <div class="bg-white flex flex-col">
      <div class="p-6 border-l-2 border-t-2 border-r-2 border-black">
        <h1 class="text-3xl">Van: </h1>
        <div class="flex bg-yellow-200 p-6">
          <h1 class="text-3xl">9:30</h1>
        </div>
      </div>
      <div class="p-6 border-2 border-black">
        <h1 class="text-3xl">Tot:</h1>
        <div class="flex bg-yellow-200 p-6">
          <h1 class="text-3xl">10:30</h1>
        </div>
      </div>
    </div>
    <button class="ml-auto mr-auto my-20 rounded-3xl bg-yellow-200 w-1/2 p-6 text-3xl md:text-4xl">Reserveren</button>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiChevronRight } from '@mdi/js'
export default {
  components: {
    SvgIcon
  },

  data() {
    return {
      chevron_right: mdiChevronRight,
      dates: [
        {
          "dag": "maandag",
          "number": 19
        },
        {
          "dag": "dinsdag",
          "number": 20
        },
        {
          "dag": "woensdag",
          "number": 21
        },
        {
          "dag": "donderdag",
          "number": 22
        },
        {
          "dag": "vrijdag",
          "number": 23
        },
        {
          "dag": "zaterdag",
          "number": 24
        },
        {
          "dag": "zondag",
          "number": 25
        }
      ]
    }
  }
}
</script>