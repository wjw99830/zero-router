import Vue, { CreateElement, VNode } from 'vue';
import { router } from '../route';
import { _Vue } from '../install';
import { resolveParams, resolvePrevIf } from '../utils/resolve';
import { match } from '../utils';
import { ZrIf } from './if';
import { getZrIDAndIncrement } from '../utils/zrid';
import { onUpdated } from 'vue-function-api';
import { Context } from 'vue-function-api/dist/types/vue';

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
    keepAlive: Boolean,
  },
  data() {
    return {
      matched: true,
      zrid: getZrIDAndIncrement(),
      instance: undefined,
    };
  },
  render(this: ZrElseIf , h: CreateElement) {
    this.matched = false;
    let vnode: VNode | void = undefined;
    const template = this.parentPath ? (this.parentPath + '/' + this.path) : this.path;
    const currentPath = router.current.path.replace(router.base, '');
    const prevSiblings = resolvePrevIf(this);
    if (!prevSiblings.length) {
      console.error(`
        In <zr-else-if>: path = ${this.path}, component = ${this.component}.
        Use <zr-else-if> after at least one <zr-if>.
      `);
    } else if (prevSiblings.every(prevSibling => !prevSibling.matched) && match(template, currentPath)) {
      this.matched = true;
      router.current.params = resolveParams(template, currentPath);
      if (!this.instance) {
        vnode = h(this.component, {
          props: {
            route: router.current,
          },
        });
        // if (this.keepAlive) {
        //   this.$nextTick(() => {
        //     this.instance = (vnode as VNode).componentInstance;
        //     // @ts-ignore
        //     this.instance!.$el.__inactived = true;
        //   });
        // }
      } else if (this.keepAlive) {
        // vnode = this.instance
        // this.$children.push(this.instance);
        // @ts-ignore
        // this.instance!.$el.__inactived = false;
      }
    }
    return vnode;
  },
};
var t: any;
