<template>
  <div>
    <v-theme-provider>
      <v-list-item three-line>
        <v-list-item-content class="ml-3 mt-1">
          <div class="flex flex-row">
            <v-list-item-title class="font-bold">{{ room.name }}</v-list-item-title>
            <v-btn text class="justify-end underline normal-case" style="font-family: Poppins" :to="'/reserve/' + room.id">Bekijk</v-btn>
          </div>
          <v-list-item-subtitle class="text-subtitle-1 pb-2" style="color: black">{{
              room.location
            }}
          </v-list-item-subtitle>
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

export default {
  name: 'RoomCard',
  props: {
    room: Object
  },
  computed: {
    // Kijken of de ruimte bezet is of niet
    taken() {
      let currentBooking = this.room.bookings.find(booking => Date.now() > this.timeToDate(booking.date, booking.from) && Date.now() < this.timeToDate(booking.date, booking.to));
      return currentBooking !== undefined;
    },
    // Kijken tot wanneer de ruimte vol is
    takenTill() {
      let currentBooking = this.room.bookings.find(booking => Date.now() > this.timeToDate(booking.date, booking.from) && Date.now() < this.timeToDate(booking.date, booking.to));
      return currentBooking ? this.timeToDate(currentBooking.date, currentBooking.to).toLocaleTimeString('nl-NL').substr(0, 5) : undefined
    },
  },
  methods: {
    timeToDate: (date, time) => new Date(`${date}T${time}`)
  }
}
</script>