<template>
  <vue-markdown class="pl-2 pt-2 pr-2">{{content}}</vue-markdown>
</template>

<script>
import VueMarkdown from 'vue-markdown';
export default {
  name: "Markdown",
  props: {
    content: String,
  },
  components: {VueMarkdown}
}
</script>

<style lang="scss">
h1 {
  @apply font-semibold text-3xl
}
h2 {
  @apply font-semibold text-2xl
}
h3 {
  @apply font-semibold text-xl
}
</style>