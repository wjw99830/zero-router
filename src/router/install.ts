import { VueConstructor } from 'vue';
import { init } from './route';
import RouterView from './components/router-view';

export let _Vue: VueConstructor;
export type RouterOptions = {
  base?: string;
}
export function install(vue: VueConstructor, opts: RouterOptions = {}) {
  _Vue = vue;
  _Vue.component('router-view', RouterView as any);
  init(opts);
}
