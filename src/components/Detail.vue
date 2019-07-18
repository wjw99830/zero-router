<template>
  <div>
    <h1>Hello Detail</h1>
    <zr-if path="child" component="detail-child"></zr-if>
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
