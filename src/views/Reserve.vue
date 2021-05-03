<template>
  <div class="flex flex-col">

    <header class="text-4xl text-white bg-blue-900 p-6">Reservering plaatsen</header>
    <div class="flex flex-row w-full justify-center">
      <button @click="previousMonth" class="text-4xl text-center ml-auto"><svg-icon type="mdi" :size="48" :path="chevron_left"></svg-icon></button>
      <h2 class="text-3xl w-full text-center">{{monthName}}</h2>
      <button @click="nextMonth" class="text-4xl text-center ml-auto"><svg-icon type="mdi" :size="48" :path="chevron_right"></svg-icon></button>
    </div>
    <ul class="flex flex-row overflow-x-auto overflow-y-hidden h-auto">
      <li @click="selectDate(date.number)" v-for="date in dates" :key="date.number" class="pb-3 text-center border-2 min-w-1/3 md:min-w-1/6">
        <div v-if="date.number === numberSelected" class="h-5 bg-blue-900 w-full"></div>
        <div v-if="date.number !== numberSelected" class="h-5 w-full"></div>
        <h3 class="text-2xl px-3">{{date.dag}}</h3>
        <h1 class="text-5xl px-3">{{date.number}}</h1>
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
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'

export default {
  components: {
    SvgIcon
  },
  mounted () {
    this.ready = true
    this.scrollToTime()
    this.updateTime()
  },
  methods: {
    intervalFormatter(locale) {
      return locale.time;
    },
    getCurrentTime () {
      return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0
    },
    scrollToTime () {
      const time = this.getCurrentTime()
      const first = Math.max(0, time - (time % 30) - 30)

      this.cal.scrollToTime(first)
    },
    updateTime () {
      setInterval(() => this.cal.updateTimes(), 60 * 1000)
    },
  },
  computed: {
      cal () {
        return this.ready ? this.$refs.calendar : null
      },
      nowY () {
        return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
      },
  },
  data() {
    return {
      ready: false,
      value: '',
      days: [
        {
          name: "Zo",
          date: 26
        },
        {
          name: "Ma",
          date: 27
        },{
          name: "Di",
          date: 28
        },
        {
          name: "Wo",
          date: 29
        },
        {
          name: "Do",
          date: 30
        },
        {
          name: "Vr",
          date: 31
        },
        {
          name: "Za",
          date: 1
        }
      ]
    }
  },

}
</script>

<style scoped lang="scss">
.selected {
  background-color: #e0bfbf;
}
#span1 {
  height: 34px;
  width: 34px;
  line-height: 34px;
  text-align: center;
}


.v-current-time {
  height: 2px;
  background-color: #e0bfbf;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

&.first::before {
   content: '';
   position: absolute;
   background-color: #e0bfbf;
   width: 12px;
   height: 12px;
   border-radius: 50%;
   margin-top: -5px;
   margin-left: -6.5px;
 }
}
</style>