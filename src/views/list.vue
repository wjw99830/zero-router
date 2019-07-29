<template>
  <vue-scrollbar class="hero-list">
    <el-input v-model="v"></el-input>
    <div class="hero-list-item" v-for="hero of list" :key="hero.id"><zr-link :to="`/detail/${hero.id}`" :data="hero">{{ hero.name }}</zr-link></div>
  </vue-scrollbar>
</template>
<script lang="ts">
import Vue from 'vue'
import { value } from 'vue-function-api';
const List = Vue.extend({
  setup() {
    console.log('setup')
    const list = new Array(30).fill(0).map((v, i) => ({
      id: i,
      name: `Hero - ${i + 1}`,
      description: `I'm Hero - ${i + 1}`,
    }));
    const v = value('');
    return { list, v };
  },
});
Vue.component('hero-list', List);
export default List;
</script>
<style>
.hero-list {
  height: 300px;
  width: 50%;
  margin: 200px auto;
  background-color: #f0f3fa;
  border-radius: 7px;
  border: 1px solid #ddd;
}
.hero-list-item {
  line-height: 30px;
  padding: 5px 10px;
  border-bottom: 1px solid #ddd;
}
</style>
