<template>
  <div style="height: 630px;" class="flex flex-col bg-room bg-cover text-white">
    <div class="ml-3">
      <h2 class="text-5xl">{{ name }}</h2>
      <h4 class="text-2xl ml-0.5 mr-1 inline">{{ amount }}</h4>
      <svg style="width:30px;height:30px" viewBox="0 0 24 24" class="inline">
        <path fill="currentColor"
              d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"/>
      </svg>
    </div>
    <VueCal class="bg-gray-500 bg-opacity-70 text-white" style="height: 300px" hide-weekends
            :hideViewSelector="true" :timeFrom="9*60" :timeTo="18*60" :events="events" :clickToNavigate="false" :dblclickToNavigate="false"/>
    <button class="font-semibold mt-auto w-full py-6 text-center bottom bg-opacity-90 bg-yellow-300 text-4xl">Nu
      reserveren
    </button>
  </div>
</template>


<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  components: {VueCal},
  name: 'RoomCard',
  props: {
    name: String,
    amount: Number,
    bookings: Array,
  }
}
</script>