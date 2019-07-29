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
  keepAlive: boolean;
  instance?: Vue;
};
export default {
  name: 'zr-if',
  provide(this: ZrIf) {
    return {
      parentPath: this.parentPath + this.path,
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
    keepAlive: Boolean,
  },
  data() {
    return {
      matched: true,
      zrid: getZrIDAndIncrement(),
    };
  },
  render(this: ZrIf, h: CreateElement) {
    let vnode: VNode | void = undefined;
    const template = this.parentPath ? (this.parentPath + '/' + this.path) : this.path;
    const currentPath = router.current.path.replace(router.base, '');
    this.matched = false;
    if (match(template, currentPath)) {
      this.matched = true;
      router.current.params = resolveParams(template, currentPath);
      vnode = h(this.component, {
        props: {
          route: router.current,
        },
      });
    }
    return vnode;
  },
};
