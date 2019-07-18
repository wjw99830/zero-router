<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <zr-link to="/">To Index</zr-link>
    <zr-link to="/hello">To Hello</zr-link>
    <zr-link to="/hello/detail/detail-id?qs=1">To Detail Page</zr-link>
    <zr-link to="/hello/detail/detail-id/child">To Detail Child</zr-link>
    <zr-link to="/any-other">To Not Defined</zr-link>
    <button @click="push">Child with data</button>
    <button @click="back">back</button>
    <button @click="forward">forward</button>
    <zr-if path="^/hello/detail/:id" component="detail-page"></zr-if>
    <zr-else-if path="/hello" component="hello-world"></zr-else-if>
    <zr-else-if path="/" component="index-page"></zr-else-if>
    <zr-else component="not-found"></zr-else>
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
    push() {
      push('/hello/detail/uuid-3132-324vcew/child', {
        id: 0,
        name: 'name',
      });
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
a, button {
  margin: 20px;
  background-color: #0ae;
  color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  border: 1px solid #09d;
}
</style>
