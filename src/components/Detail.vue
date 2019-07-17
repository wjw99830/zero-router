<template>
  <div>
    <div>detail</div>
    <div>id: {{ $route.params.id }}</div>
    <div>type: {{ $route.params.type }}</div>
    <zr-view path="child" component="detail-child"></zr-view>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    route: Object,
  },
  mounted() {
    // console.log(this.$route.matched)
  }
});
</script>
