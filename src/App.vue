<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <zr-link to="/">To Index</zr-link>
    <zr-link to="/hello">To Hello</zr-link>
    <zr-link to="/hello/detail/detail-id">To Detail Page</zr-link>
    <zr-link to="/any-other">To Not Defined</zr-link>
    <button @click="back">back</button>
    <button @click="forward">forward</button>
    <zr-if path="/hello/detail/:id" component="detail-page"></zr-if>
    <zr-else-if path="/hello" component="hello-world"></zr-else-if>
    <zr-else-if path="/" component="index-page"></zr-else-if>
    <zr-else component="not-found"></zr-else>
    <zr-if path="^/hello" component="index-page"></zr-if>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { push, replace, back, forward } from './router/main';
export default Vue.extend({
  name: 'app',
  components: {
    HelloWorld
  },
  methods: {
    pushState() {
      push('/hello', 'data');
    },
    replaceState() {
      replace('/hello', 'data');
    },
    back() {
      back();
    },
    forward() {
      forward();
    }
  }
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
