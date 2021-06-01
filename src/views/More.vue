<template>
  <div class="h-full">
    <PageHeader icon="mdi-account-outline" name="Meer"></PageHeader>
    <Markdown
        v-if="!$apollo.queries.content.loading"
        :content="content"
    ></Markdown>
    <v-progress-linear
        v-else
        indeterminate
    ></v-progress-linear>

  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import Markdown from "@/components/Markdown";
import gql from "graphql-tag";
export default {
  name: "More",
  apollo: {
    content: {
      query: gql`query{
        meer {
            content
        }
      }`,
      update(data) {
        return data.meer.content;
      },
      fetchPolicy: 'cache-and-network'
    },
  },
  components: {
    PageHeader,
    Markdown
  }
}
</script>