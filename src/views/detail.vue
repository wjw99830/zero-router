<template>
  <div class="hero-detail">
    <div>{{ route.data.name }}</div>
    <div>{{ route.data.description }}</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
const Detail = Vue.extend({
  props: {
    route: Object,
  },
  setup(props) {},
});
Vue.component('hero-detail', Detail);
export default Detail;
</script>
<style>
.hero-detail {
  line-height: 150px;
  text-align: center;
  font-size: 1.3rem;
  width: 50%;
  margin: 200px auto;
  background-color: #f0f3fa;
  border-radius: 7px;
  border: 1px solid #ddd;
}
</style>
