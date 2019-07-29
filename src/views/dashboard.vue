<template>
  <div class="hero-dashboard">
    <div style="padding: 10px; display: flex; justify-content: space-between">
      <span>Heroes</span>
      <zr-link to="/list"><i class="el-icon-arrow-right"></i></zr-link>
    </div>
    <div style="text-align: center; line-height: 50px; padding: 20px">There are 30 heroes.</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
const Dashboard = Vue.extend({
  setup() {},
});
Vue.component('hero-dashboard', Dashboard);
export default Dashboard;
</script>
<style>
.hero-dashboard {
  border: 1px solid #ddd;
  border-radius: 7px;
  background-color: #eee;
  width: 70%;
  margin: 200px auto;
}
</style>
