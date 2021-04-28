<template>
  <div class="flex flex-col justify-center">
    <h1 class="text-4xl ml-4">Aanwezigheid</h1>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div class="rounded-full h-24 w-24 flex items-center justify-center bg-green-400">Aanwezig</div>

    <div v-if="precenses" class="w-full px-3 grid lg:grid-cols-2 grid-cols-1 gap-4">
      <div v-for="presence in precenses" :key="presence.id">
        <table class="outline-black m-2 border-collapse w-11/12">
          <tr class="bg-blue-200 m-10">
            <th>Naam</th>
            <th>Aanwezigheid</th>
            <th>Bedrijf</th>
          </tr>
          <tr>
            <td>{{ presence.user.username }}</td>
            <td>{{ presence.is_present }}</td>
            <td>{{ presence.user.company }}</td>
          </tr>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import ReserveringAPI from '../services/reservering'
import ErrorService from '../services/ErrorService'

export default {
  data() {
    return {
      loading: false,
      rooms: null,
      precenses: null,
      error: null
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  name: 'Home',
  components: {
    //RoomCard
  },
  methods: {
    fetchData() {
      this.error = this.rooms = null
      this.loading = true

      ReserveringAPI.getPresences().then(presences => {
        this.loading = false;
        this.precenses = presences;
      }).catch(error => {
        ErrorService.displayErrorAlert(error);
      })

      ReserveringAPI.getRooms().then(rooms => {
        this.loading = false;
        this.rooms = rooms;
      }).catch(error => {
        ErrorService.displayErrorAlert(error);
      });
    },
    gotoReserve() {
      this.$router.push('/reserve');
    }
  }
}
</script>
