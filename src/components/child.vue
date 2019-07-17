<template>
  <div>
    <div>detail child</div>
    <div>id: {{ $route.params.id }}</div>
    <div>type: {{ $route.params.type }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    route: Object,
  },
});
</script>
