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
  mounted() {
    const d = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    this.daysInMonth = d.getDate();
  },
  components: {
    SvgIcon
  },
  methods: {
    selectDate(number){
      this.numberSelected = number;
    },
    nextMonth(){
      this.selectedMonth++;
      this.numberSelected = this.onCurrentMonth ? this.currentDate.getDate() : 1;
    },
    previousMonth(){
      this.selectedMonth--;
      this.numberSelected = this.onCurrentMonth ? this.currentDate.getDate() : 1;
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
    onCurrentMonth() {
      return this.selectedMonth === this.currentMonth;
    },
    dates () {
      let dates = [];
      let startDate = this.onCurrentMonth ? this.currentDate.getDate() : 1;
      for(let i = startDate; i <= this.daysInMonth; i++){
        dates.push({
          dag: new Date(this.currentDate.getFullYear(), this.selectedMonth, i).toLocaleDateString("nl-NL", { weekday: 'long' }),
          number: i
        })
      }
      return dates;
    },
    monthName () {
      let date = new Date(this.currentDate.getFullYear(), this.selectedMonth, 1);
      let month = date
          .toLocaleDateString("nl-NL", { month: 'long' });
      return month.charAt(0).toUpperCase() + month.slice(1);
    }
  }
}
</script>