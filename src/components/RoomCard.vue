<template>
  <div>
    <v-theme-provider>
      <v-list-item three-line>
        <v-list-item-content class="ml-3 mt-1">
          <v-list-item-title class="font-bold">{{ room.name }}</v-list-item-title>
          <v-list-item-subtitle class="text-subtitle-1 pb-2" style="color: black">{{ room.location }}</v-list-item-subtitle>
          <v-list-item-subtitle class="">
            <span :style="'color: ' + (taken ? '#f26262' :'#87d7a9')">{{ taken ? 'Nu bezet' : 'Nu beschikbaar' }}</span>
            <span class="ml-3">{{ taken ? ('Beschikbaar na ' + takenTill) : "" }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-theme-provider>
    <v-divider></v-divider>
  </div>
</template>


<script>
import 'vue-cal/dist/vuecal.css'

export default {
  name: 'RoomCard',
  props: {
    room: Object
  },
  computed: {
    taken() {
      let currentBooking = this.room.bookings.find(booking => Date.now() > this.timeToDate(booking.date, booking.from) && Date.now() < this.timeToDate(booking.date, booking.to));
      return currentBooking !== undefined;
    },
    takenTill(){
      let currentBooking = this.room.bookings.find(booking => Date.now() > this.timeToDate(booking.date, booking.from) && Date.now() < this.timeToDate(booking.date, booking.to));
      return currentBooking ? this.timeToDate(currentBooking.date, currentBooking.to).toLocaleTimeString('nl-NL').substr(0, 5) : undefined
    },
  },
  methods: {
    timeToDate: (date,time) => new Date(`${date}T${time}`)
  }
}
</script>