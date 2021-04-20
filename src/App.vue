<template>
  <div id="app">
    <div id="nav" class="flex flex-row bg=">
      <router-link to="/" class="m-2 mt-0">Home</router-link> |
      <router-link to="/rooms" class="m-2 mt-0">Rooms</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
