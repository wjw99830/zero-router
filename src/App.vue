<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="pushState">Push</button>
    <router-view path="/hello" component="hello-world"></router-view>
    <router-view path="/" component="hey"></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { push, replace } from './router/main';
export default Vue.extend({
  name: 'app',
  components: {
    HelloWorld
  },
  methods: {
    pushState() {
      replace('/hello', 'data');
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
