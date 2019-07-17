<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="pushState">Push</button>
    <button @click="replaceState">replace</button>
    <button @click="back">back</button>
    <button @click="forward">forward</button>
    <zr-view path="/hello/:id" component="hello-world"></zr-view>
    <zr-view path="/hello/:id/detail/:type" component="detail-comp"></zr-view>
    <zr-view path="/" component="hey"></zr-view>
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
