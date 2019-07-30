import { VueConstructor } from 'vue';
import { init } from './route';
import ZrIf from './components/if';
import ZrElseIf from './components/else-if';
import ZrElse from './components/else';
import ZrLink from './components/link';

export type RouterOptions = {
  base?: string;
}
export function install(vue: VueConstructor, opts: RouterOptions = {}) {
  vue.component('zr-if', ZrIf as any);
  vue.component('zr-else-if', ZrElseIf as any);
  vue.component('zr-else', ZrElse as any);
  vue.component('zr-link', ZrLink as any);
  init(opts);
}
