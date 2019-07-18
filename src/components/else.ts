import Vue, { CreateElement, VNode } from 'vue';
import { router } from '../route';
import { _Vue } from '../install';
import { resolvePrevIf, resolveParams } from '../utils/resolve';
import { getZrIDAndIncrement } from '../utils/zrid';

export type ZrElse = Vue & {
  component: string | object | Function;
  parentPath: string;
  zrid: number;
};
export default {
  name: 'zr-else',
  inject: {
    parentPath: {
      default: '',
    },
  },
  props: {
    component: {
      type: [Object, String, Function],
      required: true,
    },
  },
  data() {
    return {
      zrid: getZrIDAndIncrement(),
    };
  },
  render(this: ZrElse, h: CreateElement) {
    let vnode: VNode | void = undefined;
    const prevSiblings = resolvePrevIf(this);
    if (!prevSiblings.length) {
      console.error(`
        In <zr-else>: component = ${this.component}.
        Use <zr-else> after at least one <zr-if>.
      `);
    } else if (prevSiblings.every(prevSibling => !prevSibling.matched)) {
      vnode = h(this.component, {
        props: {
          route: router.current,
        },
      });
    }
    return vnode;
  },
};