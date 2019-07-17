import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
export default new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    component: () => import('./components/Hey.vue'),
  }, {
    path: '/hello',
    component: () => import('./components/HelloWorld.vue'),
    children: [{
      path: ':id/detail',
      component: () => import('./components/child.vue'),
    }]
  }, {
    path: '/hello/:id/detail/:type',
    component: () => import('./components/Detail.vue'),
    children: [{
      path: 'child',
      component: () => import('./components/child.vue')
    }]
  }]
})
