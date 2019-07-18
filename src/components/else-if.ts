import { CreateElement, VNode } from 'vue';
import { router } from '../route';
import { _Vue } from '../install';
import { resolveParams, resolvePrevIf } from '../utils/resolve';
import { match } from '../utils';
import { ZrIf } from './if';
import { getZrIDAndIncrement } from '../utils/zrid';

export type ZrElseIf = ZrIf;
export default {
  name: 'zr-else-if',
  provide(this: ZrElseIf) {
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
  },
  data() {
    return {
      matched: true,
      zrid: getZrIDAndIncrement(),
    };
  },
  render(this: ZrElseIf , h: CreateElement) {
    this.matched = false;
    let vnode: VNode | void = undefined;
    const template = this.parentPath ? (this.parentPath + '/' + this.path) : this.path;
    const currentPath = router.current.path.replace(new RegExp(`^${router.base}`), '/');
    const prevSiblings = resolvePrevIf(this);
    if (!prevSiblings.length) {
      console.error(`
        In <zr-else-if>: path = ${this.path}, component = ${this.component}.
        Use <zr-else-if> after at least one <zr-if>.
      `);
    } else if (prevSiblings.every(prevSibling => !prevSibling.matched) && match(template, currentPath)) {
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
