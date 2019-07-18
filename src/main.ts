import Vue from 'vue'
import App from './App.vue'
import Router from './router/main';
import HelloWorld from './components/HelloWorld.vue';
import IndexPage from './components/index-page.vue';
import Detail from './components/Detail.vue';
import DetailChild from './components/child.vue';
import NotFound from './components/not-found.vue';
import vueRouter from './vue-router';
Vue.config.productionTip = false
Vue.use(Router);
Vue.component('detail-child', DetailChild);
Vue.component('detail-page', Detail);
Vue.component('hello-world', HelloWorld);
Vue.component('index-page', IndexPage);
Vue.component('not-found', NotFound);
new Vue({
  render: h => h(App),
  router: vueRouter,
}).$mount('#app')
