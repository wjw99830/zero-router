import Vue from 'vue'
import App from './App.vue'
import zr from './router/main';
import { plugin } from 'vue-function-api';
import VueScrollbar from '@wpkg/vue-scrollbar';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './views/dashboard.vue';
import './views/list.vue';
import './views/detail.vue';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(plugin);
Vue.use(zr);
Vue.use(VueScrollbar);

new Vue({
  render: h => h(App),
}).$mount('#app')
