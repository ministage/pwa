<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <iframe src="https://open.spotify.com/embed/track/5SrG516HWKZtSqyNk4Gw7l" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/372485591&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-372091646" title="Mr. Oregano" target="_blank" style="color: #cccccc; text-decoration: none;">Mr. Oregano</a> · <a href="https://soundcloud.com/user-372091646/mr-oregano" title="Mr. Oregano" target="_blank" style="color: #cccccc; text-decoration: none;">Mr. Oregano</a></div>>
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
