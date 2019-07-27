import Vue from 'vue';


export const App = Vue.extend({
  render(h) {
    return h('div', { attrs: { id: 'app' } }, [
      h('span', { class: 'app-text' }, 'App Component'),
      h('zr-if', {
        props: {
          path: '/',
          component: A,
        },
      }),
      h('zr-else-if', {
        props: {
          path: '/b',
          component: B,
        },
      }),
      h('zr-else-if', {
        props: {
          path: '^/parent',
          component: Parent,
        },
      }),
      h('zr-else', {
        props: {
          component: C,
        },
      }),
    ]);
  },
});
export const A = Vue.extend({
  render(h) {
    return h('div', {
      class: 'a',
    }, 'A');
  },
});
export const B = Vue.extend({
  render(h) {
    return h('div', {
      class: 'b',
    }, 'B');
  },
});
export const C = Vue.extend({
  render(h) {
    return h('div', {
      class: 'c',
    }, 'C');
  },
});
export const D = Vue.extend({
  render(h) {
    return h('div', {
      class: 'd',
    }, 'D');
  },
});
export const Parent = Vue.extend({
  props: {
    route: Object,
  },
  render(h) {
    return h('div', { class: 'parent' }, [
      h('div', 'Parent'),
      h('zr-if', {
        props: {
          path: 'child',
          component: Child,
        },
      }),
    ]);
  },
});
export const Child = Vue.extend({
  render(h) {
    return h('div', { class: 'child' }, 'Child');
  },
});
