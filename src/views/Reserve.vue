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
      <VueCal class="bg-blue100 bg-opacity-70 text-white" style="height: 300px" hide-weekends
              :hideViewSelector="true" :timeFrom="9*60" :timeTo="18*60" :events="events" :clickToNavigate="false" :dblclickToNavigate="false"/>
      <div class="p-6 border-l-2 border-t-2 border-r-2 border-black">
        <label class="text-3xl">Datum: </label>
        <input @select="selectDate" type="date" class="text-3xl bg-yellow-200" :value="today">
      </div>

      <div class="p-6 border-l-2 border-t-2 border-r-2 border-black">
        <label class="text-3xl">Van: </label>
        <div class="flex bg-yellow-200 p-6">
          <input @select="selectTimeStart" type="time" id="van" class="text-3xl" :value="timeNow" required>
        </div>
      </div>
      <div class="p-6 border-2 border-black">
        <h1 class="text-3xl">Tot:</h1>
        <div class="flex bg-yellow-200 p-6">
          <input @select="selectTimeEnd" type="time" id="tot" class="text-3xl" :value="timeLater" required/>
        </div>
      </div>
    </div>
    <button @click="gotoRooms" class="ml-auto mr-auto my-20 rounded-3xl bg-yellow-200 w-1/2 p-6 text-3xl md:text-4xl">Reserveren</button>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'

export default {
  mounted() {
    const d = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    this.daysInMonth = d.getDate();
  },
  components: {
    SvgIcon
  },
  methods: {
    gotoRooms() {
      this.$router.push('/rooms')
    },
    selectDate(date){
      this.selectedDate = date;
    },
    selectTimeStart(time){
      this.selectedStart = time;
    },
    selectTimeEnd(time){
      this.selectedEnd = time;
    }
  },
  data() {
    return {
      chevron_right: mdiChevronRight,
      chevron_left: mdiChevronLeft,
      selectedMonth: new Date().getMonth(),
      daysInMonth: null,
      currentDate: new Date(),
      currentMonth: new Date().getMonth(),
      numberSelected: new Date().getDate(),
    }
  },
  computed: {
    today: () => date.toISOString().substr(0,10),
    timeNow: () => date
        //Get locale string "20-4-2021 14:02:44"
        .toLocaleString("NL")
        //Split on space [ "20-4-2021", "14:04:11" ] and get last element
        .split(' ')[1]
        //Remove last 3 characters to only get time
        // "14:04:11" -> "14:04"
        .slice(0, -3),
    timeLater: () => date.addMinutes(30)
        //Get locale string "20-4-2021 14:02:44"
        .toLocaleString("NL")
        //Split on space [ "20-4-2021", "14:04:11" ] and get last element
        .split(' ')[1]
        //Remove last 3 characters to only get time
        // "14:04:11" -> "14:04"
        .slice(0, -3)
  }
}
</script>