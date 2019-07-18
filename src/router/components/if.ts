import Vue, { CreateElement, VNode } from 'vue';
import { router } from '../route';
import { _Vue } from '../install';
import { resolveParams } from '../utils/resolve';
import { match } from '../utils';
import { getZrIDAndIncrement } from '../utils/zrid';

export type ZrIf = Vue & {
  component: string | object | Function;
  matched: boolean;
  parentPath: string;
  path: string;
  zrid: number;
};
export default {
  name: 'zr-if',
  provide(this: any) {
    return {
      parentPath: this.path,
    };
  },
  inject: {
    parentPath: {
      default: '',
    },
  },
  props: {
    path: {
      required: true,
      type: String,
    },
    component: {
      type: [Object, String, Function],
      required: true,
    },
  },
  data() {
    return {
      matched: true,
      zrid: getZrIDAndIncrement(),
    };
  },
  render(this: ZrIf, h: CreateElement) {
    let vnode: VNode | void = undefined;
    const template = this.parentPath + this.path;
    const currentPath = router.current.path.replace(new RegExp(`^${router.base}`), '/');
    this.matched = false;
    if (match(template, currentPath)) {
      this.matched = true;
      router.current.params = resolveParams(this.path, router.current.path);
      vnode = h(this.component, {
        props: {
          route: router.current,
        },
      });
    }
    return vnode;
  },
};