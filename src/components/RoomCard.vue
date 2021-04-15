<template>
    <div class="md:w-96 w-11/12 h-96 m-3 bg-room bg-cover text-white">
        <h2 class="text-5xl mt-2 ml-2">{{ name }}</h2>
        <h4 class="text-2xl ml-2">{{ amount }} personen</h4>
        <p class="ml-2">Gekke kalender</p>
        <ul>
            <li v-for="booking in bookings" :key="booking.id">
                {{ booking.userId }}: {{ booking.from }} - {{ booking.to }}
            </li>
        </ul>
        <div class="mt-4 w-full flex flex-row justify-center">
            <button class="p-1 bg-opacity-90 bg-yellow-300">Nu reserveren</button>
        </div>
    </div>
</template>


<script>
export default {
  name: 'RoomCard',
  props: {
    name: String,
    amount: Number,
    bookings: Array,
  }
}
</script>