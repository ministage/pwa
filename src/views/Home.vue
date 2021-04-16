<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <iframe src="https://open.spotify.com/embed/track/5SrG516HWKZtSqyNk4Gw7l" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
