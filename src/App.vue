<template>
  <div id="app">
    <zr-if path="/" component="hero-dashboard"></zr-if>
    <zr-else-if path="/list" keep-alive component="hero-list"></zr-else-if>
    <zr-else-if path="^/detail/:id" component="hero-detail"></zr-else-if>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { push, replace, back, forward } from './router/main';
export default Vue.extend({});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  width: 100%;
  height: 100%;
}
a, button {
  cursor: pointer;
}
</style>
