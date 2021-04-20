<template>
  <div class="flex flex-col justify-center">
    <h1 class="text-4xl ml-4">Vergaderruimtes</h1>
    <div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-if="rooms" class="w-full px-3 grid lg:grid-cols-2 grid-cols-1 gap-4">
      <RoomCard v-for="room in rooms" :on-reserve-click="gotoReserve" :key="room.id" :name="room.name" :amount="room.numberOfPeople" :bookings="room.bookings" />
    </div>
    
  </div>
</template>

<script>
import RoomCard from '../components/RoomCard'
import ReserveringAPI from '../services/reservering'
import ErrorService from '../services/ErrorService'

export default {
  data () {
    return {
      loading: false,
      rooms: null,
      error: null
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  name: 'Home',
  components: {
    RoomCard
  },
  methods: {
    fetchData () {
      this.error = this.rooms = null
      this.loading = true
      
      ReserveringAPI.getRooms().then(rooms => {
        this.loading = false;
        this.rooms = rooms;
      }).catch(error => {
        ErrorService.displayErrorAlert(error);
      });
    },
    gotoReserve(){
      this.$router.push('/reserve');
    }
  },
}
</script>
