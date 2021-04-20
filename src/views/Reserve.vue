<template>


  <div class="flex flex-col">

    <header class="text-4xl text-white bg-blue-900 p-6">Reservering plaatsen</header>


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
import {mdiChevronRight, mdiChevronLeft} from '@mdi/js'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'


let date = new Date();

export default {
  mounted(){
    if(this.bookings){
      this.events = this.bookings;
    }
  },
  props: {
    bookings: Array
  },
  components: {VueCal},
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
      selectedDate: this.today,
      selectedStart: this.timeNow,
      selectedEnd: this.timeLater,
      chevron_right: mdiChevronRight,
      chevron_left: mdiChevronLeft,
      events: []
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