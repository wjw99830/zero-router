import { router, push, replace } from '../src/route';
import ZR from '../src/main';
import Vue from 'vue';
import { App, A, B, C, Parent } from './components';

Vue.use(ZR);
const elm = document.createElement('div');
elm.id = 'app';
document.body.appendChild(elm);


describe('src/route.ts', () => {
  describe('router.stack', () => {
    it('has a startup route according url.', () => {
      const vm = new App();
      vm.$mount('#app');
      const appElm = document.querySelector('.app-component');
      expect(router.stack.length).toBe(1);
      expect(router.current.path).toBe('/');
      expect(appElm.childElementCount).toBe(2);
      expect(document.querySelector('.a').textContent).toBe('A');
    });
  });
  describe('replace function', () => {
    it('should route to specified state and replace previous state.', done => {
      const vm = new App();
      vm.$mount('#app');
      const appElm = document.querySelector('.app-component');
      const stackLength = router.stack.length;
      replace('/b');
      expect(router.stack.length).toBe(stackLength);
      vm.$nextTick(() => {
        expect(appElm.childElementCount).toBe(2);
        expect(document.querySelector('.b').textContent).toBe('B');
        done();
      });
    });
  });
  describe('push function', () => {
    it('should route to specified state.', done => {
      const vm = new App();
      vm.$mount('#app');
      const appElm = document.querySelector('.app-component');
      const stackLength = router.stack.length;
      push('/b');
      expect(router.stack.length).toBe(stackLength + 1);
      vm.$nextTick(() => {
        expect(appElm.childElementCount).toBe(2);
        expect(document.querySelector('.b').textContent).toBe('B');
        done();
      });
    });
  });
});
describe('src/components', () => {
  describe('zr-if', () => {
    it('should render when matched.', done => {
      const vm = new App();
      vm.$mount('#app');
      const appElm = document.querySelector('.app-component');
      expect(appElm.childElementCount).toBe(2);
      expect(document.querySelector('.a').textContent).toBe('A');
      done();
    });
  });
  describe('zr-else-if', () => {
    it('should render when matched with last <zr-if> not matched.', done => {
      const vm = new App();
      vm.$mount('#app');
      const appElm = document.querySelector('.app-component');
      push('/b');
      vm.$nextTick(() => {
        expect(appElm.childElementCount).toBe(2);
        expect(document.querySelector('.b').textContent).toBe('B');
        done();
      });
    });
  });
  describe('zr-else', () => {
    it('should render when matched with all previous <zr-if> and <zr-else-if> not matched.', done => {
      const vm = new App();
      vm.$mount('#app');
      const appElm = document.querySelector('.app-component');
      push('/other');
      vm.$nextTick(() => {
        expect(appElm.childElementCount).toBe(2);
        expect(document.querySelector('.c').textContent).toBe('C');
        done();
      });
    });
  });
});
describe('nested route', () => {
  it('should only render parent when matched with child not matched.', done => {
    const vm = new App();
    vm.$mount('#app');
    const appElm = document.querySelector('.app-component');
    push('/parent');
    vm.$nextTick(() => {
      expect(appElm.childElementCount).toBe(2);
      const parent = document.querySelector('.parent');
      expect(parent.childElementCount).toBe(1);
      expect(document.querySelector('.child')).toBeFalsy();
      done();
    });
  });
  it('should render nested route when child matched.', done => {
    const vm = new App();
    vm.$mount('#app');
    const appElm = document.querySelector('.app-component');
    push('/parent/child');
    vm.$nextTick(() => {
      expect(appElm.childElementCount).toBe(2);
      const parent = document.querySelector('.parent');
      expect(parent.childElementCount).toBe(2);
      expect(document.querySelector('.child')).toBeTruthy();
      done();
    });
  });
});
