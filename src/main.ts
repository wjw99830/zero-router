import Vue from 'vue'
import App from './App.vue'
import Router from './router/main';
import HelloWorld from './components/HelloWorld.vue';
import Hey from './components/Hey.vue';
import Detail from './components/Detail.vue';
import detailChild from './components/child.vue';
import vueRouter from './vue-router';
Vue.config.productionTip = false
Vue.use(Router);
Vue.component('detail-child', detailChild);
Vue.component('detail-comp', Detail);
Vue.component('hello-world', HelloWorld);
Vue.component('hey', Hey);
new Vue({
  render: h => h(App),
  router: vueRouter,
}).$mount('#app')
