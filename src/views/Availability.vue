<template>
  <div class="flex flex-col justify-center">
    <h1 class="text-4xl ml-4">Aanwezigheid</h1>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div class="rounded-full h-24 w-24 flex items-center justify-center bg-green-400">Aanwezig</div>

    <div v-if="presences" class="w-full px-3 grid lg:grid-cols-2 grid-cols-1 gap-4">
      <div v-for="presence in presences" :key="presence.id">
        <table class="outline-black m-2 border-collapse w-11/12">
          <tr class="bg-blue-200 m-10">
            <th>Naam</th>
            <th>Aanwezigheid</th>
            <th>Bedrijf</th>
          </tr>
          <tr>
            <td>{{ presence.user.username }}</td>
            <td>{{ presence.is_present ? "Aanwezig" : "Afwezig" }}</td>
            <td>{{ presence.user.company.name }}</td>
          </tr>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  apollo: {
    presences: gql`query {
      presences {
        id
        user {
          username
          company {
            name
          }
        }
        is_present
      }
    }`
  },
  name: 'Home',
  methods: {
    gotoReserve() {
      this.$router.push('/reserve');
    }
  }
}
</script>
