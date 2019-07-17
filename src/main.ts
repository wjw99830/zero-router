import Vue from 'vue'
import App from './App.vue'
import Router from './router/main';
import HelloWorld from './components/HelloWorld.vue';
import Hey from './components/Hey.vue';
Vue.config.productionTip = false
Vue.use(Router);
Vue.component('hello-world', HelloWorld);
Vue.component('hey', Hey);
new Vue({
  render: h => h(App),
}).$mount('#app')
