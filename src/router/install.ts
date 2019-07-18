import { VueConstructor } from 'vue';
import { init } from './route';
import ZrIf from './components/if';
import ZrElseIf from './components/else-if';
import ZrElse from './components/else';
import ZrLink from './components/link';

export let _Vue: VueConstructor;
export type RouterOptions = {
  base?: string;
}
export function install(vue: VueConstructor, opts: RouterOptions = {}) {
  _Vue = vue;
  _Vue.component('zr-if', ZrIf as any);
  _Vue.component('zr-else-if', ZrElseIf as any);
  _Vue.component('zr-else', ZrElse as any);
  _Vue.component('zr-link', ZrLink as any);
  init(opts);
}
