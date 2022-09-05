<template>
  <div style="color: black" class="testerblock">
    <div v-for="project in projects" v-bind:key="project.id">
      <p>{{ project.prompt }}</p>
    </div>
  </div>
</template>

<script>
import { projectQuery } from "~/graphql/query";
export default {
  data() {
    return {
      projects: [],
    };
  },
  apollo: {
    projects: {
      prefetch: true,
      query: projectQuery,
    },
  },
};
</script>
