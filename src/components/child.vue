<template>
  <div>
    <div>detail child</div>
    <div>data = {{ JSON.stringify(route.data) }}</div>
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
